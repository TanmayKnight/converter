import type { Metadata } from 'next';
import AreaCalculatorClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Area Calculator - Calculate Surface Area of Shapes',
    description: 'Free Area Calculator. Calculate the area of circle, triangle, rectangle, square, trapezoid, and more instantly. Simple formulas for geometry. Works offline.',
    keywords: ['area calculator', 'calculate area', 'surface area calculator', 'area of circle', 'area of triangle', 'geometry calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/geometry/area',
    },
};

export default function AreaPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Area Calculator</h1>
                <p className="text-muted-foreground">Calculate surface area for various 2D shapes.</p>
            </div>

            <AreaCalculatorClient />

            <SeoContentSection
                title="Mastering 2D Geometry: Area Calculations"
                description="Area is the quantity that expresses the extent of a two-dimensional region, shape, or planar lamina. From buying the right amount of paint for a wall to calculating the size of a pizza, area is one of the most practical math concepts."
                features={[
                    {
                        title: "Multiple Shapes",
                        description: "Support for Circle, Triangle, Rectangle, Square, Trapezoid, Ellipse, and more."
                    },
                    {
                        title: "Instant Results",
                        description: "See the area update in real-time as you adjust dimensions."
                    },
                    {
                        title: "Educational Formulas",
                        description: "Learn the math behind the calculation with displayed formulas."
                    }
                ]}
                benefits={[
                    "Home improvement planning.",
                    "Math homework help.",
                    "Construction estimates.",
                    "100% Client-side."
                ]}
                faqs={[
                    {
                        question: "What is the difference between Area and Perimeter?",
                        answer: "Perimeter is the total length of the boundary (e.g., the fence around a yard). Area is the space inside the boundary (e.g., the grass in the yard). They use different units (ft vs. sq ft)."
                    },
                    {
                        question: "How many square feet in a square yard?",
                        answer: "There are 9 square feet in 1 square yard. (1 yard = 3 feet, so 1 sq yard = 3 ft × 3 ft = 9 sq ft)."
                    },
                    {
                        question: "What is the formula for area of a circle?",
                        answer: "The area of a circle is calculated as A = πr², where r is the radius and π is approximately 3.14159."
                    },
                    {
                        question: "How do you calculate acreage?",
                        answer: "To calculate acres, find the area in square feet and divide by 43,560. For example, a 100,000 sq ft lot is 100,000 / 43,560 = 2.29 acres."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Area Calculator",
                    "applicationCategory": "EducationalApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            />
        </div>
    );
}
