import { Metadata } from 'next';
import { LoanCalculatorClient } from '@/components/calculators/LoanCalculatorClient';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Advanced Loan Calculator - Compare Auto, Personal & Payday Loans',
    description: 'Compare different loan offers side-by-side. Generate PDF amortization schedules and visualize standard vs. accelerated payoff plans.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/loan-advanced',
    },
    openGraph: {
        title: 'Loan Calculator & Comparison Tool | UnitMaster',
        description: 'Compare loans, download PDF reports, and save money.',
        url: 'https://unitmaster.io/calculators/finance/loan-advanced',
        type: 'website',
    },
};

export default function AdvancedLoanPage() {
    return (
        <>
            <LoanCalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Compare & Optimize Your Loans</h2>
                <p>
                    Whether you are buying a car, consolidating debt, or taking a personal loan, the "Interest Rate" isn't the only factor.
                    The <strong>UnitMaster Advanced Loan Calculator</strong> helps you make smarter borrowing decisions.
                </p>

                <h3>Features</h3>
                <ul>
                    <li><strong>Comparison Mode</strong>: Enter two different loan scenarios (e.g., Dealer Financing vs. Bank Loan) to see which one costs less over time.</li>
                    <li><strong>Amortization Chart</strong>: Visualize how fast your balance drops.</li>
                    <li><strong>PDF Reports</strong>: Download a professional schedule to keep for your records.</li>
                </ul>

                <h3>Types of Loans</h3>
                <p>
                    <strong>Personal Loans</strong>: Unsecured loans often used for debt consolidation. Rates vary widely based on credit score.
                    <br />
                    <strong>Auto Loans</strong>: Secured by the vehicle. Often have lower rates but shorter terms (3-7 years).
                    <br />
                    <strong>Payday Loans</strong>: Extremely high-interest, short-term loans. Use our calculator to see the true cost of these loans (often 300%+ APR).
                </p>
            </div>

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Finance', path: '#' },
                    { name: 'Advanced Loan Calculator', path: '/calculators/finance/loan-advanced' }
                ]}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FinancialProduct',
                        name: 'Advanced Loan Calculator',
                        description: 'A tool to compare personal, auto, and payday loans with amortization schedules.',
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'What is the difference between Personal and Auto loans?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Personal loans are unsecured and can be used for any purpose, often with higher rates. Auto loans are secured by the vehicle, usually offering lower rates but with stricter terms.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Are Payday loans worth it?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Payday loans are extremely high-interest short-term loans (often 300%+ APR). They should be avoided if possible. Use our calculator to see the true cost before borrowing.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How does Loan Comparison help?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Looking at just the monthly payment is misleading. Loan Comparison shows the total interest paid over the life of two different loans (e.g., Dealer Financing vs. Bank Loan).'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
