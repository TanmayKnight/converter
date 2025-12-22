import type { Metadata } from 'next';
import VideoTrimmerClient from './client';
import { PrivacyShield } from '@/components/common/PrivacyShield';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Video Trimmer - Cut & Crop Videos Offline | UnitMaster',
    description: 'Free online Video Trimmer. Cut MP4, WebM, and MOV files instantly in your browser. No upload required, lossless quality. 100% private.',
    keywords: ['video trimmer offline', 'cut video online no upload', 'trim mp4 local', 'video cutter privacy', 'lossless video trim'],
    alternates: {
        canonical: '/tools/creator/trimmer',
    },
    openGraph: {
        title: 'Video Trimmer - Cut & Crop Videos Offline',
        description: 'Trim videos locally in your browser. No server uploads. Instant & Lossless.',
        type: 'website',
        url: '/tools/creator/trimmer',
    },
};

export default function VideoTrimmerPage() {
    return (
        <div className="space-y-8">
            <VideoTrimmerClient />

            <div className="container mx-auto px-4 max-w-4xl mt-12">
                <PrivacyShield />
            </div>

            <SeoContentSection
                title="Cut & Trim Videos Online without Uploading"
                description="Use our advanced WebAssembly technology to process video directly on your device. Unlike other online trimmers that make you wait for uploads, UnitMaster processes everything locally. This means instant preview, no file size limits (Pro), and zero privacy risks."
                features={[
                    {
                        title: "Instant Processing",
                        description: "No upload time. No server queues. Since we process files locally, even large 4K videos open instantly for editing."
                    },
                    {
                        title: "Lossless Stream Copy",
                        description: "Our 'stream copy' mode trims your video without re-encoding it. This preserves the exact original quality, bitrate, and resolution."
                    },
                    {
                        title: "Supports All Formats",
                        description: "Works with MP4 (H.264), MOV (QuickTime), WebM, MKV, and AVI files naturally in your browser."
                    },
                    {
                        title: "100% Privacy Guaranteed",
                        description: "Your personal videos never leave your computer. We cannot see them, share them, or store them."
                    }
                ]}
                benefits={[
                    "Trim unwanted parts from screen recordings.",
                    "Cut social media clips from long videos.",
                    "Remove intros/outros instantly.",
                    "No watermarks on exported videos."
                ]}
                faqs={[
                    {
                        question: "How to trim MP4 videos online?",
                        answer: "Simply upload your MP4 file, use the sliders to select the part you want to keep, and click 'Trim Video'. The tool will generate a new MP4 file containing only the selected segment."
                    },
                    {
                        question: "Does it reduce video quality?",
                        answer: "No. We use a method called 'stream copying' whenever possible. Instead of re-rendering every pixel (which causes quality loss), we simply cut the file at the timestamps you selected. The resulting video is bit-for-bit identical to the original."
                    },
                    {
                        question: "Why is the preview sometimes black?",
                        answer: "This happens with high-efficiency formats like H.265 (HEVC) on some browsers. If this occurs, click the 'Optimize Preview' button. We'll create a temporary compatible version for you to edit with, but we'll still use your high-quality original for the final cut."
                    },
                    {
                        question: "Is it free on mobile?",
                        answer: "Yes, UnitMaster works on mobile browsers. Note that large files require significant RAM, so performance depends on your device."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "UnitMaster Offline Video Trimmer",
                    "applicationCategory": "MultimediaApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Lossless Trimmer, Local Processing, No Uploads"
                }}
            />
        </div>
    );
}
