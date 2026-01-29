'use client';

import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Calendar, DollarSign, Baby, Heart } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface LifeSimulatorProps {
    isOpen: boolean;
    onClose: () => void;
}

const LIFE_DATA = [
    { age: 30, netWorth: 50000, income: 60000, expenses: 40000 },
    { age: 35, netWorth: 120000, income: 85000, expenses: 50000 },
    { age: 40, netWorth: 250000, income: 110000, expenses: 70000 },
    { age: 45, netWorth: 450000, income: 135000, expenses: 85000 },
    { age: 50, netWorth: 800000, income: 160000, expenses: 90000 },
    { age: 55, netWorth: 1200000, income: 180000, expenses: 95000 },
    { age: 60, netWorth: 1800000, income: 200000, expenses: 100000 },
];

export default function LifeSimulator({ isOpen, onClose }: LifeSimulatorProps) {
    const [age] = useState(30);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-navy-900/90 backdrop-blur-xl flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="w-full max-w-6xl h-[80vh] flex flex-col md:flex-row gap-6"
                    >
                        {/* Control Panel */}
                        <GlassCard className="w-full md:w-1/3 p-8 flex flex-col gap-6" variant="dark">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">LifeSim™ OS</h2>
                                <p className="text-white/60 text-sm">Project your entire lifecycle from Age 30 to 60. See how today&apos;s decisions compound over decades.</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Start Age</label>
                                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                        <Calendar className="w-5 h-5 text-accent-blue" />
                                        <span className="text-xl font-mono text-white">{age} Years Old</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Current Income</label>
                                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                        <DollarSign className="w-5 h-5 text-emerald-400" />
                                        <span className="text-xl font-mono text-white">$60,000</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Family Plans</label>
                                    <div className="flex gap-2">
                                        <button className="flex-1 p-3 bg-accent-blue/10 border border-accent-blue/30 rounded-lg text-white text-sm flex items-center justify-center gap-2">
                                            <Baby className="w-4 h-4" /> 1 Child
                                        </button>
                                        <button className="flex-1 p-3 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm flex items-center justify-center gap-2">
                                            <Heart className="w-4 h-4" /> Married
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-4">
                                    <p className="text-xs text-emerald-400 mb-1">Projected Net Worth @ Age 60</p>
                                    <p className="text-3xl font-bold text-white font-mono">$1.8M</p>
                                </div>
                                <button onClick={onClose} className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/10 text-white transition-colors">
                                    Close Simulation
                                </button>
                            </div>
                        </GlassCard>

                        {/* Visualization Panel */}
                        <div className="flex-1 flex flex-col gap-6">
                            <GlassCard className="flex-1 p-8 relative overflow-hidden" variant="dark">
                                <h3 className="text-lg font-bold text-white mb-6">Lifecycle Projection</h3>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={LIFE_DATA}>
                                            <defs>
                                                <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="age" stroke="rgba(255,255,255,0.2)" />
                                            <Tooltip contentStyle={{ backgroundColor: '#0a192f', border: '1px solid rgba(255,255,255,0.1)' }} />
                                            <Area type="monotone" dataKey="netWorth" stroke="#3b82f6" strokeWidth={3} fill="url(#colorNetWorth)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Timeline Events */}
                                <div className="flex justify-between items-center mt-8 px-4 relative">
                                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -z-10" />
                                    {[30, 40, 50, 60].map((milestone) => (
                                        <div key={milestone} className="w-8 h-8 rounded-full bg-navy-800 border-2 border-accent-blue flex items-center justify-center text-xs font-bold text-white relative group cursor-pointer hover:scale-110 transition-transform">
                                            {milestone}
                                            <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white/60 whitespace-nowrap">
                                                Milestone: Age {milestone}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>

                            <GlassCard className="h-1/3 p-6 grid grid-cols-3 gap-6" variant="default">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-xs text-white/40 mb-2">Education Cost Impact</p>
                                    <p className="text-xl font-bold text-rose-400">-$240k</p>
                                    <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                                        <div className="w-[30%] h-full bg-rose-400" />
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-xs text-white/40 mb-2">Career Earnings</p>
                                    <p className="text-xl font-bold text-white">$3.2M</p>
                                    <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                                        <div className="w-[80%] h-full bg-emerald-400" />
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-xs text-white/40 mb-2">Investment Growth</p>
                                    <p className="text-xl font-bold text-accent-blue">+$800k</p>
                                    <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                                        <div className="w-[40%] h-full bg-accent-blue" />
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
