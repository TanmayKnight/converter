'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Percent, TrendingUp, Download, Target, Briefcase } from 'lucide-react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorContent } from '@/components/CalculatorContent';
import { toast } from 'sonner';

type ProjectionData = {
    age: number;
    savings: number; // The corpus
    goal: number | null; // The target line (optional)
}[];

export function RetirementCalculatorClient() {
    const [currentAge, setCurrentAge] = useState<string>('30');
    const [retireAge, setRetireAge] = useState<string>('60');
    const [currentSavings, setCurrentSavings] = useState<string>('50000');
    const [monthlyContribution, setMonthlyContribution] = useState<string>('1000');
    const [rate, setRate] = useState<string>('8'); // 8% expected return
    const [expenseGoal, setExpenseGoal] = useState<string>('4000'); // Monthly expense in retirement (today's value)

    // Results
    const [corpus, setCorpus] = useState<number>(0);
    const [requiredCorpus, setRequiredCorpus] = useState<number>(0);
    const [chartData, setChartData] = useState<ProjectionData>([]);

    useEffect(() => {
        const startAge = parseFloat(currentAge);
        const endAge = parseFloat(retireAge);
        const p = parseFloat(currentSavings) || 0;
        const pmt = parseFloat(monthlyContribution) || 0;
        const r = parseFloat(rate) / 100 || 0;
        const monthlyExpense = parseFloat(expenseGoal) || 0;

        if (startAge >= endAge) return;

        const years = endAge - startAge;
        const r_monthly = r / 12;
        let balance = p;
        const data: ProjectionData = [];

        // 1. Calculate Projected Corpus
        for (let i = 0; i <= years; i++) {
            data.push({
                age: startAge + i,
                savings: Math.round(balance),
                goal: null // Will fill later
            });

            // Compound for next year
            for (let m = 0; m < 12; m++) {
                balance += pmt;
                balance *= (1 + r_monthly);
            }
        }

        setCorpus(balance);

        // 2. Calculate Required Corpus (The "Number")
        // Rule of 25 (inverse of 4% rule) adjusted for basic inflation assumption 
        // Or simpler: strictly 25x annual expenses? 
        // Let's use 25x Rule for "Financial Freedom Number" based on annual expense
        const annualExpense = monthlyExpense * 12;
        // Adjust expense for inflation? Let's assume 3% inflation for 'years' duration
        const inflationAdjustedExpense = annualExpense * Math.pow(1.03, years);
        const target = inflationAdjustedExpense * 25;

        setRequiredCorpus(target);

        // Add Goal Line to chart
        const totalPoints = data.length;
        data.forEach((point, index) => {
            // Linear interpolation of goal? Or just a flat line at the top?
            // Usually showing the target as a line growing or a static bar at end is nice.
            // Let's draw a "Target Path" - assuming you need to acceptably resemble the growth curve to meet it.
            // Actually, simpler: Show the static Target at the end as a reference line? 
            // Recharts ReferenceLine is better, but let's put it in data for "Goal Pace".
            // Let's just create a linear path from 0 to Target to show "Required Pace".
            point.goal = Math.round((target / years) * index);
        });

        // Fix last point to match exactly/exceed
        if (data.length > 0) {
            // data[data.length - 1].goal = Math.round(target);
        }

        setChartData(data);

    }, [currentAge, retireAge, currentSavings, monthlyContribution, rate, expenseGoal]);

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFillColor(244, 63, 94); // Rose-500
        doc.rect(0, 0, 210, 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('UnitMaster - Retirement Roadmap', 14, 13);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Current Age: ${currentAge} | Retire Age: ${retireAge}`, 14, 30);
        doc.text(`Monthly Savings: $${parseFloat(monthlyContribution).toLocaleString()}`, 14, 38);
        doc.text(`Projected Corpus: $${corpus.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 14, 46);
        doc.text(`Goal (Financial Freedom): $${requiredCorpus.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 14, 54);

        // Generate simplified table (every 5 years)
        const tableData = chartData.filter((_, i) => i % 5 === 0 || i === chartData.length - 1).map(row => [
            `Age ${row.age}`,
            `$${row.savings.toLocaleString()}`,
            `$${row.goal?.toLocaleString() || '-'}`
        ]);

        autoTable(doc, {
            startY: 65,
            head: [['Age', 'Projected Savings', 'Goal Pace']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [244, 63, 94] }
        });

        doc.save('UnitMaster_Retirement_Plan.pdf');
        toast.success("Retirement Plan Downloaded");
    };

    const isOnTrack = corpus >= requiredCorpus;

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Retirement Planner</h1>
                    <p className="text-muted-foreground">Plan your path to financial freedom.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Your Details</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Current Age</label>
                                    <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 px-3 outline-none mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Retire Age</label>
                                    <input type="number" value={retireAge} onChange={e => setRetireAge(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 px-3 outline-none mt-1" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Current Savings ($)</label>
                                <div className="relative mt-1">
                                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-rose-500/20" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Monthly Contribution ($)</label>
                                <div className="relative mt-1">
                                    <TrendingUp className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-rose-500/20" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Desired Monthly Income (Today's Value)</label>
                                <div className="relative mt-1">
                                    <Target className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={expenseGoal} onChange={e => setExpenseGoal(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-rose-500/20" />
                                    <p className="text-xs text-muted-foreground mt-1">We adjust this for inflation automatically.</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Annual Return (%)</label>
                                <div className="relative mt-1">
                                    <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-rose-500/20" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`border rounded-3xl p-6 text-center ${isOnTrack ? 'bg-green-500/10 border-green-500/20' : 'bg-orange-500/10 border-orange-500/20'}`}>
                        <div className={`text-sm font-semibold uppercase mb-1 ${isOnTrack ? 'text-green-600' : 'text-orange-600'}`}>
                            {isOnTrack ? 'On Track' : 'Gap to Goal'}
                        </div>
                        <div className="text-3xl font-extrabold text-foreground">
                            ${Math.abs(corpus - requiredCorpus).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                            {isOnTrack ? 'Surplus projected! Great job.' : 'Shortfall projected. Try saving more.'}
                        </div>
                    </div>
                </div>

                {/* Visuals */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card border border-border rounded-3xl p-6 h-[450px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">"Nest Egg" Projection</h3>
                            <button onClick={downloadPDF} className="flex items-center gap-2 text-sm text-rose-500 font-medium hover:underline">
                                <Download className="h-4 w-4" /> Download Roadmap
                            </button>
                        </div>

                        <ResponsiveContainer width="100%" height="85%">
                            <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.3} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="age" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '12px', border: '1px solid var(--border)' }}
                                    formatter={(value: any) => [`$${value?.toLocaleString() ?? 0}`, '']}
                                />
                                <Legend />
                                <Bar dataKey="savings" name="Your Savings" fill="url(#colorSavings)" barSize={20} radius={[4, 4, 0, 0]} />
                                <Line type="monotone" dataKey="goal" name="Goal Pace" stroke="#fb923c" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-5 bg-card border border-border rounded-2xl">
                            <div className="flex items-center gap-3 mb-2">
                                <Briefcase className="h-5 w-5 text-rose-500" />
                                <div className="font-semibold">Projected Corpus</div>
                            </div>
                            <div className="text-2xl font-bold">${corpus.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                            <div className="text-sm text-muted-foreground mt-1">at Age {retireAge}</div>
                        </div>

                        <div className="p-5 bg-card border border-border rounded-2xl">
                            <div className="flex items-center gap-3 mb-2">
                                <Target className="h-5 w-5 text-orange-500" />
                                <div className="font-semibold">Target Needed</div>
                            </div>
                            <div className="text-2xl font-bold">${requiredCorpus.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                            <div className="text-sm text-muted-foreground mt-1">to sustain ${parseFloat(expenseGoal).toLocaleString()}/mo</div>
                        </div>
                    </div>
                </div>
            </div>

            <CalculatorContent title="Retirement Guide">
                <p>The "Target Needed" figure is based on the 4% Rule, adjusted for inflation. It represents the amount you need to support your lifestyle indefinitely.</p>
            </CalculatorContent>
        </div>
    );
}
