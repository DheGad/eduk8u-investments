import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Brain, HeartPulse, Zap } from 'lucide-react';

export default function RiskTwin({ onRiskChange }: { onRiskChange?: (score: number) => void }) {
    const [riskScore, setRiskScore] = useState(50);

    useEffect(() => {
        onRiskChange?.(riskScore);
    }, [riskScore, onRiskChange]);

    const getProfile = (score: number) => {
        if (score < 30) return { label: "Guardian", color: "text-emerald-400", desc: "Prioritizes safety over growth. Prone to panic selling." };
        if (score < 70) return { label: "Strategist", color: "text-accent-blue", desc: "Balanced view. Can handle volatility for long-term gain." };
        return { label: "Maverick", color: "text-accent-orange", desc: "Seeks maximum yield. Risks overexposure." };
    };

    const profile = getProfile(riskScore);

    return (
        <GlassCard variant="dark" className="p-6 border-white/10 mt-4">
            <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-white/5 border border-white/10`}>
                    <Brain className={`w-5 h-5 ${profile.color}`} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Your Risk Twin</h3>
                    <p className="text-xs text-white/40">Psychometric Identity</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/60">Emotional Resilience</span>
                        <span className={`font-mono font-bold ${profile.color}`}>{riskScore}/100</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="100"
                        value={riskScore}
                        onChange={(e) => setRiskScore(parseInt(e.target.value))}
                        className={`w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-${profile.color.split('-')[1]}`}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                        <HeartPulse className="w-4 h-4 text-rose-400 mx-auto mb-2" />
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">Heart Rate Risk</p>
                        <p className="text-sm font-bold text-white">
                            {riskScore > 70 ? "High" : (riskScore < 30 ? "Stable" : "Moderate")}
                        </p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                        <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-2" />
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">Impulse Control</p>
                        <p className="text-sm font-bold text-white">
                            {riskScore > 70 ? "Low" : (riskScore < 30 ? "High" : "Balanced")}
                        </p>
                    </div>
                </div>

                <div className={`p-4 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent`}>
                    <p className={`text-sm font-bold ${profile.color} mb-1`}>{profile.label}</p>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                        {profile.desc}
                    </p>
                </div>
            </div>
        </GlassCard>
    );
}
