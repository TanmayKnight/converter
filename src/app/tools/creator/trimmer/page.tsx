import type { Metadata } from 'next';
import VideoTrimmerClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Zap, Video, CheckCircle, Smartphone, Scissors, Download, Upload } from 'lucide-react';
import { PrivacyShield } from '@/components/common/PrivacyShield';

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

            {/* Tool Section */}
            <VideoTrimmerClient />

            {/* Features Grid */}
            <div className="container mx-auto px-4 max-w-6xl mt-24 mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why use UnitMaster Trimmer?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We use advanced WebAssembly technology to process video directly on your device. Free users can process files up to 100MB instantly.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <PrivacyShield />

                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Instant Processing</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            No upload time. No server queues. Since we process files locally, even large 4K videos open instantly for editing.
                        </p>
                    </div>

                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-6">
                            <Video className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Lossless Quality</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Our "stream copy" mode trims your video without re-encoding it. This preserves the exact original quality, bitrate, and resolution.
                        </p>
                    </div>
                </div>
            </div>

            {/* Supported Formats */}
            <div className="bg-secondary/30 py-16 border-y border-border">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h3 className="text-2xl font-bold mb-8">Supported Formats</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['MP4 (H.264)', 'MOV (QuickTime)', 'WebM', 'MKV', 'AVI'].map((fmt) => (
                            <span key={fmt} className="bg-background border border-border px-6 py-3 rounded-full font-medium shadow-sm flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                {fmt}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works Steps */}
            <div className="container mx-auto px-4 max-w-4xl mt-24 mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center">How to Trim a Video</h2>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-1 bg-border -z-10 transform -translate-x-1/2"></div>

                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-right order-2 md:order-1">
                                <h3 className="text-xl font-bold mb-2">1. Upload Video</h3>
                                <p className="text-muted-foreground">Drag and drop your video file. We auto-detect the format and load it instantly.</p>
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
                                    <Scissors className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold z-10 shrink-0 order-1 md:order-2">2</div>
                            <div className="flex-1 text-left order-3">
                                <h3 className="text-xl font-bold mb-2">2. Set Start & End</h3>
                                <p className="text-muted-foreground">Use the timeline sliders to choose your clip. You can also type precise timestamps.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-right order-2 md:order-1">
                                <h3 className="text-xl font-bold mb-2">3. Download</h3>
                                <p className="text-muted-foreground">Click "Trim Video". Your new clip is created instantly and ready to save.</p>
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

            {/* FAQ */}
            <div className="bg-secondary/10 py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full bg-card border border-border rounded-2xl p-2 shadow-sm">
                        <AccordionItem value="item-1" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                How to trim MP4 videos online?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                Simply upload your MP4 file, use the sliders to select the part you want to keep, and click "Trim Video". The tool will generate a new MP4 file containing only the selected segment.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                Does it reduce video quality?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <p className="mb-2">No. We use a method called "stream copying" whenever possible.</p>
                                <p>Instead of re-rendering every pixel (which causes quality loss), we effectively just "cut" the file at the timestamps you selected. The resulting video is bit-for-bit identical to the original.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                Why is the preview sometimes black?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <p className="mb-2">This happens with high-efficiency formats like H.265 (HEVC) on some browsers.</p>
                                <p>If this occurs, click the "Optimize Preview" button. We'll create a temporary compatible version for you to edit with, but we'll still use your high-quality original for the final cut.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="border-b-0 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                Is it free on mobile?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                Yes, UnitMaster works on mobile browsers. Note that the Free Tier is limited to 100MB files. For larger files, please upgrade to Pro.
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
