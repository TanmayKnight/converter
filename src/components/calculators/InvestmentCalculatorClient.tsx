'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Percent, TrendingUp, Download, PieChart, Coins } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorContent } from '@/components/CalculatorContent';
import { toast } from 'sonner';
import { usePro } from '@/hooks/usePro';

type ChartData = {
    year: number;
    principal: number;
    interest: number;
    total: number;
}[];

export function InvestmentCalculatorClient() {
    const { isPro } = usePro();
    // Inputs
    const [principal, setPrincipal] = useState<string>('10000');
    const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
    const [rate, setRate] = useState<string>('8'); // 8% avg market return
    const [years, setYears] = useState<string>('10');

    // Results
    const [totalValue, setTotalValue] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalPrincipal, setTotalPrincipal] = useState<number>(0);
    const [chartData, setChartData] = useState<ChartData>([]);

    useEffect(() => {
        const p = parseFloat(principal) || 0;
        const c = parseFloat(monthlyContribution) || 0;
        const r = parseFloat(rate) || 0;
        const y = parseFloat(years) || 0;

        if (y <= 0) return;

        const data: ChartData = [];
        let balance = p;
        let totalContrib = p;
        const r_monthly = r / 100 / 12;

        for (let i = 1; i <= y; i++) {
            // Calculate for each month in this year
            for (let m = 0; m < 12; m++) {
                balance += c;
                balance *= (1 + r_monthly);
                totalContrib += c;
            }

            data.push({
                year: i,
                principal: Math.round(totalContrib),
                interest: Math.round(balance - totalContrib),
                total: Math.round(balance)
            });
        }

        setChartData(data);
        setTotalValue(balance);
        setTotalPrincipal(totalContrib);
        setTotalInterest(balance - totalContrib);

    }, [principal, monthlyContribution, rate, years]);

    const downloadPDF = () => {
        if (!isPro) {
            toast.error("Wealth Growth Report is a Pro Feature", {
                description: "Upgrade to download detailed PDF reports.",
                action: {
                    label: "Upgrade",
                    onClick: () => window.location.href = '/pricing'
                }
            });
            return;
        }

        const doc = new jsPDF();

        doc.setFillColor(99, 102, 241); // Indigo-500
        doc.rect(0, 0, 210, 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('UnitMaster - Wealth Growth Report', 14, 13);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Initial Investment: $${parseFloat(principal).toLocaleString()}`, 14, 30);
        doc.text(`Monthly Contribution: $${parseFloat(monthlyContribution).toLocaleString()}`, 14, 38);
        doc.text(`Annual Rate: ${rate}%`, 14, 46);
        doc.text(`Total Value: $${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 14, 54);

        const tableData = chartData.map(row => [
            `Year ${row.year}`,
            `$${row.principal.toLocaleString()}`,
            `$${row.interest.toLocaleString()}`,
            `$${row.total.toLocaleString()}`
        ]);

        autoTable(doc, {
            startY: 65,
            head: [['Year', 'Principal invested', 'Interest Earned', 'Total Value']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [99, 102, 241] }
        });

        doc.save('UnitMaster_Investment_Report.pdf');
        toast.success("Investment Report Downloaded");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Investment Calculator</h1>
                    <p className="text-muted-foreground">Visualize the power of compound interest.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Strategy Parameters</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Starting Amount ($)</label>
                                <div className="relative mt-1">
                                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Monthly Contribution ($)</label>
                                <div className="relative mt-1">
                                    <Coins className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Annual Return Rate (%)</label>
                                <div className="relative mt-1">
                                    <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Time Period (Years)</label>
                                <div className="relative mt-1">
                                    <TrendingUp className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 rounded-3xl p-6 text-center">
                        <div className="text-sm text-indigo-600 font-semibold uppercase mb-1">Future Value</div>
                        <div className="text-4xl font-extrabold text-foreground">
                            ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="mt-4 pt-4 border-t border-indigo-500/20 grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <div className="text-muted-foreground">Total Invested</div>
                                <div className="font-bold text-base">${totalPrincipal.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground">Interest Earned</div>
                                <div className="font-bold text-green-500 text-base">+${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visuals */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-card border border-border rounded-3xl p-6 h-[450px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Growth Curve</h3>
                            <button onClick={downloadPDF} className="flex items-center gap-2 text-sm text-indigo-500 font-medium hover:underline">
                                <Download className="h-4 w-4" /> Download Report
                            </button>
                        </div>

                        <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
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
                                <Area type="monotone" dataKey="principal" stackId="1" name="Your Contributions" stroke="#6366f1" fill="url(#colorPrincipal)" />
                                <Area type="monotone" dataKey="interest" stackId="1" name="Compound Interest" stroke="#22c55e" fill="url(#colorInterest)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                        <div className="flex gap-4 items-start">
                            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600 mt-1">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-indigo-900 dark:text-indigo-200">The 8th Wonder of the World</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Notice how the green area (Interest) starts small but eventually becomes larger than the purple area (Principal).
                                    This is exponential growth. In Year {Math.round(parseInt(years) / 2)}, you earn interest on your interest.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CalculatorContent title="Investment Guide">
                <p>Consistent monthly contributions are more important than timing the market. Use this tool to set a realistic goal and stick to it.</p>
            </CalculatorContent>
        </div>
    );
}
