import type { Metadata } from 'next';
import AudioExtractorClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Audio Extractor - Convert Video to MP3 Online | UnitMaster',
    description: 'Extract high-quality MP3 audio from specific video files (MP4, MOV, WebM) instantly in your browser. Free, secure, and no uploads required.',
    keywords: ['audio extractor', 'video to mp3', 'extract audio from video', 'mp4 to mp3', 'online converter'],
    alternates: {
        canonical: '/tools/creator/audio-extractor',
    },
    openGraph: {
        title: 'Audio Extractor - Convert Video to MP3',
        description: 'Extract MP3 audio from videos locally in your browser. No server uploads. fast & secure.',
        type: 'website',
        url: '/tools/creator/audio-extractor',
    },
};

export default function AudioExtractorPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster Audio Extractor',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Free online tool to extract MP3 audio from video files. detailed client-side processing using WebAssembly.',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '85',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AudioExtractorClient />

            <div className="container mx-auto px-4 max-w-4xl mt-16 prose prose-slate dark:prose-invert">
                <h2 className="text-3xl font-bold mb-6">Extract MP3 Audio from Video Online</h2>
                <p className="lead text-lg text-muted-foreground mb-8">
                    Easily convert your video files (MP4, AVI, MOV, WEBM) into high-quality MP3 audio tracks directly in your browser. No software installation needed.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How to Extract Audio from Video?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li><strong>Upload Video</strong>: Select any video file (MP4, MOV, WebM) from your device.</li>
                                    <li><strong>Processing</strong>: Our tool instantly identifies the audio track.</li>
                                    <li><strong>Convert</strong>: Click "Extract Audio" to convert the stream to MP3.</li>
                                    <li><strong>Download</strong>: Save the new audio file to your computer or phone.</li>
                                </ol>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Key Features & Benefits</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>No Uploads</strong>: Files are processed locally for maximum privacy.</li>
                                    <li><strong>Fast Conversion</strong>: Uses ffmpeg.wasm for near-native performance.</li>
                                    <li><strong>High Quality</strong>: Preserves the original audio bitrate (up to 320kbps).</li>
                                    <li><strong>Free Forever</strong>: Extract audio from unlimited videos without fees.</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Why use this Audio Extractor?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Sometimes you just need the sound from a video clip—whether it's a song cover, a podcast segment, or a speech. UnitMaster makes this effortless.
                                </p>
                                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary my-2">
                                    <p className="text-sm font-medium text-foreground">
                                        🔒 Private by Design: By running entirely in your browser, we ensure that your large video files don't eat up your data plan uploading to a server, and your private videos remain private.
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
                                name: 'How do I extract sound from a video?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Upload your video file to UnitMaster Audio Extractor. The tool will assume the audio track and allow you to download it as a high-quality MP3 file instantly.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is the audio extraction free?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes, it is completely free and unlimited. The processing happens in your browser, so we don\'t incur server costs.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is it safe to use?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes. Your files are never uploaded to any server. All extraction happens locally on your device, ensuring 100% privacy.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
