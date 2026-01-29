'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { GraduationCap, Briefcase, Globe, BrainCircuit, ArrowLeft, LineChart, FileText, BookOpen, Map, Award } from 'lucide-react';
import StreamingText from '@/components/ui/StreamingText';
import { useCurrency } from '@/components/logic/CurrencyContext';
import { CareerChart } from '@/components/ui/Charts';
import ReportModal from '@/components/ui/ReportModal';
import MicroSimulator from '@/components/ui/MicroSimulator';

interface SimulationResult {
    pathway: string;
    probability: string;
    cost: string;
    projectedIncome: string;
    scholarship: string;
    chartData: Array<{ label: string; cost: number; income: number }>;
}

export default function FutureEngine() {
    const { symbol, format, currency } = useCurrency();
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

    // Generate mock chart data with currency multiplier
    const generateChartData = () => {
        const multiplier = currency === 'MYR' ? 4.5 : currency === 'SGD' ? 1.35 : currency === 'GBP' ? 0.78 : 1;

        return [
            { label: 'Year 1', cost: 30000 * multiplier, income: 0 },
            { label: 'Year 2', cost: 30000 * multiplier, income: 5000 * multiplier },
            { label: 'Year 3', cost: 30000 * multiplier, income: 12000 * multiplier },
            { label: 'Year 4', cost: 30000 * multiplier, income: 25000 * multiplier },
            { label: 'Job Y1', cost: 0, income: 95000 * multiplier },
        ];
    };

    // Live Simulation Logic
    useEffect(() => {
        if (isSimulating) {
            const timer = setTimeout(() => {
                const multiplier = currency === 'MYR' ? 4.5 : currency === 'SGD' ? 1.35 : currency === 'GBP' ? 0.78 : 1;
                const safeFormat = (val: number) => {
                    return new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currency,
                        maximumFractionDigits: 0
                    }).format(val);
                }

                setResult({
                    pathway: "B.Sc Computer Science -> Internship",
                    probability: "92%",
                    cost: safeFormat(120000 * multiplier),
                    projectedIncome: `${safeFormat(95000 * multiplier)} / yr`,
                    cost: safeFormat(120000 * multiplier),
                    projectedIncome: `${safeFormat(95000 * multiplier)} / yr`,
                    scholarship: "High Potential (85%)",
                    chartData: generateChartData()
                });
                setIsSimulating(false);
                setStep(2);
            }, 2200);
            return () => clearTimeout(timer);
        }
    }, [isSimulating, currency]);

    const handleSimulate = () => {
        setStep(1);
        setIsSimulating(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-6xl mx-auto p-4 space-y-6"
        >
            <ReportModal
                isOpen={showReport}
                onClose={() => setShowReport(false)}
                type="academic"
                data={{ ...result, goal: formData.goal }}
            />

            <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold tracking-wider mb-2 border border-teal-500/20">
                    <ArrowLeft className="w-3 h-3" />
                    STUDENT INVESTMENTS GATEWAY
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Design Your <span className="text-teal-400">Future</span>
                </h2>
                <StreamingText
                    text="Algorithmic career mapping for global mobility and ROI optimization."
                    speed={20}
                    className="text-lg text-white/60 font-light max-w-xl mx-auto block min-h-[28px]"
                />

                <MicroSimulator mode="future" />
            </div>

            <div className="relative">
                <GlassCard variant="dark" className="p-6 md:p-8 relative overflow-hidden transition-all duration-500 ease-in-out z-10 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {/* INPUT STEP */}
                        {step === 0 && (
                            <motion.div key="inputs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 50 }} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/70">Career Aspiration</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Data Scientist"
                                                    value={formData.goal}
                                                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-12 py-4 text-xl font-sans focus:outline-none focus:border-teal-500/50 transition-colors placeholder:text-white/20"
                                                />
                                            </div>
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
                                                <option value="germany">Germany</option>
                                                <option value="japan">Japan</option>
                                                <option value="uae">UAE</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/70">Current Education Level</label>
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

                                        <div className="md:pt-8">
                                            <button
                                                onClick={handleSimulate}
                                                className="w-full group relative overflow-hidden bg-teal-500 text-navy-900 font-bold py-5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]"
                                            >
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                <span className="relative flex items-center justify-center gap-2 text-lg">
                                                    Analyze Career Path <ArrowLeft className="w-5 h-5 rotate-180" />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* LOADING STEP */}
                        {step === 1 && (
                            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 space-y-8">
                                <div className="relative">
                                    <div className="w-24 h-24 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center text-teal-500 font-mono text-xs animate-pulse">Scanning</div>
                                </div>
                                <StreamingText text="Mapping Global Universities... Calculating Visa Probability... Estimating 10-Year Income Volatility..." speed={30} className="text-white/60 text-sm font-mono max-w-sm text-center" />
                            </motion.div>
                        )}

                        {/* RESULTS STEP */}
                        {step === 2 && result && (
                            <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                        <LineChart className="w-6 h-6 text-teal-400" /> Human Capital ROI ({currency})
                                    </h3>
                                    <button onClick={() => setStep(0)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/60 transition-colors">New Analysis</button>
                                </div>

                                <div className="p-1 rounded-2xl bg-white/5 border border-white/10">
                                    <CareerChart data={result.chartData} />
                                </div>

                                <div className="p-6 rounded-2xl bg-teal-900/20 border border-teal-500/30 text-center">
                                    <p className="text-sm text-teal-400 mb-2 uppercase tracking-widest font-semibold">Recommended Pathway</p>
                                    <p className="text-lg md:text-2xl font-bold text-white flex items-center justify-center gap-3">
                                        <GraduationCap className="w-8 h-8 text-teal-400" /> {result.pathway}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center text-center">
                                        <p className="text-xs text-emerald-400 mb-1">Success Probability</p>
                                        <p className="text-3xl font-bold text-white font-mono">{result.probability}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col items-center text-center">
                                        <p className="text-xs text-blue-400 mb-1">Projected Annual Income</p>
                                        <p className="text-3xl font-bold text-white font-mono">{result.projectedIncome}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col items-center text-center md:col-span-2">
                                        <p className="text-xs text-purple-400 mb-1 flex items-center gap-1"><BookOpen className="w-3 h-3" /> Scholarship Eligibility</p>
                                        <p className="text-2xl font-bold text-white font-mono">{result.scholarship}</p>
                                        <p className="text-xs text-white/40 mt-1">Based on global mobility score & academic alignment</p>
                                    </div>
                                </div>

                                <button onClick={() => setShowReport(true)} className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors border border-white/10 flex items-center justify-center gap-3">
                                    <FileText className="w-5 h-5" /> Download Career Roadmap (PDF)
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </GlassCard>
            </div>
        </motion.div>
    );
}
