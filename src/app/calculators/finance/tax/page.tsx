'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AffiliateCard } from '@/components/AffiliateCard';

type Mode = 'gst' | 'vat';

export default function TaxCalculator() {
    const [mode, setMode] = useState<Mode>('gst');
    const [price, setPrice] = useState('');
    const [rate, setRate] = useState('');
    const [result, setResult] = useState<{ net: string, tax: string, gross: string } | null>(null);

    const calculate = () => {
        const p = parseFloat(price);
        const r = parseFloat(rate);

        if (isNaN(p) || isNaN(r)) return;

        // GST/VAT logic is identical: Tax = Price * (Rate/100)
        // Assume 'Price' is exclusive of tax by default usually, but let's show both
        // Actually, normally user inputs Amount and wants to Add Tax or Subtract Tax.
        // Let's assume Adding Tax for simplicity or standard use case.

        const taxAmount = p * (r / 100);
        const totalAmount = p + taxAmount;

        setResult({
            net: p.toFixed(2),
            tax: taxAmount.toFixed(2),
            gross: totalAmount.toFixed(2)
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Tax Calculator</h1>
                <p className="text-muted-foreground">Calculate GST and VAT.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar justify-center">
                    {(['gst', 'vat'] as Mode[]).map(m => (
                        <button
                            key={m}
                            onClick={() => { setMode(m); setPrice(''); setRate(''); setResult(null); }}
                            className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${mode === m ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                                }`}
                        >
                            {m.toUpperCase()} Calculator
                        </button>
                    ))}
                </div>

                <div className="max-w-md mx-auto space-y-6">
                    <div>
                        <label className="text-sm font-semibold mb-2 block">Net Price (Amount)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className="w-full bg-secondary/50 p-4 rounded-xl text-lg outline-none focus:ring-2 ring-primary/20"
                            placeholder="100.00"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold mb-2 block">Tax Rate (%)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={rate}
                                onChange={e => setRate(e.target.value)}
                                className="w-full bg-secondary/50 p-4 rounded-xl text-lg outline-none focus:ring-2 ring-primary/20"
                                placeholder={mode === 'gst' ? "18" : "20"}
                            />
                        </div>
                    </div>

                    <button onClick={calculate} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
                        Calculate Total
                    </button>

                    {result && (
                        <div className="space-y-4 mt-6">
                            <div className="bg-secondary/20 p-6 rounded-2xl flex justify-between items-center border border-border/50">
                                <span className="text-muted-foreground font-medium">Net Amount</span>
                                <span className="text-2xl font-bold">{result.net}</span>
                            </div>
                            <div className="bg-secondary/20 p-6 rounded-2xl flex justify-between items-center border border-border/50">
                                <span className="text-muted-foreground font-medium">Total Tax</span>
                                <span className="text-2xl font-bold text-red-500">+{result.tax}</span>
                            </div>
                            <div className="bg-primary/10 p-6 rounded-2xl flex justify-between items-center border border-primary/20">
                                <span className="text-primary font-bold">Gross Total</span>
                                <span className="text-4xl font-extrabold text-primary">{result.gross}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Tax Filing Tools</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <AffiliateCard
                        title="TurboTax"
                        description="Max your refund guaranteed. File your own taxes with confidence."
                        ctaText="File For Free"
                        href="https://turbotax.intuit.com/"
                        badge="Most Popular"
                    />
                    <AffiliateCard
                        title="H&R Block"
                        description="Get every dollar you deserve. File online or with a tax pro."
                        ctaText="Start Filing"
                        href="https://www.hrblock.com/"
                        badge="Expert Help"
                    />
                </div>
            </div>
        </div>
    );
}
