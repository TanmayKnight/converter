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

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Retirement Planning: The Financial Freedom Formula</h2>
                <p>
                    Retirement isn't an age; it's a financial number. The <strong>UnitMaster Retirement Planner</strong> helps you calculate exactly how big your "Nest Egg" needs to be to support your lifestyle indefinitely.
                </p>

                <h3>The 4% Rule (Safe Withdrawal Rate)</h3>
                <p>
                    The "4% Rule" is a common rule of thumb in retirement planning. It states that you can withdraw 4% of your portfolio in the first year of retirement (adjusted for inflation thereafter) and have a very high probability of never running out of money over a 30-year period.
                    <br />
                    <strong>Formula:</strong> <code>Financial Freedom Number = Annual Expenses × 25</code>.
                </p>

                <h3>FIRE Movement (Financial Independence, Retire Early)</h3>
                <p>
                    FIRE is a lifestyle movement with the goal of gaining financial independence and retiring early.
                    By aggressively saving (often 50-70% of income) and investing in low-cost index funds, followers of FIRE aim to retire in their 30s or 40s.
                </p>

                <h3>Inflation: The Silent Killer</h3>
                <p>
                    $1 million today will not have the same purchasing power in 20 years.
                    Our calculator automatically adjusts for inflation (typically 2-3%), showing you the <em>future value</em> you need to target.
                </p>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'What is the 4% Rule for retirement?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'The 4% Rule suggests you can withdraw 4% of your portfolio annually (adjusted for inflation) without running out of money for at least 30 years. It implies you need to save 25 times your annual expenses.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How do I calculate my Financial Freedom number?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Multiply your expected annual expenses in retirement by 25. For example, if you spend $40,000/year, you need $1,000,000 invested ($40,000 x 25) to retire safely under the 4% rule.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What is FIRE?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'FIRE stands for Financial Independence, Retire Early. It is a strategy of aggressive saving and low-cost investing to reach financial freedom well before traditional retirement age.'
                                }
                            }
                        ]
                    }),
                }}
            />
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
