import { Metadata } from 'next';
import { InvestmentCalculatorClient } from '@/components/calculators/InvestmentCalculatorClient';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Investment Calculator - Wealth Growth Charts & Reports',
    description: 'Visualize your compound interest with interactive charts. Download professional Wealth Growth PDF reports. Supports SIP, Lumpsum, and Inflation adjustment. Works offline.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/investment',
    },
    openGraph: {
        title: 'Investment Growth Visualizer | UnitMaster',
        description: 'See your money grow with interactive charts and PDF reports. Private & Offline.',
        url: 'https://unitmaster.io/calculators/finance/investment',
        type: 'website',
    },
    keywords: ['investment calculator offline', 'compound interest calculator', 'sip calculator', 'wealth growth chart', 'investment roi pdf'],
};

export default function InvestmentPage() {
    return (
        <div className="space-y-8">
            <InvestmentCalculatorClient />

            <SeoContentSection
                title="Measuring Investment Success: ROI vs. CAGR"
                description="Investing without measuring performance is like driving with your eyes closed. The UnitMaster Investment Calculator helps you translate raw numbers into actionable growth metrics, entirely offline and private."
                features={[
                    {
                        title: "Compound Growth",
                        description: "Visualize the power of compounding over time with interactive charts."
                    },
                    {
                        title: "Inflation Adjustment",
                        description: "See the 'real' value of your future money by adjusting for inflation."
                    },
                    {
                        title: "PDF Reports",
                        description: "Download professional wealth reports to track your journey toward financial freedom."
                    }
                ]}
                benefits={[
                    "Plan your retirement.",
                    "Visualize compound interest.",
                    "Adjust for inflation.",
                    "100% Private Data."
                ]}
                faqs={[
                    {
                        question: "ROI vs. CAGR: What's the difference?",
                        answer: "ROI calculates total return (Net Profit / Total Investment), which is simple but can be misleading for long periods. CAGR (Compound Annual Growth Rate) smooths out volatility to show the effective annual growth rate."
                    },
                    {
                        question: "What is the Rule of 72?",
                        answer: "Divide 72 by your interest rate to estimate how many years it takes to double your money. E.g., at 8%, money doubles in 9 years (72/8)."
                    },
                    {
                        question: "What is a safe average return for stocks?",
                        answer: "Historically, the S&P 500 has returned approximately 8-10% annually over long periods before inflation."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "FinancialProduct",
                    "name": "Investment Calculator",
                    "description": "A tool to calculate investment growth and compound interest.",
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
                    { name: 'Investment Calculator', path: '/calculators/finance/investment' }
                ]}
            />
        </div>
    );
}
