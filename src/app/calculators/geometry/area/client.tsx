'use client';

import { useState } from 'react';

type Shape = 'rectangle' | 'triangle' | 'circle' | 'square' | 'trapezoid' | 'parallelogram' | 'rhombus' | 'sector';

export default function AreaCalculatorClient() {
    const [shape, setShape] = useState<Shape>('rectangle');
    const [values, setValues] = useState({ w: '', h: '', r: '', b: '', angle: '' });
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const { w, h, r, b, angle } = values;
        const width = parseFloat(w);
        const height = parseFloat(h);
        const radius = parseFloat(r);
        const base = parseFloat(b);
        const theta = parseFloat(angle);

        let area = 0;

        switch (shape) {
            case 'rectangle':
                if (width && height) area = width * height;
                break;
            case 'square':
                if (width) area = width * width;
                break;
            case 'triangle':
                if (width && height) area = 0.5 * width * height;
                break;
            case 'circle':
                if (radius) area = Math.PI * radius * radius;
                break;
            case 'trapezoid':
                if (width && base && height) area = ((width + base) / 2) * height; // w=top, b=bottom
                break;
            case 'parallelogram':
                if (base && height) area = base * height;
                break;
            case 'rhombus':
                if (width && height) area = 0.5 * width * height; // diagonals
                break;
            case 'sector':
                if (radius && theta) area = 0.5 * radius * radius * (theta * (Math.PI / 180)); // degrees
                break;
        }
        setResult(parseFloat(area.toFixed(4)));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
                    {(['rectangle', 'square', 'triangle', 'circle', 'trapezoid', 'parallelogram', 'rhombus', 'sector'] as Shape[]).map(s => (
                        <button
                            key={s}
                            onClick={() => { setShape(s); setValues({ w: '', h: '', r: '', b: '', angle: '' }); setResult(null); }}
                            className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${shape === s ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        {(shape === 'rectangle' || shape === 'triangle' || shape === 'trapezoid' || shape === 'parallelogram') && (
                            <div>
                                <label className="text-sm font-semibold mb-1 block">{shape === 'trapezoid' ? 'Top Base' : 'Width / Base'}</label>
                                <input
                                    type="number"
                                    value={values.w}
                                    onChange={e => setValues({ ...values, w: e.target.value })}
                                    className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20"
                                />
                            </div>
                        )}
                        {(shape === 'trapezoid') && (
                            <div>
                                <label className="text-sm font-semibold mb-1 block">Bottom Base</label>
                                <input
                                    type="number"
                                    value={values.b}
                                    onChange={e => setValues({ ...values, b: e.target.value })}
                                    className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20"
                                />
                            </div>
                        )}
                        {(shape === 'rhombus') && (
                            <>
                                <div>
                                    <label className="text-sm font-semibold mb-1 block">Diagonal 1</label>
                                    <input
                                        type="number"
                                        value={values.w}
                                        onChange={e => setValues({ ...values, w: e.target.value })}
                                        className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold mb-1 block">Diagonal 2</label>
                                    <input
                                        type="number"
                                        value={values.h}
                                        onChange={e => setValues({ ...values, h: e.target.value })}
                                        className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20"
                                    />
                                </div>
                            </>
                        )}
                        {(shape === 'rectangle' || shape === 'triangle' || shape === 'trapezoid' || shape === 'parallelogram') && (
                            <div>
                                <label className="text-sm font-semibold mb-1 block">Height</label>
                                <input
                                    type="number"
                                    value={values.h}
                                    onChange={e => setValues({ ...values, h: e.target.value })}
                                    className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20"
                                />
                            </div>
                        )}
                        {(shape === 'square') && (
                            <div>
                                <label className="text-sm font-semibold mb-1 block">Side Length</label>
                                <input
                                    type="number"
                                    value={values.w}
                                    onChange={e => setValues({ ...values, w: e.target.value })}
                                    className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20"
                                />
                            </div>
                        )}
                        {(shape === 'circle' || shape === 'sector') && (
                            <div>
                                <label className="text-sm font-semibold mb-1 block">Radius</label>
                                <input
                                    type="number"
                                    value={values.r}
                                    onChange={e => setValues({ ...values, r: e.target.value })}
                                    className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20"
                                />
                            </div>
                        )}
                        {(shape === 'sector') && (
                            <div>
                                <label className="text-sm font-semibold mb-1 block">Angle (Degrees)</label>
                                <input
                                    type="number"
                                    value={values.angle}
                                    onChange={e => setValues({ ...values, angle: e.target.value })}
                                    className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20"
                                />
                            </div>
                        )}

                        <button onClick={calculate} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold mt-4 hover:opacity-90 transition-opacity">
                            Calculate Area
                        </button>
                    </div>

                    <div className="bg-secondary/20 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[200px] text-center border-2 border-dashed border-border">
                        {result !== null ? (
                            <>
                                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Calculated Area</div>
                                <div className="text-5xl font-extrabold text-primary">{result}</div>
                                <div className="text-sm text-muted-foreground mt-2">sq. units</div>
                            </>
                        ) : (
                            <div className="text-muted-foreground opacity-50">Enter dimensions to see result</div>
                        )}
                    </div>
                </div>

                <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
                    {(shape === 'rectangle' || shape === 'square') && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">{shape === 'square' ? 'Square' : 'Rectangle'} Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                {shape === 'square' ? (
                                    <>Area = Side × Side = Side²</>
                                ) : (
                                    <>Area = Width × Height</>
                                )}
                            </p>
                        </div>
                    )}

                    {shape === 'triangle' && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">Triangle Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                Area = ½ × Base × Height
                                <br />
                                <em>(Note: Height is the perpendicular distance from base to opposite vertex)</em>
                            </p>
                        </div>
                    )}

                    {shape === 'circle' && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">Circle Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                Area = π × Radius²
                                <br />
                                (π ≈ 3.14159)
                            </p>
                        </div>
                    )}

                    {shape === 'trapezoid' && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">Trapezoid Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                Area = ½ × (Top Base + Bottom Base) × Height
                            </p>
                        </div>
                    )}

                    {shape === 'parallelogram' && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">Parallelogram Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                Area = Base × Height
                            </p>
                        </div>
                    )}

                    {shape === 'rhombus' && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">Rhombus Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                Area = ½ × Diagonal₁ × Diagonal₂
                            </p>
                        </div>
                    )}

                    {shape === 'sector' && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">Sector Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                Area = ½ × Radius² × θ (in radians)
                                <br />
                                Or: (θ/360) × π × Radius² (if θ is degrees)
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
