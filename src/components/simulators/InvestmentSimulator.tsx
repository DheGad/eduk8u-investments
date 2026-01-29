'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { ArrowRight, TrendingUp, ShieldAlert, BarChart3, FileText, Zap } from 'lucide-react';
import { WealthChart } from '@/components/ui/Charts';
import StreamingText from '@/components/ui/StreamingText';
import ReportModal from '@/components/ui/ReportModal';
import CrisisReplayEngine from '@/components/intelligence/CrisisReplayEngine';
import RiskTwin from '@/components/intelligence/RiskTwin';
import DecisionEngine from '@/components/ui/DecisionEngine';

interface SimulationResult {
    expectedReturn: string;
    bestCase: string;
    worstCase: string;
    confidence: number;
    chartData: Array<{ year: string; amount: number; conservative: number; aggressive: number }>;
}

export default function InvestmentSimulator() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        amount: "1000000",
        duration: 10,
        risk: 'balanced',
        goal: 'growth',
        region: 'global'
    });
    const [isSimulating, setIsSimulating] = useState(false);
    const [result, setResult] = useState<SimulationResult | null>(null);
    const [showReport, setShowReport] = useState(false);

    // Generate mock chart data based on duration
    const generateChartData = (years: number) => {
        return Array.from({ length: years }, (_, i) => ({
            year: `Y${i + 1}`,
            amount: 1000 + (i * 150), // Baseline
            conservative: 1000 + (i * 80),
            aggressive: 1000 + (i * 250)
        }));
    };

    // Mock simulation logic
    useEffect(() => {
        if (isSimulating) {
            const timer = setTimeout(() => {
                setResult({
                    expectedReturn: "12.4% - 15.1%",
                    bestCase: "$3,450,200",
                    worstCase: "$1,120,500",
                    confidence: 88,
                    chartData: generateChartData(formData.duration)
                });
                setIsSimulating(false);
                setStep(2);
            }, 2000); // Increased simulation time for effect
            return () => clearTimeout(timer);
        }
    }, [isSimulating, formData.duration]);

    const handleRiskTwinChange = (score: number) => {
        // Smart Connectivity Logic
        if (score < 30) {
            setFormData(prev => ({ ...prev, risk: 'conservative', goal: 'safety' }));
        } else if (score > 70) {
            setFormData(prev => ({ ...prev, risk: 'aggressive', goal: 'max_growth' }));
        } else {
            setFormData(prev => ({ ...prev, risk: 'balanced', goal: 'growth' }));
        }
    };

    const handleSimulate = () => {
        setStep(1);
        setIsSimulating(true);
    };

    return (
        <div className="w-full h-full flex flex-col justify-center">
            <ReportModal
                isOpen={showReport}
                onClose={() => setShowReport(false)}
                type="wealth"
                data={{ ...result, amount: formData.amount }}
            />

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
            >
                <span className="inline-block px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-semibold tracking-wider mb-2 border border-accent-blue/20">
                    WEALTH INTELLIGENCE
                </span>
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-4">
                    Simulate Your Wealth
                </h2>
                <StreamingText
                    text="Deep-learning projections for capital allocation across global markets."
                    speed={20}
                    className="text-lg text-white/60 font-light max-w-md block min-h-[56px]"
                />
            </motion.div>

            <div className="relative">
                <GlassCard variant="dark" className="p-6 md:p-8 relative overflow-hidden transition-all duration-500 ease-in-out z-10">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="inputs"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70">Investment Capital (USD)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                                        <input
                                            type="text"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-8 py-4 text-xl font-mono focus:outline-none focus:border-accent-blue/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70">Duration (Years)</label>
                                        <input
                                            type="range"
                                            min="1" max="30"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                            className="w-full accent-accent-blue h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between text-xs text-white/40">
                                            <span>1y</span>
                                            <span className="text-accent-blue font-mono">{formData.duration}y</span>
                                            <span>30y</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70">Region</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none bg-navy-900"
                                            value={formData.region}
                                            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                        >
                                            <option value="global">Global Diversified</option>
                                            <option value="us">North America</option>
                                            <option value="asia">Asia Pacific</option>
                                            <option value="emerging">Emerging Markets</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSimulate}
                                    className="w-full group relative overflow-hidden bg-accent-blue text-navy-900 font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        Generate Intelligence Report <ArrowRight className="w-5 h-5" />
                                    </span>
                                </button>

                                {/* Risk Twin Teaser in Step 0 */}
                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-xs text-white/40 flex items-center gap-2 mb-2">
                                        <Zap className="w-3 h-3 text-accent-blue" /> AI Risk Twin Analysis Included
                                    </p>
                                    {/* Inline RiskTwin for Step 0 connection */}
                                    <RiskTwin onRiskChange={handleRiskTwinChange} />
                                </div>
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
                                <div className="w-16 h-16 border-4 border-accent-blue/20 border-t-accent-blue rounded-full animate-spin" />
                                <StreamingText text="Running Monte Carlo Simulations..." speed={40} className="text-white/60 text-sm font-mono" />
                            </motion.div>
                        )}

                        {step === 2 && result && (
                            <motion.div // Results View
                                key="results"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6 h-[600px] overflow-y-auto pr-2 custom-scrollbar" // Added scroll for expanded content
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-accent-blue" /> Growth Projection
                                    </h3>
                                    <button onClick={() => setStep(0)} className="text-xs text-white/40 hover:text-white transition-colors">New Simulation</button>
                                </div>

                                {/* Chart Section */}
                                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                                    <WealthChart data={result.chartData} />
                                </div>

                                <DecisionEngine />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                        <p className="text-xs text-emerald-400 mb-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Best Case</p>
                                        <p className="text-xl font-bold text-white font-mono">{result.bestCase}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                        <p className="text-xs text-orange-400 mb-1 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> Worst Case</p>
                                        <p className="text-xl font-bold text-white font-mono">{result.worstCase}</p>
                                    </div>
                                </div>

                                {/* New Intelligence Modules */}
                                <CrisisReplayEngine />
                                {/* RiskTwin moved to input step for interactivity */}

                                <button
                                    onClick={() => setShowReport(true)}
                                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors border border-white/10 text-sm flex items-center justify-center gap-2"
                                >
                                    <FileText className="w-4 h-4" /> View Full Intelligence Report
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl -z-10" />
                </GlassCard>
            </div>
        </div>
    );
}
