'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Activity } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function AdvisorPreview() {
    return (
        <div className="w-full py-12 border-t border-white/5">
            <div className="text-center mb-8">
                <p className="text-xs font-bold tracking-widest text-white/30 uppercase mb-2">Institutional Grade</p>
                <h3 className="text-xl font-medium text-white">Advisors Use This Before Client Meetings</h3>
            </div>

            <GlassCard className="max-w-4xl mx-auto p-1 border-white/10 opacity-80 hover:opacity-100 transition-opacity" variant="dark">
                {/* Mockup Header */}
                <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    <div className="ml-4 w-32 h-3 rounded-full bg-white/5" />
                </div>

                {/* Mockup Body */}
                <div className="p-8 grid grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-4">
                        <div className="flex gap-4">
                            <div className="w-1/3 h-24 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center p-2">
                                <Activity className="w-5 h-5 text-emerald-500 mb-2" />
                                <div className="w-12 h-2 bg-emerald-500/20 rounded" />
                            </div>
                            <div className="w-1/3 h-24 rounded-lg bg-blue-500/10 border border-blue-500/20 flex flex-col items-center justify-center p-2">
                                <ShieldCheck className="w-5 h-5 text-blue-500 mb-2" />
                                <div className="w-12 h-2 bg-blue-500/20 rounded" />
                            </div>
                            <div className="w-1/3 h-24 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center p-2">
                                <Lock className="w-5 h-5 text-white/30 mb-2" />
                                <div className="w-12 h-2 bg-white/10 rounded" />
                            </div>
                        </div>
                        <div className="h-32 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 w-full relative overflow-hidden">
                            {/* Mock Chart Lines */}
                            <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-accent-blue/5 skew-y-6" />
                            <div className="absolute bottom-4 left-4 right-4 h-0.5 bg-accent-blue/30" />
                        </div>
                    </div>

                    <div className="h-full rounded-xl bg-navy-900/50 border border-white/5 p-4 space-y-3">
                        <div className="w-full h-3 rounded bg-white/10" />
                        <div className="w-2/3 h-3 rounded bg-white/5" />
                        <div className="w-full h-3 rounded bg-white/5" />
                        <div className="w-1/2 h-3 rounded bg-white/5" />
                        <div className="mt-8 pt-4 border-t border-white/5">
                            <div className="w-full h-8 rounded bg-accent-blue/20" />
                        </div>
                    </div>
                </div>
            </GlassCard>

            <p className="text-center text-xs text-white/30 mt-6 max-w-md mx-auto">
                Advanced risk modeling and liquidity stress-testing available for institutional partners.
            </p>
        </div>
    );
}
