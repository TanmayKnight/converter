'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RomanConverter() {
    const [input, setInput] = useState('2024');
    const [result, setResult] = useState('');

    const toRoman = (num: number): string => {
        if (num < 1 || num > 3999) return 'Enter 1-3999';
        const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        let roman = '';
        for (let i = 0; i < val.length; i++) {
            while (num >= val[i]) {
                num -= val[i];
                roman += syms[i];
            }
        }
        return roman;
    };

    const fromRoman = (str: string): number | string => {
        const roman: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let sum = 0;
        for (let i = 0; i < str.length; i++) {
            const cur = roman[str[i]];
            const next = roman[str[i + 1]];
            if (!cur) return 'Invalid Character';
            if (next && cur < next) {
                sum -= cur;
            } else {
                sum += cur;
            }
        }
        return sum || 0; // Handle NaN/Error
    };

    useEffect(() => {
        const val = input.trim().toUpperCase();
        if (!val) { setResult(''); return; }

        if (/^\d+$/.test(val)) {
            // Is Number -> To Roman
            setResult(toRoman(parseInt(val, 10)));
        } else {
            // Assume Roman -> To Number
            const num = fromRoman(val);
            setResult(num.toString());
        }
    }, [input]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Roman Numeral Converter</h1>
                <p className="text-muted-foreground">Auto-detects Number to Roman OR Roman to Number.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm text-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full max-w-md mx-auto block bg-background border-2 border-primary/20 focus:border-primary rounded-xl p-4 text-3xl font-mono text-center outline-none transition-all uppercase mb-8"
                    placeholder="Enter eg. 2024 or MMXXIV"
                />

                <div className="text-sm text-muted-foreground mb-2">CONVERTED RESULT</div>
                <div className="text-5xl font-extrabold text-primary break-all">
                    {result}
                </div>
            </div>
        </div>
    );
}
