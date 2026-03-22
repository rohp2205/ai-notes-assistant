"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState("");

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post("/api/upload", formData);
        setSummary(res.data.summary);
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-5">
                AI Notes & Document Assistant
            </h1>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-4"
            />

            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Upload & Summarize
            </button>

            {summary && (
                <div className="mt-6 p-4 border">
                    <h2 className="font-bold">Summary:</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}