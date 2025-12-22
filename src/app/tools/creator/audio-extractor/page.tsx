import type { Metadata } from 'next';
import AudioExtractorClient from './client';
import { PrivacyShield } from '@/components/common/PrivacyShield';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Audio Extractor - Convert Video to MP3 Offline | UnitMaster',
    description: 'Extract high-quality MP3 audio from specific video files (MP4, MOV, WebM) instantly in your browser. Free, secure, and no uploads required.',
    keywords: ['audio extractor offline', 'video to mp3 local', 'extract audio javascript', 'mp4 to mp3 no upload', 'online converter privacy'],
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
    return (
        <div className="space-y-8">
            <AudioExtractorClient />

            <div className="container mx-auto px-4 max-w-4xl mt-12">
                <PrivacyShield />
            </div>

            <SeoContentSection
                title="Convert Video to MP3 Offline"
                description="Turn video clips into podcasts, songs, or sound bytes instantly. Zero uploads, maximum quality. Unlike cloud converters that steal your data, UnitMaster extracts audio directly in your browser using WebAssembly."
                features={[
                    {
                        title: "High Quality MP3",
                        description: "We extract the audio stream with up to 320kbps bitrate quality, ensuring your sound is crystal clear."
                    },
                    {
                        title: "Instant Conversion",
                        description: "Powered by WASM technology, the conversion happens in milliseconds right on your device. No waiting for server queues."
                    },
                    {
                        title: "100% Private (Local)",
                        description: "Files are processed locally for maximum privacy. Your video never leaves your device."
                    },
                    {
                        title: "Free Forever",
                        description: "Extract audio from unlimited videos without fees and without watermarks."
                    }
                ]}
                benefits={[
                    "Create podcasts from video interviews.",
                    "Save songs from music videos.",
                    "Extract speech for transcription.",
                    "No data usage for uploads."
                ]}
                faqs={[
                    {
                        question: "How to Extract Audio from Video?",
                        answer: "Upload your video file to UnitMaster. The tool will assume the audio track and allow you to download it as a high-quality MP3 file instantly."
                    },
                    {
                        question: "Is the audio extraction free?",
                        answer: "Yes, it is completely free and unlimited. The processing happens in your browser, so we don't incur server costs."
                    },
                    {
                        question: "Is it safe to use?",
                        answer: "Yes. Your files are never uploaded to any server. All extraction happens locally on your device, ensuring 100% privacy."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "UnitMaster Audio Extractor",
                    "applicationCategory": "MultimediaApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Video to MP3, Local Extraction, High Bitrate"
                }}
            />
        </div>
    );
}
