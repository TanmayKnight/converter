'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AffiliateCard } from '@/components/AffiliateCard';

type Mode = 'simple' | 'compound' | 'cd' | 'recurring' | 'depreciation' | 'npv' | 'roi';

export default function InvestmentCalculator() {
    const [mode, setMode] = useState<Mode>('simple');

    // Generic values: p=principal, r=rate, t=time, f=frequency/future, c=contribution
    const [p, setP] = useState('');
    const [r, setR] = useState('');
    const [t, setT] = useState('');
    const [c, setC] = useState(''); // Extra contribution or scrap value
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const principal = parseFloat(p);
        const rate = parseFloat(r) / 100;
        const time = parseFloat(t);
        const extra = parseFloat(c) || 0;

        let res = 0;

        if (isNaN(principal) || isNaN(rate) || isNaN(time)) return;

        switch (mode) {
            case 'simple':
                // A = P(1 + rt)
                res = principal * (1 + rate * time);
                break;
            case 'compound':
                // A = P(1 + r/n)^(nt) ... assume annual (n=1) for simplicity unless specified
                // Let's use Annual compounding default
                res = principal * Math.pow((1 + rate), time);
                break;
            case 'cd':
                // Certificate of Deposit roughly same as compound
                res = principal * Math.pow((1 + rate), time);
                break;
            case 'recurring':
                // RD (Monthly) -> P * n + P * n(n+1)/2 * r/12/100 ... simplified
                // A = P * (((1+r)^n - 1) / r) * (1+r) ... for monthly deposits
                // Let's do: monthly deposit 'principal' for 'time' years at 'rate'
                const n = time * 12; // months
                const r_mo = rate / 12;
                res = principal * ((Math.pow(1 + r_mo, n) - 1) / r_mo) * (1 + r_mo);
                break;
            case 'depreciation':
                // V = P * (1 - r)^t
                res = principal * Math.pow((1 - rate), time);
                break;
            case 'npv':
                // NPV = CashFlow / (1+r)^t - Initial
                // This is complex for a single field, let's simplify:
                // PV of a future sum: P / (1+r)^t
                res = principal / Math.pow((1 + rate), time);
                break;
        }

        setResult(res.toFixed(2));
    };

    const getLabels = () => {
        switch (mode) {
            case 'recurring': return { p: 'Monthly Deposit', r: 'Annual Rate (%)', t: 'Years' };
            case 'depreciation': return { p: 'Asset Value', r: 'Depreciation Rate (%)', t: 'Years' };
            case 'npv': return { p: 'Future Value', r: 'Discount Rate (%)', t: 'Years' };
            default: return { p: 'Principal Amount', r: 'Annual Interest Rate (%)', t: 'Time Period (Years)' };
        }
    };
    const labels = getLabels();

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Investment Calculator</h1>
                <p className="text-muted-foreground">Calculate interest, depreciation, and investment growth.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
                    {(['simple', 'compound', 'cd', 'recurring', 'depreciation', 'npv'] as Mode[]).map(m => (
                        <button
                            key={m}
                            onClick={() => { setMode(m); setP(''); setR(''); setT(''); setResult(null); }}
                            className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${mode === m ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                                }`}
                        >
                            {m === 'cd' ? 'Certificate of Deposit' : m === 'npv' ? 'PV Calculator' : m === 'recurring' ? 'Recurring Deposit' : m + ' Interest'}
                        </button>
                    ))}
                </div>

                <div className="max-w-md mx-auto space-y-6">
                    <div>
                        <label className="text-sm font-semibold mb-2 block">{labels.p}</label>
                        <input
                            type="number"
                            value={p}
                            onChange={e => setP(e.target.value)}
                            className="w-full bg-secondary/50 p-4 rounded-xl text-lg outline-none focus:ring-2 ring-primary/20"
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold mb-2 block">{labels.r}</label>
                        <input
                            type="number"
                            value={r}
                            onChange={e => setR(e.target.value)}
                            className="w-full bg-secondary/50 p-4 rounded-xl text-lg outline-none focus:ring-2 ring-primary/20"
                            placeholder="5.0"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold mb-2 block">{labels.t}</label>
                        <input
                            type="number"
                            value={t}
                            onChange={e => setT(e.target.value)}
                            className="w-full bg-secondary/50 p-4 rounded-xl text-lg outline-none focus:ring-2 ring-primary/20"
                            placeholder="1"
                        />
                    </div>

                    <button onClick={calculate} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
                        Calculate Result
                    </button>

                    {result && (
                        <div className="bg-secondary/20 p-6 rounded-2xl text-center border-2 border-dashed border-border mt-6">
                            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                                {mode === 'depreciation' ? 'Remaining Value' : mode === 'npv' ? 'Present Value' : 'Final Amount'}
                            </div>
                            <div className="text-4xl font-extrabold text-foreground">${result}</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Grow Your Wealth</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <AffiliateCard
                        title="Robinhood"
                        description="Commission-free investing. Get your first stock for free when you sign up."
                        ctaText="Claim Free Stock"
                        href="https://robinhood.com/"
                        badge="Free Stock"
                    />
                    <AffiliateCard
                        title="Webull"
                        description="Advanced trading tools and extended hours trading. 0 commisions."
                        ctaText="Open Account"
                        href="https://www.webull.com/"
                        badge="Pro Tools"
                    />
                </div>
            </div>
        </div>
    );
}
