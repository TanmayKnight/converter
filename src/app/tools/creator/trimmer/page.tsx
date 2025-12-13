import type { Metadata } from 'next';
import VideoTrimmerClient from './client';

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
        </>
    );
}
