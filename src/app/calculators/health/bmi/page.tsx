'use client';

import { useState, useEffect } from 'react';
import { User, Scale, Activity } from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx'; // Assuming clsx is installed logic

export default function BMICalculator() {
    const [unitType, setUnitType] = useState<'metric' | 'imperial'>('metric');

    // Metric
    const [heightCm, setHeightCm] = useState<string>('175');
    const [weightKg, setWeightKg] = useState<string>('70');

    // Imperial
    const [heightFt, setHeightFt] = useState<string>('5');
    const [heightIn, setHeightIn] = useState<string>('9');
    const [weightLbs, setWeightLbs] = useState<string>('155');

    const [bmi, setBmi] = useState<number>(0);
    const [category, setCategory] = useState<string>('');

    useEffect(() => {
        let h = 0; // meters
        let w = 0; // kg

        if (unitType === 'metric') {
            h = parseFloat(heightCm) / 100;
            w = parseFloat(weightKg);
        } else {
            // Imperial
            const ft = parseFloat(heightFt || '0');
            const inc = parseFloat(heightIn || '0');
            const lbs = parseFloat(weightLbs || '0');

            const totalInches = (ft * 12) + inc;
            h = totalInches * 0.0254; // in to m
            w = lbs * 0.453592; // lbs to kg
        }

        if (h > 0 && w > 0) {
            const val = w / (h * h);
            setBmi(val);

            if (val < 18.5) setCategory('Underweight');
            else if (val < 25) setCategory('Normal weight');
            else if (val < 30) setCategory('Overweight');
            else setCategory('Obese');
        } else {
            setBmi(0);
            setCategory('');
        }
    }, [unitType, heightCm, weightKg, heightFt, heightIn, weightLbs]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
                <p className="text-muted-foreground">Calculate your Body Mass Index (BMI) to understand your health status.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                    {/* Unit Toggle */}
                    <div className="flex bg-secondary rounded-lg p-1 mb-6">
                        <button
                            onClick={() => setUnitType('metric')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${unitType === 'metric' ? 'bg-background shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Metric (cm, kg)
                        </button>
                        <button
                            onClick={() => setUnitType('imperial')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${unitType === 'imperial' ? 'bg-background shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Imperial (ft, lbs)
                        </button>
                    </div>

                    <div className="space-y-6">
                        {unitType === 'metric' ? (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Height (cm)</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-3 pl-10 pr-4 outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Weight (kg)</label>
                                    <div className="relative">
                                        <Scale className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-3 pl-10 pr-4 outline-none" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Height</label>
                                    <div className="flex gap-4">
                                        <div className="relative flex-1">
                                            <input type="number" placeholder="ft" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-3 px-4 outline-none" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">ft</span>
                                        </div>
                                        <div className="relative flex-1">
                                            <input type="number" placeholder="in" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-3 px-4 outline-none" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">in</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Weight (lbs)</label>
                                    <div className="relative">
                                        <Scale className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-3 pl-10 pr-4 outline-none" />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-3xl p-6 flex flex-col justify-center text-center">
                    <h2 className="text-lg font-semibold text-pink-600 mb-8 uppercase tracking-wider">Your BMI Score</h2>

                    <div className="text-6xl font-extrabold text-foreground mb-4">
                        {bmi.toFixed(1)}
                    </div>

                    <div className={clsx(
                        "inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide",
                        category === 'Normal weight' ? "bg-green-100 text-green-700" :
                            category === 'Overweight' ? "bg-yellow-100 text-yellow-700" :
                                category === 'Underweight' ? "bg-blue-100 text-blue-700" :
                                    "bg-red-100 text-red-700"
                    )}>
                        {category || '---'}
                    </div>

                    <div className="mt-8 pt-8 border-t border-pink-500/20 text-left text-sm text-muted-foreground">
                        <div className="flex justify-between py-1"><span>Underweight</span><span>&lt; 18.5</span></div>
                        <div className="flex justify-between py-1 font-bold text-foreground"><span>Normal</span><span>18.5 - 25</span></div>
                        <div className="flex justify-between py-1"><span>Overweight</span><span>25 - 30</span></div>
                        <div className="flex justify-between py-1"><span>Obese</span><span>&gt; 30</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
