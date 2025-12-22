import type { Metadata } from 'next';
import Base64Client from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Base64 Converter - Encode & Decode Offline | UnitMaster',
    description: 'Free Base64 Encoder and Decoder. Convert text and files to Base64 format and back. Supports UTF-8 and client-side privacy.',
    keywords: ['base64 converter offline', 'base64 encode local', 'base64 decode privacy', 'utf8 base64 online', 'file to base64 no upload'],
};

export default function Base64Page() {
    return (
        <div className="space-y-8">
            <Base64Client />

            <SeoContentSection
                title="Secure Base64 Encoder & Decoder"
                description="Base64 makes binary data safe for transport by converting it into safe text characters (ASCII). UnitMaster allows you to encode images, files, and text to Base64 (or decode them) instantly in your browser."
                features={[
                    {
                        title: "Safe Transport",
                        description: "Convert binary data (like images) into text so it can be sent through Email, HTML, or JSON APIs without corruption."
                    },
                    {
                        title: "Local Processing",
                        description: "Your files are never uploaded. Large images or sensitive documents are encoded to Base64 directly on your device."
                    },
                    {
                        title: "UTF-8 Support",
                        description: "We handle special characters and emojis correctly, ensuring your encoded strings are universally compatible."
                    }
                ]}
                benefits={[
                    "Embed images in CSS/HTML.",
                    "Debug Email attachments.",
                    "Encode credentials for Basic Auth.",
                    "Decode unknown alphanumeric strings."
                ]}
                faqs={[
                    {
                        question: "What is Base64 encoding used for?",
                        answer: "Base64 is used to encode binary data (like images or files) into ASCII text format so it can be safely transmitted over protocols that only support text, such as Email or HTML."
                    },
                    {
                        question: "Is Base64 the same as encryption?",
                        answer: "No. Base64 is an encoding scheme, not encryption. It is easily reversible and provides no security for sensitive data. Do not use it to hide secrets."
                    },
                    {
                        question: "How much larger does Base64 make a file?",
                        answer: "Base64 encoding typically increases the size of the data by about 33%. For example, a 10MB image will become a ~13.3MB Base64 string."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Base64 Converter",
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Base64 Encoding, Base64 Decoding, File to Base64, Local Processing"
                }}
            />
        </div>
    );
}
