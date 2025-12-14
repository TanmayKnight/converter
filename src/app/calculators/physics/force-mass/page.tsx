import type { Metadata } from 'next';
import MassForceCalculatorClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Force Converter - Mass to Force Calculator (kg to kN)',
    description: 'Convert Mass (kg) to Force (kN) instantly. Uses standard gravity 9.80665 m/s². Simple and accurate physics calculator.',
    keywords: ['force calculator', 'mass to force', 'kg to newton', 'kg to kn', 'physics calculator', 'weight calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/physics/force-mass',
    },
};

export default function MassForcePage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Mass ↔ Force Converter</h1>
                <p className="text-muted-foreground">Convert Mass (Kilograms) to Force (Kilonewtons) using standard Earth gravity.</p>
            </div>

            <MassForceCalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Mass vs. Weight (Force)</h2>
                <p>
                    In everyday language, we use &quot;weight&quot; to mean mass, but in physics, they are different.
                </p>
                <ul>
                    <li><strong>Mass (kg)</strong> is the amount of matter in an object. It stays the same wherever you are.</li>
                    <li><strong>Weight/Force (N)</strong> is the force of gravity acting on that mass. It changes depending on gravity (e.g., you weigh less on the Moon).</li>
                </ul>

                <h3>The Formula</h3>
                <p>
                    <strong>F = m × a</strong> (Newton&apos;s Second Law)
                    <br />
                    On Earth, acceleration (a) is gravity (g) ≈ 9.80665 m/s².
                </p>
                <p>
                    So, <code>Force (Newtons) = Mass (kg) × 9.80665</code>
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is a Newton (N)?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    A Newton is the SI unit of force. One Newton is the force needed to accelerate 1 kilogram of mass at the rate of 1 meter per second squared.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is a Kilonewton (kN)?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    A Kilonewton is equal to 1,000 Newtons. It is often used in engineering and construction to measure heavy loads.
                                    1 kN ≈ 102 kg of mass on Earth.
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
                                name: 'How do you convert kg to Newtons?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Multiply the mass in kg by 9.81 (or precise 9.80665). For example, 10 kg × 9.81 = 98.1 N.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is mass the same as weight?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'No. Mass is the quantity of matter (constant). Weight is the force of gravity on that matter (varies by location).'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
