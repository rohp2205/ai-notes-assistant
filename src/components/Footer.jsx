import { FileText, Github, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-[#03050c] border-t border-white/5 pt-16 pb-8 px-6 sm:px-12 relative z-10 bottom-0">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
                <div className="max-w-xs">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-6 h-6 text-indigo-500" />
                        <span className="text-xl font-bold text-white">AINotes<span className="text-indigo-500">Assistant</span></span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        Changing the way students and professionals extract information. Lightning fast processing powered by Next.js & Google GenAI.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"><Github className="w-5 h-5 text-slate-400" /></Link>
                        <Link href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"><Twitter className="w-5 h-5 text-slate-400" /></Link>
                    </div>
                </div>

                <div className="flex gap-16">
                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link href="/#features" className="hover:text-indigo-400 transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Integrations</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Changelog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">About</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-600 text-sm">© {(new Date()).getFullYear()} AI Notes Assistant. All rights reserved.</p>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> All systems operational
                </div>
            </div>
        </footer>
    );
}
