import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import fs from "fs";
import path from "path";
import os from "os";

export const maxDuration = 60; // Extend duration limit for processing

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req) {
    let tempFilePath = null;
    try {
        const data = await req.formData();
        const file = data.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json({ error: "Google API Key is missing. Please add GOOGLE_API_KEY to your .env.local" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        let summary = "";

        // ----- VIDEO PROCESSING LOGIC -----
        if (file.type.startsWith("video/")) {
            const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY);
            
            // Save buffer to a local temporary file because GoogleAIFileManager requires a file path
            tempFilePath = path.join(os.tmpdir(), `upload_${Date.now()}_${file.name}`);
            await fs.promises.writeFile(tempFilePath, buffer);

            // Upload the file to Gemini Server
            const uploadResponse = await fileManager.uploadFile(tempFilePath, {
                mimeType: file.type,
                displayName: file.name,
            });

            // Poll the status until the video is processed
            let activeFile = uploadResponse.file;
            while (activeFile.state === "PROCESSING") {
                await delay(2000);
                activeFile = await fileManager.getFile(uploadResponse.file.name);
            }

            if (activeFile.state === "FAILED") {
                throw new Error("Google Gemini failed to process the video stream.");
            }

            // Generate summary from the video URI
            const result = await model.generateContent([
                {
                    fileData: {
                        mimeType: uploadResponse.file.mimeType,
                        fileUri: uploadResponse.file.uri
                    }
                },
                { text: "Provide a highly concise, professional summary highlighting the key events, speakers, and topics inside this video." }
            ]);

            summary = result.response.text();

            // Cleanup Gemini server side (optional but good practice)
            fileManager.deleteFile(uploadResponse.file.name).catch(() => {});

        } else {
            // ----- PDF PROCESSING LOGIC -----
            const parser = new PDFParse({ data: buffer });
            const pdf = await parser.getText();
            
            const prompt = `Provide a highly concise, professional summary highlighting the key points of the following document content:\n\n${pdf.text.substring(0, 60000)}`;
            const result = await model.generateContent(prompt);
            summary = result.response.text();
        }

        // 🔥 Save to Appwrite (Asynchronously to avoid blocking response speed)
        if (process.env.NEXT_PUBLIC_DATABASE_ID && process.env.NEXT_PUBLIC_COLLECTION_ID) {
            try {
                databases.createDocument(
                    process.env.NEXT_PUBLIC_DATABASE_ID,
                    process.env.NEXT_PUBLIC_COLLECTION_ID,
                    ID.unique(),
                    {
                        title: file.name,
                        content: file.type.startsWith("video/") ? "[Video Processed Successfully]" : buffer.toString('utf-8').substring(0, 10000), 
                        summary: summary,
                        createdAt: new Date().toISOString(),
                    }
                ).catch(appwriteErr => {
                    console.error("Appwrite save failed silently:", appwriteErr);
                });
            } catch (appwriteErr) {
                console.error("Appwrite save failed:", appwriteErr);
            }
        }

        // Clean up temp file immediately after generation
        if (tempFilePath && fs.existsSync(tempFilePath)) {
            await fs.promises.unlink(tempFilePath).catch(() => {});
        }

        return NextResponse.json({ summary });
    } catch (error) {
        console.error("API Upload Error:", error);
        
        // Ensure cleanup occurs even if an error is thrown
        if (tempFilePath && fs.existsSync(tempFilePath)) {
            await fs.promises.unlink(tempFilePath).catch(() => {});
        }

        return NextResponse.json(
            { error: error.message || "Failed to process the document" },
            { status: 500 }
        );
    }
}