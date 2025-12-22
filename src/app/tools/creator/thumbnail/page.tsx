import type { Metadata } from 'next';
import ThumbnailClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'YouTube Thumbnail Downloader - Download 4K & HD Images | Studio',
    description: 'Download high-quality YouTube thumbnails (MaxRes, HD, SD) instantly. Free tool for creators to grab cover art without screenshots. 100% private.',
    keywords: ['youtube thumbnail downloader', 'download youtube thumbnail 4k', 'get youtube thumbnail', 'thumbnail grabber', 'youtube image extractor'],
};

export default function ThumbnailPage() {
    return (
        <div className="space-y-8">
            <ThumbnailClient />

            <SeoContentSection
                title="Download YouTube Thumbnails in 4K"
                description="Get the perfect high-resolution cover art from any YouTube video in seconds. Perfect for inspiration, archiving, and analysis. Unlike other sites that force you to view ads, UnitMaster gets you the raw image file directly."
                features={[
                    {
                        title: "4K MaxRes Quality",
                        description: "We automatically fetch the highest available resolution (MaxResDefault), giving you crisp 1280x720 or higher images."
                    },
                    {
                        title: "All Formats Available",
                        description: "Get access to every version YouTube stores: from the tiny mobile thumbnail to the full HD desktop version."
                    },
                    {
                        title: "No Screenshots Needed",
                        description: "Stop taking blurry screenshots. Download the original JPG/WEBP file uploaded by the creator."
                    },
                    {
                        title: "Free & Pro Options",
                        description: "Download standard qualities for free. Upgrade to Pro for bulk downloading and organizing."
                    }
                ]}
                benefits={[
                    "Save images for inspiration boards.",
                    "Analyze competitor click-through rates (CTR).",
                    "Archive your own channel assets.",
                    "No watermarks on standard downloads."
                ]}
                faqs={[
                    {
                        question: "What resolutions can I download?",
                        answer: "You can download MaxRes (1280x720), High (480x360), Medium (320x180), and Standard (120x90). We always show the highest quality first."
                    },
                    {
                        question: "Is it legal to download thumbnails?",
                        answer: "Thumbnails are copyrighted works. You should only use them for analysis, fair use commentary (e.g., reaction videos), or archiving your own content. Do not simply re-upload someone else's thumbnail as your own."
                    },
                    {
                        question: "Why download thumbnails?",
                        answer: "Creators often download thumbnails to create 'swipe files' of successful designs, analyze color trends in their niche, or recover lost assets for their own old videos."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "UnitMaster Thumbnail Downloader",
                    "applicationCategory": "MultimediaApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "4K Download, Batch Processing, High Resolution Extraction"
                }}
            />
        </div>
    );
}
