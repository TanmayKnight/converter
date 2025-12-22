import { Metadata } from 'next';
import { LoanCalculatorClient } from '@/components/calculators/LoanCalculatorClient';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Personal Loan Calculator - Calculate Payments & APR',
    description: 'Calculate monthly payments for personal loans, auto loans, and student loans. See total interest costs and amortization. Works offline.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/loan',
    },
    openGraph: {
        title: 'Loan Calculator | UnitMaster',
        description: 'Estimate your monthly loan payments in seconds. Private & Secure.',
        url: 'https://unitmaster.io/calculators/finance/loan',
        type: 'website',
    },
    keywords: ['personal loan calculator', 'loan payment calculator', 'auto loan calculator', 'apr calculator', 'monthly payment estimator'],
};

export default function LoanPage() {
    return (
        <div className="space-y-8">
            <LoanCalculatorClient />

            <SeoContentSection
                title="Simple Personal Loan Calculator"
                description="Quickly estimate your monthly payments and total interest cost for any loan type. Runs entirely in your browser for maximum privacy."
                features={[
                    {
                        title: "Instant Estimates",
                        description: "See your monthly payment immediately as you type."
                    },
                    {
                        title: "Total Interest",
                        description: "Understand the true cost of borrowing by seeing the total interest paid."
                    },
                    {
                        title: "Zero Data Stored",
                        description: "Your financial details never leave your device."
                    }
                ]}
                benefits={[
                    "Check affordability.",
                    "Compare loan offers.",
                    "Plan your budget.",
                    "100% Private."
                ]}
                faqs={[
                    {
                        question: "How is the monthly payment calculated?",
                        answer: "We use the standard amortization formula to calculate the fixed monthly payment required to pay off the loan principal and interest over the specified term."
                    },
                    {
                        question: "Does this affect my credit score?",
                        answer: "No. This is a calculator, not a loan application. No data is sent to credit bureaus or lenders."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "FinancialProduct",
                    "name": "Loan Calculator",
                    "description": "A tool to calculate loan payments.",
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
                    { name: 'Finance', path: '/calculators/finance' },
                    { name: 'Loan Calculator', path: '/calculators/finance/loan' }
                ]}
            />
        </div>
    );
}
