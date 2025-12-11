'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';

export default function TipCalculator() {
    const [bill, setBill] = useState('');
    const [tip, setTip] = useState(15);
    const [people, setPeople] = useState(1);

    const [perPerson, setPerPerson] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const b = parseFloat(bill);
        if (!isNaN(b)) {
            const tipVal = b * (tip / 100);
            const tot = b + tipVal;
            setTotal(tot);
            setPerPerson(tot / people);
        } else {
            setTotal(0);
            setPerPerson(0);
        }
    }, [bill, tip, people]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">

            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Tip Splitter</h1>
                    <p className="text-muted-foreground">Calculate tip and split the bill.</p>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-lg">
                    {/* Bill Input */}
                    <div className="mb-6">
                        <label className="text-sm font-bold text-muted-foreground mb-2 block">Bill Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">$</span>
                            <input
                                type="number"
                                value={bill}
                                onChange={e => setBill(e.target.value)}
                                className="w-full bg-secondary/30 rounded-xl p-4 pl-8 text-2xl font-bold outline-none focus:ring-2 ring-primary/20 text-right placeholder:opacity-20"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {/* Tip Select */}
                    <div className="mb-6">
                        <label className="text-sm font-bold text-muted-foreground mb-3 block">Select Tip %</label>
                        <div className="grid grid-cols-4 gap-2 mb-3">
                            {[10, 15, 20, 25].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTip(t)}
                                    className={`py-2 rounded-lg font-bold transition-all ${tip === t ? 'bg-primary text-white shadow-lg' : 'bg-secondary hover:bg-secondary/80'}`}
                                >
                                    {t}%
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="range" min="0" max="50" value={tip}
                                onChange={e => setTip(Number(e.target.value))}
                                className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="font-bold text-primary w-12 text-right">{tip}%</span>
                        </div>
                    </div>

                    {/* People */}
                    <div className="mb-8">
                        <label className="text-sm font-bold text-muted-foreground mb-2 block">Number of People</label>
                        <div className="flex items-center justify-between bg-secondary/30 p-2 rounded-xl">
                            <button onClick={() => setPeople(Math.max(1, people - 1))} className="w-10 h-10 rounded-lg bg-background shadow flex items-center justify-center font-bold text-xl hover:text-primary transition-colors">-</button>
                            <div className="flex items-center gap-2 font-bold text-lg">
                                <User className="w-5 h-5 text-muted-foreground" /> {people}
                            </div>
                            <button onClick={() => setPeople(people + 1)} className="w-10 h-10 rounded-lg bg-background shadow flex items-center justify-center font-bold text-xl hover:text-primary transition-colors">+</button>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="bg-primary/5 rounded-2xl p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground font-medium">Tip Amount</span>
                            <span className="font-bold text-lg text-primary">${((parseFloat(bill) || 0) * (tip / 100)).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground font-medium">Total Bill</span>
                            <span className="font-bold text-lg">${total.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-border/50 my-2"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground font-bold">Total per person</span>
                            <span className="font-extrabold text-4xl text-primary">${perPerson.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
