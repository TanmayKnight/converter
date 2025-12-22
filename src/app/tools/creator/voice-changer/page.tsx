import type { Metadata } from 'next';
import VoiceChangerClient from './client';
import { PrivacyShield } from '@/components/common/PrivacyShield';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Voice Changer Studio - Free Online Voice Effects | UnitMaster',
    description: 'Transform your voice instantly with free online voice changer. Record or upload audio and apply effects like Robot, Chipmunk, or Deep Voice. Private & Client-side.',
    keywords: ['voice changer online', 'voice effects free', 'change voice offline', 'voice filter privacy', 'robot voice generator', 'deep voice changer'],
    alternates: {
        canonical: '/tools/creator/voice-changer',
    },
    openGraph: {
        title: 'Voice Changer Studio - Free & Unlimited',
        description: 'Professional voice filters in your browser. Fun effects like Robot and Chipmunk. 100% Private.',
        type: 'website',
        url: '/tools/creator/voice-changer',
    },
};

export default function VoiceChangerPage() {
    return (
        <div className="space-y-8">
            <VoiceChangerClient />

            <div className="container mx-auto px-4 max-w-4xl mt-12">
                <PrivacyShield />
            </div>

            <SeoContentSection
                title="Free Voice Changer Online"
                description="Add fun or professional effects to your voice recordings instantly. Perfect for content creators, gamers, and pranksters. Transform your audio without uploading it to the cloud."
                features={[
                    {
                        title: "Record or Upload",
                        description: "Use your microphone to record directly in the browser, or upload an existing audio file to modify."
                    },
                    {
                        title: "Real-time Processing",
                        description: "We use the Web Audio API and WebAssembly to process sound waves in real-time. This provides studio-quality effects directly in your browser."
                    },
                    {
                        title: "Privacy Guaranteed",
                        description: "No server uploads. Your voice recordings stay on your device, ensuring maximum privacy and security."
                    },
                    {
                        title: "Pro Effects Library",
                        description: "Instantly apply free effects or unlock Pro filters like Robot, Chipmunk, Deep Voice, and Helium to transform your sound."
                    }
                ]}
                benefits={[
                    "Create funny voiceovers for videos.",
                    "Anonymize your voice for privacy.",
                    "Entertainment and pranks.",
                    "Enhance podcast audio."
                ]}
                faqs={[
                    {
                        question: "How to change my voice online?",
                        answer: "Simply click the microphone button to record your voice, or upload an audio file. Then, select an effect to instantly transform how you sound."
                    },
                    {
                        question: "Can I download the modified voice?",
                        answer: "Yes! After applying an effect, you can play it back to preview and then click Download to save the audio file to your device."
                    },
                    {
                        question: "Is my voice recording stored?",
                        answer: "No. All processing happens locally in your browser. Your voice recordings are never sent to our servers."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "UnitMaster Voice Changer",
                    "applicationCategory": "MultimediaApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Voice Changing, Audio Effects, Local Recording, Privacy"
                }}
            />
        </div>
    );
}
