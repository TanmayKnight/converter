'use client';

import { useState } from 'react';
import Link from 'next/link';

type Mode = 'retirement' | 'sip' | 'goal';

export default function RetirementCalculator() {
    const [mode, setMode] = useState<Mode>('retirement');

    // Values
    const [currentAge, setCurrentAge] = useState('');
    const [retireAge, setRetireAge] = useState('');
    const [monthlySavings, setMonthlySavings] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [rate, setRate] = useState('');
    const [goalAmount, setGoalAmount] = useState(''); // For Goal Planner

    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const r_annual = parseFloat(rate) / 100;
        const r_monthly = r_annual / 12;

        if (isNaN(r_annual)) return;

        let res = 0;

        if (mode === 'retirement' || mode === 'sip') {
            // Future Value of Series (SIP) + Future Value of Lump Sum (Current Savings)
            const years = mode === 'retirement' ? (parseFloat(retireAge) - parseFloat(currentAge)) : parseFloat(currentAge); // Reuse currentAge field for 'Years duration' in SIP mode
            const months = years * 12;

            const montlyInv = parseFloat(monthlySavings);
            const lumpsum = parseFloat(currentSavings) || 0;

            if (isNaN(years) || isNaN(montlyInv)) return;

            // FV(SIP) = P * [ (1+i)^n - 1 ] / i * (1+i) -- assume beginning of period
            const fv_sip = montlyInv * ((Math.pow(1 + r_monthly, months) - 1) / r_monthly) * (1 + r_monthly);

            // FV(Lumpsum) = P * (1+r)^t
            const fv_lumpsum = lumpsum * Math.pow(1 + r_annual, years);

            res = fv_sip + fv_lumpsum;
        } else if (mode === 'goal') {
            // Calculate required monthly savings to reach Goal
            // Goal = P * [ (1+i)^n - 1 ] / i * (1+i)
            // P = Goal / ( ... )
            const goal = parseFloat(goalAmount);
            const years = parseFloat(currentAge); // Reuse for duration
            const months = years * 12;

            if (isNaN(goal) || isNaN(years)) return;

            const factor = ((Math.pow(1 + r_monthly, months) - 1) / r_monthly) * (1 + r_monthly);
            res = goal / factor;
        }

        setResult(res.toFixed(2));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Retirement & Goals</h1>
                <p className="text-muted-foreground">Plan for your future.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar justify-center">
                    {(['retirement', 'sip', 'goal'] as Mode[]).map(m => (
                        <button
                            key={m}
                            onClick={() => { setMode(m); setCurrentAge(''); setResult(null); }}
                            className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${mode === m ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                                }`}
                        >
                            {m === 'sip' ? 'SIP Calculator' : m === 'goal' ? 'Goal Planner' : 'Retirement Plan'}
                        </button>
                    ))}
                </div>

                <div className="max-w-md mx-auto space-y-6">
                    {mode === 'goal' ? (
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Target Goal Amount</label>
                            <input type="number" value={goalAmount} onChange={e => setGoalAmount(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder="1000000" />
                        </div>
                    ) : null}

                    {mode === 'retirement' ? (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Current Age</label>
                                <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Retire Age</label>
                                <input type="number" value={retireAge} onChange={e => setRetireAge(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Time Period (Years)</label>
                            <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder="10" />
                        </div>
                    )}

                    {mode !== 'goal' && (
                        <>
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Monthly Investment</label>
                                <input type="number" value={monthlySavings} onChange={e => setMonthlySavings(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder="500" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Current Lumpsum Savings</label>
                                <input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder="0" />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="text-sm font-semibold mb-2 block">Expected Annual Return (%)</label>
                        <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-secondary/50 p-4 rounded-xl outline-none" placeholder="12" />
                    </div>

                    <button onClick={calculate} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
                        Calculate
                    </button>

                    {result && (
                        <div className="bg-secondary/20 p-6 rounded-2xl text-center border-2 border-dashed border-border mt-6">
                            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                                {mode === 'goal' ? 'Required Monthly Savings' : 'Estimated Corpus Value'}
                            </div>
                            <div className="text-4xl font-extrabold text-foreground">${result}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
