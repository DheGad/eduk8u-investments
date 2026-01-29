'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-0 left-0 right-0 z-40  text-white/40 text-xs pointer-events-none"
        >
            <div className="grid grid-cols-2 w-full">
                {/* Left Footer - Finance */}
                <div className="bg-navy-900/80 backdrop-blur-md border-t border-r border-white/5 p-4 flex justify-between px-8 pointer-events-auto">
                    <div className="flex gap-4">
                        <span>© 2026 Eduk8u Labuan Investments</span>
                        <a href="#" className="hover:text-white transition-colors">Compliance</a>
                        <a href="#" className="hover:text-white transition-colors">Risk Disclosure</a>
                    </div>
                    <div className="text-accent-blue/60 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Market Active
                    </div>
                </div>

                {/* Right Footer - Edu */}
                <div className="bg-navy-800/80 backdrop-blur-md border-t border-white/5 p-4 flex justify-between px-8 pointer-events-auto text-right">
                    <div className="text-accent-orange/60 flex items-center gap-2">
                        Global Admissions Open <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors">Academic Integrity</a>
                        <a href="#" className="hover:text-white transition-colors">Partner Unis</a>
                        <span>© Eduk8u Education</span>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
