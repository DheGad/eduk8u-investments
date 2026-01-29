'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD' | 'CHF' | 'CNY' | 'SEK' | 'NZD' | 'MXN' | 'SGD' | 'HKD' | 'NOK' | 'KRW' | 'TRY' | 'INR' | 'RUB' | 'BRL' | 'ZAR' | 'MYR';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (c: Currency) => void;
    format: (amount: number) => string;
    convert: (amount: number, from: Currency, to: Currency) => number;
    symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const RATES: Record<Currency, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 148.5,
    AUD: 1.52,
    CAD: 1.35,
    CHF: 0.88,
    CNY: 7.19,
    SEK: 10.4,
    NZD: 1.63,
    MXN: 17.1,
    SGD: 1.34,
    HKD: 7.82,
    NOK: 10.5,
    KRW: 1330,
    TRY: 30.2,
    INR: 83.1,
    RUB: 89.5,
    BRL: 4.95,
    ZAR: 18.9,
    MYR: 4.72,
};

const SYMBOLS: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'Fr',
    CNY: '¥',
    SEK: 'kr',
    NZD: 'NZ$',
    MXN: '$',
    SGD: 'S$',
    HKD: 'HK$',
    NOK: 'kr',
    KRW: '₩',
    TRY: '₺',
    INR: '₹',
    RUB: '₽',
    BRL: 'R$',
    ZAR: 'R',
    MYR: 'RM',
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrency] = useState<Currency>('USD');

    const format = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const convert = (amount: number, from: Currency, to: Currency) => {
        const amountInUSD = amount / RATES[from];
        return amountInUSD * RATES[to];
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, format, convert, symbol: SYMBOLS[currency] }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
