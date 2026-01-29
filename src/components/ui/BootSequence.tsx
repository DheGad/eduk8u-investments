'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, Cpu, Globe, ShieldCheck } from 'lucide-react';

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
    const [logs, setLogs] = useState<string[]>([]);

    const BOOT_LOGS = [
        { text: "Initializing Neural Cores...", icon: Cpu, delay: 500 },
        { text: "Connecting to Global Markets...", icon: Globe, delay: 1200 },
        { text: "Verifying Labuan Compliance Protocols...", icon: ShieldCheck, delay: 2000 },
        { text: "Booting Eduk8u Intelligence OS v2.0...", icon: Terminal, delay: 2800 },
    ];

    useEffect(() => {
        const timeouts: NodeJS.Timeout[] = [];

        BOOT_LOGS.forEach((log) => {
            const timeout = setTimeout(() => {
                setLogs(prev => [...prev, log.text]);
            }, log.delay);
            timeouts.push(timeout);
        });

        const completionTimeout = setTimeout(() => {
            onComplete();
        }, 3500);
        timeouts.push(completionTimeout);

        return () => timeouts.forEach(clearTimeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-navy-900 flex flex-col items-center justify-center font-mono"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
        >
            <div className="w-full max-w-md space-y-4 p-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center mb-12"
                >
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-blue to-accent-orange flex items-center justify-center text-navy-900 font-bold text-3xl shadow-[0_0_50px_rgba(59,130,246,0.5)] animate-pulse">
                        E
                    </div>
                </motion.div>

                <div className="space-y-2">
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-sm"
                        >
                            <span className="text-accent-blue">➜</span>
                            <span className={i === logs.length - 1 ? "text-white animate-pulse" : "text-white/40"}>
                                {log}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-8">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "linear" }}
                        className="h-full bg-accent-blue"
                    />
                </div>
            </div>
        </motion.div>
    );
}
