"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { 
    UploadCloud, 
    FileText, 
    Loader2, 
    CheckCircle2, 
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [summary, setSummary] = useState("");
    const [error, setError] = useState("");
    
    const [user, setUser] = useState(null);
    const [initLoading, setInitLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await account.get();
                setUser(currentUser);
            } catch (err) {
                router.push("/login");
            } finally {
                setInitLoading(false);
            }
        };
        checkUser();
    }, [router]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        
        if (selectedFile.type !== "application/pdf" && !selectedFile.type.startsWith("video/")) {
            setError("Please upload a valid PDF or video document.");
            setFile(null);
            return;
        }
        if (selectedFile.size > 50 * 1024 * 1024 * 1024) {
            setError("File size exceeds the 50 GB maximum limit.");
            setFile(null);
            return;
        }
        
        setError("");
        setFile(selectedFile);
        setSummary("");
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }
        if (!user) {
            router.push("/login");
            return;
        }

        setIsUploading(true);
        setError("");
        
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            
            setSummary(res.data.summary);
        } catch (err) {
            console.error("Upload Error:", err);
            setError(err.response?.data?.error || "Failed to process the document. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleClear = () => {
        setFile(null);
        setSummary("");
        setError("");
    };

    if (initLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050814]">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
            </div>
        );
    }

    if (!user) {
        return null; // Redirecting to login
    }

    return (
        <div className="min-h-screen text-slate-200 selection:bg-indigo-500/30 font-sans relative overflow-x-hidden pt-20 flex flex-col">
            
            {/* FULL SCREEN BACKGROUND IMAGE */}
<div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-[#050814]/85 z-10" />
    <img 
        src="https://images.unsplash.com/photo-1493397212122-2b85def82060?auto=format&fit=crop&q=80&w=2500" 
        alt="Premier Monumental Architectural Design" 
        className="w-full h-full object-cover grayscale-[30%]"
    />
</div>

            <Navbar />

            <div className="px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center flex-1 w-full relative z-10 pt-12 pb-20">
                <div className="w-full max-w-5xl relative flex flex-col gap-8 mb-32">
                    
                    <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-xl">
                        <h1 className="text-4xl font-bold text-white mb-2">Workspace Dashboard</h1>
                        <p className="text-slate-300 font-medium">Securely process your enterprise documents across the network.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Upload Column */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-5 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col h-full"
                        >
                            
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                                <UploadCloud className="w-5 h-5 text-indigo-400" /> Upload Source Component
                            </h2>

                            <div className="space-y-6 relative z-10 flex-1 flex flex-col">
                                <label className="group/drop relative flex flex-col items-center justify-center w-full flex-1 min-h-[220px] border-2 border-dashed border-slate-700/80 rounded-2xl bg-[#050814]/40 hover:bg-[#050814]/70 hover:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500 transition-all cursor-pointer overflow-hidden z-20">
                                    <input type="file" accept=".pdf,video/*" onChange={handleFileChange} className="hidden" />
                                    <div className="flex flex-col items-center justify-center p-6 text-center relative z-10">
                                        <div className="p-4 bg-slate-800/80 rounded-xl mb-4 group-hover/drop:scale-105 transition-transform duration-300 shadow-md">
                                            <UploadCloud className="w-8 h-8 text-indigo-400" />
                                        </div>
                                        <p className="mb-2 text-sm text-slate-300">
                                            <span className="font-semibold text-white">Select a file</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-slate-400">Supported items: PDF, Video formats up to 50 GB.</p>
                                    </div>
                                </label>

                                <AnimatePresence>
                                    {file && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex items-center justify-between p-4 bg-slate-800/80 rounded-xl border border-white/5 shadow-inner"
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="p-2 bg-indigo-500/10 rounded-lg">
                                                    <FileText className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                                </div>
                                                <span className="text-sm text-slate-200 truncate font-medium">{file.name}</span>
                                            </div>
                                            <span className="text-xs text-slate-400 ml-4 flex-shrink-0 font-mono">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </span>
                                        </motion.div>
                                    )}
                                    {error && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            className="flex items-start gap-2 text-red-400 text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/20"
                                        >
                                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                            <span>{error}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex gap-3 pt-4 border-t border-white/5 mt-auto relative z-20">
                                    <button
                                        type="button"
                                        onClick={handleUpload} disabled={!file || isUploading}
                                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md relative cursor-pointer"
                                    >
                                        {isUploading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing Data...</> : <>Run Analysis Model</>}
                                    </button>
                                    
                                    {file && !isUploading && (
                                        <button type="button" onClick={handleClear} className="px-5 py-3.5 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 font-medium rounded-xl border border-white/5 transition-all cursor-pointer">
                                            Clear
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Result Column */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:col-span-7 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl h-full flex flex-col min-h-[550px]"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-indigo-400" /> Executive Summary Overview
                                </h2>
                                {summary && (
                                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-sm">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 relative rounded-2xl bg-[#050814]/60 backdrop-blur-xl border border-white/5 p-6 sm:p-8 overflow-y-auto max-h-[600px] custom-scrollbar shadow-inner">
                                {isUploading ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-5 z-20">
                                        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                                        <div className="text-center">
                                            <p className="text-white font-medium mb-1 text-base">Analyzing System Data Stream</p>
                                            <p className="text-sm text-slate-500">Connecting securely to Gemini LLM architecture...</p>
                                        </div>
                                    </div>
                                ) : summary ? (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                        className="prose prose-invert prose-slate max-w-none break-words relative z-20"
                                    >
                                        {summary.split('\n').map((paragraph, index) => (
                                            paragraph.trim() ? <p key={index} className="mb-5 text-slate-300 leading-relaxed text-[15px]">{paragraph}</p> : <div key={index} className="h-2" />
                                        ))}
                                    </motion.div>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-800/40 border border-slate-700/30 flex items-center justify-center z-10 shadow-sm">
                                            <FileText className="w-6 h-6 text-slate-500" />
                                        </div>
                                        <p className="text-sm font-medium z-10 text-slate-400 bg-slate-900/50 px-5 py-2 rounded-full border border-white/5 shadow-sm">Summary output will automatically render here.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
