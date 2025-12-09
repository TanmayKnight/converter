'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MassForceCalculator() {
    // F = m * a (using g = 9.80665)
    // 1 kg = 9.80665 Newtons = 0.00980665 Kilonewtons

    const [mass, setMass] = useState('1'); // kg
    const [force, setForce] = useState('0.0098'); // kN

    const g = 9.80665;

    const handleMass = (val: string) => {
        setMass(val);
        const m = parseFloat(val);
        if (!isNaN(m)) {
            // kg to kN: kg * g / 1000
            setForce(((m * g) / 1000).toFixed(6).replace(/\.?0+$/, ''));
        }
    };

    const handleForce = (val: string) => {
        setForce(val);
        const f = parseFloat(val);
        if (!isNaN(f)) {
            // kN to kg: (f * 1000) / g
            setMass(((f * 1000) / g).toFixed(4).replace(/\.?0+$/, ''));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Mass ↔ Force (Kg to Kn)</h1>
                <p className="text-muted-foreground">Convert Mass (Kilograms) to Force (Kilonewtons) using standard Earth gravity.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-10 shadow-lg max-w-xl mx-auto">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-primary">Mass (Kilograms - kg)</label>
                        <input
                            type="number"
                            value={mass}
                            onChange={(e) => handleMass(e.target.value)}
                            className="w-full bg-secondary/50 border-2 border-transparent focus:border-primary rounded-xl p-4 text-2xl font-bold outline-none transition-all"
                        />
                    </div>

                    <div className="text-center text-muted-foreground my-2">⇅</div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-primary">Force (Kilonewtons - kN)</label>
                        <input
                            type="number"
                            value={force}
                            onChange={(e) => handleForce(e.target.value)}
                            className="w-full bg-secondary/50 border-2 border-transparent focus:border-primary rounded-xl p-4 text-2xl font-bold outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-muted-foreground">
                    Assumes g = 9.80665 m/s²
                </div>
            </div>
        </div>
    );
}
