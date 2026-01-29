'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { ResponsiveContainer, AreaChart, Area, Tooltip, CartesianGrid } from 'recharts';
import { AlertTriangle, History, RefreshCcw } from 'lucide-react';
import StreamingText from '@/components/ui/StreamingText';

const SCENARIOS = {
    gfc2008: {
        name: "2008 Global Financial Crisis",
        description: "A liquidity crisis triggering a -50% global equity drawdown.",
        data: [
            { year: 'Q1', portfolio: 100, market: 100 },
            { year: 'Q2', portfolio: 95, market: 92 },
            { year: 'Q3', portfolio: 88, market: 75 },
            { year: 'Q4', portfolio: 72, market: 55 },
            { year: 'Q5', portfolio: 68, market: 52 },
            { year: 'Q6', portfolio: 75, market: 65 },
            { year: 'Q7', portfolio: 82, market: 78 },
            { year: 'Q8', portfolio: 90, market: 85 },
        ]
    },
    covid2020: {
        name: "2020 Pandemic Flash Crash",
        description: "Rapid -34% drop followed by unprecedented V-shaped recovery.",
        data: [
            { year: 'Feb', portfolio: 100, market: 100 },
            { year: 'Mar 1', portfolio: 92, market: 85 },
            { year: 'Mar 15', portfolio: 75, market: 66 },
            { year: 'Apr', portfolio: 85, market: 80 },
            { year: 'May', portfolio: 92, market: 90 },
            { year: 'Jun', portfolio: 98, market: 96 },
            { year: 'Jul', portfolio: 102, market: 101 },
        ]
    }
};

export default function CrisisReplayEngine() {
    const [activeScenario, setActiveScenario] = useState<'gfc2008' | 'covid2020' | null>(null);

    return (
        <GlassCard variant="dark" className="p-6 border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <History className="w-5 h-5 text-rose-400" /> Crisis Replay Engine
                </h3>
                {activeScenario && (
                    <button
                        onClick={() => setActiveScenario(null)}
                        className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors"
                    >
                        <RefreshCcw className="w-3 h-3" /> Reset
                    </button>
                )}
            </div>

            {!activeScenario ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => setActiveScenario('gfc2008')}
                        className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all text-left group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-lg font-bold text-white group-hover:text-rose-400">2008 GFC</span>
                            <AlertTriangle className="w-4 h-4 text-white/20 group-hover:text-rose-400" />
                        </div>
                        <p className="text-xs text-white/60">Simulate -50% Drawdown</p>
                    </button>
                    <button
                        onClick={() => setActiveScenario('covid2020')}
                        className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all text-left group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-lg font-bold text-white group-hover:text-orange-400">2020 Crash</span>
                            <AlertTriangle className="w-4 h-4 text-white/20 group-hover:text-orange-400" />
                        </div>
                        <p className="text-xs text-white/60">Simulate V-Shape Volatility</p>
                    </button>
                </div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="mb-4">
                        <h4 className="text-rose-400 font-bold mb-1">{SCENARIOS[activeScenario].name}</h4>
                        <StreamingText
                            text={SCENARIOS[activeScenario].description}
                            speed={30}
                            className="text-xs text-white/60 font-light min-h-[32px] block"
                        />
                    </div>

                    <div className="h-[200px] w-full bg-white/5 rounded-xl p-2 border border-white/5 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={SCENARIOS[activeScenario].data}>
                                <defs>
                                    <linearGradient id="colorCrash" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0a192f', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    itemStyle={{ fontSize: '12px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="market"
                                    stroke="#f43f5e"
                                    strokeWidth={2}
                                    fill="url(#colorCrash)"
                                    name="Market Impact"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="portfolio"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    fillOpacity={0}
                                    strokeDasharray="5 5"
                                    name="Your Portfolio"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                        <p className="text-xs text-rose-300 font-mono text-center">
                            ⚠️ STRESS TEST WARNING: Emotional resilience required.
                        </p>
                    </div>
                </motion.div>
            )}
        </GlassCard>
    );
}
