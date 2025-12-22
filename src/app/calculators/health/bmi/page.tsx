import type { Metadata } from 'next';
import BMICalculatorClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'BMI Calculator - Body Mass Index (Metric & Imperial) | UnitMaster',
    description: 'Free BMI Calculator for Men, Women, and Kids. Check your Body Mass Index score, learn about healthy weight ranges, and track your fitness goals. Works offline.',
    keywords: ['bmi calculator', 'body mass index', 'calculate bmi', 'bmi chart', 'healthy weight calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/health/bmi',
    },
};

export default function BMIPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
                <p className="text-muted-foreground">Calculate your Body Mass Index (BMI) to understand your health status.</p>
            </div>

            <BMICalculatorClient />

            <SeoContentSection
                title="What is Body Mass Index (BMI)?"
                description="BMI is a simple screening tool used to identify potential weight problems in adults. It divides a person's weight (in kilograms) by their height (in meters squared). While it doesn't measure body fat directly, it correlates with direct measures of body fat."
                features={[
                    {
                        title: "Metric & Imperial",
                        description: "Calculate using kilograms/meters or pounds/inches."
                    },
                    {
                        title: "Category Visualization",
                        description: "See exactly where you fall on the underweight-to-obese spectrum."
                    },
                    {
                        title: "Health Insights",
                        description: "Understand the implications of your BMI score."
                    }
                ]}
                benefits={[
                    "Screen for weight issues.",
                    "Track fitness progress.",
                    "Simple & Fast.",
                    "100% Private Data."
                ]}
                faqs={[
                    {
                        question: "What is a healthy BMI?",
                        answer: "A healthy BMI generally falls between 18.5 and 24.9 for most adults. Under 18.5 is considered underweight, while 25.0 to 29.9 is overweight, and 30.0 or higher is obese."
                    },
                    {
                        question: "Is BMI accurate for children?",
                        answer: "For children and teens (ages 2-19), BMI is calculated normally but interpreted differently using percentiles relative to age and gender. This calculator is primarily designed for adults (20+)."
                    },
                    {
                        question: "Is BMI the best measure of health?",
                        answer: "No, BMI is just a screening tool. It does not account for muscle mass, bone density, or fat distribution (e.g., athletes often have high BMIs due to muscle). Waist circumference and body fat percentage are also useful indicators."
                    },
                    {
                        question: "How can I lower my BMI?",
                        answer: "Healthy weight loss involves a combination of balanced diet (rich in fruits, vegetables, lean proteins) and regular physical activity (aim for 150 minutes/week). Always consult a doctor before starting a new regimen."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "BMI Calculator",
                    "applicationCategory": "HealthApplication",
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
                    { name: 'Health Calculators', path: '/calculators/health' },
                    { name: 'BMI Calculator', path: '/calculators/health/bmi' }
                ]}
            />
        </div>
    );
}
