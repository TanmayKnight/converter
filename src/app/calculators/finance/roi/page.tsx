'use client';

import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function ROICalculator() {
    const [invested, setInvested] = useState<string>('1000');
    const [returned, setReturned] = useState<string>('1500');
    const [days, setDays] = useState<string>('365');

    const [roi, setRoi] = useState<number>(0);
    const [annualizedRoi, setAnnualizedRoi] = useState<number>(0);
    const [profit, setProfit] = useState<number>(0);

    useEffect(() => {
        const inv = parseFloat(invested);
        const ret = parseFloat(returned);
        const d = parseFloat(days);

        if (isNaN(inv) || isNaN(ret) || inv <= 0) {
            setRoi(0);
            setProfit(0);
            return;
        }

        const p = ret - inv;
        setProfit(p);

        const r = (p / inv) * 100;
        setRoi(r);

        if (!isNaN(d) && d > 0) {
            // Annualized = ((1 + Total Return) ^ (365 / days)) - 1
            const totalReturnRatio = ret / inv;
            const ar = (Math.pow(totalReturnRatio, 365 / d) - 1) * 100;
            setAnnualizedRoi(ar);
        } else {
            setAnnualizedRoi(0);
        }

    }, [invested, returned, days]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">ROI Calculator</h1>
                <p className="text-muted-foreground">Calculate Return on Investment and Annualized Returns.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Amount Invested ($)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="number"
                                    value={invested}
                                    onChange={(e) => setInvested(e.target.value)}
                                    className="w-full bg-secondary/50 border border-transparent focus:border-primary/50 focus:bg-background rounded-xl py-3 pl-10 pr-4 text-lg font-semibold outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Amount Returned ($)</label>
                            <div className="relative">
                                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="number"
                                    value={returned}
                                    onChange={(e) => setReturned(e.target.value)}
                                    className="w-full bg-secondary/50 border border-transparent focus:border-primary/50 focus:bg-background rounded-xl py-3 pl-10 pr-4 text-lg font-semibold outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Investment Length (Days)</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="number"
                                    value={days}
                                    onChange={(e) => setDays(e.target.value)}
                                    className="w-full bg-secondary/50 border border-transparent focus:border-primary/50 focus:bg-background rounded-xl py-3 pl-10 pr-4 text-lg font-semibold outline-none transition-all"
                                    placeholder="Optional (for Annualized)"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-6 flex flex-col justify-center text-center">
                    <h2 className="text-lg font-semibold text-blue-600 mb-8 uppercase tracking-wider">Return on Investment</h2>

                    <div className={`text-6xl font-extrabold mb-2 ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {roi.toFixed(2)}%
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-blue-500/20 mt-8">
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Net Profit</div>
                            <div className={`text-xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {profit >= 0 ? '+' : ''}${profit.toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Annualized Return</div>
                            <div className="text-xl font-bold text-foreground">
                                {annualizedRoi.toFixed(2)}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
