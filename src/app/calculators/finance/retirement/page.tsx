import { Metadata } from 'next';
import { RetirementCalculatorClient } from '@/components/calculators/RetirementCalculatorClient';

export const metadata: Metadata = {
    title: 'Retirement Planner - Create Your Financial Freedom Roadmap (PDF)',
    description: 'Calculate your "Financial Freedom Number". Visualize your nest egg growth and download a personalized Retirement Roadmap PDF.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/retirement',
    },
    openGraph: {
        title: 'Retirement Roadmap Planner | UnitMaster',
        description: 'Download your personalized Financial Freedom Roadmap PDF.',
        url: 'https://unitmaster.io/calculators/finance/retirement',
        type: 'website',
    },
};

export default function RetirementPage() {
    return (
        <>
            <RetirementCalculatorClient />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FinancialProduct',
                        name: 'Retirement Calculator',
                        description: 'A tool to plan retirement savings.',
                        brand: {
                            '@type': 'Brand',
                            name: 'UnitMaster'
                        },
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD'
                        }
                    }),
                }}
            />
        </>
    );
}
