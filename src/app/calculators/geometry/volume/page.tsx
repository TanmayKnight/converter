import type { Metadata } from 'next';
import VolumeCalculatorClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Volume Calculator - Calculate Volume of 3D Shapes',
    description: 'Free Volume Calculator. Calculate the capacity of a cube, cylinder, sphere, cone, pyramid, and more. Essential for construction and science.',
    keywords: ['volume calculator', 'cubic volume', 'calculate volume', 'volume of cylinder', 'volume of sphere', 'cube volume'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/geometry/volume',
    },
};

export default function VolumePage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Volume Calculator</h1>
                <p className="text-muted-foreground">Calculate volume for various 3D shapes.</p>
            </div>

            <VolumeCalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Understanding 3D Volume</h2>
                <p>
                    Volume is the quantity of three-dimensional space enclosed by a closed surface, for example, the space that a substance (solid, liquid, gas, or plasma) or shape occupies or contains.
                    Volume is often quantified numerically using the SI derived unit, the cubic meter.
                </p>

                <h3>Common Volume Formulas</h3>
                <p className="text-muted-foreground mb-8">
                    Select a shape above to see its specific formula and calculation details.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the difference between Volume and Capacity?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Technically, <strong>Volume</strong> is the amount of space an object takes up (external).
                                    <strong>Capacity</strong> is the amount of substance (like liquid) an object can hold (internal).
                                    For thin-walled containers, they are approximately the same.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How many liters in a cubic meter?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    There are exactly <strong>1,000 liters</strong> in 1 cubic meter (m³).
                                    <br />
                                    Also, 1 cubic centimeter (cc) is equal to 1 milliliter (ml).
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
                                name: 'How do calculate the volume of a box?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Simply multiply Length × Width × Height. Ensure all units are the same (e.g., all in inches).'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What is the volume of a sphere?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'The formula is V = (4/3)πr³, where r is the radius.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
