import { Metadata } from 'next';
import { TaxCalculatorClient } from '@/components/calculators/TaxCalculatorClient';

export const metadata: Metadata = {
    title: 'GST & VAT Calculator - Calculate Tax Instantly',
    description: 'Free online Goods and Services Tax (GST) and Value Added Tax (VAT) calculator. Accurate for USA, UK, India, and Australia.',
    alternates: {
        canonical: 'https://unitmasterapp.com/calculators/finance/tax',
    },
    openGraph: {
        title: 'Tax Calculator | UnitMaster',
        description: 'Calculate GST and VAT totals in seconds.',
        url: 'https://unitmasterapp.com/calculators/finance/tax',
        type: 'website',
    },
};

export default function TaxPage() {
    return (
        <>
            <TaxCalculatorClient />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FinancialProduct',
                        name: 'Tax Calculator',
                        description: 'A tool to calculate GST and VAT.',
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
