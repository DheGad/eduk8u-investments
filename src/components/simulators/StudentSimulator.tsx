'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { ArrowRight, GraduationCap, Briefcase, FileText, LineChart } from 'lucide-react';
import { CareerChart } from '@/components/ui/Charts';
import StreamingText from '@/components/ui/StreamingText';
import ReportModal from '@/components/ui/ReportModal';

interface SimulationResult {
    pathway: string;
    probability: string;
    cost: string;
    projectedIncome: string;
    chartData: Array<{ label: string; cost: number; income: number }>;
}

export default function StudentSimulator() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        background: "High School",
        goal: "Software Engineer",
        country: "USA",
        horizon: "4 Years"
    });
    const [isSimulating, setIsSimulating] = useState(false);
    const [result, setResult] = useState<SimulationResult | null>(null);
    const [showReport, setShowReport] = useState(false);

    // Mock simulation logic
    useEffect(() => {
        if (isSimulating) {
            const timer = setTimeout(() => {
                setResult({
                    pathway: "B.Sc Computer Science -> Internship",
                    probability: "92%",
                    cost: "$120,000",
                    projectedIncome: "$95,000 / yr",
                    chartData: [
                        { label: 'Year 1', cost: 30000, income: 0 },
                        { label: 'Year 2', cost: 30000, income: 5000 },
                        { label: 'Year 3', cost: 30000, income: 12000 },
                        { label: 'Year 4', cost: 30000, income: 25000 },
                        { label: 'Job Y1', cost: 0, income: 95000 },
                    ]
                });
                setIsSimulating(false);
                setStep(2);
            }, 2200);
            return () => clearTimeout(timer);
        }
    }, [isSimulating]);

    const handleSimulate = () => {
        setStep(1);
        setIsSimulating(true);
    };

    return (
        <div className="w-full h-full flex flex-col justify-center">
            <ReportModal
                isOpen={showReport}
                onClose={() => setShowReport(false)}
                type="academic"
                data={{ ...result, goal: formData.goal }}
            />

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8 text-right"
            >
                <span className="inline-block px-3 py-1 rounded-full bg-accent-orange/10 text-accent-orange text-xs font-semibold tracking-wider mb-2 border border-accent-orange/20">
                    ACADEMIC INTELLIGENCE
                </span>
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-white to-white/70 mb-4">
                    Design Your Future
                </h2>
                <div className="flex justify-end">
                    <StreamingText
                        text="Algorithmic career mapping for global mobility and ROI optimization."
                        speed={20}
                        className="text-lg text-white/60 font-light max-w-md block min-h-[56px]"
                    />
                </div>
            </motion.div>

            <GlassCard variant="dark" className="p-6 md:p-8 relative overflow-hidden text-right">
                <div className="text-left">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="inputs"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, x: 50 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70">Career Goal</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Data Scientist"
                                            value={formData.goal}
                                            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-12 py-4 text-xl font-sans focus:outline-none focus:border-accent-orange/50 transition-colors placeholder:text-white/20"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70">Current Level</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none bg-navy-900"
                                            value={formData.background}
                                            onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                                        >
                                            <option value="highschool">High School</option>
                                            <option value="undergrad">Undergraduate</option>
                                            <option value="grad">Graduate</option>
                                            <option value="working">Professional</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70">Target Country</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none bg-navy-900"
                                            value={formData.country}
                                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        >
                                            <option value="usa">USA</option>
                                            <option value="uk">UK</option>
                                            <option value="australia">Australia</option>
                                            <option value="canada">Canada</option>
                                            <option value="singapore">Singapore</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSimulate}
                                    className="w-full group relative overflow-hidden bg-accent-orange text-navy-900 font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        Generate Academic Report <ArrowRight className="w-5 h-5" />
                                    </span>
                                </button>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-12 space-y-4"
                            >
                                <div className="w-16 h-16 border-4 border-accent-orange/20 border-t-accent-orange rounded-full animate-spin" />
                                <StreamingText text="Analyzing Global Education Pathways..." speed={30} className="text-white/60 text-sm font-mono" />
                            </motion.div>
                        )}

                        {step === 2 && result && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <LineChart className="w-5 h-5 text-accent-orange" /> ROI Analysis
                                    </h3>
                                    <button onClick={() => setStep(0)} className="text-xs text-white/40 hover:text-white transition-colors">Reset</button>
                                </div>

                                <div className="p-2 rounded-xl bg-white/5 border border-white/10 mb-4">
                                    <CareerChart data={result.chartData} />
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
                                    <p className="text-xs text-accent-orange mb-1 uppercase tracking-wider">Optimal Route</p>
                                    <p className="text-lg font-medium text-white flex items-center gap-2">
                                        <GraduationCap className="w-5 h-5 text-accent-orange" /> {result.pathway}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-xs text-white/40 mb-1">Success Probability</p>
                                        <p className="text-xl font-bold text-emerald-400 font-mono">{result.probability}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-xs text-white/40 mb-1">Starting Income</p>
                                        <p className="text-xl font-bold text-white font-mono">{result.projectedIncome}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowReport(true)}
                                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors border border-white/10 text-sm flex items-center justify-center gap-2"
                                >
                                    <FileText className="w-4 h-4" /> View Full Pathway Report
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-orange/5 rounded-full blur-3xl -z-10" />
            </GlassCard>
        </div>
    );
}
