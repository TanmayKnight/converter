import type { Metadata } from 'next';
import ThumbnailClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'YouTube Thumbnail Downloader - HD & 4K | UnitMaster Creator Studio',
    description: 'Download high-quality YouTube thumbnails in MaxRes, HD, and SD formats instantly. Free tool for content creators.',
    keywords: ['youtube thumbnail downloader', 'download youtube thumbnail', 'get youtube thumbnail', 'thumbnail grabber', 'youtube image extractor'],
};

export default function ThumbnailPage() {
    return (
        <div className="space-y-8">
            <ThumbnailClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>The Science of a Click-Worthy YouTube Thumbnail</h2>
                <p>
                    Your thumbnail is the billboard for your video. A great video with a bad thumbnail will never get clicked.
                    <strong>UnitMaster Downloader</strong> lets you extract high-resolution thumbnails from any public YouTube video for analysis, archiving, or inspiration.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What resolutions can I download?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>MaxRes (1280x720)</strong>: The highest definition available. Always aim for this.</li>
                                    <li><strong>High (480x360)</strong>: Good fallback if HD isn't available.</li>
                                    <li><strong>Medium & Standard</strong>: Lower quality, used for mobile grid views.</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is it legal to download thumbnails?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Thumbnails are copyrighted artistic works.
                                </p>
                                <div className="bg-destructive/10 p-4 rounded-lg border-l-4 border-destructive my-2">
                                    <p className="text-sm text-foreground">
                                        <strong>Fair Use Warning:</strong> Do not simply download someone else's thumbnail and use it as your own.
                                        Legal uses include: creating a collage, analyzing competitors, archiving your own videos, or using fair-use commentary.
                                    </p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Why download thumbnails?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Inspiration</strong>: Collect the top 10 thumbnails in your niche to see what colors/fonts are trending.</li>
                                    <li><strong>A/B Testing</strong>: Compare your design against competitors side-by-side.</li>
                                    <li><strong>Recover Assets</strong>: Lost your original source file? Recover the thumbnail from your old uploads.</li>
                                </ul>
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
                                name: 'How do I download a YouTube thumbnail in high quality?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Paste the YouTube video URL into our tool. We will automatically fetch and display the MaxRes (1280x720) version if available, which you can save to your device.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Can I use someone else\'s thumbnail?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Generally, no. Thumbnails are copyrighted. You should only use them for analysis, fair use commentary, or personal archiving, not to represent your own content.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What is the size of a YouTube thumbnail?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'The ideal YouTube thumbnail size is 1280x720 pixels (16:9 aspect ratio).'
                                }
                            }
                        ]
                    }),
                }}
            />
        </div>
    );
}
