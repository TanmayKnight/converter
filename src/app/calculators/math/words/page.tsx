'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WordsConverter() {
    const [number, setNumber] = useState<string>('12345');

    const toWords = (n: any): string => {
        const num = parseInt(n, 10);
        if (isNaN(num)) return '';
        if (num === 0) return 'Zero';

        const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        // Simple implementation for < 1 Million for demo, assuming simple needs based on screenshot. 
        // Or I can write a recursive one.
        const regex = /^(\d{1,2})(\d{2})$/;

        // Let's use a quick recursive function
        const convert = (num: number): string => {
            if ((num = num.valueOf()) < 20) return a[num];
            if (num < 100) return b[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + a[num % 10] : '');
            if (num < 1000) return a[Math.floor(num / 100)] + 'Hundred ' + (num % 100 !== 0 ? convert(num % 100) : '');
            if (num < 1000000) return convert(Math.floor(num / 1000)) + 'Thousand ' + (num % 1000 !== 0 ? convert(num % 1000) : '');
            if (num < 1000000000) return convert(Math.floor(num / 1000000)) + 'Million ' + (num % 1000000 !== 0 ? convert(num % 1000000) : '');
            return 'Number too large';
        };

        return convert(num);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Number to Words</h1>
                <p className="text-muted-foreground">Convert numerical digits into written words.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm text-center">
                <input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full max-w-md mx-auto block bg-background border-2 border-primary/20 focus:border-primary rounded-xl p-4 text-3xl font-mono text-center outline-none transition-all mb-8"
                    placeholder="123"
                />

                <div className="text-sm text-muted-foreground mb-4 font-semibold tracking-wider uppercase">Written Form</div>
                <div className="text-3xl font-medium text-primary capitalize leading-relaxed">
                    {toWords(number) || '...'}
                </div>
            </div>
        </div>
    );
}
