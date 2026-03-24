"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { account } from "@/lib/appwrite";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Signup() {
    const [authEmail, setAuthEmail] = useState("");
    const [authPassword, setAuthPassword] = useState("");
    const [authName, setAuthName] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        try {
            await account.create(ID.unique(), authEmail, authPassword, authName);
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
            
            <div className="flex h-[calc(100vh-80px)] flex-row-reverse">
                {/* Right side: Form (Reversed layout for Signup) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
                    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl relative z-10">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">Register Workspace</h3>
                            <p className="text-slate-400 text-sm">Create your organization's environment securely.</p>
                        </div>

                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                                <input 
                                    type="text" required value={authName} onChange={(e) => setAuthName(e.target.value)}
                                    className="w-full bg-[#050814] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Work Email</label>
                                <input 
                                    type="email" required value={authEmail} onChange={(e) => setAuthEmail(e.target.value)}
                                    className="w-full bg-[#050814] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                    placeholder="name@company.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Secure Password</label>
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
                            Already registered?
                            <Link href="/login" className="ml-2 text-indigo-400 hover:text-indigo-300 font-medium">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Left side: Professional Office Image */}
                <div className="hidden lg:block lg:w-1/2 relative z-10 p-6">
                    <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-lg">
                        <div className="absolute inset-0 bg-[#050814] opacity-20 z-10" />
                        <img 
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200" 
                            alt="Business professionals collaborating" 
                            className="w-full h-full object-cover grayscale-[20%]"
                        />
                        <div className="absolute bottom-12 right-12 z-20 max-w-md text-right">
                            <h2 className="text-3xl font-bold text-white mb-3">Built for Teams</h2>
                            <p className="text-slate-200 text-lg">Designed to streamline operational workflows and maximize organizational efficiency.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
