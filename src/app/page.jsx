"use client";

import { Zap, ChevronRight, Video, Database, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
    const scrollToApp = () => {
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-[#050814] text-slate-200 selection:bg-indigo-500/30 font-sans relative overflow-x-hidden pt-20">
            {/* Global Background Effects */}
            <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-0" />

            {/* --- NAVIGATION BAR --- */}
            <Navbar />

            {/* --- MAIN PAGE CONTENT --- */}
            <div className="pt-10 pb-20 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center">
                
                {/* --- HERO SECTION --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center max-w-4xl mx-auto mt-10 md:mt-20 mb-16 z-10 relative"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-8">
                        <Zap className="w-3.5 h-3.5" />
                        Enterprise Document Intelligence
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-8">
                        Analyze any document in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">seconds.</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                        Upload massive PDFs or video files up to 5 GB. Our enterprise-grade AI infrastructure automatically processes and extracts comprehensive summaries for your team.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-lg transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 group">
                            Start Processing
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button type="button" onClick={scrollToApp} className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-lg transition-all border border-white/10 text-center">
                            View Features
                        </button>
                    </div>
                </motion.div>

                {/* --- PROFESSIONAL BANNER --- */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl z-10 relative mt-4 mb-24 aspect-[21/9] bg-slate-900 flex items-center justify-center border border-white/5"
                >
                    <div className="absolute inset-0 bg-slate-900/40 mix-blend-overlay z-10" />
                    <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" 
                        alt="Professionals analyzing data" 
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-transparent z-20" />
                </motion.div>

                {/* --- FEATURES SECTION --- */}
                <div id="features" className="w-full max-w-6xl mt-10 pt-10 scroll-mt-20 z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Enterprise-Grade Architecture</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Built upon modern infrastructure to guarantee performance, security, and compliant processing.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Zap, title: "Lightning Fast", desc: "Utilizing advanced models for instantaneous summary generation across massive datasets." },
                            { icon: Video, title: "5GB Video Support", desc: "Upload massive corporate multimedia files and presentations without arbitrary constraints." },
                            { icon: Database, title: "Scalable Storage", desc: "Your summaries are persistently stored using secure and compliant robust backend clusters." },
                            { icon: Shield, title: "Secure Processing", desc: "Files and models are securely processed. Privacy and data security are enforced continually." }
                        ].map((feat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/40 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-5 border border-slate-700">
                                    <feat.icon className="w-6 h-6 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

            {/* --- FOOTER --- */}
            <Footer />

        </div>
    );
}