import type { Metadata } from 'next';
import Base64Client from './client';

export const metadata: Metadata = {
    title: 'Base64 Converter - Encode & Decode Online | UnitMaster',
    description: 'Free Base64 Encoder and Decoder. Convert text and files to Base64 format and back. Supports UTF-8 and client-side privacy.',
    keywords: ['base64 converter', 'base64 encode', 'base64 decode', 'utf8 base64', 'online converter'],
};

export default function Base64Page() {
    return (
        <div className="space-y-8">
            <Base64Client />

            <div className="container mx-auto px-4 py-12 max-w-5xl prose prose-neutral dark:prose-invert">
                <h2>Base64 Encoding Explained</h2>
                <p>
                    Base64 is a group of binary-to-text encoding schemes. It turns binary data (like an image or a PDF) into a string of ASCII characters.
                    <strong>UnitMaster Base64</strong> helps you translate between these formats instantly.
                </p>

                <h3>Why do we need Base64?</h3>
                <p>
                    The internet was originally built to handle text, not binary files.
                    Protocols like Email (SMTP) were designed for ASCII characters. If you try to send a raw image file through a text-only channel, it will get corrupted.
                    <strong>Base64 makes binary data safe for transport</strong> by converting it into safe text characters (A-Z, a-z, 0-9, +, /).
                </p>

                <h3>The "33% Tax"</h3>
                <p>
                    There is no such thing as a free lunch. Base64 encoding increases the file size by approximately <strong>33%</strong>.
                    For example, a 10MB image will become a ~13.3MB Base64 string. Use it wisely!
                </p>

                <h3>Common Use Cases</h3>
                <ul>
                    <li><strong>Data URIs</strong>: Embedding small icons directly into HTML/CSS to avoid an extra HTTP request (<code>src="data:image/png;base64..."</code>).</li>
                    <li><strong>Email Attachments</strong>: MIME uses Base64 to attach files to emails.</li>
                    <li><strong>Basic Auth</strong>: HTTP Basic Authentication encodes <code>username:password</code> in Base64 (Note: This is NOT encryption! It is easily reversible).</li>
                </ul>
            </div>
        </div>
    );
}
