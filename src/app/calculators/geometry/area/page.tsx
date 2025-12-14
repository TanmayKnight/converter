import type { Metadata } from 'next';
import AreaCalculatorClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Area Calculator - Calculate Surface Area of Shapes',
    description: 'Free Area Calculator. Calculate the area of circle, triangle, rectangle, square, trapezoid, and more instantly. Simple formulas for geometry.',
    keywords: ['area calculator', 'calculate area', 'surface area calculator', 'area of circle', 'area of triangle', 'geometry calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/geometry/area',
    },
};

export default function AreaPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Area Calculator</h1>
                <p className="text-muted-foreground">Calculate surface area for various 2D shapes.</p>
            </div>

            <AreaCalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Mastering 2D Geometry</h2>
                <p>
                    Area is the quantity that expresses the extent of a two-dimensional region, shape, or planar lamina, in the plane.
                    From buying the right amount of paint for a wall to calculating the size of a pizza, area is one of the most practical math concepts.
                </p>

                <h3>Common Area Formulas</h3>
                <p className="text-muted-foreground mb-8">
                    Select a shape above to see its specific formula and calculation details.
                </p>

                <h3>Real World Examples</h3>
                <p>
                    <strong>Land Area:</strong> Measured in Acres or Hectares. 1 Acre ≈ 43,560 square feet.
                    <br />
                    <strong>Flooring:</strong> Sold by the square foot (sq ft) or square meter (sq m). Always buy 10% extra for waste!
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the difference between Area and Perimeter?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    <strong>Perimeter</strong> is the total length of the boundary (the fence around the yard).
                                    <br />
                                    <strong>Area</strong> is the space inside the boundary (the grass in the yard).
                                    <br />
                                    They use different units (ft vs. sq ft).
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How many square feet in a square yard?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    There are <strong>9</strong> square feet in 1 square yard.
                                    <br />
                                    Why? Because 1 yard = 3 feet. So, 1 sq yard = 3 ft × 3 ft = 9 sq ft.
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
                                name: 'What is the formula for area of a circle?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'The area of a circle is calculated as A = πr², where r is the radius and π is approximately 3.14159.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How do you calculate acreage?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'To calculate acres, find the area in square feet and divide by 43,560. For example, a 100,000 sq ft lot is 100,000 / 43,560 = 2.29 acres.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
