'use client';

import { useState } from 'react';
import Link from 'next/link';

type Mode = 'sqrt' | 'pow' | 'log2' | 'log10' | 'ln' | 'antilog';

export default function AlgebraCalculator() {
    const [mode, setMode] = useState<Mode>('sqrt');
    const [val1, setVal1] = useState(''); // Base or number
    const [val2, setVal2] = useState(''); // Exponent
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const v1 = parseFloat(val1);
        const v2 = parseFloat(val2);
        let res = 0;

        if (isNaN(v1)) return;

        switch (mode) {
            case 'sqrt':
                res = Math.sqrt(v1);
                break;
            case 'pow':
                if (!isNaN(v2)) res = Math.pow(v1, v2);
                break;
            case 'log2':
                res = Math.log2(v1);
                break;
            case 'log10':
                res = Math.log10(v1);
                break;
            case 'ln':
                res = Math.log(v1);
                break;
            case 'antilog':
                // Antilog base 10 usually, so 10^x
                res = Math.pow(10, v1);
                break;
        }
        setResult(res.toFixed(6));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Algebra Calculator</h1>
                <p className="text-muted-foreground">Roots, Exponents, and Logarithms.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar justify-center">
                    {(['sqrt', 'pow', 'log2', 'log10', 'ln', 'antilog'] as Mode[]).map(m => (
                        <button
                            key={m}
                            onClick={() => { setMode(m); setVal1(''); setVal2(''); setResult(null); }}
                            className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${mode === m ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                                }`}
                        >
                            {m === 'sqrt' ? '√ Square Root' : m === 'pow' ? 'x^y Power' : m === 'antilog' ? 'Antilog' : m}
                        </button>
                    ))}
                </div>

                <div className="max-w-md mx-auto space-y-6">
                    <div>
                        <label className="text-sm font-semibold mb-2 block">{mode === 'pow' ? 'Base (x)' : 'Number'}</label>
                        <input
                            type="number"
                            value={val1}
                            onChange={e => setVal1(e.target.value)}
                            className="w-full bg-secondary/50 p-4 rounded-xl text-lg outline-none focus:ring-2 ring-primary/20"
                        />
                    </div>

                    {mode === 'pow' && (
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Exponent (y)</label>
                            <input
                                type="number"
                                value={val2}
                                onChange={e => setVal2(e.target.value)}
                                className="w-full bg-secondary/50 p-4 rounded-xl text-lg outline-none focus:ring-2 ring-primary/20"
                            />
                        </div>
                    )}

                    <button onClick={calculate} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
                        Calculate
                    </button>

                    {result && (
                        <div className="bg-secondary/20 p-6 rounded-2xl text-center border-2 border-dashed border-border mt-6">
                            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Result</div>
                            <div className="text-4xl font-extrabold text-foreground">{result}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
