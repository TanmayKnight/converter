'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function OhmsLawCalculator() {
    // V = I * R
    // P = V * I
    const [v, setV] = useState('');
    const [i, setI] = useState('');
    const [r, setR] = useState('');
    const [p, setP] = useState('');

    const calculate = () => {
        const voltage = parseFloat(v);
        const current = parseFloat(i);
        const resistance = parseFloat(r);
        const power = parseFloat(p);

        // Helper to format
        const fmt = (n: number) => n.toFixed(2);

        if (!isNaN(voltage) && !isNaN(current) && isNaN(resistance)) {
            setR(fmt(voltage / current));
            setP(fmt(voltage * current));
        } else if (!isNaN(voltage) && !isNaN(resistance) && isNaN(current)) {
            setI(fmt(voltage / resistance));
            setP(fmt((voltage * voltage) / resistance));
        } else if (!isNaN(current) && !isNaN(resistance) && isNaN(voltage)) {
            setV(fmt(current * resistance));
            setP(fmt(current * current * resistance));
        }
        // Add power permutations if needed, keeping simple for "Kw to Amps" (Power + Voltage inputs usually)
        else if (!isNaN(power) && !isNaN(voltage) && isNaN(current)) {
            setI(fmt(power / voltage)); // Amps = Kw / Volts (adjusted for units, but assuming base units here)
            setR(fmt((voltage * voltage) / power));
        }
    };

    const clear = () => {
        setV(''); setI(''); setR(''); setP('');
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Ohm's Law Calculator</h1>
                <p className="text-muted-foreground">Calculate Voltage, Current, Resistance, and Power.</p>
                <div className="text-xs text-muted-foreground mt-2">Enter any two values to calculate the others.</div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Voltage (V)</label>
                        <input type="number" value={v} onChange={(e) => setV(e.target.value)} className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20" placeholder="Volts" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Current (I)</label>
                        <input type="number" value={i} onChange={(e) => setI(e.target.value)} className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20" placeholder="Amps" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Resistance (R)</label>
                        <input type="number" value={r} onChange={(e) => setR(e.target.value)} className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20" placeholder="Ohms" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Power (P)</label>
                        <input type="number" value={p} onChange={(e) => setP(e.target.value)} className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20" placeholder="Watts" />
                    </div>
                </div>

                <div className="mt-8 flex gap-4 justify-center">
                    <button onClick={calculate} className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">Calculate</button>
                    <button onClick={clear} className="bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium hover:bg-secondary/80 transition-all">Clear</button>
                </div>
            </div>
        </div>
    );
}
