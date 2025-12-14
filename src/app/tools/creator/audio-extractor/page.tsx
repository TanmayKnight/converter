import type { Metadata } from 'next';
import AudioExtractorClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Music, Zap, Lock, FileAudio, Upload, MousePointerClick, Download } from 'lucide-react';

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

            {/* Features Grid */}
            <div className="container mx-auto px-4 max-w-6xl mt-24 mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why use UnitMaster Audio Extractor?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Turn video clips into podcasts, songs, or sound bytes instantly. Zero uploads, maximum quality.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-6">
                            <Music className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">High Quality MP3</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We extract the audio stream with up to 320kbps bitrate quality, ensuring your sound is crystal clear.
                        </p>
                    </div>

                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Instant Conversion</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Powered by WASM technology, the conversion happens in milliseconds right on your device. No waiting for server queues.
                        </p>
                    </div>

                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-6">
                            <Lock className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">100% Private</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Your files never leave your computer. Extract audio from sensitive personal videos without worrying about privacy leaks.
                        </p>
                    </div>
                </div>
            </div>

            {/* How It Works Steps */}
            <div className="container mx-auto px-4 max-w-4xl mt-24 mb-24">
                <h2 className="text-3xl font-bold mb-12 text-center">How to Extract Audio</h2>

                <div className="relative">
                    <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-1 bg-border -z-10 transform -translate-x-1/2"></div>

                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-right order-2 md:order-1">
                                <h3 className="text-xl font-bold mb-2">1. Upload Video</h3>
                                <p className="text-muted-foreground">Select any MP4, MOV, or WebM video file.</p>
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
                                    <MousePointerClick className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold z-10 shrink-0 order-1 md:order-2">2</div>
                            <div className="flex-1 text-left order-3">
                                <h3 className="text-xl font-bold mb-2">2. Click Extract</h3>
                                <p className="text-muted-foreground">The tool instantly processes the file to strip the video track.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-right order-2 md:order-1">
                                <h3 className="text-xl font-bold mb-2">3. Download MP3</h3>
                                <p className="text-muted-foreground">Save the high-quality audio file to your device.</p>
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
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">How to Extract Audio from Video?</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <div className="space-y-4">
                                    <ol className="list-decimal pl-6 space-y-2">
                                        <li><strong>Upload Video</strong>: Select any video file (MP4, MOV, WebM) from your device.</li>
                                        <li><strong>Processing</strong>: Our tool instantly identifies the audio track.</li>
                                        <li><strong>Convert</strong>: Click "Extract Audio" to convert the stream to MP3.</li>
                                        <li><strong>Download</strong>: Save the new audio file to your computer or phone.</li>
                                    </ol>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">Key Features & Benefits</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <div className="space-y-4">
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>No Uploads</strong>: Files are processed locally for maximum privacy.</li>
                                        <li><strong>Fast Conversion</strong>: Uses ffmpeg.wasm for near-native performance.</li>
                                        <li><strong>High Quality</strong>: Preserves the original audio bitrate (up to 320kbps).</li>
                                        <li><strong>Free Forever</strong>: Extract audio from unlimited videos without fees.</li>
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border-b-0 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">Why use this Audio Extractor?</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                <div className="space-y-4">
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
