'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Delete, Equal } from 'lucide-react';

const SCI_KEYS = [
    { label: '(', val: '(' }, { label: ')', val: ')' }, { label: 'π', val: 'Math.PI' }, { label: 'e', val: 'Math.E' }, { label: 'C', val: 'C', variant: 'destructive' },
    { label: 'sin', val: 'Math.sin(' }, { label: 'cos', val: 'Math.cos(' }, { label: 'tan', val: 'Math.tan(' }, { label: '√', val: 'Math.sqrt(' }, { label: '÷', val: '/' },
    { label: 'ln', val: 'Math.log(' }, { label: '7', val: '7' }, { label: '8', val: '8' }, { label: '9', val: '9' }, { label: '×', val: '*' },
    { label: 'log', val: 'Math.log10(' }, { label: '4', val: '4' }, { label: '5', val: '5' }, { label: '6', val: '6' }, { label: '-', val: '-' },
    { label: '^', val: '**' }, { label: '1', val: '1' }, { label: '2', val: '2' }, { label: '3', val: '3' }, { label: '+', val: '+' },
    { label: 'ABS', val: 'Math.abs(' }, { label: '.', val: '.' }, { label: '0', val: '0' }, { label: 'DEL', val: 'backspace' }, { label: '=', val: '=', variant: 'default' }
];

export default function ScientificCalculatorClient() {
    const [display, setDisplay] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState<string[]>([]);

    const handleKey = useCallback((key: typeof SCI_KEYS[0]) => {
        if (key.val === 'C') {
            setDisplay('');
            setResult('');
        } else if (key.val === 'backspace') {
            setDisplay(prev => prev.slice(0, -1));
        } else if (key.val === '=') {
            try {
                // Security Note: In a real closed loop app, eval is risky. 
                // However, for a calculator where input is strictly controlled by buttons, it's acceptable.
                // We'll use the Function constructor for slightly better isolation than direct eval.
                // Replace visual tokens with JS math
                // eslint-disable-next-line no-new-func
                const calcFunc = new Function(`return ${display}`);
                const res = calcFunc();

                // Format result
                const formattedRes = Number.isInteger(res) ? res.toString() : res.toFixed(6).replace(/\.?0+$/, '');

                setResult(formattedRes);
                setHistory(prev => [display + ' = ' + formattedRes, ...prev].slice(0, 5));
            } catch (err) {
                setResult('Error');
            }
        } else {
            setDisplay(prev => prev + key.val);
        }
    }, [display]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            if (/[0-9\.\+\-\*\/\(\)]/.test(key)) {
                setDisplay(prev => prev + key);
            } else if (key === 'Enter') {
                handleKey({ label: '=', val: '=', variant: 'default' });
            } else if (key === 'Backspace') {
                handleKey({ label: 'DEL', val: 'backspace' });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKey]);

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card className="bg-card shadow-xl border-2 border-primary/10 overflow-hidden">
                    <div className="p-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-950/50 border-b">
                        <div className="text-right space-y-1 bg-white dark:bg-black/20 p-4 rounded-xl shadow-inner border border-slate-200/50 dark:border-slate-800/50">
                            <div className="h-5 text-xs text-muted-foreground font-mono overflow-hidden whitespace-nowrap opacity-70">
                                {history[0] || 'UnitMaster Scientific'}
                            </div>
                            <div className="text-3xl md:text-4xl font-bold tracking-tight font-mono h-12 overflow-x-auto whitespace-nowrap scrollbar-hide flex items-center justify-end text-slate-800 dark:text-slate-100">
                                {display || '0'}
                            </div>
                            <div className="text-xl text-primary font-mono h-6 flex items-center justify-end font-semibold">
                                {result && `= ${result}`}
                            </div>
                        </div>
                    </div>
                    <CardContent className="p-4 md:p-6 grid grid-cols-5 gap-2 md:gap-3">
                        {SCI_KEYS.map((btn, idx) => (
                            <Button
                                key={idx}
                                variant={btn.variant as any || (['/', '*', '-', '+'].includes(btn.val) ? 'secondary' : 'outline')}
                                className={`
                                    h-10 md:h-14 text-base md:text-lg font-medium transition-all hover:scale-[1.02] active:scale-95 rounded-xl
                                    ${btn.val === '=' ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20' : ''}
                                    ${btn.val === 'C' ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400' : ''}
                                    ${['sin', 'cos', 'tan', 'log', 'ln', '√', '^'].includes(btn.label) ? 'text-xs md:text-sm text-muted-foreground bg-muted/30' : ''}
                                `}
                                onClick={() => handleKey(btn)}
                            >
                                {btn.label}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                {/* Quick History / Tips Panel */}
                <Card>
                    <div className="p-4 border-b font-semibold flex items-center gap-2">
                        <RotateCcw className="w-4 h-4 text-primary" />
                        History
                    </div>
                    <CardContent className="p-0">
                        {history.length === 0 ? (
                            <div className="p-8 text-center text-sm text-muted-foreground">
                                No calculations yet.
                            </div>
                        ) : (
                            <ul className="divide-y">
                                {history.map((item, i) => (
                                    <li key={i} className="p-3 text-sm font-mono hover:bg-muted/50 transition-colors">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50 text-sm">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Keyboard Shortcuts</h4>
                    <ul className="space-y-1 text-blue-600 dark:text-blue-300/80">
                        <li>• Numbers & Math: Type directly</li>
                        <li>• Enter: Calculate (=)</li>
                        <li>• Backspace: Delete</li>
                        <li>• Shift+8: Multiply (*)</li>
                        <li>• Shift+6: Power (^)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
