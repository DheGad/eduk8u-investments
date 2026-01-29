'use client';

import GlassCard from '@/components/ui/GlassCard';
import { ShieldCheck, Target, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DecisionEngine() {
    return (
        <GlassCard variant="default" className="p-4 border-accent-blue/20 bg-accent-blue/5 mt-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-accent-blue flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Decision Confidence
                </h4>
                <span className="text-xs text-accent-blue/60 font-mono">ID: 882-ALPHA</span>
            </div>

            <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-white">94</span>
                <span className="text-sm text-white/40 mb-1">/100</span>
            </div>

            <div className="w-full h-1.5 bg-navy-900 rounded-full overflow-hidden mb-4">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-accent-blue"
                />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1 text-white/60">
                    <Target className="w-3 h-3" /> Aligned
                </div>
                <div className="flex items-center gap-1 text-white/60">
                    <Lock className="w-3 h-3" /> Time-Locked
                </div>
            </div>
        </GlassCard>
    );
}
