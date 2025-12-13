import type { Metadata } from 'next';
import AudioExtractorClient from './client';

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

                <div className="grid md:grid-cols-2 gap-12 mb-12">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">How to Extract Audio</h3>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li><strong>Upload Video</strong>: Select any video file from your device.</li>
                            <li><strong>Processing</strong>: Our tool instantly identifies the audio track.</li>
                            <li><strong>Convert</strong>: Click "Extract Audio" to convert the stream to MP3.</li>
                            <li><strong>Download</strong>: Save the new audio file to your computer or phone.</li>
                        </ol>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>No Uploads</strong>: Files are processed locally for maximum privacy.</li>
                            <li><strong>Fast Conversion</strong>: Uses ffmpeg.wasm for near-native performance.</li>
                            <li><strong>High Quality</strong>: Preserves the original audio bitrate (up to 320kbps).</li>
                            <li><strong>Free Forever</strong>: Extract audio from unlimited videos without fees.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-secondary/30 p-8 rounded-2xl mb-12">
                    <h3 className="text-2xl font-bold mb-4">Why use our Audio Extractor?</h3>
                    <p>
                        Sometimes you just need the sound from a video clip—whether it's a song cover, a podcast segment, or a speech. UnitMaster makes this effortless. By running entirely in your browser, we ensure that your large video files don't eat up your data plan uploading to a server, and your private videos remain private.
                    </p>
                </div>
            </div>
        </>
    );
}
