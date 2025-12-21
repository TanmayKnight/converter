'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, Download, TrendingUp, ArrowRightLeft, Home, PiggyBank, Clock, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorContent } from '@/components/CalculatorContent';
import { toast } from 'sonner';
import { usePro } from '@/hooks/usePro';
import { ProGate } from '@/components/ui/pro-gate';

// Define types for amortization data
type AmortizationData = {
    year: number;
    balance: number;
    interest: number;
    principal: number;
    totalInterest: number;
    balanceAccelerated?: number;
}[];

export function MortgageCalculatorClient() {
    const { isPro } = usePro();
    // Inputs
    const [homePrice, setHomePrice] = useState<string>('375000');
    const [downPayment, setDownPayment] = useState<string>('75000');
    const [downPaymentPercent, setDownPaymentPercent] = useState<string>('20');
    const [rate, setRate] = useState<string>('6.85');
    const [years, setYears] = useState<string>('30');
    const [extraPayment, setExtraPayment] = useState<string>('0');

    // Derived Logic State
    const [loanAmount, setLoanAmount] = useState<number>(300000);

    // Outputs
    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [payoffDate, setPayoffDate] = useState<string>('');

    // Savings Logic
    const [interestSaved, setInterestSaved] = useState<number>(0);
    const [timeSaved, setTimeSaved] = useState<string>('');
    const [chartData, setChartData] = useState<AmortizationData>([]);

    // Handle Down Payment Sync
    const handleHomePriceChange = (val: string) => {
        setHomePrice(val);
        const price = parseFloat(val) || 0;
        const dpPct = parseFloat(downPaymentPercent) || 0;
        const newDp = (price * dpPct) / 100;
        setDownPayment(newDp.toFixed(0));
    };

    const handleDownPaymentChange = (val: string) => {
        setDownPayment(val);
        const dp = parseFloat(val) || 0;
        const price = parseFloat(homePrice) || 0;
        if (price > 0) {
            setDownPaymentPercent(((dp / price) * 100).toFixed(1));
        }
    };

    // On update
    useEffect(() => {
        const hp = parseFloat(homePrice) || 0;
        const dp = parseFloat(downPayment) || 0;
        const l = Math.max(0, hp - dp);
        setLoanAmount(l);
    }, [homePrice, downPayment]);

    const calculateMortgage = (p: number, r: number, y: number, extra: number) => {
        if (p <= 0 || r <= 0 || y <= 0) return { payment: 0, totalInterest: 0, schedule: [], payoffMonths: 0 };

        const monthlyRate = r / 100 / 12;
        const n = y * 12; // Standard months
        // Standard Payment Formula
        const payment = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

        // Simulation
        let balance = p;
        let totalInt = 0;
        let actualMonths = 0;
        const schedule: AmortizationData = [];

        // We simulate up to standard term, but break early if paid off
        for (let i = 1; i <= n; i++) {
            if (balance <= 0) break;

            const interestPayment = balance * monthlyRate;
            let principalPayment = payment - interestPayment;

            // Add extra payment to principal
            let totalMonthlyPay = payment + extra;

            // Cap payment at remaining balance
            if (balance + interestPayment < totalMonthlyPay) {
                principalPayment = balance;
                totalMonthlyPay = balance + interestPayment;
            } else {
                principalPayment += extra;
            }

            balance -= principalPayment;
            totalInt += interestPayment;
            actualMonths++;

            if (i % 12 === 0 || balance <= 0) {
                schedule.push({
                    year: parseFloat((i / 12).toFixed(1)),
                    balance: Math.max(0, balance),
                    interest: totalInt,
                    principal: p - Math.max(0, balance),
                    totalInterest: totalInt
                });
            }
        }
        return { payment, totalInterest: totalInt, schedule, payoffMonths: actualMonths };
    };

    useEffect(() => {
        const p = loanAmount;
        const r = parseFloat(rate);
        const y = parseFloat(years);
        const extra = parseFloat(extraPayment) || 0;

        // 1. Standard Scenario (No Extra)
        const standard = calculateMortgage(p, r, y, 0);

        // 2. Accelerated Scenario (With Extra)
        const accelerated = calculateMortgage(p, r, y, extra);

        setMonthlyPayment(standard.payment);
        setTotalInterest(accelerated.totalInterest); // Show ACTUAL interest paid (accelerated)

        // Merge Data for Chart
        const mergedData = standard.schedule.map((point, index) => {
            // Find matching year in accelerated data
            const accPoint = accelerated.schedule.find(a => Math.abs(a.year - point.year) < 0.1);
            return {
                ...point,
                balanceAccelerated: accPoint ? accPoint.balance : 0 // If not found, it's 0 (paid off)
            };
        });

        // Clean up tail of chart (if accelerated finishes way early, standard continues)
        // Correct logic: Standard continues to year 30. Accelerated drops to 0 at year X.
        setChartData(mergedData);

        // Savings
        if (extra > 0) {
            const intSaved = standard.totalInterest - accelerated.totalInterest;
            setInterestSaved(Math.max(0, intSaved));

            const monthsSaved = (y * 12) - accelerated.payoffMonths;
            const yearsSavedVal = (monthsSaved / 12).toFixed(1);
            setTimeSaved(yearsSavedVal);

            const today = new Date();
            today.setMonth(today.getMonth() + accelerated.payoffMonths);
            setPayoffDate(today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
        } else {
            setInterestSaved(0);
            setTimeSaved('');
            const today = new Date();
            today.setFullYear(today.getFullYear() + y);
            setPayoffDate(today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
        }

    }, [loanAmount, rate, years, extraPayment]);

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFillColor(16, 185, 129); // Emerald
        doc.rect(0, 0, 210, 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('UnitMaster - Mortgage Plan', 14, 13);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Home Price: $${parseFloat(homePrice).toLocaleString()}`, 14, 30);
        doc.text(`Down Payment: $${parseFloat(downPayment).toLocaleString()} (${downPaymentPercent}%)`, 14, 38);
        doc.text(`Loan Amount: $${loanAmount.toLocaleString()}`, 14, 46);
        doc.text(`Monthly Payment: $${monthlyPayment.toFixed(2)}`, 14, 54);

        if (parseFloat(extraPayment) > 0) {
            doc.setTextColor(22, 163, 74); // Green
            doc.text(`Extra Payment: $${extraPayment}/mo`, 14, 62);
            doc.text(`Interest Saved: $${interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 14, 70);
            doc.text(`Time Saved: ${timeSaved} Years`, 14, 78);
        }

        // Table
        const tableData = chartData.map(row => [
            `Year ${row.year}`,
            `$${row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
            // If accelerated exists and is different, show it? simpler to just show standard balance vs accelerated
            `$${row.balanceAccelerated?.toLocaleString(undefined, { maximumFractionDigits: 0 }) || '$0'}`
        ]);

        autoTable(doc, {
            startY: 85,
            head: [['Year', 'Standard Balance', 'Accelerated Balance']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [16, 185, 129] }
        });

        doc.save('UnitMaster_Mortgage_Plan.pdf');
        toast.success("Mortgage Plan Downloaded");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Mortgage Calculator</h1>
                    <p className="text-muted-foreground">Advanced planner with down payment & extra payment analysis.</p>
                </div>

                {/* Export Button Logic: Direct Link to Pricing if not Pro */}
                {isPro ? (
                    <Button
                        onClick={downloadPDF}
                        variant="default"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-lg hover:shadow-xl transition-all"
                    >
                        <Download className="h-4 w-4" />
                        Export Report
                    </Button>
                ) : (
                    <Link href="/pricing">
                        <Button
                            variant="outline"
                            className="gap-2 border-emerald-200 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                        >
                            <Lock className="h-4 w-4" />
                            Export Report
                        </Button>
                    </Link>
                )}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Loan Details</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Home Price ($)</label>
                                <div className="relative mt-1">
                                    <Home className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={homePrice} onChange={e => handleHomePriceChange(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-emerald-500/20" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium">Down Pay ($)</label>
                                    <input type="number" value={downPayment} onChange={e => handleDownPaymentChange(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 px-3 outline-none mt-1 text-sm" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Percent (%)</label>
                                    <input type="number" value={downPaymentPercent} onChange={e => {
                                        setDownPaymentPercent(e.target.value);
                                        const pct = parseFloat(e.target.value) || 0;
                                        const hp = parseFloat(homePrice) || 0;
                                        setDownPayment(((hp * pct) / 100).toFixed(0));
                                    }} className="w-full bg-secondary/50 rounded-xl py-2 px-3 outline-none mt-1 text-sm" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Rate (%)</label>
                                <div className="relative mt-1">
                                    <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-emerald-500/20" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Term (Years)</label>
                                <div className="relative mt-1">
                                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-emerald-500/20" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border">
                            <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <PiggyBank className="h-4 w-4" /> Save More
                            </h2>
                            <div>
                                <label className="text-sm font-medium">Extra Monthly Payment ($)</label>
                                <div className="relative mt-1">
                                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={extraPayment} onChange={e => setExtraPayment(e.target.value)} className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-emerald-500/40" placeholder="0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/20 rounded-3xl p-6 text-center">
                            <div className="text-sm text-emerald-600 font-semibold uppercase mb-1">Monthly Payment</div>
                            <div className="text-4xl font-extrabold text-foreground">
                                ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">Principal & Interest (Loan: ${loanAmount.toLocaleString()})</div>
                        </div>

                        {interestSaved > 0 && (
                            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-3xl p-6 text-center animate-in fade-in zoom-in-95">
                                <div className="text-sm text-green-700 dark:text-green-400 font-bold uppercase mb-1 flex items-center justify-center gap-2">
                                    <TrendingUp className="h-4 w-4" /> Impact
                                </div>
                                <div className="text-3xl font-extrabold text-foreground">
                                    -${interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-xs text-muted-foreground mt-2 font-medium">
                                    Interest Saved & {timeSaved} Years Faster
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="bg-card border border-border rounded-3xl p-6 h-[400px]">
                        <h3 className="text-lg font-semibold mb-6 flex justify-between">
                            <span>Balance Payoff Logic</span>
                            {interestSaved > 0 && <span className="text-xs font-normal text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Debt Free: {payoffDate}</span>}
                        </h3>
                        <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="year" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '12px', border: '1px solid var(--border)' }}
                                    formatter={(value: any) => [`$${value?.toLocaleString() ?? 0}`, '']}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="balance" name="Standard Balance" stroke="#94a3b8" fillOpacity={1} fill="url(#colorPrincipal)" />
                                {interestSaved > 0 && (
                                    <Area type="monotone" dataKey="balanceAccelerated" name="Accelerated Balance" stroke="#16a34a" strokeWidth={2} fillOpacity={0} />
                                )}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div >
            </div >

            <CalculatorContent title="Mortgage Guide">
                <p>Making extra payments goes directly towards your Principal balance. This reduces the amount of interest charged in all future months, creating a compounding "Snowball Effect" that kills debt faster.</p>
            </CalculatorContent>
        </div >
    );
}
