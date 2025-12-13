'use client';

import { useState, useEffect, useMemo, useDeferredValue } from 'react';
import { ArrowLeft, ArrowRightLeft, Check, Copy, AlertCircle, Loader2 } from 'lucide-react';
import { Converter } from '@/lib/converter';
import { UnitCategory, unitDefinitions } from '@/lib/units/definitions';
import { useCurrencyRates } from '@/hooks/useCurrencyRates';
import { UnitSelect } from './UnitSelect';

interface ConverterProps {
    category: UnitCategory;
    initialFrom?: string;
    initialTo?: string;
}

export function ConverterWidget({ category, initialFrom, initialTo }: ConverterProps) {
    // Always call hooks at top level
    const { currencyDefinition, isLoading: isCurrencyLoading, error: currencyError } = useCurrencyRates();

    const isCurrency = category === 'currency';

    // Use dynamic definition for currency, static for others
    const definitions = isCurrency ? currencyDefinition : unitDefinitions[category];

    const [fromUnit, setFromUnit] = useState(initialFrom || definitions.units[0].id);
    const [toUnit, setToUnit] = useState(initialTo || definitions.units[1]?.id || definitions.units[0].id);
    const [amount, setAmount] = useState<string>('1');
    const [result, setResult] = useState<string>('');
    const [copied, setCopied] = useState(false);

    // Defer the calculation to keep UI responsive
    const deferredAmount = useDeferredValue(amount);

    // Re-calculate when units/amount/definitions change
    useEffect(() => {
        if (!deferredAmount || isNaN(Number(deferredAmount))) {
            setResult('');
            return;
        }

        try {
            const converter = new Converter(category, isCurrency ? currencyDefinition : undefined);
            const res = converter.convert(deferredAmount, fromUnit, toUnit);
            setResult(res);
        } catch (e) {
            console.error(e);
            setResult('Error');
        }
    }, [deferredAmount, fromUnit, toUnit, category, isCurrency, currencyDefinition]);

    const handleSwap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-8 bg-card rounded-3xl shadow-2xl border border-white/20 glass">
            <div className="flex flex-col gap-6">

                {/* Input Section */}
                <div className="relative group">
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">
                        Input Amount
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 bg-secondary/50 rounded-2xl border border-transparent focus-within:border-primary/50 focus-within:bg-secondary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="flex-1 w-full bg-transparent text-2xl md:text-3xl font-bold text-foreground px-4 py-2 outline-none placeholder:text-muted-foreground/30 min-w-0"
                            placeholder="0"
                        />
                        <div className="hidden sm:block h-8 w-px bg-border mx-2" />
                        <div className="block sm:hidden h-px w-full bg-border my-1" />
                        {/* From Unit Selector */}
                        <UnitSelect
                            value={fromUnit}
                            units={definitions.units}
                            onChange={setFromUnit}
                            className="w-full sm:w-auto pr-2"
                        />
                    </div>
                </div>

                {/* Divider / Swap */}
                <div className="flex items-center justify-center -my-3 relative z-10">
                    <button
                        onClick={handleSwap}
                        className="p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-card"
                        aria-label="Swap units"
                    >
                        <ArrowRightLeft className="h-5 w-5" />
                    </button>
                </div>

                {/* Result Section */}
                <div className="relative">
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2 ml-1">
                        Result
                    </label>
                    <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 bg-primary/5 rounded-2xl border border-primary/20">
                        <div className="flex-1 px-4 py-2 overflow-hidden">
                            <div className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight truncate">
                                {result || '---'}
                            </div>
                        </div>

                        <div className="block sm:hidden h-px w-full bg-primary/10 my-1" />

                        <div className="flex flex-col items-end gap-1 px-2 py-1">
                            {/* To Unit Selector */}
                            <UnitSelect
                                value={toUnit}
                                units={definitions.units}
                                onChange={setToUnit}
                                align="right"
                                className="w-full sm:w-auto"
                            />

                            <div className="flex items-center gap-1 mt-1">
                                <button
                                    onClick={handleCopy}
                                    className="p-2 rounded-lg hover:bg-primary/10 text-primary/60 hover:text-primary transition-all"
                                    title="Copy Result"
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {isCurrency && (
                <div className="mt-2 text-center text-xs">
                    {isCurrencyLoading && (
                        <span className="flex items-center justify-center gap-1 text-muted-foreground animate-pulse">
                            <Loader2 className="h-3 w-3 animate-spin" /> Updating live rates...
                        </span>
                    )}
                    {currencyError && (
                        <span className="flex items-center justify-center gap-1 text-red-500">
                            <AlertCircle className="h-3 w-3" /> {currencyError}
                        </span>
                    )}
                    {!isCurrencyLoading && !currencyError && (
                        <span className="text-muted-foreground/60">Live rates via open.er-api.com</span>
                    )}
                </div>
            )}

            {/* Formula/Info Footer */}
            <div className="mt-8 pt-4 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary/50" />
                    1 {definitions.units.find(u => u.id === fromUnit)?.name} ≈
                    <span className="font-mono font-medium text-foreground">
                        {new Converter(category, isCurrency ? currencyDefinition : undefined).convert(1, fromUnit, toUnit)}
                    </span>
                    {' '}{definitions.units.find(u => u.id === toUnit)?.name}
                </p>
            </div>
        </div>
    );
}
