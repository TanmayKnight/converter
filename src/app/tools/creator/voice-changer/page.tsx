import type { Metadata } from 'next';
import VoiceChangerClient from './client';

export const metadata: Metadata = {
    title: 'Voice Changer Studio - Free Online Voice Effects | UnitMaster',
    description: 'Transform your voice instantly with free online voice changer. Record or upload audio and apply effects like Robot, Chipmunk, or Deep Voice. Private & Client-side.',
    keywords: ['voice changer', 'voice effects', 'online voice changer', 'chipmunk voice', 'robot voice', 'free voice filter'],
    alternates: {
        canonical: '/tools/creator/voice-changer',
    },
    openGraph: {
        title: 'Voice Changer Studio - Free & Unlimited',
        description: 'Professional voice filters in your browser. No server uploads. 100% Free.',
        type: 'website',
        url: '/tools/creator/voice-changer',
    },
};

export default function VoiceChangerPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster Voice Changer',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Free online tool to change voice effects. detailed client-side processing using WebAssembly.',
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
            <VoiceChangerClient />
        </>
    );
}
