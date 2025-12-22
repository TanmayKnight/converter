import type { Metadata } from 'next';
import VolumeCalculatorClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Volume Calculator - Calculate Volume of 3D Shapes',
    description: 'Free Volume Calculator. Calculate the capacity of a cube, cylinder, sphere, cone, pyramid, and more. Essential for construction and science. Works offline.',
    keywords: ['volume calculator', 'cubic volume', 'calculate volume', 'volume of cylinder', 'volume of sphere', 'cube volume'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/geometry/volume',
    },
};

export default function VolumePage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Volume Calculator</h1>
                <p className="text-muted-foreground">Calculate volume for various 3D shapes.</p>
            </div>

            <VolumeCalculatorClient />

            <SeoContentSection
                title="Understanding 3D Volume & Capacity"
                description="Volume is the quantity of three-dimensional space enclosed by a closed surface. Whether you are filling a swimming pool or shipping a box, understanding volume (cubic units) is essential."
                features={[
                    {
                        title: "Comprehensive Shapes",
                        description: "Cube, Rectangular Prism, Cylinder, Sphere, Cone, Pyramid, and more."
                    },
                    {
                        title: "Unit Conversion",
                        description: "Understand the relationship between cubic meters, liters, gallons, and cubic feet."
                    },
                    {
                        title: "Visual Aid",
                        description: "Clear formulas help you understand the geometry behind the result."
                    }
                ]}
                benefits={[
                    "Calculate shipping volume.",
                    "Estimate pool capacity.",
                    "Science & Engineering.",
                    "100% Client-side."
                ]}
                faqs={[
                    {
                        question: "What is the difference between Volume and Capacity?",
                        answer: "Technically, Volume is the amount of space an object takes up (external). Capacity is the amount of substance (like liquid) an object can hold (internal). For thin-walled containers, they are approximately the same."
                    },
                    {
                        question: "How many liters in a cubic meter?",
                        answer: "There are exactly 1,000 liters in 1 cubic meter (m³). Also, 1 cubic centimeter (cc) is equal to 1 milliliter (ml)."
                    },
                    {
                        question: "How do calculate the volume of a box?",
                        answer: "Simply multiply Length × Width × Height. Ensure all units are the same (e.g., all in inches)."
                    },
                    {
                        question: "What is the volume of a sphere?",
                        answer: "The formula is V = (4/3)πr³, where r is the radius."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Volume Calculator",
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
                    { name: 'Geometry Calculators', path: '/calculators/geometry' },
                    { name: 'Volume Calculator', path: '/calculators/geometry/volume' }
                ]}
            />
        </div>
    );
}
