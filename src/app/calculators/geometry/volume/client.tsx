'use client';

import { useState } from 'react';

type Shape = 'cube' | 'cylinder' | 'sphere' | 'cone' | 'pyramid' | 'cuboid' | 'prism' | 'hemisphere';

export default function VolumeCalculatorClient() {
    const [shape, setShape] = useState<Shape>('cube');
    const [values, setValues] = useState({ r: '', h: '', w: '', l: '' });
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const { r, h, w, l } = values;
        const radius = parseFloat(r);
        const height = parseFloat(h);
        const width = parseFloat(w);
        const length = parseFloat(l);

        let vol = 0;

        switch (shape) {
            case 'cube':
                if (width) vol = Math.pow(width, 3);
                break;
            case 'cylinder':
                if (radius && height) vol = Math.PI * Math.pow(radius, 2) * height;
                break;
            case 'sphere':
                if (radius) vol = (4 / 3) * Math.PI * Math.pow(radius, 3);
                break;
            case 'cone':
                if (radius && height) vol = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
                break;
            case 'pyramid':
                // Rectangular pyramid
                if (length && width && height) vol = (length * width * height) / 3;
                break;
            case 'cuboid':
                if (length && width && height) vol = length * width * height;
                break;
            case 'prism':
                // Triangular prism: 0.5 * b * h_triangle * L
                // Reuse w = base of triangle, h = height of triangle, l = Length of prism
                if (width && height && length) vol = 0.5 * width * height * length;
                break;
            case 'hemisphere':
                if (radius) vol = (2 / 3) * Math.PI * Math.pow(radius, 3);
                break;
        }
        setResult(parseFloat(vol.toFixed(4)));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
                    {(['cube', 'cuboid', 'cylinder', 'sphere', 'cone', 'pyramid', 'prism', 'hemisphere'] as Shape[]).map(s => (
                        <button
                            key={s}
                            onClick={() => { setShape(s); setValues({ r: '', h: '', w: '', l: '' }); setResult(null); }}
                            className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${shape === s ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        {(shape === 'cube') && (
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
                        {(shape === 'cylinder' || shape === 'cone' || shape === 'sphere' || shape === 'hemisphere') && (
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
                        {(shape === 'cylinder' || shape === 'cone' || shape === 'pyramid' || shape === 'cuboid') && (
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
                        {(shape === 'prism') && (
                            <div>
                                <label className="text-sm font-semibold mb-1 block">Mantle Height (Triangle)</label>
                                <input
                                    type="number"
                                    value={values.h}
                                    onChange={e => setValues({ ...values, h: e.target.value })}
                                    className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20"
                                />
                            </div>
                        )}

                        {(shape === 'pyramid' || shape === 'cuboid' || shape === 'prism') && (
                            <>
                                <div>
                                    <label className="text-sm font-semibold mb-1 block">{shape === 'prism' ? 'Triangle Base' : 'Length'}</label>
                                    <input
                                        type="number"
                                        value={values.w} // Using w for width/base
                                        onChange={e => setValues({ ...values, w: e.target.value })}
                                        className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold mb-1 block">{shape === 'prism' ? 'Prism Length' : 'Width'}</label>
                                    <input
                                        type="number"
                                        value={values.l}
                                        onChange={e => setValues({ ...values, l: e.target.value })}
                                        className="w-full bg-secondary/50 p-3 rounded-xl outline-none focus:ring-2 ring-primary/20"
                                    />
                                </div>
                            </>
                        )}

                        <button onClick={calculate} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold mt-4 hover:opacity-90 transition-opacity">
                            Calculate Volume
                        </button>
                    </div>

                    <div className="bg-secondary/20 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[200px] text-center border-2 border-dashed border-border">
                        {result !== null ? (
                            <>
                                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Calculated Volume</div>
                                <div className="text-5xl font-extrabold text-primary">{result}</div>
                                <div className="text-sm text-muted-foreground mt-2">cubic units</div>
                            </>
                        ) : (
                            <div className="text-muted-foreground opacity-50">Enter dimensions to see result</div>
                        )}
                    </div>
                </div>

                <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
                    {(shape === 'cube' || shape === 'cuboid') && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">{shape === 'cube' ? 'Cube' : 'Cuboid'} Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                {shape === 'cube' ? (
                                    <>Volume = Side³</>
                                ) : (
                                    <>Volume = Length × Width × Height</>
                                )}
                            </p>
                        </div>
                    )}

                    {shape === 'cylinder' && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">Cylinder Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                Volume = π × Radius² × Height
                                <br />
                                <em>(Base Area × Height)</em>
                            </p>
                        </div>
                    )}

                    {shape === 'sphere' && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">Sphere Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                Volume = (4/3) × π × Radius³
                            </p>
                        </div>
                    )}

                    {shape === 'hemisphere' && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">Hemisphere Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                Volume = (2/3) × π × Radius³
                                <br />
                                <em>(Half of a sphere)</em>
                            </p>
                        </div>
                    )}

                    {shape === 'cone' && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">Cone Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                Volume = (1/3) × π × Radius² × Height
                                <br />
                                <em>(One third of a cylinder)</em>
                            </p>
                        </div>
                    )}

                    {shape === 'pyramid' && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">Pyramid Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                Volume = (Length × Width × Height) / 3
                                <br />
                                <em>(Base Area × Height) / 3</em>
                            </p>
                        </div>
                    )}

                    {shape === 'prism' && (
                        <div className="bg-secondary/10 p-6 rounded-2xl border border-border animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-bold mb-2">Prism Formula</h3>
                            <p className="text-sm text-muted-foreground">
                                Volume = Base Area × Length
                                <br />
                                <em>(For triangular prism: 0.5 × Base × Triangle_Height × Length)</em>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
