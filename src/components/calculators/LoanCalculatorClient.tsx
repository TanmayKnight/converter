'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, Download, TrendingUp, ArrowRightLeft } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorContent } from '@/components/CalculatorContent';
import { toast } from 'sonner';

// Define types for chart data
type AmortizationData = {
    year: number;
    balance: number;
    interest: number;
    principal: number;
    totalInterest: number;
}[];

export function LoanCalculatorClient() {
    // Scenario A
    const [amount, setAmount] = useState<string>('25000');
    const [rate, setRate] = useState<string>('7.5');
    const [years, setYears] = useState<string>('5');

    // Scenario B (Comparison)
    const [compareMode, setCompareMode] = useState(false);
    const [rateB, setRateB] = useState<string>('5.9');
    const [yearsB, setYearsB] = useState<string>('3');

    // Results
    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
    const [monthlyPaymentB, setMonthlyPaymentB] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [chartData, setChartData] = useState<AmortizationData>([]);

    const calculateLoan = (p: number, r: number, y: number) => {
        if (p <= 0 || r <= 0 || y <= 0) return { payment: 0, totalInterest: 0, schedule: [] };

        const monthlyRate = r / 100 / 12;
        const n = y * 12;
        const payment = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

        let balance = p;
        let totalInt = 0;
        const schedule: AmortizationData = [];

        for (let i = 1; i <= n; i++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = payment - interestPayment;
            balance -= principalPayment;
            totalInt += interestPayment;

            // Add point every 6 months for smoother chart on short loans
            if (i % 6 === 0 || i === n) {
                schedule.push({
                    year: parseFloat((i / 12).toFixed(1)),
                    balance: Math.max(0, balance),
                    interest: totalInt,
                    principal: p - Math.max(0, balance),
                    totalInterest: totalInt
                });
            }
        }
        return { payment, totalInterest: totalInt, schedule };
    };

    useEffect(() => {
        const p = parseFloat(amount);
        const r = parseFloat(rate);
        const y = parseFloat(years);

        const resultA = calculateLoan(p, r, y);
        setMonthlyPayment(resultA.payment);
        setTotalInterest(resultA.totalInterest);
        setChartData(resultA.schedule);

        if (compareMode) {
            const rB = parseFloat(rateB);
            const yB = parseFloat(yearsB);
            const resultB = calculateLoan(p, rB, yB);
            setMonthlyPaymentB(resultB.payment);
        }

    }, [amount, rate, years, compareMode, rateB, yearsB]);

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFillColor(34, 197, 94); // Green-500
        doc.rect(0, 0, 210, 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('UnitMaster - Personal Loan Schedule', 14, 13);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Loan Amount: $${parseFloat(amount).toLocaleString()}`, 14, 30);
        doc.text(`Rate: ${rate}%`, 14, 38);
        doc.text(`Term: ${years} Years`, 14, 46);
        doc.text(`Monthly Payment: $${monthlyPayment.toFixed(2)}`, 14, 54);

        const tableData = chartData.map(row => [
            `Year ${row.year}`,
            `$${row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
            `$${row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
        ]);

        autoTable(doc, {
            startY: 65,
            head: [['Time', 'Total Interest', 'Balance']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [34, 197, 94] }
        });

        doc.save('UnitMaster_Loan_Plan.pdf');
        toast.success("Loan Schedule Downloaded");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Loan Calculator</h1>
                    <p className="text-muted-foreground">Premium personal loan planner with comparisons.</p>
                </div>
                <button
                    onClick={() => setCompareMode(!compareMode)}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium transition-colors"
                >
                    <ArrowRightLeft className="h-4 w-4" />
                    {compareMode ? 'Disable Comparison' : 'Compare Offers'}
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Loan Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Amount ($)</label>
                                <div className="relative mt-1">
                                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-green-500/20" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Rate (%)</label>
                                <div className="relative mt-1">
                                    <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-green-500/20" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Term (Years)</label>
                                <div className="relative mt-1">
                                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-green-500/20" />
                                </div>
                            </div>
                        </div>

                        {compareMode && (
                            <div className="mt-8 pt-6 border-t border-border animate-in fade-in slide-in-from-top-4">
                                <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">Offer B (Comparison)</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Rate (%)</label>
                                        <input type="number" value={rateB} onChange={e => setRateB(e.target.value)} className="w-full bg-blue-500/10 border border-blue-500/20 rounded-xl py-2 px-3 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Term (Years)</label>
                                        <input type="number" value={yearsB} onChange={e => setYearsB(e.target.value)} className="w-full bg-blue-500/10 border border-blue-500/20 rounded-xl py-2 px-3 outline-none" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Visuals */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-3xl p-6 text-center">
                            <div className="text-sm text-green-600 font-semibold uppercase mb-1">Monthly Payment</div>
                            <div className="text-4xl font-extrabold text-foreground">
                                ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">Principal & Interest</div>
                        </div>

                        {compareMode && (
                            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/20 rounded-3xl p-6 text-center">
                                <div className="text-sm text-blue-600 font-semibold uppercase mb-1">Offer B Payment</div>
                                <div className="text-4xl font-extrabold text-foreground">
                                    ${monthlyPaymentB.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-xs text-muted-foreground mt-2">
                                    Difference: <span className="font-bold">{monthlyPaymentB > monthlyPayment ? '+' : ''}${(monthlyPaymentB - monthlyPayment).toFixed(0)}</span>
                                </div>
                            </div>
                        )}

                        {!compareMode && (
                            <div className="bg-card border border-border rounded-3xl p-6 flex flex-col justify-center items-center cursor-pointer hover:border-green-500/50 transition-colors group" onClick={downloadPDF}>
                                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mb-2 group-hover:scale-110 transition-transform">
                                    <Download className="h-6 w-6" />
                                </div>
                                <div className="font-semibold">Download Plan</div>
                                <div className="text-xs text-muted-foreground">PDF Report</div>
                            </div>
                        )}
                    </div>

                    <div className="bg-card border border-border rounded-3xl p-6 h-[400px]">
                        <h3 className="text-lg font-semibold mb-6">Payment Schedule</h3>
                        <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPrincipalL" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="year" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '12px', border: '1px solid var(--border)' }}
                                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="balance" name="Remaining Balance" stroke="#22c55e" fillOpacity={1} fill="url(#colorPrincipalL)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <CalculatorContent title="Loan Guide">
                <p>Use the chart to see how fast your debt decreases. Adding even $50/month extra can significantly reduce the term.</p>
            </CalculatorContent>
        </div>
    );
}
