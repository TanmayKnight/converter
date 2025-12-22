import type { Metadata } from 'next';
import QrCodeClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'QR Code Generator - Create Free QR Codes Offline | UnitMaster',
    description: 'Free online QR Code Generator. Create custom QR codes for URLs, text, and Wi-Fi. Static codes, offline generation, high-quality PNG download.',
    keywords: ['qr code generator offline', 'create qr code local', 'free qr code maker privacy', 'static qr code', 'custom qr code generator'],
};

export default function QrCodePage() {
    return (
        <div className="space-y-8">
            <QrCodeClient />

            <SeoContentSection
                title="Free Custom QR Code Generator (Offline)"
                description="Create permanent, high-quality QR codes for your business, Wi-Fi, or website. Customize colors, add logo styles, and download in print-ready formats. Generated locally in your browser."
                features={[
                    {
                        title: "100% Free & Static",
                        description: "Our QR codes are static, meaning the data is embedded directly in the image. They will never expire and don't rely on our servers to work."
                    },
                    {
                        title: "Private Generation",
                        description: "The QR code is generated using JavaScript on your device. Whatever you type (URLs, Wi-Fi passwords) stays on your screen."
                    },
                    {
                        title: "High Customization",
                        description: "Change foreground/background colors, corner styles, and dot patterns to match your brand identity."
                    },
                    {
                        title: "Multiple Formats",
                        description: "Download as PNG for web use or SVG for high-resolution printing."
                    }
                ]}
                benefits={[
                    "Connect guests to Wi-Fi instantly.",
                    "Share website links physically.",
                    "No expiration dates.",
                    "No tracking / data collection."
                ]}
                faqs={[
                    {
                        question: "How to generate a QR code for free?",
                        answer: "Enter your URL or text into the UnitMaster QR Code Generator, customize the design if you wish, and download the image. It is instant and free."
                    },
                    {
                        question: "Do UnitMaster QR codes expire?",
                        answer: "No. We generate static QR codes where the information is hard-coded into the pattern. They will never expire and work offline."
                    },
                    {
                        question: "Can I generate a QR code for Wi-Fi?",
                        answer: "Yes. Select the 'Wi-Fi' option, enter your network name (SSID) and password, and guests can scan it to connect instantly."
                    },
                    {
                        question: "Can I check who scanned my QR code?",
                        answer: "Since these are static codes (for privacy and permanence), we cannot track scans. If you need tracking, use a URL shortener service before generating the QR code."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "QR Code Generator",
                    "applicationCategory": "UtilityApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "QR Generation, Static Codes, Wi-Fi QR, Custom Colors"
                }}
            />
        </div>
    );
}
