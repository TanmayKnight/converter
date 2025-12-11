'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar } from 'lucide-react';
import Link from 'next/link';
import { AffiliateCard } from '@/components/AffiliateCard';
import { CalculatorContent } from '@/components/CalculatorContent';

export function MortgageCalculatorClient() {
    // Inputs
    const [principal, setPrincipal] = useState<string>('300000');
    const [rate, setRate] = useState<string>('5.5');
    const [years, setYears] = useState<string>('30');

    // Outputs
    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);

    // Calculation Logic
    useEffect(() => {
        const p = parseFloat(principal);
        const r = parseFloat(rate);
        const t = parseFloat(years);

        if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || t <= 0) {
            setMonthlyPayment(0);
            setTotalInterest(0);
            setTotalPayment(0);
            return;
        }

        // Monthly rate
        const monthlyRate = r / 100 / 12;
        const numberOfPayments = t * 12;

        let payment = 0;
        if (monthlyRate === 0) {
            payment = p / numberOfPayments;
        } else {
            payment = (p * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        const total = payment * numberOfPayments;

        setMonthlyPayment(payment);
        setTotalPayment(total);
        setTotalInterest(total - p);

    }, [principal, rate, years]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Mortgage Calculator</h1>
                <p className="text-muted-foreground">Estimate your monthly mortgage payments and total interest.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-6">Loan Details</h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Loan Amount ($)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="number"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value)}
                                    className="w-full bg-secondary/50 border border-transparent focus:border-primary/50 focus:bg-background rounded-xl py-3 pl-10 pr-4 text-lg font-semibold outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Annual Interest Rate (%)</label>
                            <div className="relative">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    step="0.1"
                                    className="w-full bg-secondary/50 border border-transparent focus:border-primary/50 focus:bg-background rounded-xl py-3 pl-10 pr-4 text-lg font-semibold outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Loan Term (Years)</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                    className="w-full bg-secondary/50 border border-transparent focus:border-primary/50 focus:bg-background rounded-xl py-3 pl-10 pr-4 text-lg font-semibold outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 rounded-3xl p-6 flex flex-col justify-center text-center">
                    <h2 className="text-lg font-semibold text-primary mb-8 uppercase tracking-wider">Estimated Monthly Payment</h2>

                    <div className="text-6xl font-extrabold text-foreground mb-2">
                        ${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                    </div>
                    <p className="text-muted-foreground mb-10 text-sm">per month</p>

                    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-primary/20">
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Total Principal</div>
                            <div className="text-lg font-bold">${parseFloat(principal || '0').toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                            <div className="text-lg font-bold text-red-500">+${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-primary/20">
                        <div className="text-sm text-muted-foreground mb-1">Total Cost of Loan</div>
                        <div className="text-2xl font-bold text-foreground">${totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>
                </div>
            </div>

            {/* Affiliate Section Paused for SEO Focus
            <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Expert Mortgage Tools</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AffiliateCard 
                        title="Rocket Mortgage"
                        description="Get approved in minutes. See how much home you can afford with a custom rate."
                        ctaText="Get Pre-Approved"
                        href="https://www.rocketmortgage.com/" 
                        badge="Fastest Approval"
                    />
                     <AffiliateCard 
                        title="Better.com"
                        description="Zero commission. Zero lender fees. The 100% digital way to get a mortgage."
                        ctaText="See Rates"
                        href="https://better.com/" 
                        badge="Lowest Fees"
                    />
                </div>
            </div>
            */}

            <CalculatorContent title="Everything You Need to Know About Mortgages">
                <h3>How a Mortgage Calculator Helps You Save</h3>
                <p>
                    A mortgage is likely the largest debt you will ever take on, so understanding the math behind it is crucial.
                    This calculator uses the standard amortization formula to determine your monthly principal and interest payments.
                    By adjusting the interest rate or down payment, you can see exactly how these variables impact your monthly budget.
                </p>

                <h3>Understanding the Components</h3>
                <ul>
                    <li><strong>Principal:</strong> The loan amount you borrow to purchase the home.</li>
                    <li><strong>Interest:</strong> The cost of borrowing money, expressed as an annual percentage rate (APR).</li>
                    <li><strong>Term:</strong> The length of time you have to repay the loan (commonly 15 or 30 years).</li>
                </ul>

                <h3>30-Year vs. 15-Year Mortgages</h3>
                <p>
                    The two most common loan terms in the United States are the 30-year and 15-year fixed-rate mortgages.
                    A <strong>30-year fixed</strong> loan offers lower monthly payments but results in paying significantly more interest over the life of the loan.
                    A <strong>15-year fixed</strong> loan has higher monthly payments, but you build equity faster and pay far less interest total.
                    Use our calculator to compare both scenarios by simply changing the "Loan Term" input.
                </p>

                <h3>How to Quality for a Lower Rate</h3>
                <p>
                    Your interest rate is determined by your credit score, debt-to-income ratio, and down payment size.
                    Generally, a credit score above 760 will qualify you for the best rates. Putting down at least 20% also eliminates the need for
                    Private Mortgage Insurance (PMI), further reducing your monthly costs. We recommend checking your credit report for errors
                    months before you intend to apply for a mortgage.
                </p>
            </CalculatorContent>
        </div>
    );
}
