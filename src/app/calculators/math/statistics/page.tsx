'use client';

import { useState } from 'react';
import Link from 'next/link';

type Mode = 'perm' | 'comb' | 'fact' | 'avg' | 'prob';

export default function StatsCalculator() {
    const [mode, setMode] = useState<Mode>('perm');
    const [val1, setVal1] = useState(''); // n or list
    const [val2, setVal2] = useState(''); // r
    const [result, setResult] = useState<string | null>(null);

    const factorial = (n: number): number => {
        if (n < 0) return -1;
        if (n === 0) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    };

    const calculate = () => {
        let res = '';

        if (mode === 'avg') {
            const nums = val1.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
            if (nums.length === 0) return;
            const sum = nums.reduce((a, b) => a + b, 0);
            res = (sum / nums.length).toFixed(4);
        } else {
            const n = parseInt(val1);
            const r = parseInt(val2);

            switch (mode) {
                case 'fact':
                    if (!isNaN(n)) res = factorial(n).toString();
                    break;
                case 'perm': // nPr = n! / (n-r)!
                    if (!isNaN(n) && !isNaN(r) && n >= r) {
                        res = (factorial(n) / factorial(n - r)).toString();
                    }
                    break;
                case 'comb': // nCr = n! / (r! * (n-r)!)
                    if (!isNaN(n) && !isNaN(r) && n >= r) {
                        res = (factorial(n) / (factorial(r) * factorial(n - r))).toString();
                    }
                    break;
                case 'prob': // P(A) = r/n
                    if (!isNaN(n) && !isNaN(r)) {
                        res = (r / n).toFixed(4); // r events / n total
                    }
                    break;
            }
        }
        setResult(res);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Statistics Calculator</h1>
                <p className="text-muted-foreground">Permutations, Combinations, Factorials & More.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar justify-center">
                    {(['perm', 'comb', 'fact', 'prob', 'avg'] as Mode[]).map(m => (
                        <button
                            key={m}
                            onClick={() => { setMode(m); setVal1(''); setVal2(''); setResult(null); }}
                            className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${mode === m ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                                }`}
                        >
                            {m === 'perm' ? 'Permutation (nPr)' : m === 'comb' ? 'Combination (nCr)' : m === 'fact' ? 'Factorial (!)' : m === 'prob' ? 'Probability' : 'Average'}
                        </button>
                    ))}
                </div>

                <div className="max-w-md mx-auto space-y-6">
                    {mode === 'avg' ? (
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Numbers (comma separated)</label>
                            <input
                                type="text"
                                value={val1}
                                onChange={e => setVal1(e.target.value)}
                                className="w-full bg-secondary/50 p-4 rounded-xl text-lg outline-none focus:ring-2 ring-primary/20"
                                placeholder="10, 20, 30..."
                            />
                        </div>
                    ) : (
                        <>
                            <div>
                                <label className="text-sm font-semibold mb-2 block">{mode === 'prob' ? 'Total Outcomes (n)' : 'Total Items (n)'}</label>
                                <input
                                    type="number"
                                    value={val1}
                                    onChange={e => setVal1(e.target.value)}
                                    className="w-full bg-secondary/50 p-4 rounded-xl text-lg outline-none focus:ring-2 ring-primary/20"
                                    placeholder="e.g. 52"
                                />
                            </div>
                            {mode !== 'fact' && (
                                <div>
                                    <label className="text-sm font-semibold mb-2 block">{mode === 'prob' ? 'Favorable Outcomes (r)' : 'Selected Items (r)'}</label>
                                    <input
                                        type="number"
                                        value={val2}
                                        onChange={e => setVal2(e.target.value)}
                                        className="w-full bg-secondary/50 p-4 rounded-xl text-lg outline-none focus:ring-2 ring-primary/20"
                                        placeholder="e.g. 5"
                                    />
                                </div>
                            )}
                        </>
                    )}

                    <button onClick={calculate} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
                        Calculate result
                    </button>

                    {result && (
                        <div className="bg-secondary/20 p-6 rounded-2xl text-center border-2 border-dashed border-border mt-6">
                            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Calculated Result</div>
                            <div className="text-4xl font-extrabold text-foreground">{result}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
