import type { Metadata } from 'next';
import AudioMixerClient from './client';
import { PrivacyShield } from '@/components/common/PrivacyShield';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Audio Mixer - Merge & Combine MP3 Offline | UnitMaster',
    description: 'Mix multiple audio tracks into one file instantly. Adjust volume levels, layer voiceovers with background music. Free, secure, and client-side (WASM).',
    keywords: ['audio mixer offline', 'merge mp3 local', 'combine audio browser', 'online audio editor privacy', 'volume mixer wasm', 'audio joiner no upload'],
    alternates: {
        canonical: '/tools/creator/audio-mixer',
    },
    openGraph: {
        title: 'Audio Mixer Studio - Merge Tracks Offline',
        description: 'Combine audio files and adjust volumes in your browser. No software needed. 100% private.',
        type: 'website',
        url: '/tools/creator/audio-mixer',
    },
};

export default function AudioMixerPage() {
    return (
        <div className="space-y-8">
            <AudioMixerClient />

            <div className="container mx-auto px-4 max-w-4xl mt-12">
                <PrivacyShield />
            </div>

            <SeoContentSection
                title="Mix & Merge Audio Tracks Offline"
                description="Blend voiceovers with background music, combine multiple songs, or create a podcast intro—all directly in your browser. Our advanced audio engine runs locally on your device."
                features={[
                    {
                        title: "Multi-Track Mixing",
                        description: "Layer tracks to create the perfect mix. Adjust volume levels independently to get the perfect balance between voice and music."
                    },
                    {
                        title: "Privacy First (Zero Uploads)",
                        description: "All mixing happens locally in your browser using WebAssembly technology. Your audio files are never uploaded to our servers."
                    },
                    {
                        title: "Format Freedom",
                        description: "Mix MP3, WAV, OGG, and more. We handle the conversion automatically so you don't have to worry about compatibility."
                    },
                    {
                        title: "Studio Quality Export",
                        description: "Export your final mix as a high-bitrate MP3 file ready for publishing."
                    }
                ]}
                benefits={[
                    "Create professional podcast intros.",
                    "Overlay voiceovers on background music.",
                    "Merge multiple song parts.",
                    "No software installation needed."
                ]}
                faqs={[
                    {
                        question: "How to mix audio tracks online?",
                        answer: "Upload your audio files to our mixer, adjust the volume levels for each track, and click 'Export' to download the merged file."
                    },
                    {
                        question: "Can I mix voice with background music?",
                        answer: "Yes. You can upload a voice recording and a background music track, lower the music volume, and merge them into a professional-sounding podcast or voiceover."
                    },
                    {
                        question: "Is the tool private?",
                        answer: "Yes. UnitMaster processes all audio locally in your browser. We never see, hear, or store your audio files."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "UnitMaster Audio Mixer",
                    "applicationCategory": "MultimediaApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Audio Mixing, Multi-track, Volume Control, Local Processing"
                }}
            />
        </div>
    );
}
