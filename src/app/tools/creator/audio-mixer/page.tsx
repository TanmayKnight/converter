import type { Metadata } from 'next';
import AudioMixerClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AudioMixerClient />

            <div className="container mx-auto px-4 max-w-4xl mt-16 prose prose-slate dark:prose-invert">
                <h2 className="text-3xl font-bold mb-6">Online Audio Mixer & Merger</h2>
                <p className="lead text-lg text-muted-foreground mb-8">
                    Combine multiple audio tracks into a single file, adjust volumes, and create the perfect mix directly in your browser.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How to mix audio tracks online?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li><strong>Upload Tracks</strong>: Drag and drop your MP3, WAV, or OGG files.</li>
                                    <li><strong>Adjust Levels</strong>: Use the sliders to balance volume between voiceovers and background music.</li>
                                    <li><strong>Export</strong>: Download the combined mix as a single high-quality MP3 file.</li>
                                </ol>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is it free to use?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Yes! UnitMaster Audio Mixer is completely free. We don't charge for premium features or limit the number of projects you can create.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is my audio safe?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
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
