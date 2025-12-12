'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const PDFSigner = dynamic(() => import('@/components/pdf/PDFSigner'), {
    loading: () => (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading PDF Tools...</p>
        </div>
    ),
    ssr: false
});

export default function SignPDFPage() {
    return <PDFSigner />;
}
