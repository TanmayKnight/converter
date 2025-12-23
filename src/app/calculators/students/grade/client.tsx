'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calculator, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function GradeCalculator() {
    const [currentGrade, setCurrentGrade] = useState<string>('');
    const [targetGrade, setTargetGrade] = useState<string>('');
    const [examWeight, setExamWeight] = useState<string>('');

    const [requiredScore, setRequiredScore] = useState<number | null>(null);
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<'success' | 'warning' | 'danger' | 'neutral'>('neutral');

    const calculate = () => {
        const current = parseFloat(currentGrade);
        const target = parseFloat(targetGrade);
        const weight = parseFloat(examWeight);

        if (isNaN(current) || isNaN(target) || isNaN(weight)) {
            setRequiredScore(null);
            setMessage('');
            return;
        }

        if (weight <= 0 || weight >= 100) {
            setRequiredScore(null);
            setMessage('Final exam weight must be between 1% and 99%');
            setMessageType('warning');
            return;
        }

        // Formula: Required = (Target - (Current * (1 - Weight/100))) / (Weight/100)
        const weightDecimal = weight / 100;
        const required = (target - (current * (1 - weightDecimal))) / weightDecimal;

        setRequiredScore(required);

        if (required <= 0) {
            setMessage('You are already guaranteed this grade! Even a 0% on the final works.');
            setMessageType('success');
        } else if (required > 100) {
            setMessage('You need extra credit to reach this target. It might be tough!');
            setMessageType('danger');
        } else if (required > 90) {
            setMessage('You need an A on the final. Study hard!');
            setMessageType('warning');
        } else {
            setMessage('This is achievable. Good luck!');
            setMessageType('success');
        }
    };

    useEffect(() => {
        calculate();
    }, [currentGrade, targetGrade, examWeight]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-7 space-y-6">
                <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-primary" />
                        Calculate Final Exam Score
                    </h3>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-base">Current Grade (%)</Label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="e.g. 85"
                                    value={currentGrade}
                                    onChange={(e) => setCurrentGrade(e.target.value)}
                                    className="text-lg"
                                />
                                <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Your grade before taking the final exam.</p>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-base">Target Grade (%)</Label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="e.g. 90"
                                    value={targetGrade}
                                    onChange={(e) => setTargetGrade(e.target.value)}
                                    className="text-lg"
                                />
                                <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
                            </div>
                            <p className="text-sm text-muted-foreground">The overall grade you want for the class.</p>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-base">Final Exam Weight (%)</Label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="e.g. 20"
                                    value={examWeight}
                                    onChange={(e) => setExamWeight(e.target.value)}
                                    className="text-lg"
                                />
                                <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
                            </div>
                            <p className="text-sm text-muted-foreground">How much is the final exam worth?</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Result Section */}
            <div className="lg:col-span-5">
                <div className="sticky top-24 bg-card border border-border rounded-xl shadow-lg border-t-4 border-t-primary p-8 text-center space-y-6">
                    <h3 className="text-muted-foreground font-medium uppercase tracking-wide text-sm">
                        To get a {targetGrade || '...'}%
                    </h3>

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">You need to score at least</p>
                        <div className="text-6xl font-extrabold text-foreground tracking-tighter">
                            {requiredScore !== null ? requiredScore.toFixed(1) : '--'}%
                        </div>
                        <p className="text-sm text-muted-foreground">on your final exam.</p>
                    </div>

                    {message && (
                        <div className={cn(
                            "p-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2",
                            messageType === 'success' && "bg-green-500/10 text-green-600 dark:text-green-400",
                            messageType === 'warning' && "bg-orange-500/10 text-orange-600 dark:text-orange-400",
                            messageType === 'danger' && "bg-red-500/10 text-red-600 dark:text-red-400",
                        )}>
                            {messageType === 'success' && <CheckCircle className="w-4 h-4" />}
                            {messageType === 'danger' && <AlertCircle className="w-4 h-4" />}
                            {messageType === 'warning' && <AlertCircle className="w-4 h-4" />}
                            {message}
                        </div>
                    )}

                    {requiredScore !== null && (
                        <div className="text-xs text-muted-foreground pt-4 border-t border-border/50">
                            <p>Formula: (Target - (Current × (1 - Weight))) ÷ Weight</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
