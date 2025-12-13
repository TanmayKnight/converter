import { Metadata } from 'next';
import { MortgageCalculatorClient } from '@/components/calculators/MortgageCalculatorClient';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    // ... existing metadata ...
    // Note: I will keep the existing metadata block intact in the real file, I'm just showing context here
    title: 'Free Mortgage Calculator - Estimate Monthly Payments & Interest',
    description: 'Calculate your monthly mortgage payments with our free, highly accurate tool. Visualize amortization, interest rates, and loan terms instantly.',
    alternates: {
        canonical: 'https://unitmasterapp.com/calculators/finance/mortgage',
    },
    openGraph: {
        title: 'Mortgage Calculator | UnitMaster',
        description: 'Plan your home purchase with our precision mortgage calculator.',
        url: 'https://unitmasterapp.com/calculators/finance/mortgage',
        type: 'website',
    },
};

export default function MortgagePage() {
    return (
        <>
            <MortgageCalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Understanding Your Mortgage: Amortization & Strategies</h2>
                <p>
                    A mortgage is likely the biggest debt you will ever take on. Understanding how it works can save you tens of thousands of dollars in interest.
                    The <strong>UnitMaster Mortgage Calculator</strong> doesn't just show you a monthly payment; it helps you visualize the long-term cost of borrowing.
                </p>

                <h3>The Truth About Amortization</h3>
                <p>
                    Most people are shocked when they see their capitalization table (Amortization Schedule).
                    In the first few years of a 30-year mortgage, the vast majority of your payment goes towards <strong>Interest</strong>, not Principal.
                </p>
                <ul>
                    <li><strong>Years 1-10</strong>: You are mostly paying rent to the bank. Your loan balance hardly moves.</li>
                    <li><strong>Years 10-20</strong>: The scale starts to tip. You contribute more to equity.</li>
                    <li><strong>Years 20-30</strong>: You are finally paying off the house itself.</li>
                </ul>

                <h3>The "One Extra Payment" Hack</h3>
                <p>
                    Because interest is calculated on your remaining balance, prepaying even a small amount has a massive compounding effect.
                    Making just <strong>one extra mortgage payment per year</strong> (applied directly to principal) can:
                </p>
                <ol>
                    <li>Shorten a 30-year loan by roughly <strong>4 to 5 years</strong>.</li>
                    <li>Save you tens of thousands of dollars in interest payments.</li>
                </ol>

                <h3>Fixed-Rate vs. ARM</h3>
                <p>
                    <strong>Fixed-Rate Mortgages</strong> lock in your interest rate for the life of the loan. This provides stability—your principal and interest payment will never change, regardless of inflation or economic turmoil.
                </p>
                <p>
                    <strong>Adjustable-Rate Mortgages (ARM)</strong> offer a lower introductory rate (e.g., for 5 or 7 years), but then the rate floats with the market.
                    These are risky but can be smart if you plan to move or refinance before the fixed period ends.
                </p>

                <h3>What is PMI?</h3>
                <p>
                    Private Mortgage Insurance (PMI) is an extra fee you pay if your down payment is less than 20% of the home's value.
                    It protects the lender, not you. Once you build 20% equity in your home, you should contact your lender immediately to have PMI removed.
                </p>
            </div>

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Finance', path: '#' },
                    { name: 'Mortgage Calculator', path: '/calculators/finance/mortgage' }
                ]}
            />
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
