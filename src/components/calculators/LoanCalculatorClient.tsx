'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Percent, Clock } from 'lucide-react';
import Link from 'next/link';
import { AffiliateCard } from '@/components/AffiliateCard';
import { CalculatorContent } from '@/components/CalculatorContent';

export function LoanCalculatorClient() {
    const [amount, setAmount] = useState<string>('10000');
    const [rate, setRate] = useState<string>('8');
    const [years, setYears] = useState<string>('5');

    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);

    useEffect(() => {
        const p = parseFloat(amount);
        const r = parseFloat(rate);
        const t = parseFloat(years);

        if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || t <= 0) {
            setMonthlyPayment(0);
            return;
        }

        const monthlyRate = r / 100 / 12;
        const numberOfPayments = t * 12;
        let payment = 0;

        if (monthlyRate === 0) {
            payment = p / numberOfPayments;
        } else {
            payment = (p * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        setMonthlyPayment(payment);
        setTotalInterest((payment * numberOfPayments) - p);
    }, [amount, rate, years]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Loan Calculator</h1>
                <p className="text-muted-foreground">Calculate payments for personal loans, auto loans, or student loans.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Loan Amount ($)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-secondary/50 border border-transparent focus:border-primary/50 focus:bg-background rounded-xl py-3 pl-10 pr-4 text-lg font-semibold outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Interest Rate (%)</label>
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
                            <label className="text-sm font-medium text-muted-foreground">Term (Years)</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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

                <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-3xl p-6 flex flex-col justify-center text-center">
                    <h2 className="text-lg font-semibold text-green-600 mb-8 uppercase tracking-wider">Your Payment</h2>

                    <div className="text-6xl font-extrabold text-foreground mb-2">
                        ${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                    </div>
                    <p className="text-muted-foreground mb-10 text-sm">per month</p>

                    <div className="pt-6 border-t border-green-500/20">
                        <div className="text-sm text-muted-foreground mb-1">Total Interest Payable</div>
                        <div className="text-2xl font-bold text-foreground">${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>
                </div>
            </div>

            {/* Affiliate Section Paused for SEO Focus
            <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Recommended Financial Tools</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AffiliateCard
                        title="Best Personal Loans 2024"
                        description="Compare rates from top lenders. Loans up to $100,000. Rates as low as 6.99% APR."
                        ctaText="Compare Rates"
                        href="https://www.bankrate.com/loans/personal-loans/rates/"
                        badge="Top Pick"
                    />
                     <AffiliateCard
                        title="High Yield Savings"
                        description="Earn up to 5.00% APY with a high-yield savings account. No monthly fees."
                        ctaText="View Offers"
                        href="https://www.nerdwallet.com/best/banking/high-yield-online-savings-accounts"
                        badge="Featured"
                    />
                </div>
            </div>
            */}

            <CalculatorContent title="Personal Loans Demystified">
                <h3>When Should You Take a Personal Loan?</h3>
                <p>
                    Personal loans are versatile tools that can be used for debt consolidation, home improvements, or major purchases.
                    Because they are typically "unsecured" (not backed by collateral like your house or car), they often have higher interest rates than mortgages but lower rates than credit cards.
                    The math in this calculator helps you decide if a loan is affordable for your monthly budget.
                </p>

                <h3>How Amortization Works</h3>
                <p>
                    Most personal loans are "fully amortizing," meaning your monthly payment stays the same, but the portion going toward interest decreases over time while the principal repayment increases.
                    At the beginning of your loan, a large chunk of your payment goes straight to the lender's profit (interest). By the end, almost 100% of your payment reduces your debt.
                </p>

                <h3>Improving Your Approval Odds</h3>
                <p>
                    Lenders look at your breakdown of monthly debt obligations versus your gross monthly income (DTI Ratio).
                    A DTI below 36% is ideal. If you are struggling to get approved, conside applying with a co-signer or paying down small credit card balances first
                    to boost your credit score.
                </p>

                <h3>Hidden Fees to Watch For</h3>
                <p>
                    <strong>Origination Fee:</strong> A one-time fee deducted from your loan proceeds (usually 1-8%). If you borrow $10,000 with a 5% fee, you only receive $9,500.
                </p>
                <p>
                    <strong>Prepayment Penalty:</strong> Some lenders charge you a fee for paying off your loan early. Our calculator assumes no prepayment penalty,
                    and most reputable modern lenders (like SoFi and Upstart) have eliminated these fees.
                </p>
            </CalculatorContent>
        </div>
    );
}
