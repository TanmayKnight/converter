import { Metadata } from 'next';
import { TaxCalculatorClient } from '@/components/calculators/TaxCalculatorClient';

export const metadata: Metadata = {
    title: 'GST & VAT Calculator - Calculate Tax Instantly',
    description: 'Free online Goods and Services Tax (GST) and Value Added Tax (VAT) calculator. Accurate for USA, UK, India, and Australia.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/tax',
    },
    openGraph: {
        title: 'Tax Calculator | UnitMaster',
        description: 'Calculate GST and VAT totals in seconds.',
        url: 'https://unitmaster.io/calculators/finance/tax',
        type: 'website',
    },
};

export default function TaxPage() {
    return (
        <>
            <TaxCalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>GST, VAT, and Sales Tax: A Global Guide</h2>
                <p>
                    Whether you are a freelancer issuing an invoice or a traveler trying to figure out a refund, tax calculations can be confusing.
                    <strong>UnitMaster Tax Calculator</strong> handles the two most common scenarios: "Adding Tax" and "Removing Tax".
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
