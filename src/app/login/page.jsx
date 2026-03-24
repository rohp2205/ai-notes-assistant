"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Login() {
    const [authEmail, setAuthEmail] = useState("");
    const [authPassword, setAuthPassword] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        try {
            await account.createEmailPasswordSession(authEmail, authPassword);
            router.push("/dashboard");
        } catch (err) {
            alert(err.message || "Failed to authenticate.");
        } finally {
            setAuthLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050814] text-slate-200 font-sans relative overflow-x-hidden pt-20">
            {/* Global Background Effects */}
            <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none z-0" />

            <Navbar />
            
            <div className="flex h-[calc(100vh-80px)]">
                {/* Left side: Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
                    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl relative z-10">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">Sign in to workspace</h3>
                            <p className="text-slate-400 text-sm">Enter your credentials to securely access your data.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Work Email</label>
                                <input 
                                    type="email" required value={authEmail} onChange={(e) => setAuthEmail(e.target.value)}
                                    className="w-full bg-[#050814] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                    placeholder="name@company.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                                <input 
                                    type="password" required minLength={8} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)}
                                    className="w-full bg-[#050814] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button 
                                type="submit" disabled={authLoading}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-wait mt-4 shadow-sm"
                            >
                                {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                                Continue
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-slate-400">
                            Don't have an account?
                            <Link href="/signup" className="ml-2 text-indigo-400 hover:text-indigo-300 font-medium">
                                Create account
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right side: Professional Clean Image */}
                <div className="hidden lg:block lg:w-1/2 relative z-10 p-6">
                    <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-lg">
                        <div className="absolute inset-0 bg-[#050814] opacity-20 z-10" />
                        <img 
                            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" 
                            alt="Clean Minimalist Professional Desk" 
                            className="w-full h-full object-cover grayscale-[30%]"
                        />
                        <div className="absolute bottom-12 left-12 z-20 max-w-md">
                            <h2 className="text-3xl font-bold text-white mb-3">Professional Grade Security</h2>
                            <p className="text-slate-200 text-lg">Your corporate data is continuously protected within our compliant enterprise architecture.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
