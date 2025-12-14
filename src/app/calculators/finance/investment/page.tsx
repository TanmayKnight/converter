import { Metadata } from 'next';
import { InvestmentCalculatorClient } from '@/components/calculators/InvestmentCalculatorClient';

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

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Measuring Investment Success: ROI vs. CAGR</h2>
                <p>
                    Investing without measuring performance is like driving with your eyes closed.
                    The <strong>UnitMaster Investment Calculator</strong> helps you translate raw numbers into actionable growth metrics.
                </p>

                <h3>ROI (Return on Investment)</h3>
                <p>
                    ROI is the simplest metric. It answers: <em>"For every dollar I put in, how many did I get back?"</em>
                    <br />
                    <strong>Formula:</strong> <code>(Net Profit / Total Investment) * 100</code>
                </p>

                <h3>CAGR (Compound Annual Growth Rate)</h3>
                <p>
                    ROI can be misleading for long-term investments. A 50% ROI looks great, but if it took 10 years to achieve, that's actually a terrible return (only ~4% per year).
                    <strong>CAGR</strong> smooths out the volatility and tells you the <em>annual</em> growth rate you effectively earned.
                </p>

                <h3>Types of Investments</h3>
                <ul>
                    <li><strong>Fixed Deposits (CDs)</strong>: Low risk, guaranteed returns, but often barely beat inflation.</li>
                    <li><strong>Equities (Stocks)</strong>: High risk, high potential return. Historically average 8-10% (S&P 500) over long periods.</li>
                    <li><strong>Real Estate</strong>: Offers both rental yield (cash flow) and capital appreciation (growth).</li>
                </ul>

                <h3>The Rule of 72</h3>
                <p>
                    Want to know how fast your money will double? Divide 72 by your interest rate.
                </p>
                <ul>
                    <li>At 6% return: 72 / 6 = 12 years to double.</li>
                    <li>At 12% return: 72 / 12 = 6 years to double.</li>
                </ul>
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
        </>
    );
}
