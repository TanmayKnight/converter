import type { Metadata } from 'next';
import AudioMixerClient from './client';

export const metadata: Metadata = {
    title: 'Audio Mixer Online - Merge & Combine MP3 Tracks | UnitMaster',
    description: 'Mix multiple audio tracks into one file instantly. Adjust volume levels, layer voiceovers with background music. Free, secure, and client-side.',
    keywords: ['audio mixer', 'merge mp3', 'combine audio', 'online audio editor', 'volume mixer', 'audio joiner'],
    alternates: {
        canonical: '/tools/creator/audio-mixer',
    },
    openGraph: {
        title: 'Audio Mixer Studio - Merge Tracks Online',
        description: 'Combine audio files and adjust volumes in your browser. No software needed.',
        type: 'website',
        url: '/tools/creator/audio-mixer',
    },
};

export default function AudioMixerPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster Audio Mixer',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Free online audio mixer needed to combine tracks. detailed client-side processing using WebAssembly.',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '95',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AudioMixerClient />
        </>
    );
}
