import { Metadata } from 'next';
import { MortgageCalculatorClient } from '@/components/calculators/MortgageCalculatorClient';

export const metadata: Metadata = {
    title: 'Free Mortgage Calculator - Estimate Monthly Payments & Interest',
    description: 'Calculate your monthly mortgage payments with our free, highly accurate tool. Visualize amortization, interest rates, and loan terms instantly.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/mortgage',
    },
    openGraph: {
        title: 'Mortgage Calculator | UnitMaster',
        description: 'Plan your home purchase with our precision mortgage calculator.',
        url: 'https://unitmaster.io/calculators/finance/mortgage',
        type: 'website',
    },
};

export default function MortgagePage() {
    return (
        <>
            <MortgageCalculatorClient />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FinancialProduct',
                        name: 'Mortgage Calculator',
                        description: 'A tool to calculate monthly mortgage payments.',
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
