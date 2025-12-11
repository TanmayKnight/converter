'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Binary, Calculator, Hash, WholeWord } from 'lucide-react';

export default function BaseConverter() {
    const [input, setInput] = useState('10');
    const [fromBase, setFromBase] = useState(10);
    const [toBase, setToBase] = useState(2);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const bases = [
        { value: 2, label: 'Binary (2)' },
        { value: 8, label: 'Octal (8)' },
        { value: 10, label: 'Decimal (10)' },
        { value: 16, label: 'Hexadecimal (16)' },
        { value: 3, label: 'Base 3' },
        { value: 36, label: 'Base 36 (Max)' },
    ];

    useEffect(() => {
        try {
            setError('');
            if (!input) {
                setResult('');
                return;
            }

            // Parse input
            const decimalValue = parseInt(input, fromBase);
            if (isNaN(decimalValue)) {
                throw new Error('Invalid input');
            }

            // Convert to target
            const converted = decimalValue.toString(toBase).toUpperCase();
            setResult(converted);
        } catch (e) {
            setResult('-');
            setError('Invalid number for selected base');
        }
    }, [input, fromBase, toBase]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Number System Converter</h1>
                <p className="text-muted-foreground">Convert numbers between Binary, Decimal, Octal, and Hexadecimal.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Input */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-muted-foreground">From Base</label>
                        <select
                            value={fromBase}
                            onChange={(e) => setFromBase(Number(e.target.value))}
                            className="w-full bg-secondary/50 border border-transparent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {bases.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                        </select>

                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full bg-background border-2 border-primary/20 focus:border-primary rounded-xl p-4 text-2xl font-mono outline-none transition-all uppercase"
                                placeholder="Enter number..."
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>

                    {/* Output */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-primary">To Base</label>
                        <select
                            value={toBase}
                            onChange={(e) => setToBase(Number(e.target.value))}
                            className="w-full bg-secondary/50 border border-transparent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {bases.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                        </select>

                        <div className="relative bg-secondary/30 rounded-xl p-4 min-h-[80px] flex items-center justify-center border border-border">
                            <div className="text-3xl font-mono font-bold text-primary break-all">
                                {result}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="mt-8 pt-8 border-t border-border/50">
                    <h3 className="text-sm font-semibold mb-4 text-muted-foreground">Quick Bases</h3>
                    <div className="flex gap-2 flex-wrap">
                        <button onClick={() => { setFromBase(10); setToBase(2); }} className="px-3 py-1 bg-secondary rounded-full text-xs hover:bg-primary hover:text-white transition-colors">Decimal to Binary</button>
                        <button onClick={() => { setFromBase(2); setToBase(10); }} className="px-3 py-1 bg-secondary rounded-full text-xs hover:bg-primary hover:text-white transition-colors">Binary to Decimal</button>
                        <button onClick={() => { setFromBase(16); setToBase(10); }} className="px-3 py-1 bg-secondary rounded-full text-xs hover:bg-primary hover:text-white transition-colors">Hex to Decimal</button>
                        <button onClick={() => { setFromBase(10); setToBase(16); }} className="px-3 py-1 bg-secondary rounded-full text-xs hover:bg-primary hover:text-white transition-colors">Decimal to Hex</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
