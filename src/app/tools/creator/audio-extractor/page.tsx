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
        </>
    );
}
