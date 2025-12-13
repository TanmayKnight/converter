'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PercentageCalculator() {
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [res1, setRes1] = useState<string>(''); // What is X% of Y?
    const [res2, setRes2] = useState<string>(''); // X is what % of Y?
    const [res3, setRes3] = useState<string>(''); // Decrease/Increase

    const calculate = (e: any) => {
        const v1 = parseFloat(val1);
        const v2 = parseFloat(val2);

        if (!isNaN(v1) && !isNaN(v2)) {
            // 1. What is X% of Y?
            setRes1(((v1 / 100) * v2).toFixed(2));
            // 2. X is what % of Y?
            if (v2 !== 0) setRes2(((v1 / v2) * 100).toFixed(2));
            // 3. Increase/Decrease
            setRes3((((v2 - v1) / v1) * 100).toFixed(2));
        } else {
            setRes1(''); setRes2(''); setRes3('');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Percentage Calculator</h1>
                <p className="text-muted-foreground">Calculate percentages, increases, and decreases easily.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Input Panel */}
                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                    <h3 className="font-bold mb-4 text-lg">Enter Values</h3>
                    <div className="space-y-4">
                        <div className="flex gap-4 items-center">
                            <span className="w-8 font-bold text-muted-foreground">A</span>
                            <input type="number" value={val1} onChange={e => { setVal1(e.target.value); }} placeholder="Value A" className="flex-1 bg-secondary/50 p-3 rounded-xl outline-none" />
                        </div>
                        <div className="flex gap-4 items-center">
                            <span className="w-8 font-bold text-muted-foreground">B</span>
                            <input type="number" value={val2} onChange={e => { setVal2(e.target.value); }} placeholder="Value B" className="flex-1 bg-secondary/50 p-3 rounded-xl outline-none" />
                        </div>
                        <button onClick={calculate} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold mt-4">Calculate All</button>
                    </div>
                </div>

                {/* Results Panel */}
                <div className="space-y-4">
                    <div className="bg-secondary/10 border border-border/50 rounded-2xl p-6">
                        <div className="text-sm text-muted-foreground mb-1">What is <span className="font-bold text-foreground">{val1 || 'A'}%</span> of <span className="font-bold text-foreground">{val2 || 'B'}</span>?</div>
                        <div className="text-3xl font-bold text-primary">{res1 || '-'}</div>
                    </div>
                    <div className="bg-secondary/10 border border-border/50 rounded-2xl p-6">
                        <div className="text-sm text-muted-foreground mb-1"><span className="font-bold text-foreground">{val1 || 'A'}</span> is what % of <span className="font-bold text-foreground">{val2 || 'B'}</span>?</div>
                        <div className="text-3xl font-bold text-blue-600">{res2 || '-'}<span className="text-lg">%</span></div>
                    </div>
                    <div className="bg-secondary/10 border border-border/50 rounded-2xl p-6">
                        <div className="text-sm text-muted-foreground mb-1">Change from <span className="font-bold text-foreground">{val1 || 'A'}</span> to <span className="font-bold text-foreground">{val2 || 'B'}</span></div>
                        <div className={`text-3xl font-bold ${parseFloat(res3) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {parseFloat(res3) > 0 ? '+' : ''}{res3 || '-'}<span className="text-lg">%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEO Content */}
            <div className="mt-16 prose prose-neutral dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>The Ultimate Guide to Percentages in Real Life</h2>
                <p>
                    Percentages are everywhere. From the "30% OFF" sale at the mall to the 20% tip at dinner, understanding how to calculate them quickly is a superpower.
                    <strong>UnitMaster</strong> makes the complex math simple, but learning the tricks can help you do it in your head.
                </p>

                <h3>Mental Math Tricks</h3>
                <p>
                    Want to impress your friends? Here is how to calculate percentages instantly without a calculator:
                </p>
                <ul>
                    <li><strong>The 10% Rule</strong>: To find 10% of any number, just move the decimal point one spot to the left. (10% of $50.00 is $5.00).</li>
                    <li><strong>The 20% Tip</strong>: Find 10% and verify double it. (Meal is $40 &rarr; 10% is $4 &rarr; Tip is $8).</li>
                    <li><strong>The Swap Trick</strong>: <br /><strong>x% of y</strong> is exactly the same as <strong>y% of x</strong>.<br />
                        <em>Example:</em> You need to find 8% of 25. That sounds hard.<br />
                        <em>Swap it:</em> Find 25% of 8. That's easy (it's one-quarter). The answer is 2.
                    </li>
                </ul>

                <h3>Visualizing Percentage Change</h3>
                <p>
                    One of the most common confusion points is the difference between "Percentage Of" and "Percentage Change".
                </p>
                <ul>
                    <li><strong>Percentage Of</strong> tells you a portion. (50 is 50% of 100).</li>
                    <li><strong>Percentage Change</strong> tells you growth or shrinkage. If a stock goes from $100 to $150, that is a 50% increase. If it drops back to $100, that is a 33.3% decrease. The math is not symmetrical!</li>
                </ul>

                <h3>The Formula</h3>
                <p>
                    For those who like algebra, the universal formula for percentage increase/decrease is:
                </p>
                <blockquote className="not-italic font-mono bg-card p-4 rounded-lg">
                    (New Value - Old Value) / Old Value × 100
                </blockquote>
                <p>
                    If the result is positive, it's an increase. If negative, it's a decrease.
                </p>
            </div>
        </div>
    );
}
