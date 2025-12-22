import { Metadata } from 'next';
import ROICalculatorClient from '@/components/calculators/ROICalculatorClient';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'ROI Calculator - Calculate Investment Return & Annualized Growth',
    description: 'Free Return on Investment (ROI) calculator. Calculate total profit, annualized return, and investment growth instantly. Works offline.',
    keywords: ['roi calculator', 'return on investment', 'investment calculator', 'annualized return formula', 'profit calculator', 'cagr calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/roi',
    },
    openGraph: {
        title: 'ROI Calculator | UnitMaster',
        description: 'Calculate your investment returns and profit. Private & Offline.',
        url: 'https://unitmaster.io/calculators/finance/roi',
        type: 'website',
    },
};

export default function ROIPage() {
    return (
        <div className="space-y-8 container mx-auto px-4 py-8 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">ROI Calculator</h1>
                <p className="text-muted-foreground">Calculate Return on Investment and Annualized Returns.</p>
            </div>

            <ROICalculatorClient />

            <SeoContentSection
                title="How to Calculate ROI & CAGR"
                description="Use this calculator to measure the efficiency of an investment. It calculates both simple ROI and Annualized ROI (CAGR) to help you compare investments of different lengths."
                features={[
                    {
                        title: "Simple ROI",
                        description: "The total return on your investment over its entire life."
                    },
                    {
                        title: "Annualized ROI (CAGR)",
                        description: "The yearly growth rate. This is the 'real' number you should care about for long-term investments."
                    },
                    {
                        title: "Time Period Analysis",
                        description: "See how the investment length affects your effective annual return."
                    }
                ]}
                benefits={[
                    "Measure profitability.",
                    "Compare different assets.",
                    "Analyze efficiency.",
                    "100% Private."
                ]}
                faqs={[
                    {
                        question: "How do you calculate ROI?",
                        answer: "ROI is calculated by dividing the Net Profit by the Cost of Investment, then multiplying by 100. Formula: (Net Profit / Cost) * 100."
                    },
                    {
                        question: "What is Annualized ROI?",
                        answer: "Annualized ROI, or CAGR, determines the annual growth rate of an investment, accounting for the time period held. It is better for comparing long-term investments than simple ROI."
                    },
                    {
                        question: "Why is Annualized ROI important?",
                        answer: "A 20% return over 1 year is amazing. A 20% return over 10 years is poor (less than 2% per year). Annualized ROI reveals this truth."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "FinancialProduct",
                    "name": "ROI Calculator",
                    "description": "A tool to calculate investment return.",
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
                    { name: 'ROI Calculator', path: '/calculators/finance/roi' }
                ]}
            />
        </div>
    );
}
