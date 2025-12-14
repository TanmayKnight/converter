import type { Metadata } from 'next';
import TrigCalculatorClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Trigonometry Calculator - Sin, Cos, Tan Online',
    description: 'Calculate Sine, Cosine, Tangent and their Inverse functions (Arcsin, Arccos, Arctan) instantly. Supports degrees.',
    keywords: ['trigonometry calculator', 'sin calculator', 'cos calculator', 'tan calculator', 'inverse sine', 'trig functions'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/trigonometry',
    },
};

export default function TrigPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Trigonometry Calculator</h1>
                <p className="text-muted-foreground">Calculate Sine, Cosine, Tangent and their inverses.</p>
            </div>

            <TrigCalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>The Triangle Math</h2>
                <p>
                    Trigonometry studies relationships between side lengths and angles of triangles.
                    It is fundamental to engineering, physics, and video game development (rotation!).
                </p>

                <h3>SOH CAH TOA</h3>
                <p>
                    The classic mnemonic for right-angled triangles:
                </p>
                <ul>
                    <li><strong>SOH</strong>: <strong>S</strong>ine = <strong>O</strong>pposite / <strong>H</strong>ypotenuse</li>
                    <li><strong>CAH</strong>: <strong>C</strong>osine = <strong>A</strong>djacent / <strong>H</strong>ypotenuse</li>
                    <li><strong>TOA</strong>: <strong>T</strong>angent = <strong>O</strong>pposite / <strong>A</strong>djacent</li>
                </ul>

                <h3>Inverse Functions (Arc)</h3>
                <p>
                    If you know the ratio of the sides but want to find the <strong>Angle</strong>, you use the Inverse functions: Arcsin (sin⁻¹), Arccos, and Arctan.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Does this calculator use Degrees or Radians?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    This calculator assumes inputs are in <strong>Degrees</strong>.
                                    Common calculators toggle between DEG/RAD, but everyday problems usually state angles in degrees (e.g., 90°, 45°).
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why is Tan(90°) undefined?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Tan = Sin/Cos.
                                    At 90 degrees, Cos is 0. Dividing by zero is mathematically undefined (it approaches infinity).
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
                                name: 'What is SOH CAH TOA?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'SOH CAH TOA is a mnemonic to remember the trig definitions. Sine = Opposite/Hypotenuse, Cosine = Adjacent/Hypotenuse, Tangent = Opposite/Adjacent.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How do I convert Degrees to Radians?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Multiply the degree value by Pi/180. For example, 180° * (π/180) = π radians.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
