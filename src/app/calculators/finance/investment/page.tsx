import { Metadata } from 'next';
import { InvestmentCalculatorClient } from '@/components/calculators/InvestmentCalculatorClient';
import { BankOfferList } from '@/components/monetization/BankOfferList';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Investment Calculator - Wealth Growth Charts & PDF Reports',
    description: 'Visualize your compound interest with interactive charts. Download professional Wealth Growth PDF reports. Supports SIP, Lumpsum, and Inflation adjustment.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/investment',
    },
    openGraph: {
        title: 'Investment Growth Visualizer | UnitMaster',
        description: 'See your money grow with interactive charts and PDF reports.',
        url: 'https://unitmaster.io/calculators/finance/investment',
        type: 'website',
    },
};

export default function InvestmentPage() {
    return (
        <>
            <InvestmentCalculatorClient />

            <div className="container mx-auto px-4 max-w-4xl mt-12 mb-8">
                <BankOfferList
                    title="Maximize Your Lazy Money"
                    subtitle="Don't let inflation eat your cash. Top High-Yield Savings Accounts (HYSA)."
                    offers={[
                        {
                            id: 'sofi-savings',
                            bankName: 'SoFi Checking & Savings',
                            description: 'Get up to $300 bonus. No account fees. FDIC Insured.',
                            rateHighlight: '4.60% APY',
                            ctaText: 'Open Account',
                            affiliateLink: '#', // Replace with link
                            featured: true
                        },
                        {
                            id: 'ally-bank',
                            bankName: 'Ally Bank',
                            description: 'A customer favorite. Great mobile app, buckets for savings goals.',
                            rateHighlight: '4.20% APY',
                            ctaText: 'Start Saving',
                            affiliateLink: '#'
                        }
                    ]}
                />
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Measuring Investment Success: ROI vs. CAGR</h2>
                <p>
                    Investing without measuring performance is like driving with your eyes closed.
                    The <strong>UnitMaster Investment Calculator</strong> helps you translate raw numbers into actionable growth metrics.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>ROI vs. CAGR: What's the difference?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    ROI is the simplest metric. It answers: <em>"For every dollar I put in, how many did I get back?"</em>
                                    <br />
                                    <strong>Formula:</strong> <code>(Net Profit / Total Investment) * 100</code>
                                </p>
                                <p>
                                    ROI can be misleading for long-term investments. A 50% ROI looks great, but if it took 10 years to achieve, that's actually a terrible return (only ~4% per year).
                                    <strong>CAGR (Compound Annual Growth Rate)</strong> smooths out the volatility and tells you the <em>annual</em> growth rate you effectively earned.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Types of Investments</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Fixed Deposits (CDs)</strong>: Low risk, guaranteed returns, but often barely beat inflation.</li>
                                    <li><strong>Equities (Stocks)</strong>: High risk, high potential return. Historically average 8-10% (S&P 500) over long periods.</li>
                                    <li><strong>Real Estate</strong>: Offers both rental yield (cash flow) and capital appreciation (growth).</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>The Rule of 72</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Want to know how fast your money will double? Divide 72 by your interest rate.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>At 6% return: 72 / 6 = 12 years to double.</li>
                                    <li>At 12% return: 72 / 12 = 6 years to double.</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'What is the difference between ROI and CAGR?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'ROI calculates total return (Net Profit / Total Investment), which can be misleading for long periods. CAGR (Compound Annual Growth Rate) calculates the effective annual growth rate, smoothing out volatility.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What is the Rule of 72?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'The Rule of 72 is a quick way to estimate doubling time. Divide 72 by your interest rate to find years to double. For example, at 8% return, money doubles in 9 years (72/8).'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What is a safe average return for stocks?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Historically, the S&P 500 has returned approximately 8-10% annually over long periods before inflation adjustment.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
