'use client';

import { useState } from 'react';

type Mode = 'sin' | 'cos' | 'tan' | 'asin' | 'acos' | 'atan';

export default function TrigCalculatorClient() {
    const [mode, setMode] = useState<Mode>('cos');
    const [val, setVal] = useState('');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const v = parseFloat(val);
        if (isNaN(v)) {
            setResult(null);
            return;
        }

        let res = 0;
        switch (mode) {
            case 'sin':
                res = Math.sin(v * (Math.PI / 180)); // deg to rad
                break;
            case 'cos':
                res = Math.cos(v * (Math.PI / 180));
                break;
            case 'tan':
                res = Math.tan(v * (Math.PI / 180));
                break;
            case 'asin':
                res = Math.asin(v) * (180 / Math.PI); // rad to deg
                break;
            case 'acos':
                res = Math.acos(v) * (180 / Math.PI);
                break;
            case 'atan':
                res = Math.atan(v) * (180 / Math.PI);
                break;
        }
        setResult(res.toFixed(6));
    };

    const getLabel = () => {
        if (['sin', 'cos', 'tan'].includes(mode)) return 'Angle (Degrees)';
        return 'Value';
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="flex justify-center flex-wrap gap-2 mb-8">
                    {(['sin', 'cos', 'tan', 'asin', 'acos', 'atan'] as Mode[]).map(m => (
                        <button
                            key={m}
                            onClick={() => { setMode(m); setResult(null); }}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${mode === m ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                                }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                <div className="max-w-md mx-auto space-y-6">
                    <div>
                        <label className="text-sm font-semibold mb-2 block">{getLabel()}</label>
                        <input
                            type="number"
                            value={val}
                            onChange={e => setVal(e.target.value)}
                            className="w-full bg-secondary/50 p-4 rounded-xl text-lg outline-none focus:ring-2 ring-primary/20"
                            placeholder={mode.startsWith('a') ? "Enter value (e.g. 0.5)" : "Enter angle (e.g. 45)"}
                        />
                    </div>

                    <button onClick={calculate} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
                        Calculate
                    </button>

                    {result && (
                        <div className="bg-secondary/20 p-6 rounded-2xl text-center border-2 border-dashed border-border mt-6">
                            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Result</div>
                            <div className="text-4xl font-extrabold text-foreground">{result} {mode.startsWith('a') ? '°' : ''}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
