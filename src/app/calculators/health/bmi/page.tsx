import type { Metadata } from 'next';
import BMICalculatorClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export const metadata: Metadata = {
    title: 'BMI Calculator - Body Mass Index (Metric & Imperial) | UnitMaster',
    description: 'Free BMI Calculator for Men, Women, and Kids. Check your Body Mass Index score, learn about healthy weight ranges, and track your fitness goals.',
    keywords: ['bmi calculator', 'body mass index', 'calculate bmi', 'bmi chart', 'healthy weight calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/health/bmi',
    },
};

export default function BMIPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
                <p className="text-muted-foreground">Calculate your Body Mass Index (BMI) to understand your health status.</p>
            </div>

            <BMICalculatorClient />



            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>What is Body Mass Index (BMI)?</h2>
                <p>
                    BMI is a simple screening tool used to identify potential weight problems in adults.
                    It divides a person&apos;s weight (in kilograms) by their height (in meters squared).
                    While it doesn&apos;t measure body fat directly, it correlates with direct measures of body fat.
                </p>

                <h3>BMI Categories</h3>
                <div className="grid md:grid-cols-4 gap-4 not-prose mb-8">
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-xl text-center">
                        <strong className="block text-blue-700 dark:text-blue-300">Underweight</strong>
                        <span className="text-sm">&lt; 18.5</span>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-xl text-center">
                        <strong className="block text-green-700 dark:text-green-300">Normal</strong>
                        <span className="text-sm">18.5 – 24.9</span>
                    </div>
                    <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-xl text-center">
                        <strong className="block text-yellow-700 dark:text-yellow-300">Overweight</strong>
                        <span className="text-sm">25 – 29.9</span>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-xl text-center">
                        <strong className="block text-red-700 dark:text-red-300">Obese</strong>
                        <span className="text-sm">30+</span>
                    </div>
                </div>

                <h3>Limitations of BMI</h3>
                <p>
                    BMI is a good general indicator, but it is not perfect. It does not distinguish between muscle and fat.
                </p>
                <ul>
                    <li><strong>Athletes:</strong> May have a high BMI because muscle is denser than fat.</li>
                    <li><strong>Elderly:</strong> May have a normal BMI but low muscle mass.</li>
                    <li><strong>Pregnancy:</strong> Verified BMI charts do not apply during pregnancy.</li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is BMI accurate for children?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    For children and teens (ages 2-19), BMI is calculated normally but interpreted differently using percentiles relative to age and gender. This calculator is designed for adults (20+).
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How can I lower my BMI?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Healthy weight loss involves a combination of diet and physical activity.
                                    Aim for 150 minutes of moderate exercise per week and a balanced diet rich in fruits, vegetables, and lean proteins.
                                    Always consult a doctor before starting a new regimen.
                                </p>
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
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'What is a healthy BMI?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'A healthy BMI generally falls between 18.5 and 24.9 for most adults. This range is associated with the lowest risk of weight-related health issues.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is BMI the best measure of health?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'No, BMI is just a screening tool. It does not account for muscle mass, bone density, or fat distribution (like belly fat). Waist circumference and body fat percentage are also useful indicators.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
