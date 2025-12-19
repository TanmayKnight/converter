import type { Metadata } from 'next';
import AudioMixerClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sliders, Music, Lock, Upload, Volume2, Save } from 'lucide-react';
import { PrivacyShield } from '@/components/common/PrivacyShield';

export const metadata: Metadata = {
    title: 'Audio Mixer Online - Merge & Combine MP3 Tracks | UnitMaster',
    description: 'Mix multiple audio tracks into one file instantly. Adjust volume levels, layer voiceovers with background music. Free, secure, and client-side.',
    keywords: ['audio mixer', 'merge mp3', 'combine audio', 'online audio editor', 'volume mixer', 'audio joiner'],
    alternates: {
        canonical: '/tools/creator/audio-mixer',
    },
    openGraph: {
        title: 'Audio Mixer Studio - Merge Tracks Online',
        description: 'Combine audio files and adjust volumes in your browser. No software needed.',
        type: 'website',
        url: '/tools/creator/audio-mixer',
    },
};

export default function AudioMixerPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: 'UnitMaster Audio Mixer',
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'Any',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
                description: 'Free online audio mixer needed to combine tracks. detailed client-side processing using WebAssembly.',
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.8',
                    ratingCount: '95',
                },
            },
            {
                '@type': 'HowTo',
                name: 'How to Mix Audio Tracks Online',
                step: [
                    {
                        '@type': 'HowToStep',
                        name: 'Add Tracks',
                        text: 'Upload your voice recordings, background music, or sound effects to the mixer.',
                        position: 1
                    },
                    {
                        '@type': 'HowToStep',
                        name: 'Adjust Levels',
                        text: 'Use the volume sliders to fade music down and bring voice up for specific tracks.',
                        position: 2
                    },
                    {
                        '@type': 'HowToStep',
                        name: 'Export Mix',
                        text: 'Click "Export Audio" to merge everything into a single MP3 file.',
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

            <AudioMixerClient />

            {/* Features Grid */}
            <div className="container mx-auto px-4 max-w-6xl mt-24 mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why use UnitMaster Audio Mixer?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Blend voiceovers with background music, combine multiple songs, or create a podcast intro—all directly in your browser.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 mb-6">
                            <Sliders className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Multi-Track Mixing</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Layer up to 2 tracks for free, or unlimited tracks with Pro. Adjust volume levels independently to get the perfect balance.
                        </p>
                    </div>

                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-500 mb-6">
                            <Music className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Format Freedom</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Mix MP3, WAV, OGG, and more. We handle the conversion automatically so you don't have to worry about compatibility.
                        </p>
                    </div>

                    <PrivacyShield />
                </div>
            </div>

            {/* How It Works Steps */}
            <div className="container mx-auto px-4 max-w-4xl mt-24 mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center">How to Mix Audio</h2>

                <div className="relative">
                    <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-1 bg-border -z-10 transform -translate-x-1/2"></div>

                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-right order-2 md:order-1">
                                <h3 className="text-xl font-bold mb-2">1. Add Tracks</h3>
                                <p className="text-muted-foreground">Upload your voice recordings, background music, or sound effects.</p>
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
                                    <Volume2 className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold z-10 shrink-0 order-1 md:order-2">2</div>
                            <div className="flex-1 text-left order-3">
                                <h3 className="text-xl font-bold mb-2">2. Adjust Levels</h3>
                                <p className="text-muted-foreground">Use the volume sliders to fade music down and bring voice up.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-right order-2 md:order-1">
                                <h3 className="text-xl font-bold mb-2">3. Export Mix</h3>
                                <p className="text-muted-foreground">Click "Export Audio" to merge everything into a single MP3 file.</p>
                            </div>
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold z-10 shrink-0 order-1 md:order-2">3</div>
                            <div className="flex-1 order-3 pl-8 md:pl-0">
                                <div className="bg-card border border-border p-4 rounded-xl inline-block shadow-sm">
                                    <Save className="h-8 w-8 text-muted-foreground" />
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
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">How to mix audio tracks online?</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <div className="space-y-4">
                                    <ol className="list-decimal pl-6 space-y-2">
                                        <li><strong>Upload Tracks</strong>: Drag and drop your MP3, WAV, or OGG files.</li>
                                        <li><strong>Adjust Levels</strong>: Use the sliders to balance volume between voiceovers and background music.</li>
                                        <li><strong>Export</strong>: Download the combined mix as a single high-quality MP3 file.</li>
                                    </ol>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">Is it free to use?</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <div className="space-y-4">
                                    <p>
                                        The Free Tier allows you to mix up to 2 tracks simultaneously. To mix unlimited tracks for complex projects, check out our Pro plan.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border-b-0 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">Is my audio safe?</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <div className="space-y-4">
                                    <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                                        <p className="text-sm font-medium text-foreground">
                                            🔒 Private Processing: All mixing happens locally in your browser using WebAssembly technology. Your audio files are never uploaded to our servers.
                                        </p>
                                    </div>
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
                                name: 'How do I merge audio files online?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Upload your audio files to our mixer, adjust the volume levels for each track, and click "Export" to download the merged file.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Can I mix voice with background music?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes. You can upload a voice recording and a background music track, lower the music volume, and merge them into a professional-sounding podcast or voiceover.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is the tool private?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes. UnitMaster processes all audio locally in your browser. We never see, hear, or store your audio files.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
