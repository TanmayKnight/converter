'use client';

import { useState } from 'react';
import Link from 'next/link';

type Mode = 'personal' | 'auto' | 'payday' | 'payoff';

export default function AdvancedLoanCalculator() {
    const [mode, setMode] = useState<Mode>('personal');

    const [amount, setAmount] = useState('');
    const [rate, setRate] = useState('');
    const [term, setTerm] = useState(''); // Years or Months
    const [extra, setExtra] = useState(''); // For Payoff

    const [result, setResult] = useState<{ monthly: string, total: string, interest: string } | null>(null);

    const calculate = () => {
        const p = parseFloat(amount);
        const r_annual = parseFloat(rate) / 100;
        let t = parseFloat(term); // Assume years by default

        if (mode === 'payday') t = t / 12; // Payday usually in months or weeks, let's assume input is months for simplicity or adapt UI

        if (isNaN(p) || isNaN(r_annual) || isNaN(t)) return;

        const r_monthly = r_annual / 12;
        const n_months = t * 12;

        if (mode === 'payday') {
            // Simple Interest usually for short term? Or just standard amortization? 
            // Let's stick to simple total repayment for payday if very short, 
            // but usually they have APR. Let's use standard formula but treat T as small.
            // Actually, usually payday loans are fixed fee per 100.
            // To keep it simple, we treat it as a high interest Personal Loan.
        }

        // Standard Amortization: M = P [ i(1+i)^n ] / [ (1+i)^n - 1 ]
        const monthlyPayment = p * (r_monthly * Math.pow(1 + r_monthly, n_months)) / (Math.pow(1 + r_monthly, n_months) - 1);
        const totalPayment = monthlyPayment * n_months;
        const totalInterest = totalPayment - p;

        setResult({
            monthly: monthlyPayment.toFixed(2),
            total: totalPayment.toFixed(2),
            interest: totalInterest.toFixed(2)
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Advanced Loan Calculator</h1>
                <p className="text-muted-foreground">Auto Loans, Personal Loans, and Payday Loans.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar justify-center">
                    {(['personal', 'auto', 'payday'] as Mode[]).map(m => (
                        <button
                            key={m}
                            onClick={() => { setMode(m); setAmount(''); setResult(null); }}
                            className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${mode === m ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                                }`}
                        >
                            {m.charAt(0).toUpperCase() + m.slice(1)} Loan
                        </button>
                    ))}
                </div>

                <div className="max-w-md mx-auto space-y-6">
                    <div>
                        <label className="text-sm font-semibold mb-2 block">Loan Amount</label>
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder="10000" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold mb-2 block">Interest Rate (APR %)</label>
                        <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder={mode === 'payday' ? "300" : "5.5"} />
                    </div>
                    <div>
                        <label className="text-sm font-semibold mb-2 block">Loan Term ({mode === 'payday' ? 'Months' : 'Years'})</label>
                        <input type="number" value={term} onChange={e => setTerm(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder={mode === 'payday' ? "1" : "5"} />
                    </div>

                    <button onClick={calculate} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
                        Calculate Payment
                    </button>

                    {result && (
                        <div className="space-y-4 mt-6">
                            <div className="bg-primary/10 p-6 rounded-2xl flex justify-between items-center border border-primary/20">
                                <span className="text-primary font-bold">Monthly Payment</span>
                                <span className="text-4xl font-extrabold text-primary">${result.monthly}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-secondary/20 p-4 rounded-2xl text-center border border-border/50">
                                    <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                                    <div className="text-xl font-bold">${result.interest}</div>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded-2xl text-center border border-border/50">
                                    <div className="text-sm text-muted-foreground mb-1">Total Payback</div>
                                    <div className="text-xl font-bold">${result.total}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
