import { Metadata } from 'next';
import { InvestmentCalculatorClient } from '@/components/calculators/InvestmentCalculatorClient';

export const metadata: Metadata = {
    title: 'Investment Calculator - Calculate Compound Interest & Growth',
    description: 'Visualize your wealth growth with our Investment Calculator. Supports Compound Interest, Recurring Deposits, CDs, and NPV calculations.',
    alternates: {
        canonical: 'https://unitmasterapp.com/calculators/finance/investment',
    },
    openGraph: {
        title: 'Investment Calculator | UnitMaster',
        description: 'Calculate compound interest and investment returns instantly.',
        url: 'https://unitmasterapp.com/calculators/finance/investment',
        type: 'website',
    },
};

export default function InvestmentPage() {
    return (
        <>
            <InvestmentCalculatorClient />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FinancialProduct',
                        name: 'Investment Calculator',
                        description: 'A tool to calculate investment growth and compound interest.',
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
