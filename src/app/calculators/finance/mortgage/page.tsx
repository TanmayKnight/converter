import { Metadata } from 'next';
import { MortgageCalculatorClient } from '@/components/calculators/MortgageCalculatorClient';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';
import { MarketRates } from '@/components/calculators/finance/MarketRates';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Mortgage Calculator with Real-Time Rates & PDF Reports',
    description: 'Calculate monthly payments with live mortgage rates. Features: Extra payments impact, Amortization PDF export, and Loan Comparison tool. Works offline.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/mortgage',
    },
    openGraph: {
        title: 'Mortgage Calculator (Real-Time) | UnitMaster',
        description: 'Plan smarter with live rates, extra payment analysis, and PDF reports.',
        url: 'https://unitmaster.io/calculators/finance/mortgage',
        type: 'website',
    },
    keywords: ['mortgage calculator', 'real time mortgage rates', 'amortization schedule', 'extra mortgage payment calculator', 'pmi calculator'],
};

export default function MortgagePage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 max-w-4xl pt-8">
                <MarketRates />
            </div>

            <MortgageCalculatorClient />

            <SeoContentSection
                title="Smart Mortgage Planning: Real-Time Rates & Analysis"
                description="Don't just calculate your payment; optimize it. The UnitMaster Mortgage Calculator connects to live market data to give you accurate estimates. Use our Comparison Mode to shop lenders, or generate a PDF Amortization Schedule to see how extra payments save you thousands."
                features={[
                    {
                        title: "The 'One Extra Payment' Hack",
                        description: "Making just one extra mortgage payment per year towards your principal can shorten a 30-year loan by roughly 4-5 years."
                    },
                    {
                        title: "Live Market Rates",
                        description: "See current average rates for 30-year Fixed, 15-year Fixed, and ARM loans."
                    },
                    {
                        title: "PMI Integration",
                        description: "Automatically account for Private Mortgage Insurance if your down payment is under 20%."
                    }
                ]}
                benefits={[
                    "Save $10,000+ in interest.",
                    "Pay off home faster.",
                    "Compare lenders.",
                    "Secure & Private."
                ]}
                faqs={[
                    {
                        question: "How does an extra mortgage payment help?",
                        answer: "Making just one extra mortgage payment per year towards your principal can shorten a 30-year loan term by roughly 4-5 years and save tens of thousands of dollars in interest."
                    },
                    {
                        question: "What is the difference between Fixed-Rate and ARM mortgages?",
                        answer: "A Fixed-Rate Mortgage locks in your interest rate for the life of the loan, offering stability. An Adjustable-Rate Mortgage (ARM) starts with a lower rate for a set period (e.g., 5 years) but fluctuates with the market afterwards."
                    },
                    {
                        question: "What is PMI?",
                        answer: "Private Mortgage Insurance (PMI) is an extra fee charged if your down payment is less than 20%. It protects the lender, not you. You can remove it once you build 20% equity."
                    },
                    {
                        question: "The Truth About Amortization",
                        answer: "In the first few years of a mortgage, the vast majority of your payment goes towards Interest, not Principal. You only start building significant equity later in the loan term."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "FinancialProduct",
                    "name": "Mortgage Calculator",
                    "description": "A tool to calculate monthly mortgage payments.",
                    "brand": {
                        "@type": "Brand",
                        "name": "UnitMaster"
                    },
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            />

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Finance', path: '#' },
                    { name: 'Mortgage Calculator', path: '/calculators/finance/mortgage' }
                ]}
            />
        </div>
    );
}
