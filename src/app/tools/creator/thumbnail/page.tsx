import type { Metadata } from 'next';
import ThumbnailClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Image, Video, Shield, Search, Download, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'YouTube Thumbnail Downloader - HD & 4K | UnitMaster Creator Studio',
    description: 'Download high-quality YouTube thumbnails in MaxRes, HD, and SD formats instantly. Free tool for content creators.',
    keywords: ['youtube thumbnail downloader', 'download youtube thumbnail', 'get youtube thumbnail', 'thumbnail grabber', 'youtube image extractor'],
};

export default function ThumbnailPage() {
    return (
        <div className="space-y-8">
            <ThumbnailClient />

            {/* Features Grid */}
            <div className="container mx-auto px-4 max-w-6xl mt-24 mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why use UnitMaster Thumbnail Grabber?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Get the perfect high-resolution cover art from any YouTube video in seconds. Perfect for inspiration, archiving, and analysis.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 mb-6">
                            <Image className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">4K MaxRes Quality</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We automatically fetch the highest available resolution (MaxResDefault), giving you crisp 1280x720 or higher images.
                        </p>
                    </div>

                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                            <Video className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">All Formats</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Get access to every version YouTube stores: from the tiny mobile thumbnail to the full HD desktop version.
                        </p>
                    </div>

                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6">
                            <Shield className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Free & Pro Options</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Download watermarked images for free, or upgrade to Pro for clean, high-resolution thumbnails.
                        </p>
                    </div>
                </div>
            </div>

            {/* How It Works Steps */}
            <div className="container mx-auto px-4 max-w-4xl mt-24 mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center">How to Download Thumbnails</h2>

                <div className="relative">
                    <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-1 bg-border -z-10 transform -translate-x-1/2"></div>

                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-right order-2 md:order-1">
                                <h3 className="text-xl font-bold mb-2">1. Copy URL</h3>
                                <p className="text-muted-foreground">Go to YouTube and copy the link of the video you want.</p>
                            </div>
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold z-10 shrink-0 order-1 md:order-2">1</div>
                            <div className="flex-1 order-3 pl-8 md:pl-0">
                                <div className="bg-card border border-border p-4 rounded-xl inline-block shadow-sm">
                                    <ExternalLink className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 order-2 md:order-1 flex justify-end pr-8 md:pr-0">
                                <div className="bg-card border border-border p-4 rounded-xl inline-block shadow-sm">
                                    <Search className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold z-10 shrink-0 order-1 md:order-2">2</div>
                            <div className="flex-1 text-left order-3">
                                <h3 className="text-xl font-bold mb-2">2. Paste Link</h3>
                                <p className="text-muted-foreground">Paste it into the box above. We'll instantly fetch the images.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-right order-2 md:order-1">
                                <h3 className="text-xl font-bold mb-2">3. Save Image</h3>
                                <p className="text-muted-foreground">Right-click (or long press) to save the HD thumbnail to your device.</p>
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
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">What resolutions can I download?</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <div className="space-y-4">
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>MaxRes (1280x720)</strong>: The highest definition available. Always aim for this.</li>
                                        <li><strong>High (480x360)</strong>: Good fallback if HD isn't available.</li>
                                        <li><strong>Medium & Standard</strong>: Lower quality, used for mobile grid views.</li>
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">Is it legal to download thumbnails?</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <div className="space-y-4">
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

                        <AccordionItem value="item-3" className="border-b-0 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">Why download thumbnails?</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <div className="space-y-4">
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
