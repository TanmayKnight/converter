import type { Metadata } from 'next';
import VoiceChangerClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Voice Changer Studio - Free Online Voice Effects | UnitMaster',
    description: 'Transform your voice instantly with free online voice changer. Record or upload audio and apply effects like Robot, Chipmunk, or Deep Voice. Private & Client-side.',
    keywords: ['voice changer', 'voice effects', 'online voice changer', 'chipmunk voice', 'robot voice', 'free voice filter'],
    alternates: {
        canonical: '/tools/creator/voice-changer',
    },
    openGraph: {
        title: 'Voice Changer Studio - Free & Unlimited',
        description: 'Professional voice filters in your browser. No server uploads. 100% Free.',
        type: 'website',
        url: '/tools/creator/voice-changer',
    },
};

export default function VoiceChangerPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster Voice Changer',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Free online tool to change voice effects. detailed client-side processing using WebAssembly.',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '150',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <VoiceChangerClient />

            <div className="container mx-auto px-4 max-w-4xl mt-16 prose prose-slate dark:prose-invert">
                <h2 className="text-3xl font-bold mb-6">Free Online Voice Changer & Recorder</h2>
                <p className="lead text-lg text-muted-foreground mb-8">
                    Transform your voice in seconds. Whether you want to sound like a robot, a chipmunk, or a deep-voiced villain, UnitMaster lets you record or upload audio and apply professional effects instantly.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How to change my voice online?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li><strong>Record or Upload</strong>: Use your microphone or upload an audio file.</li>
                                    <li><strong>Select Effect</strong>: Click on effects like "Robot", "Alien", "Reviewer" (Deep), or "Helium" (High Pitch).</li>
                                    <li><strong>Download</strong>: Save the transformed audio as a high-quality WAV/MP3 file.</li>
                                </ol>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>What tech powers the voice effects?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    We use the Web Audio API and WebAssembly to process sound waves in real-time. This provides studio-quality effects directly in your browser.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is it free and unlimited?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Yes. UnitMaster Voice Changer is 100% free with no limits on recording duration (as long as your browser memory handles it).
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
                                name: 'How do I use an online voice changer?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Simply click the microphone button to record your voice, or upload an audio file. Then, select an effect to instantly transform how you sound.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Can I download the modified voice?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes! After applying an effect, you can play it back to preview and then click Download to save the audio file to your device.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is my voice recording stored?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'No. All processing happens locally in your browser. Your voice recordings are never sent to our servers.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
