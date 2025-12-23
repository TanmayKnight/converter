
import type { Metadata } from 'next';
import { FinancialAidCalculator } from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Financial Aid Calculator - Estimate College Costs & Aid | UnitMaster',
    description: 'Free Financial Aid Calculator for students. Estimate your net price, total aid, and remaining costs for college. Privacy-first, runs entirely in your browser.',
    keywords: [
        'financial aid calculator',
        'college cost estimator',
        'net price calculator',
        'student loan calculator',
        'college budget tool',
        'FAFSA estimator',
        'scholarship calculator',
        'offline financial tool'
    ],
    openGraph: {
        title: 'Financial Aid Calculator | UnitMaster',
        description: 'Plan your college finances with our private, offline-capable Financial Aid Calculator.',
        type: 'website',
    }
};

export default function FinancialAidPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Calculators', path: '/calculators' },
                    { name: 'Students', path: '/calculators/students' },
                    { name: 'Financial Aid Calculator', path: '/calculators/students/financial-aid' },
                ]}
            />

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Financial Aid Calculator</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Estimate your true cost of college by calculating tuition, expected family contribution, and financial aid packages.
                </p>
            </div>

            <FinancialAidCalculator />

            <div className="mt-16">
                <SeoContentSection
                    title="Understanding Financial Aid & College Costs"
                    description="Our Financial Aid Calculator helps students and families navigate the complex world of college financing. By inputting your estimated costs and aid offers, you can determine your 'Net Price'—the amount you actually pay."
                    features={[
                        { title: "Net Price Calculation", description: "See the true cost after grants and scholarships." },
                        { title: "Gap Analysis", description: "Identify unmet financial need instantly." },
                        { title: "Privacy-First", description: "No financial data is sent to servers; everything stays in your browser." },
                        { title: "Dynamic Aid Types", description: "Distinguish between gift aid (grants) and self-help aid (loans/work-study)." },
                        { title: "Detailed Breakdown", description: "Visual cost vs. aid comparison." }
                    ]}
                    faqs={[
                        {
                            question: "What is Net Price?",
                            answer: "Net Price is the amount a student pays to attend an institution in a single academic year AFTER subtracting scholarships and grants the student receives. It is the best metric for comparing colleges."
                        },
                        {
                            question: "What is the difference between a Grant and a Loan?",
                            answer: "Grants and scholarships are 'gift aid'—financial aid that doesn't have to be repaid. Loans must be repaid with interest. Work-study provides part-time jobs for undergraduate and graduate students with financial need."
                        },
                        {
                            question: "Does this calculator save my financial data?",
                            answer: "No. This calculator is built with a privacy-first architecture. All calculations happen locally in your web browser. We do not store, transmit, or see your income or aid information."
                        },
                        {
                            question: "How accurate is this calculator?",
                            answer: "This tool provides an estimate based on the numbers you input. For official figures, always refer to your college's financial aid offer letter or use their specific Net Price Calculator."
                        }
                    ]}
                    jsonLd={{
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "UnitMaster Financial Aid Calculator",
                        "applicationCategory": "EducationalApplication",
                        "operatingSystem": "Any",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "featureList": "Net Price Calculation, Financial Aid Estimation, College Cost Planning",
                        "about": {
                            "@type": "Thing",
                            "name": "Financial Aid"
                        }
                    }}
                />
            </div>
        </div>
    );
}
