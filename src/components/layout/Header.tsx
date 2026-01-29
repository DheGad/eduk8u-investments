'use client';

import { motion } from 'framer-motion';
import { Search, User, Menu } from 'lucide-react';
import Link from 'next/link';
import { useCurrency, Currency } from '@/components/logic/CurrencyContext';
import { cn } from '@/lib/utils';

export default function Header() {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none"
        >
            {/* Left items */}
            <div className="flex items-center gap-6 pointer-events-auto">
                <button className="p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            {/* Center Logo */}
            <div className="flex flex-col items-center pointer-events-auto">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-lg shadow-lg border border-white/20">
                        E
                    </div>
                    <span className="text-lg font-bold tracking-widest text-white group-hover:tracking-[0.2em] transition-all duration-300 flex items-center gap-3">
                        EDUK8U <span className="font-light text-white/50 tracking-normal">LABUAN INVESTMENTS AI</span>
                    </span>
                </Link>
            </div>

            {/* Right items */}
            <div className="flex items-center gap-4 pointer-events-auto">
                <CurrencySelector />
                <button className="p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                    <Search className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                    <User className="w-5 h-5" />
                </button>
            </div>
        </motion.header>
    );
}

function CurrencySelector() {
    const { currency, setCurrency } = useCurrency();
    const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'INR', 'RUB', 'BRL', 'ZAR', 'MYR'];

    return (
        <div className="relative group">
            <button className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/90 text-xs font-mono hover:bg-white/10 transition-colors flex items-center gap-2">
                <span>{currency}</span>
            </button>
            <div className="absolute top-full right-0 mt-2 py-2 w-24 bg-navy-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 max-h-60 overflow-y-auto custom-scrollbar">
                {currencies.map(c => (
                    <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={cn(
                            "px-4 py-2 text-left text-xs hover:bg-white/5 transition-colors",
                            currency === c ? "text-accent-blue font-bold" : "text-white/60"
                        )}
                    >
                        {c}
                    </button>
                ))}
            </div>
        </div>
    );
}
