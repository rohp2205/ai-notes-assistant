import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import OpenAI from "openai";

export async function POST(req) {
    const data = await req.formData();
    const file = data.get("file");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pdf = await pdfParse(buffer);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: `Summarize this:\n${pdf.text}`,
            },
        ],
    });

    return NextResponse.json({
        summary: completion.choices[0].message.content,
    });
}