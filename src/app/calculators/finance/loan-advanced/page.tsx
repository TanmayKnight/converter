import { Metadata } from 'next';
import { LoanCalculatorClient } from '@/components/calculators/LoanCalculatorClient';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Advanced Loan Calculator - Compare Auto, Personal & Payday Loans',
    description: 'Compare different loan offers side-by-side. Generate PDF amortization schedules and visualize standard vs. accelerated payoff plans. Works offline.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/loan-advanced',
    },
    openGraph: {
        title: 'Loan Calculator & Comparison Tool | UnitMaster',
        description: 'Compare loans, download PDF reports, and save money. Privacy-first.',
        url: 'https://unitmaster.io/calculators/finance/loan-advanced',
        type: 'website',
    },
    keywords: ['advanced loan calculator', 'loan comparison tool', 'amortization schedule pdf', 'auto vs personal loan', 'payday loan cost'],
};

export default function AdvancedLoanPage() {
    return (
        <div className="space-y-8">
            <LoanCalculatorClient />

            <SeoContentSection
                title="Compare & Optimize Your Loans"
                description="Whether you are buying a car, consolidating debt, or taking a personal loan, the 'Interest Rate' isn't the only factor. The UnitMaster Advanced Loan Calculator helps you make smarter borrowing decisions."
                features={[
                    {
                        title: "Comparison Mode",
                        description: "Enter two different loan scenarios (e.g., Dealer Financing vs. Bank Loan) to see which one costs less over time."
                    },
                    {
                        title: "Amortization PDF",
                        description: "Download a professional schedule to audit your payments and track principal reduction."
                    },
                    {
                        title: "Private Analysis",
                        description: "Compare sensitive financial data without uploading it to any server."
                    }
                ]}
                benefits={[
                    "Save on interest.",
                    "Avoid bad loans.",
                    "Visualize payoff timeline.",
                    "Secure & Offline."
                ]}
                faqs={[
                    {
                        question: "What is the difference between Personal and Auto loans?",
                        answer: "Personal loans are unsecured and can be used for any purpose, often with higher rates. Auto loans are secured by the vehicle, usually offering lower rates but with stricter terms."
                    },
                    {
                        question: "Are Payday loans worth it?",
                        answer: "Payday loans are extremely high-interest short-term loans (often 300%+ APR). They should be avoided. Use our calculator to see the true cost."
                    },
                    {
                        question: "How does Loan Comparison help?",
                        answer: "Looking at just the monthly payment is misleading. Comparison shows the total interest paid over the life of two different loans to help you pick the cheapest option."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "FinancialProduct",
                    "name": "Advanced Loan Calculator",
                    "description": "A tool to compare personal, auto, and payday loans with amortization schedules.",
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
                    { name: 'Advanced Loan Calculator', path: '/calculators/finance/loan-advanced' }
                ]}
            />
        </div>
    );
}
