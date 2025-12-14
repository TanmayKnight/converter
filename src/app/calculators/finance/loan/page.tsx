import { Metadata } from 'next';
import { LoanCalculatorClient } from '@/components/calculators/LoanCalculatorClient';

export const metadata: Metadata = {
    title: 'Personal Loan Calculator - Calculate Payments & APR',
    description: 'Calculate monthly payments for personal loans, auto loans, and student loans. See total interest costs and amortization.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/loan',
    },
    openGraph: {
        title: 'Loan Calculator | UnitMaster',
        description: 'Estimate your monthly loan payments in seconds.',
        url: 'https://unitmaster.io/calculators/finance/loan',
        type: 'website',
    },
};

export default function LoanPage() {
    return (
        <>
            <LoanCalculatorClient />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FinancialProduct',
                        name: 'Loan Calculator',
                        description: 'A tool to calculate loan payments.',
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
