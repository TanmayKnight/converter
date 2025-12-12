import type { Metadata } from 'next';
import QrCodeClient from './client';

export const metadata: Metadata = {
    title: 'QR Code Generator - Create Free QR Codes | UnitMaster',
    description: 'Free online QR Code Generator. Create custom QR codes for URLs, text, and Wi-Fi. High-quality PNG download.',
    keywords: ['qr code generator', 'create qr code', 'free qr code', 'qr code maker', 'custom qr code'],
};

export default function QrCodePage() {
    return <QrCodeClient />;
}
