import type { Metadata } from 'next';
import PxRemConverterClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'PX to REM Converter - CSS Unit Calculator',
    description: 'Instantly convert Pixels (px) to REM units. The best tool for responsive web design and accessible CSS development.',
    keywords: ['px to rem', 'rem to px', 'css converter', 'web design calculator', 'css units', 'responsive typography'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/technology/px-to-rem',
    },
};

export default function PxRemPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">PX to REM Converter</h1>
                <p className="text-muted-foreground">Essential tool for responsive web design.</p>
            </div>

            <PxRemConverterClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Why use REM instead of PX?</h2>
                <p>
                    <strong>REM (Root EM)</strong> is a relative unit that scales based on the user&apos;s browser font size settings.
                    <strong>PX (Pixel)</strong> is an absolute unit that does not scale.
                </p>
                <p>
                    Using REM improves <strong>Accessibility</strong>. If a user with visual impairment increases their browser&apos;s base font size, your website will scale up proportionally.
                    If you use PX, your text will likely stay small and unreadable.
                </p>

                <h3>How it works</h3>
                <p>
                    The conversion depends on the <strong>Base Font Size</strong> (usually 16px).
                    <br />
                    <code>REM = PX / Base Size</code>
                </p>
                <p>
                    <em>Example:</em> If base is 16px, then 32px = 2rem.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why is 16px the default?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Most modern browsers have a default font size of 16px. This is the industry standard starting point for web typography.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Should I use REM for padding and margins?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Yes! Using REM for spacing (margins/padding) ensures that your layout breathes and scales correctly along with the text content.
                                    Using PX for spacing can lead to crowded layouts when text size increases.
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
                                name: 'What is a REM unit?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'REM stands for Root EM. It is a CSS unit relative to the font-size of the root element (HTML tag).'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How do you convert px to rem?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Divide the pixel value by the root font size (usually 16px). For example, 16px / 16 = 1rem.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
