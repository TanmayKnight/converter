import { Metadata } from 'next';
import { RetirementCalculatorClient } from '@/components/calculators/RetirementCalculatorClient';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Retirement Planner - Create Your Financial Freedom Roadmap',
    description: 'Calculate your "Financial Freedom Number". Visualize your nest egg growth and download a personalized Retirement Roadmap PDF. Works offline.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/retirement',
    },
    openGraph: {
        title: 'Retirement Roadmap Planner | UnitMaster',
        description: 'Download your personalized Financial Freedom Roadmap PDF. Private & Secure.',
        url: 'https://unitmaster.io/calculators/finance/retirement',
        type: 'website',
    },
    keywords: ['retirement calculator', 'fire calculator', 'financial freedom number', 'retirement planning pdf', 'safe withdrawal rate rule'],
};

export default function RetirementPage() {
    return (
        <div className="space-y-8">
            <RetirementCalculatorClient />

            <SeoContentSection
                title="Retirement Planning: The Financial Freedom Formula"
                description="Retirement isn't an age; it's a financial number. The UnitMaster Retirement Planner helps you calculate exactly how big your 'Nest Egg' needs to be to support your lifestyle indefinitely."
                features={[
                    {
                        title: "The 4% Rule",
                        description: "Based on the famous Trinity Study, ensuring your portfolio lasts 30+ years."
                    },
                    {
                        title: "Inflation Adjusted",
                        description: "Automatically adjusts for inflation to show you the 'real' purchasing power you need."
                    },
                    {
                        title: "Roadmap PDF",
                        description: "Download a step-by-step PDF guide tailored to your specific savings usage."
                    }
                ]}
                benefits={[
                    "Retire early (FIRE).",
                    "Calculate 'Your Number'.",
                    "Track progress.",
                    "100% Private."
                ]}
                faqs={[
                    {
                        question: "What is the 4% Rule for retirement?",
                        answer: "The 4% Rule suggests you can withdraw 4% of your portfolio annually (adjusted for inflation) without running out of money for at least 30 years. It implies you need to save 25 times your annual expenses."
                    },
                    {
                        question: "How do I calculate my Financial Freedom number?",
                        answer: "Multiply your expected annual expenses in retirement by 25. For example, if you spend $40,000/year, you need $1,000,000 invested ($40,000 x 25)."
                    },
                    {
                        question: "What is FIRE?",
                        answer: "FIRE stands for Financial Independence, Retire Early. It is a strategy of aggressive saving and low-cost investing to reach financial freedom well before traditional retirement age."
                    },
                    {
                        question: "Inflation: The Silent Killer",
                        answer: "$1 million today will not have the same purchasing power in 20 years. Our calculator automatically adjusts for inflation (typically 2-3%), showing you the future value you need to target."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "FinancialProduct",
                    "name": "Retirement Calculator",
                    "description": "A tool to plan retirement savings.",
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
                    { name: 'Retirement Calculator', path: '/calculators/finance/retirement' }
                ]}
            />
        </div>
    );
}
