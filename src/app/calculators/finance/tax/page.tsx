import { Metadata } from 'next';
import { TaxCalculatorClient } from '@/components/calculators/TaxCalculatorClient';

export const metadata: Metadata = {
    title: 'Tax & Invoice Generator - GST, VAT & Legal Invoices',
    description: 'Calculate GST/VAT and generate professional PDF invoices instantly. Features automatic Tax ID validation (GSTIN/VAT) and legal invoice templates.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/tax',
    },
    openGraph: {
        title: 'Tax & Invoice Generator | UnitMaster',
        description: 'Create legal PDF invoices and calculate taxes with ID validation.',
        url: 'https://unitmaster.io/calculators/finance/tax',
        type: 'website',
    },
};

export default function TaxPage() {
    return (
        <>
            <TaxCalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Professional Invoice Generator & Tax Calculator</h2>
                <p>
                    Freelancers and small businesses need more than just a calculator.
                    <strong>UnitMaster</strong> combines a powerful GST/VAT calculator with a <strong>Legal Invoice Generator</strong>.
                    Create compliant PDF invoices, validate Tax IDs (GSTIN/VAT) automatically, and send professional estimates to clients.
                </p>

                <h3>The Difference Between VAT and GST</h3>
                <p>
                    Functionally, they are very similar (consumption taxes), but they generally apply to different regions:
                </p>
                <ul>
                    <li><strong>GST (Goods and Services Tax)</strong>: Common in Canada, Australia, New Zealand, and India. It is a single tax on the supply of goods and services.</li>
                    <li><strong>VAT (Value Added Tax)</strong>: Common in the UK and European Union. It is charged at each stage of production.</li>
                    <li><strong>Sales Tax</strong>: Common in the USA. It is usually only charged at the final point of sale to the consumer.</li>
                </ul>

                <h3>Inclusive vs. Exclusive Tax</h3>
                <p>
                    <strong>Exclusive</strong>: The price is $100 + 10% Tax = Bill is $110. (Common in US/Canada).
                    <br />
                    <strong>Inclusive</strong>: The bill is $110. You need to "back-calculate" to find the tax.
                    <br />
                    <em>Formula:</em> <code>Tax Amount = Total Price - (Total Price / (1 + Tax Rate))</code>.
                </p>

                <h3>Input Tax Credit (ITC)</h3>
                <p>
                    For business owners, GST/VAT is not a cost; it is a flow-through.
                    You collect tax from customers and pay tax to suppliers. You only pay the government the <em>difference</em>.
                    Keeping accurate calculations is essential to avoid overpaying your liability.
                </p>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FinancialProduct',
                        name: 'Tax & Invoice Generator',
                        description: 'A tool to calculate taxes and generate legal invoices.',
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
