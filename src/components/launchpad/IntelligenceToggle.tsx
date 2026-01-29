'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Brain, TrendingUp } from 'lucide-react';

interface IntelligenceToggleProps {
    mode: 'future' | 'wealth';
    setMode: (mode: 'future' | 'wealth') => void;
}

export default function IntelligenceToggle({ mode, setMode }: IntelligenceToggleProps) {
    return (
        <div className="relative p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-1 w-fit mx-auto">
            {/* Active Pill Background */}
            <motion.div
                className={cn(
                    "absolute inset-y-1 rounded-full shadow-lg",
                    mode === 'future' ? "bg-teal-500/20 border border-teal-500/50" : "bg-accent-blue/20 border border-accent-blue/50"
                )}
                layoutId="activePill"
                initial={false}
                animate={{
                    left: mode === 'future' ? 4 : '50%',
                    width: 'calc(50% - 4px)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button
                onClick={() => setMode('future')}
                className={cn(
                    "relative z-10 px-6 py-2 rounded-full flex items-center gap-2 transition-colors duration-300 text-sm font-medium",
                    mode === 'future' ? "text-teal-300" : "text-white/40 hover:text-white/60"
                )}
            >
                <Brain className="w-4 h-4" />
                Students Investment Gateway
            </button>

            <button
                onClick={() => setMode('wealth')}
                className={cn(
                    "relative z-10 px-6 py-2 rounded-full flex items-center gap-2 transition-colors duration-300 text-sm font-medium",
                    mode === 'wealth' ? "text-accent-blue" : "text-white/40 hover:text-white/60"
                )}
            >
                <TrendingUp className="w-4 h-4" />
                Wealth Advisor Gateway
            </button>
        </div>
    );
}
