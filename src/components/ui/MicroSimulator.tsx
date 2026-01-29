'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCurrency } from '@/components/logic/CurrencyContext';
import { cn } from '@/lib/utils';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MicroSimulatorProps {
    mode: 'wealth' | 'future';
}

export default function MicroSimulator({ mode }: MicroSimulatorProps) {
    const { format } = useCurrency();
    const [val, setVal] = useState(5); // Years

    const getWealthOutput = (years: number) => {
        if (years < 3) return { text: "Short-term volatility high. Risk level: Medium-High.", confidence: "Confidence: 62%" };
        if (years < 8) return { text: "Growth phase initiating. Compounding starts.", confidence: "Confidence: 78%" };
        return { text: "Full market cycle captured. Max resilience.", confidence: "Confidence: 94%" };
    };

    const getStudentOutput = (years: number) => {
        if (years < 2) return { text: "Certificate level. Quick entry, flexible mobility.", confidence: "Global Demand: Moderate" };
        if (years < 5) return { text: "Degree level. High visa probability unlocked.", confidence: "Global Demand: High" };
        return { text: "Research/Expert level. Elite global mobility.", confidence: "Global Demand: Very High" };
    };

    const output = mode === 'wealth' ? getWealthOutput(val) : getStudentOutput(val);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg mx-auto mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
        >
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-white/50 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-accent-blue" />
                {mode === 'wealth' ? "Quick Risk Check" : "Quick Career Check"}
            </div>

            <div className="mb-6">
                <p className="text-lg font-medium text-white">
                    {mode === 'wealth'
                        ? `What happens if I invest for ${val} years?`
                        : `What happens if I study for ${val} years?`
                    }
                </p>
            </div>

            <input
                type="range"
                min="1"
                max="15"
                value={val}
                onChange={(e) => setVal(parseInt(e.target.value))}
                className={cn(
                    "w-full h-2 rounded-lg appearance-none cursor-pointer mb-6",
                    mode === 'wealth' ? "bg-accent-blue/20 accent-accent-blue" : "bg-teal-500/20 accent-teal-500"
                )}
            />

            <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 text-sm">
                <span className="text-white/80">{output.text}</span>
                <span className={cn(
                    "font-mono font-bold",
                    mode === 'wealth' ? "text-accent-blue" : "text-teal-400"
                )}>
                    {output.confidence}
                </span>
            </div>
        </motion.div>
    );
}
