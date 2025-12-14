'use client';

import { useState } from 'react';

type Mode = 'perm' | 'comb' | 'fact' | 'avg' | 'prob';

export default function StatsCalculatorClient() {
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

            <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                {mode === 'perm' && (
                    <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-lg font-bold mb-2">Permutation (nPr)</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            <strong>Order MATTERS.</strong> (e.g., Code for a lock).
                            <br />
                            &quot;1-2-3&quot; is DIFFERENT from &quot;3-2-1&quot;.
                        </p>
                        <div className="font-mono bg-background p-3 rounded-lg border text-xs">
                            Formula: n! / (n-r)!
                        </div>
                    </div>
                )}

                {mode === 'comb' && (
                    <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-lg font-bold mb-2">Combination (nCr)</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            <strong>Order DOES NOT Matter.</strong> (e.g., Ingredients in a salad).
                            <br />
                            &quot;Apple & Banana&quot; is the SAME as &quot;Banana & Apple&quot;.
                        </p>
                        <div className="font-mono bg-background p-3 rounded-lg border text-xs">
                            Formula: n! / (r! * (n-r)!)
                        </div>
                    </div>
                )}

                {mode === 'fact' && (
                    <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-lg font-bold mb-2">Factorial (n!)</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Product of all positive integers less than or equal to n.
                            <br />
                            e.g. 5! = 5 × 4 × 3 × 2 × 1 = 120.
                        </p>
                    </div>
                )}

                {mode === 'prob' && (
                    <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-lg font-bold mb-2">Probability (P)</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Likelihood of an event occurring.
                            <br />
                            Range: 0 (Impossible) to 1 (Certain).
                        </p>
                        <div className="font-mono bg-background p-3 rounded-lg border text-xs">
                            Formula: Favorable Outcomes / Total Outcomes
                        </div>
                    </div>
                )}

                {mode === 'avg' && (
                    <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-lg font-bold mb-2">Average (Mean)</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            The sum of all numbers divided by the count of numbers.
                            <br />
                            Useful for finding the central trend of a dataset.
                        </p>
                    </div>
                )}
            </div>
        </div >
    );
}
