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
    return (
        <div className="space-y-8">
            <PDFSigner />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Electronic Signatures vs. Digital Signatures</h2>
                <p>
                    In the remote work era, printing, signing, and scanning documents is obsolete.
                    <strong>UnitMaster PDF Sign</strong> allows you to sign documents legally and securely from your browser.
                </p>

                <h3>Are Electronic Signatures Legal?</h3>
                <p>
                    Yes. In the United States (ESIGN Act of 2000) and the European Union (eIDAS), electronic signatures are legally binding for most business transactions, contracts, and agreements.
                </p>

                <h3>How Our Tool Protects Your Privacy</h3>
                <p>
                    Most "free" signing tools upload your confidential contracts to their servers.
                    This creates a massive security risk. What if their server is hacked?
                </p>
                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary my-6 not-prose">
                    <p className="text-sm">
                        <strong>🔒 Private by Design:</strong> UnitMaster loads the PDF rendering engine into your browser's local memory.
                        Your medical forms, NDAs, and contracts never leave your device.
                    </p>
                </div>

                <h3>Best Practices for e-Signing</h3>
                <ul>
                    <li><strong>Draw Your Signature</strong>: While typing a signature is often legal, drawing it adds a layer of authenticity.</li>
                    <li><strong>Date the Document</strong>: Always add a date field next to your signature to establish the timeline of execution.</li>
                    <li><strong>Lock the File</strong>: After signing, it is good practice to "Flatten" or "Print to PDF" to prevent further modification (though our tool handles simple signing).</li>
                </ul>
            </div>
        </div>
    );
}
