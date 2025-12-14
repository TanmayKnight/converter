import type { Metadata } from 'next';
import VideoTrimmerClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Video Trimmer - Cut & Crop Videos Online | UnitMaster',
    description: 'Free online Video Trimmer. Cut MP4, WebM, and MOV files instantly in your browser. No upload required, lossless quality.',
    keywords: ['video trimmer', 'cut video online', 'trim mp4', 'video cutter', 'lossless video trim'],
    alternates: {
        canonical: '/tools/creator/trimmer',
    },
    openGraph: {
        title: 'Video Trimmer - Cut & Crop Videos Online',
        description: 'Trim videos locally in your browser. No server uploads. Instant & Lossless.',
        type: 'website',
        url: '/tools/creator/trimmer',
    },
};

export default function VideoTrimmerPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster Video Trimmer',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Free online video trimmer tool. Cut MP4, WebM, and MOV files directly in the browser using WebAssembly.',
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
            <VideoTrimmerClient />

            <div className="container mx-auto px-4 max-w-4xl mt-16 prose prose-slate dark:prose-invert">
                <h2 className="text-3xl font-bold mb-6">Free Online Video Trimmer</h2>
                <p className="lead text-lg text-muted-foreground mb-8">
                    Cut the perfect clip from your videos instantly. Whether it's for Instagram Stories, TikTok, or YouTube, UnitMaster lets you trim MP4, MOV, and WebM files without losing quality.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How to trim MP4 videos online?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li><strong>Upload</strong>: Select a video file from your computer or phone.</li>
                                    <li><strong>Trim</strong>: Drag the handles to set the new start and end times.</li>
                                    <li><strong>Export</strong>: Click "Trim Video" to process the file instantly.</li>
                                </ol>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Does it reduce video quality?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    No. We use "smart rendering" where possible to cut the video stream without re-encoding the entire file. This preserves the original resolution and bitrate of your video.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Privacy & Safety</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                                    <p className="text-sm font-medium text-foreground">
                                        🔒 Zero-Upload Promise: Your large video files are never uploaded to a server. All trimming happens locally on your device using WebAssembly (WASM), ensuring that your personal videos stay private.
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
                                name: 'How do I cut a video online?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Upload your video to UnitMaster Trimmer, use the slider to select the start and end points of your desired clip, and export. It\'s fast and simple.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is the video quality preserved?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes, we aim for lossless trimming. The tool cuts the video stream without re-encoding whenever possible, keeping your original quality intact.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Do I need to install software?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'No. UnitMaster works entirely in your browser (Chrome, Safari, Firefox). You don\'t need to download or install anything.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
