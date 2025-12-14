'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, Download, TrendingUp, ArrowRightLeft } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorContent } from '@/components/CalculatorContent';
import { Button } from '@/components/ui/button'; // Assuming we have a Button component, or we use standard button
import { toast } from 'sonner';

// Define types for amortization data
type AmortizationData = {
    year: number;
    balance: number;
    interest: number;
    principal: number;
    totalInterest: number;
}[];

export function MortgageCalculatorClient() {
    // Inputs (Scenario A)
    const [principal, setPrincipal] = useState<string>('300000');
    const [rate, setRate] = useState<string>('6.85');
    const [years, setYears] = useState<string>('30');

    // Comparison Mode
    const [compareMode, setCompareMode] = useState(false);
    const [rateB, setRateB] = useState<string>('5.5');
    const [yearsB, setYearsB] = useState<string>('15');

    // Outputs
    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
    const [monthlyPaymentB, setMonthlyPaymentB] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [chartData, setChartData] = useState<AmortizationData>([]);

    const calculateMortgage = (p: number, r: number, y: number) => {
        if (p <= 0 || r <= 0 || y <= 0) return { payment: 0, totalInterest: 0, schedule: [] };

        const monthlyRate = r / 100 / 12;
        const n = y * 12;
        const payment = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

        // Generate Schedule
        let balance = p;
        let totalInt = 0;
        const schedule: AmortizationData = [];

        for (let i = 1; i <= n; i++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = payment - interestPayment;
            balance -= principalPayment;
            totalInt += interestPayment;

            if (i % 12 === 0) {
                schedule.push({
                    year: i / 12,
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
        const p = parseFloat(principal);
        const r = parseFloat(rate);
        const y = parseFloat(years);

        const resultA = calculateMortgage(p, r, y);
        setMonthlyPayment(resultA.payment);
        setTotalInterest(resultA.totalInterest);
        setChartData(resultA.schedule);

        if (compareMode) {
            const rB = parseFloat(rateB);
            const yB = parseFloat(yearsB);
            const resultB = calculateMortgage(p, rB, yB);
            setMonthlyPaymentB(resultB.payment);
        }

    }, [principal, rate, years, compareMode, rateB, yearsB]);

    const downloadPDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFillColor(16, 185, 129); // Emerald Color to match theme
        doc.rect(0, 0, 210, 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('UnitMaster - Mortgage Amortization Schedule', 14, 13);

        // Info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Loan Amount: $${parseFloat(principal).toLocaleString()}`, 14, 30);
        doc.text(`Interest Rate: ${rate}%`, 14, 38);
        doc.text(`Term: ${years} Years`, 14, 46);
        doc.text(`Monthly Payment: $${monthlyPayment.toFixed(2)}`, 14, 54);

        doc.setFontSize(10);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 65);

        // Table
        const tableData = chartData.map(row => [
            `Year ${row.year}`,
            `$${row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
            `$${row.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
            `$${row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
        ]);

        autoTable(doc, {
            startY: 70,
            head: [['Year', 'Total Interest Paid', 'Principal Paid', 'Remaining Balance']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [16, 185, 129] }
        });

        doc.save('UnitMaster_Mortgage_Schedule.pdf');
        toast.success("Amortization Schedule Downloaded");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Mortgage Calculator</h1>
                    <p className="text-muted-foreground">Premium visualization and professional PDF reports.</p>
                </div>
                <button
                    onClick={() => setCompareMode(!compareMode)}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium transition-colors"
                >
                    <ArrowRightLeft className="h-4 w-4" />
                    {compareMode ? 'Disable Comparison' : 'Compare Loans'}
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Loan Parameters</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Loan Amount</label>
                                <div className="relative mt-1">
                                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-primary/20" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Interest Rate (%)</label>
                                <div className="relative mt-1">
                                    <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-primary/20" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Loan Term (Years)</label>
                                <div className="relative mt-1">
                                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-primary/20" />
                                </div>
                            </div>
                        </div>

                        {/* Comparison Inputs */}
                        {compareMode && (
                            <div className="mt-8 pt-6 border-t border-border animate-in fade-in slide-in-from-top-4">
                                <h2 className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-4">Scenario B (Comparison)</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Rate (%)</label>
                                        <input type="number" value={rateB} onChange={e => setRateB(e.target.value)} className="w-full bg-orange-500/10 border border-orange-500/20 rounded-xl py-2 px-3 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Term (Years)</label>
                                        <input type="number" value={yearsB} onChange={e => setYearsB(e.target.value)} className="w-full bg-orange-500/10 border border-orange-500/20 rounded-xl py-2 px-3 outline-none" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Visualization & Results */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Primary Result Card */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/20 rounded-3xl p-6 text-center">
                            <div className="text-sm text-emerald-600 font-semibold uppercase mb-1">Monthly Payment</div>
                            <div className="text-4xl font-extrabold text-foreground">
                                ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">Principal & Interest</div>
                        </div>

                        {compareMode && (
                            <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/20 rounded-3xl p-6 text-center">
                                <div className="text-sm text-orange-600 font-semibold uppercase mb-1">Scenario B Payment</div>
                                <div className="text-4xl font-extrabold text-foreground">
                                    ${monthlyPaymentB.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-xs text-muted-foreground mt-2">
                                    Difference: <span className="font-bold">{monthlyPaymentB > monthlyPayment ? '+' : ''}${(monthlyPaymentB - monthlyPayment).toFixed(0)}</span>
                                </div>
                            </div>
                        )}

                        {!compareMode && (
                            <div className="bg-card border border-border rounded-3xl p-6 flex flex-col justify-center items-center cursor-pointer hover:border-emerald-500/50 transition-colors group" onClick={downloadPDF}>
                                <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
                                    <Download className="h-6 w-6" />
                                </div>
                                <div className="font-semibold">Download Report</div>
                                <div className="text-xs text-muted-foreground">Official PDF Schedule</div>
                            </div>
                        )}
                    </div>

                    {/* Chart */}
                    <div className="bg-card border border-border rounded-3xl p-6 h-[400px]">
                        <h3 className="text-lg font-semibold mb-6">Amortization Schedule</h3>
                        <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
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
                                <Area type="monotone" dataKey="principal" name="Cumulative Principal" stroke="#10b981" fillOpacity={1} fill="url(#colorPrincipal)" />
                                <Area type="monotone" dataKey="totalInterest" name="Total Interest Paid" stroke="#ef4444" fillOpacity={1} fill="url(#colorInterest)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-secondary/30 rounded-2xl">
                            <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                            <div className="text-xl font-bold text-red-500">${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-2xl">
                            <div className="text-sm text-muted-foreground mb-1">Total Cost</div>
                            <div className="text-xl font-bold">${(parseFloat(principal) + totalInterest).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        </div>
                    </div>
                </div>
            </div>

            <CalculatorContent title="Mortgage Guide">
                <p>Use the chart above to visualize how your equity grows over time. In the early years (red area), most of your money goes to interest. Over time (green area), you start paying off the house itself.</p>
            </CalculatorContent>
        </div>
    );
}
