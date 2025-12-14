import { Metadata } from 'next';
import { RetirementCalculatorClient } from '@/components/calculators/RetirementCalculatorClient';

export const metadata: Metadata = {
    title: 'Retirement Planner & Calculator - Financial Freedom Roadmap',
    description: 'Calculate how much you need to retire. Visualize your savings growth and find your "Financial Freedom Number".',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/retirement',
    },
    openGraph: {
        title: 'Retirement Planner | UnitMaster',
        description: 'Will you have enough to retire? Calculate your nest egg now.',
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
