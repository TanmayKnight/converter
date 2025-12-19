import type { Metadata } from 'next';
import VoiceChangerClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mic, UserCog, Lock, Upload, Play, Download } from 'lucide-react';
import { PrivacyShield } from '@/components/common/PrivacyShield';

export const metadata: Metadata = {
    title: 'Voice Changer Studio - Free Online Voice Effects | UnitMaster',
    description: 'Transform your voice instantly with free online voice changer. Record or upload audio and apply effects like Robot, Chipmunk, or Deep Voice. Private & Client-side.',
    keywords: ['voice changer', 'voice effects', 'online voice changer', 'chipmunk voice', 'robot voice', 'free voice filter'],
    alternates: {
        canonical: '/tools/creator/voice-changer',
    },
    openGraph: {
        title: 'Voice Changer Studio - Free & Unlimited',
        description: 'Professional voice filters in your browser. Freemium access available.',
        type: 'website',
        url: '/tools/creator/voice-changer',
    },
};

export default function VoiceChangerPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
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
            },
            {
                '@type': 'HowTo',
                name: 'How to Change Your Voice Online',
                step: [
                    {
                        '@type': 'HowToStep',
                        name: 'Input Audio',
                        text: 'Click the mic button to record your voice directly, or upload an existing audio file.',
                        position: 1
                    },
                    {
                        '@type': 'HowToStep',
                        name: 'Apply Effect',
                        text: 'Select a voice effect like Robot, Alien, or Deep Voice to instantly transform the sound.',
                        position: 2
                    },
                    {
                        '@type': 'HowToStep',
                        name: 'Download',
                        text: 'Listen to the preview and download the transformed audio file.',
                        position: 3
                    }
                ]
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <VoiceChangerClient />

            {/* Features Grid */}
            <div className="container mx-auto px-4 max-w-6xl mt-24 mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why use UnitMaster Voice Changer?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Add fun or professional effects to your voice recordings instantly. Perfect for content creators, gamers, and pranksters.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6">
                            <Mic className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Record or Upload</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Use your microphone to record directly in the browser, or upload an existing audio file to modify.
                        </p>
                    </div>

                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-6">
                            <UserCog className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Pro Effects</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Instantly apply free effects or unlock Pro filters like Robot, Chipmunk, and Deep Voice to transform your sound.
                        </p>
                    </div>

                    <PrivacyShield />
                </div>
            </div>

            {/* How It Works Steps */}
            <div className="container mx-auto px-4 max-w-4xl mt-24 mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center">How to Change Your Voice</h2>

                <div className="relative">
                    <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-1 bg-border -z-10 transform -translate-x-1/2"></div>

                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-right order-2 md:order-1">
                                <h3 className="text-xl font-bold mb-2">1. Input Audio</h3>
                                <p className="text-muted-foreground">Click the mic to record or upload a file.</p>
                            </div>
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold z-10 shrink-0 order-1 md:order-2">1</div>
                            <div className="flex-1 order-3 pl-8 md:pl-0">
                                <div className="bg-card border border-border p-4 rounded-xl inline-block shadow-sm">
                                    <Upload className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 order-2 md:order-1 flex justify-end pr-8 md:pr-0">
                                <div className="bg-card border border-border p-4 rounded-xl inline-block shadow-sm">
                                    <UserCog className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold z-10 shrink-0 order-1 md:order-2">2</div>
                            <div className="flex-1 text-left order-3">
                                <h3 className="text-xl font-bold mb-2">2. Apply Effect</h3>
                                <p className="text-muted-foreground">Select an effect (Robot, Alien, etc.) to transform the sound.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-right order-2 md:order-1">
                                <h3 className="text-xl font-bold mb-2">3. Download</h3>
                                <p className="text-muted-foreground">Listen to the preview and save the MP3 file.</p>
                            </div>
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold z-10 shrink-0 order-1 md:order-2">3</div>
                            <div className="flex-1 order-3 pl-8 md:pl-0">
                                <div className="bg-card border border-border p-4 rounded-xl inline-block shadow-sm">
                                    <Download className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-secondary/10 py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full bg-card border border-border rounded-2xl p-2 shadow-sm">
                        <AccordionItem value="item-1" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">How to change my voice online?</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <div className="space-y-4">
                                    <ol className="list-decimal pl-6 space-y-2">
                                        <li><strong>Record or Upload</strong>: Use your microphone or upload an audio file.</li>
                                        <li><strong>Select Effect</strong>: Click on effects like "Robot", "Alien", "Reviewer" (Deep), or "Helium" (High Pitch).</li>
                                        <li><strong>Download</strong>: Save the transformed audio as a high-quality WAV/MP3 file.</li>
                                    </ol>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">What tech powers the voice effects?</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <div className="space-y-4">
                                    <p>
                                        We use the Web Audio API and WebAssembly to process sound waves in real-time. This provides studio-quality effects directly in your browser.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border-b-0 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">Is it free and unlimited?</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <div className="space-y-4">
                                    <p>
                                        Basic voice effects are free to use. Premium AI filters (like Robot, Deep Voice) are available for Pro subscribers.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
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
