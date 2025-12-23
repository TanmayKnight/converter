import type { Metadata } from 'next';
import GPACalculatorClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'GPA Calculator - Calculate College & High School Grade Points',
    description: 'Free GPA Calculator for college and high school. Calculate your semester and cumulative GPA instantly. Supports 4.0 scale and weighted grades. Works offline.',
    keywords: ['gpa calculator', 'college gpa', 'high school gpa', 'cumulative gpa calculator', 'grade point average', 'semester gpa'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/students/gpa',
    },
};

export default function GPAPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">GPA Calculator</h1>
                <p className="text-muted-foreground">Calculate your Semester and Cumulative Grade Point Average easily.</p>
            </div>

            <div className="container mx-auto px-4 max-w-5xl">
                <GPACalculatorClient />
            </div>

            <SeoContentSection
                title="The Ultimate GPA Calculator for College & High School"
                description={`
                    <p>Maintaining a high <strong>Grade Point Average (GPA)</strong> is crucial for academic success, scholarship eligibility, and future graduate school applications. Our free <strong>GPA Calculator</strong> takes the guesswork out of your semester planning. Whether you are a college student handling weighted credits or a high schooler planning for ivy league admissions, this tool is designed for strict accuracy.</p>
                    
                    <h3>Why use a Weighted GPA Calculator?</h3>
                    <p>Simple averaging doesn't work in college. A 4-credit <em>Advanced Calculus</em> course impacts your GPA four times as much as a 1-credit <em>Lab</em>. Our algorithm uses the standard <strong>(Credit Hours × Grade Points) / Total Credits</strong> formula used by 99% of US Universities (including Harvard, Stanford, and State Colleges).</p>

                    <h3>How to Calculate GPA Manually</h3>
                    <p>If you prefer doing the math yourself, here is the formula:</p>
                    <ol>
                        <li>Convert every letter grade to points (A=4, B=3, etc.).</li>
                        <li>Multiply course points by credit hours to get "Quality Points".</li>
                        <li>Sum all Quality Points.</li>
                        <li>Divide by the Total Credit Hours attempting.</li>
                    </ol>
                    <p>Or, simply use the tool above to do it instantly and privately.</p>
                `}
                features={[
                    {
                        title: "4.0 Scale Support",
                        description: "Full support for the standard 4.0 scale including plus/minus grades (A-, B+)."
                    },
                    {
                        title: "Cumulative Tracking",
                        description: "Don't just calculate one semester. Add your previous cumulative GPA and credits to see your new total standing after this semester."
                    },
                    {
                        title: "Privacy Focused",
                        description: "Unlike Chegg or other calculator sites, we do NOT track your grades. All calculation happens in your browser via JavaScript."
                    }
                ]}
                benefits={[
                    "Plan for Dean's List (3.5+ GPA).",
                    "Track eligibility for Financial Aid.",
                    "Estimate required grades for Magna Cum Laude.",
                    "100% Offline Capable."
                ]}
                faqs={[
                    {
                        question: "What is considered a good GPA in college?",
                        answer: "Generally, a **3.0 (B average)** is considered good and safe for graduation. A **3.5+** typically qualifies you for the Dean's List and honors programs. Competitive graduate schools (Medical/Law) often look for **3.7+**."
                    },
                    {
                        question: "How do I calculate Cumulative GPA?",
                        answer: "Cumulative GPA is the average of ALL semesters. To calculate it: Take your (Previous GPA × Previous Total Credits) to get old points. Add current semester points. Divide the total points by the total credits (Previous + Current)."
                    },
                    {
                        question: "Do 'W' (Withdrawal) grades affect GPA?",
                        answer: "No. A 'W' grade usually does not carry grade points and is not included in the GPA calculation. However, it may affect your 'Satisfactory Academic Progress' for financial aid."
                    },
                    {
                        question: "How does a 4.0 scale convert to percentage?",
                        answer: "While it varies by school, typically: A (4.0) is 93-100%, A- (3.7) is 90-92%, B+ (3.3) is 87-89%, B (3.0) is 83-86%, and so on. Any grade below 60% is usually an F (0.0)."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "GPA Calculator",
                    "applicationCategory": "EducationalApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            />

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Student Tools', path: '/calculators/students' },
                    { name: 'GPA Calculator', path: '/calculators/students/gpa' }
                ]}
            />
        </div>
    );
}
