import Link from 'next/link';
import { Metadata } from 'next';
import {
    Calculator,
    DollarSign,
    TrendingUp,
    Percent,
    Wallet,
    Receipt,
    Umbrella,
    LineChart
} from 'lucide-react';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Free Finance Calculators - Mortgage, Loan, ROI & Tax | UnitMaster',
    description: 'A complete suite of free financial calculators. Calculate mortgage payments, loan amortization, investment returns (ROI), and taxes offline. Private & Secure.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance',
    },
    openGraph: {
        title: 'Free Finance Calculators | UnitMaster',
        description: 'Plan your financial future with our privacy-first calculators.',
        url: 'https://unitmaster.io/calculators/finance',
        type: 'website',
    },
};

const tools = [
    {
        name: 'Mortgage Calculator',
        slug: 'mortgage',
        icon: DollarSign,
        desc: 'Calculate monthly mortgage payments with PMI, taxes, and extra payments.'
    },
    {
        name: 'Loan Calculator',
        slug: 'loan',
        icon: Wallet,
        desc: 'Simple personal loan calculator with monthly payment estimation.'
    },
    {
        name: 'Advanced Loan Comparison',
        slug: 'loan-advanced',
        icon: LineChart,
        desc: 'Compare two loans side-by-side to find the best deal.'
    },
    {
        name: 'Investment & SIP',
        slug: 'investment',
        icon: TrendingUp,
        desc: 'Project your wealth growth with SIP and Lumpsum investment charts.'
    },
    {
        name: 'ROI Calculator',
        slug: 'roi',
        icon: Percent,
        desc: 'Calculate Return on Investment and Annualized Return (CAGR).'
    },
    {
        name: 'Tax & Invoice',
        slug: 'tax',
        icon: Receipt,
        desc: 'Generate GST/VAT invoices and calculate inclusive/exclusive tax.'
    },
    {
        name: 'Retirement Planner',
        slug: 'retirement',
        icon: Umbrella,
        desc: 'Plan your path to Financial Freedom (FIRE) with inflation adjustments.'
    },
];

export default function FinanceCalculatorsPage() {
    return (
        <div className="space-y-12 container mx-auto px-4 py-12 max-w-screen-xl">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 mb-4">
                    <DollarSign className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Finance Calculators</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Professional-grade financial tools that respect your privacy.
                    Run complex calculations instantly in your browser without sharing your data.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.slug}
                        href={`/calculators/finance/${tool.slug}`}
                        className="group relative bg-card hover:bg-gradient-to-br from-card to-emerald-500/5 border border-border hover:border-emerald-500/30 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md flex flex-col"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 transition-colors">
                                <tool.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
                            {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {tool.desc}
                        </p>
                    </Link>
                ))}
            </div>

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Finance Calculators', path: '/calculators/finance' }
                ]}
            />
        </div>
    );
}
