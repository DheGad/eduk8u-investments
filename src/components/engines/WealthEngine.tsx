'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { TrendingUp, ShieldCheck, PieChart, Landmark, ArrowRight, Zap, BarChart3, FileText, ShieldAlert, Award, Briefcase, ExternalLink, Globe } from 'lucide-react';
import StreamingText from '@/components/ui/StreamingText';
import { useCurrency } from '@/components/logic/CurrencyContext';
import { WealthChart } from '@/components/ui/Charts';
import ReportModal from '@/components/ui/ReportModal';
import CrisisReplayEngine from '@/components/intelligence/CrisisReplayEngine';
import RiskTwin from '@/components/intelligence/RiskTwin';
import DecisionEngine from '@/components/ui/DecisionEngine';
import MicroSimulator from '@/components/ui/MicroSimulator';
import AdvisorPreview from '@/components/ui/AdvisorPreview';

interface SimulationResult {
    expectedReturn: string;
    bestCase: string;
    worstCase: string;
    confidence: number;
    chartData: Array<{ year: string; amount: number; conservative: number; aggressive: number }>;
}

const LIVE_TICKER = [
    { symbol: 'S&P 500', val: '4,783.45', change: '+0.4%' },
    { symbol: 'KLCI', val: '1,568.90', change: '+0.1%', color: 'text-accent-blue' }, // Labuan relevant
    { symbol: 'STI', val: '3,270.44', change: '-0.2%' },
    { symbol: 'FTSE 100', val: '7,682.30', change: '+0.5%' },
    { symbol: 'BTC', val: '64,300.00', change: '+2.1%', color: 'text-orange-400' },
];

export default function WealthEngine() {
    const { symbol, format, currency } = useCurrency();
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

    // Generate mock chart data with currency multiplier
    const generateChartData = (years: number) => {
        const multiplier = currency === 'MYR' ? 4.5 : currency === 'SGD' ? 1.35 : currency === 'GBP' ? 0.78 : 1;
        const baseStart = 1000 * multiplier;

        return Array.from({ length: years }, (_, i) => ({
            year: `Y${i + 1}`,
            amount: baseStart + (i * 150 * multiplier),
            conservative: baseStart + (i * 80 * multiplier),
            aggressive: baseStart + (i * 250 * multiplier)
        }));
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
                    expectedReturn: "12.4% - 15.1%",
                    bestCase: safeFormat(3450200 * multiplier),
                    worstCase: safeFormat(1120500 * multiplier),
                    confidence: 88,
                    chartData: generateChartData(formData.duration)
                });
                setIsSimulating(false);
                setStep(2);
            }, 2500); // "Pro" thinking time
            return () => clearTimeout(timer);
        }
    }, [isSimulating, formData.duration, currency]);

    const handleRiskTwinChange = (score: number) => {
        if (score < 30) setFormData(prev => ({ ...prev, risk: 'conservative', goal: 'safety' }));
        else if (score > 70) setFormData(prev => ({ ...prev, risk: 'aggressive', goal: 'max_growth' }));
        else setFormData(prev => ({ ...prev, risk: 'balanced', goal: 'growth' }));
    };

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
                type="wealth"
                data={{ ...result, amount: formData.amount }}
            />

            {/* LIVE MARKET TICKER */}
            <div className="w-full overflow-hidden bg-navy-900/50 border border-white/5 rounded-full py-2 mb-6 pointer-events-none select-none">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    className="flex gap-12 whitespace-nowrap pl-4"
                >
                    {[...LIVE_TICKER, ...LIVE_TICKER, ...LIVE_TICKER].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs font-mono">
                            <span className={item.color || "text-white/60"}>{item.symbol}</span>
                            <span className="text-white font-bold">{item.val}</span>
                            <span className={item.change.startsWith('+') ? "text-emerald-400" : "text-rose-400"}>{item.change}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-semibold tracking-wider mb-2 border border-accent-blue/20">
                    WEALTH ADVISOR GATEWAY
                    <ArrowRight className="w-3 h-3" />
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Simulate Your <span className="text-accent-blue">Wealth</span>
                </h2>
                <StreamingText
                    text="Deep learning projections for capital allocation across global markets."
                    speed={20}
                    className="text-lg text-white/60 font-light max-w-xl mx-auto block min-h-[28px]"
                />

                <MicroSimulator mode="wealth" />
            </div>

            <div className="relative">
                <GlassCard variant="dark" className="p-6 md:p-8 relative overflow-hidden transition-all duration-500 ease-in-out z-10 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {/* INPUT STEP */}
                        {step === 0 && (
                            <motion.div key="inputs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -50 }} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/70">Investment Capital ({currency})</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">{symbol}</span>
                                                <input
                                                    type="text"
                                                    value={formData.amount}
                                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-12 py-4 text-2xl font-mono focus:outline-none focus:border-accent-blue/50 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/70">Duration (Years)</label>
                                            <input
                                                type="range" min="1" max="30" value={formData.duration}
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
                                            <label className="text-sm font-medium text-white/70">Global Exposure Strategy</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['Global Diversified', 'US Markets', 'Asia Pacific', 'Emerging Markets'].map((r) => (
                                                    <button
                                                        key={r}
                                                        onClick={() => setFormData({ ...formData, region: r })}
                                                        className={`px-4 py-3 rounded-lg text-xs font-medium border transition-all ${formData.region === r ? 'bg-accent-blue/20 border-accent-blue text-accent-blue' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}
                                                    >
                                                        {r}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-2">
                                        {/* Smart Connectivity */}
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Zap className="w-4 h-4 text-accent-blue" />
                                                <span className="text-sm font-semibold text-white">AI Risk Twin Profiling</span>
                                            </div>
                                            <RiskTwin onRiskChange={handleRiskTwinChange} />
                                        </div>

                                        <button
                                            onClick={handleSimulate}
                                            className="w-full group relative overflow-hidden bg-accent-blue text-navy-900 font-bold py-5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <span className="relative flex items-center justify-center gap-2 text-lg">
                                                Initialize Wealth Engine <ArrowRight className="w-5 h-5" />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                                        <Landmark className="w-6 h-6 text-accent-blue shrink-0 mt-1" />
                                        <div>
                                            <h4 className="text-sm font-bold text-white">Why Eduk8u Advisors?</h4>
                                            <p className="text-xs text-white/50 mt-1">Our Labuan-certified architects specialize in cross-border wealth preservation and tax-efficient structures tailored for global citizens.</p>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                                        <ShieldCheck className="w-6 h-6 text-accent-blue shrink-0 mt-1" />
                                        <div>
                                            <h4 className="text-sm font-bold text-white">Institutional Grade Security</h4>
                                            <p className="text-xs text-white/50 mt-1">All simulations are backed by institutional-grade encryption and privacy protocols. Your data never leaves the secure enclave.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* LOADING STEP */}
                        {step === 1 && (
                            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 space-y-8">
                                <div className="relative">
                                    <div className="w-24 h-24 border-4 border-accent-blue/20 border-t-accent-blue rounded-full animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center text-accent-blue font-mono text-xs animate-pulse">Running</div>
                                </div>
                                <StreamingText text="Processing Monte Carlo Simulations... Converting Currency Arbitrage... Calculating Drawdown Risks..." speed={30} className="text-white/60 text-sm font-mono max-w-sm text-center" />
                            </motion.div>
                        )}

                        {/* RESULTS STEP */}
                        {step === 2 && result && (
                            <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                        <TrendingUp className="w-6 h-6 text-accent-blue" /> Wealth Projection ({currency})
                                    </h3>
                                    <button onClick={() => setStep(0)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/60 transition-colors">Reset Simulation</button>
                                </div>

                                <div className="p-1 rounded-2xl bg-white/5 border border-white/10">
                                    <WealthChart data={result.chartData} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-xs text-white/40 mb-1">Expected Return</p>
                                        <p className="text-2xl font-bold text-accent-blue">{result.expectedReturn}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                        <p className="text-xs text-emerald-400 mb-1 flex items-center gap-1">Best Case</p>
                                        <p className="text-xl font-bold text-white font-mono">{result.bestCase}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                        <p className="text-xs text-orange-400 mb-1 flex items-center gap-1">Worst Case</p>
                                        <p className="text-xl font-bold text-white font-mono">{result.worstCase}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                        <p className="text-xs text-blue-400 mb-1">AI Confidence</p>
                                        <p className="text-xl font-bold text-white font-mono">{result.confidence}%</p>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-navy-900 border border-white/10">
                                    <h4 className="text-md font-bold text-white mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-accent-blue" /> Certified Labuan Wealth Architects</h4>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/10" />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-white">Sarah Jenkins, CFA</p>
                                            <p className="text-xs text-white/50">Senior Portfolio Strategist • Singapore/Labuan</p>
                                        </div>
                                        <button className="px-4 py-2 rounded-lg bg-accent-blue text-navy-900 text-xs font-bold hover:bg-accent-blue/90 transition-colors">Connect</button>
                                    </div>
                                </div>

                                <DecisionEngine />
                                <CrisisReplayEngine />

                                <button onClick={() => setShowReport(true)} className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors border border-white/10 flex items-center justify-center gap-3">
                                    <FileText className="w-5 h-5" /> Download Professional Intelligence Report (PDF)
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </GlassCard>
            </div>

            <AdvisorPreview />
        </motion.div>
    );
}
