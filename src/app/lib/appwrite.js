import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";

await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_COLLECTION_ID,
    ID.unique(),
    {
        title: file.name,
        content: pdf.text,
        summary: completion.choices[0].message.content,
        createdAt: new Date().toISOString(),
    }
);