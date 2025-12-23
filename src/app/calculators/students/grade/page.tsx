
import type { Metadata } from 'next';
import { GradeCalculator } from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Grade Calculator - What Do I Need on My Final Exam? | UnitMaster',
    description: 'Calculate exactly what score you need on your final exam to achieve your target grade. Easy, accurate, and works offline.',
    keywords: [
        'grade calculator',
        'final grade calculator',
        'what do I need on my final',
        'exam score calculator',
        'college grade calculator',
        'weighted grade calculator',
        'course grade estimator',
    ],
    openGraph: {
        title: 'Grade Calculator - What Do I Need to Pass? | UnitMaster',
        description: 'Stop guessing. Calculate exactly what you need on your final exam with our free Grade Calculator.',
        type: 'website',
    }
};

export default function GradeCalculatorPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Calculators', path: '/calculators' },
                    { name: 'Students', path: '/calculators/students' },
                    { name: 'Grade Calculator', path: '/calculators/students/grade' },
                ]}
            />

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Final Grade Calculator</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Determine the exact score you need on your final exam to reach your target course grade.
                </p>
            </div>

            <GradeCalculator />

            <div className="mt-16">
                <SeoContentSection
                    title="How to Calculate Your Final Grade"
                    description="Calculating your required final exam score shouldn't be a mystery. Our calculator uses a standard weighted average formula to tell you exactly where you stand. Whether you're aiming for an A or just trying to pass, this tool gives you the numbers you need to study smarter."
                    features={[
                        { title: "Target Score Analysis", description: "Instantly see if your goal is mathematically possible." },
                        { title: "Weighted Formula", description: "Accurately handles final exams worth 10%, 20%, or 50% of your grade." },
                        { title: "Privacy-First", description: "Your grades are private. All calculations happen in your browser." },
                        { title: "Status Alerts", description: "Get warned if you need >100% (extra credit) or if you've already clinched the grade." },
                    ]}
                    faqs={[
                        {
                            question: "How is the required score calculated?",
                            answer: "We use the formula: (Goal - (Current Grade × (1 - Weight))) ÷ Weight. For example, if you have an 80%, want an 85%, and the final is worth 20%, you need an 105% on the final."
                        },
                        {
                            question: "What if I need over 100%?",
                            answer: "This means it is mathematically impossible to reach your target grade without extra credit. You may need to lower your target grade to see what is realistic."
                        },
                        {
                            question: "Does this save my grades?",
                            answer: "No. UnitMaster is a privacy-first platform. We do not store, track, or sell your academic data."
                        }
                    ]}
                    jsonLd={{
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "UnitMaster Grade Calculator",
                        "applicationCategory": "EducationalApplication",
                        "operatingSystem": "Any",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "featureList": "Final Grade Calculation, Weighted Grade Estimation",
                        "about": {
                            "@type": "Thing",
                            "name": "Grading in Education"
                        }
                    }}
                />
            </div>
        </div>
    );
}
