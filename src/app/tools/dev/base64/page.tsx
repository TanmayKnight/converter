import type { Metadata } from 'next';
import Base64Client from './client';

export const metadata: Metadata = {
    title: 'Base64 Converter - Encode & Decode Online | UnitMaster',
    description: 'Free Base64 Encoder and Decoder. Convert text and files to Base64 format and back. Supports UTF-8 and client-side privacy.',
    keywords: ['base64 converter', 'base64 encode', 'base64 decode', 'utf8 base64', 'online converter'],
};

export default function Base64Page() {
    return <Base64Client />;
}
