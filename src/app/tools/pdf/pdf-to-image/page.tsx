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
    return <PdfToImageConverter />;
}
