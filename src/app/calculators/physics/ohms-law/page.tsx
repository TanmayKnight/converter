import type { Metadata } from 'next';
import OhmsLawCalculatorClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Ohm\'s Law Calculator - Voltage, Current, Resistance & Power',
    description: 'Calculate Volts, Amps, Ohms, and Watts instantly. Easy to use Ohm\'s Law calculator for students, engineers, and hobbyists.',
    keywords: ['ohms law calculator', 'voltage calculator', 'current calculator', 'resistance calculator', 'power calculator', 'watts calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/physics/ohms-law',
    },
};

export default function OhmsLawPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Ohm&apos;s Law Calculator</h1>
                <p className="text-muted-foreground">Calculate Voltage, Current, Resistance, and Power.</p>
            </div>

            <OhmsLawCalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Ohm&apos;s Law: The Foundation of Electronics</h2>
                <p>
                    If you want to understand how electricity works, you must understand Ohm&apos;s Law.
                    Discovered by Georg Ohm in 1827, it describes the relationship between Voltage, Current, and Resistance.
                </p>

                <h3>The Water Pipe Analogy</h3>
                <p>
                    The easiest way to visualize electricity is to think of water flowing through a pipe:
                </p>
                <ul>
                    <li><strong>Voltage (V)</strong> = <strong>Water Pressure</strong>. It is the force pushing the electrons. Measured in Volts.</li>
                    <li><strong>Current (I)</strong> = <strong>Flow Rate</strong>. It is how much water (electrons) is actually moving. Measured in Amps.</li>
                    <li><strong>Resistance (R)</strong> = <strong>Pipe Size</strong>. A narrow pipe resists flow; a wide pipe allows it. Measured in Ohms (Ω).</li>
                </ul>

                <h3>The Formulas</h3>
                <p>The primary formula is <code>V = I × R</code>. From this, we can derive:</p>
                <ul>
                    <li><code>I = V / R</code> (Current = Voltage divided by Resistance)</li>
                    <li><code>R = V / I</code> (Resistance = Voltage divided by Current)</li>
                </ul>

                <h3>What about Power (Watts)?</h3>
                <p>
                    Power (P) describes the rate of energy consumption. The formula is <code>P = V × I</code>.
                    <br />
                    <em>Example:</em> A 100-Watt lightbulb running on 120 Volts draws about 0.83 Amps.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why do wires get hot?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    All wires have some <strong>Resistance</strong>. When Current flows through them, some energy is lost as heat due to this resistance (P = I²R).
                                    If you push too much current through a thin wire (high resistance), it generates excessive heat and can melt.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is a Short Circuit?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    A short circuit happens when there is very low <strong>Resistance</strong> between two points of different voltage.
                                    According to Ohm&apos;s Law (I = V/R), if R is close to zero, I (Current) becomes extremely high.
                                    This massive surge of current causes sparks, heat, and blown fuses.
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
                                name: 'What is the formula for Ohms Law?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'The fundamental formula is V = I × R, where V is Voltage (Volts), I is Current (Amperes), and R is Resistance (Ohms).'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How do I calculate Watts from Volts and Amps?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'To calculate Power (Watts), multiply Voltage (Volts) by Current (Amps). The formula is P = V × I.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
