'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const PdfToImageConverter = dynamic(
    () => import('@/components/pdf/PdfToImageConverter'),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Loading converter...</span>
            </div>
        )
    }
);

export default function PdfToImagePage() {
    return (
        <div className="space-y-8">
            <PdfToImageConverter />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Convert PDF to High-Resolution Images</h2>
                <p>
                    PDFs are great for documents, but terrible for sharing on social media or embedding in presentations.
                    <strong>UnitMaster</strong> converts each page of your PDF into a crisp, standalone image.
                </p>

                <h3>Why Convert PDF to JPG/PNG?</h3>
                <ul>
                    <li><strong>Social Media</strong>: You cannot upload a PDF to Instagram or Twitter. You need an image.</li>
                    <li><strong>Presentation Decks</strong>: Powerpoint and Keynote handle images much better than embedded PDFs.</li>
                    <li><strong>Quick Preview</strong>: Images load instantly on mobile devices without launching a separate PDF viewer app.</li>
                </ul>

                <h3>Understanding Quality (DPI)</h3>
                <p>
                    The quality of your converted image depends on the <strong>DPI (Dots Per Inch)</strong>.
                </p>
                <ul>
                    <li><strong>72 DPI</strong>: Standard Screen resolution. Good for quick previews.</li>
                    <li><strong>150 DPI</strong>: Good for general web use and ebooks.</li>
                    <li><strong>300 DPI</strong>: Print quality. Necessary if you plan to print the resulting images.</li>
                </ul>
                <p>
                    Our converter manages this balance automatically to ensure your text stays sharp without generating massive file sizes.
                </p>

                <h3>Security Promise</h3>
                <p>
                    Converting a 50-page confidential report? Do not upload it to a cloud converter.
                    Our tool processes the rendering using your own computer's CPU. The conversion happens <strong>offline</strong> in your browser tab.
                </p>
            </div>
        </div>
    );
}
