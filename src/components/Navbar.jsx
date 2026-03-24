"use client";

import { useState, useEffect } from "react";
import { FileText, Loader2, Menu, X, UserCircle, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { account } from "@/lib/appwrite";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [initLoading, setInitLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await account.get();
                setUser(currentUser);
            } catch (err) {
                setUser(null);
            } finally {
                setInitLoading(false);
            }
        };
        checkUser();
    }, []);

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            router.push("/");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#050814]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                    <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20">
                        <FileText className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-wide">
                        AINotes<span className="text-indigo-400">Assistant</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</Link>
                    <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Dashboard</Link>
                    
                    <div className="flex items-center gap-4 ml-4">
                        {!initLoading && user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                                    <UserCircle className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm text-slate-300">{user.name || user.email.split('@')[0]}</span>
                                </div>
                                <button onClick={handleLogout} className="text-sm font-medium text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1">
                                    <LogOut className="w-4 h-4" /> Sign out
                                </button>
                            </div>
                        ) : !initLoading ? (
                            <>
                                <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</Link>
                                <Link href="/signup" className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
            
            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-20 left-0 w-full bg-[#050814] border-b border-white/5 p-6 flex flex-col gap-4 shadow-2xl"
                    >
                        <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-300">Features</Link>
                        <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-300">Dashboard</Link>
                        <hr className="border-white/10 my-2" />
                        
                        {user ? (
                            <>
                                <span className="text-sm text-indigo-400">Logged in as {user.email}</span>
                                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full py-3 rounded-xl border border-white/10 text-white font-semibold">Sign out</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-slate-300 text-left">Log in</Link>
                                <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-3 rounded-xl bg-indigo-500 text-white font-semibold">
                                    Create Account Free
                                </Link>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
