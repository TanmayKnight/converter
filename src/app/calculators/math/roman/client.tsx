'use client';

import { useState } from 'react';

export default function RomanConverterClient() {
    const [input, setInput] = useState('2024');

    // Derived state for Roman calculation
    let calculatedResult = '';
    const val = input.trim().toUpperCase();

    if (val) {
        if (/^\d+$/.test(val)) {
            // Is Number -> To Roman
            const num = parseInt(val, 10);
            if (num > 0 && num < 4000) {
                const lookup: { [key: string]: number } = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
                let roman = '';
                let n = num;
                for (const i in lookup) {
                    while (n >= lookup[i]) {
                        roman += i;
                        n -= lookup[i];
                    }
                }
                calculatedResult = roman;
            } else {
                calculatedResult = "Enter 1-3999";
            }
        } else {
            // Is Roman -> To Number
            const lookup: { [key: string]: number } = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
            let num = 0;
            let valid = true;
            for (let i = 0; i < val.length; i++) {
                if (!lookup[val[i]]) { valid = false; break; }
                const cur = lookup[val[i]];
                const next = lookup[val[i + 1]];
                if (next && cur < next) {
                    num -= cur;
                } else {
                    num += cur;
                }
            }
            if (valid && num > 0) calculatedResult = num.toString();
            else calculatedResult = "Invalid";
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
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
                    {calculatedResult}
                </div>
            </div>
        </div>
    );
}
