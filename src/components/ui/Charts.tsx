'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';

/* --- Wealth Chart (Area) --- */

interface WealthChartProps {
    data: Array<{ year: string; amount: number; conservative: number; aggressive: number }>;
}

export function WealthChart({ data }: WealthChartProps) {
    return (
        <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorAggressive" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorConservative" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="year"
                        stroke="rgba(255,255,255,0.2)"
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                    />
                    <YAxis
                        stroke="rgba(255,255,255,0.2)"
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0a192f', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ fontSize: '12px' }}
                    />
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <Area type="monotone" dataKey="aggressive" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorAggressive)" activeDot={{ r: 6 }} />
                    <Area type="monotone" dataKey="conservative" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorConservative)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

/* --- Career ROI Chart (Bar) --- */

interface CareerChartProps {
    data: Array<{ label: string; cost: number; income: number }>;
}

export function CareerChart({ data }: CareerChartProps) {
    return (
        <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="label" type="category" width={80} tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }} />
                    <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ backgroundColor: '#0a192f', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ fontSize: '12px' }}
                    />
                    <Bar dataKey="cost" name="Education Cost" fill="#f97316" radius={[0, 4, 4, 0]} barSize={8} fillOpacity={0.6} />
                    <Bar dataKey="income" name="Projected Income" fill="#10b981" radius={[0, 4, 4, 0]} barSize={8} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
