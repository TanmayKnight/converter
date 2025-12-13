import type { Metadata } from 'next';
import { ImageToolsNav } from '@/components/image-tools/ImageToolsNav';
import { AD_SLOTS } from '@/lib/ads';
import { ToolLayoutWrapper } from '@/components/tools/ToolLayoutWrapper';

export const metadata: Metadata = {
    title: 'Free Online Image Tools - Crop, Resize, Remove Background',
    description: 'Professional browser-based image tools. Crop, resize, convert, and remove backgrounds from images instantly. No upgrades required.',
};

export default function ImageToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ToolLayoutWrapper
            breadcrumbs={[
                { name: 'Home', path: '/' },
                { name: 'Image Tools', path: '/tools/image' }
            ]}
            navbar={<ImageToolsNav />}
            sidebar={{
                title: 'Explore More',
                adSlotId: AD_SLOTS.SIDEBAR_IMAGE,
                links: [
                    { href: '/tools/image/remove-bg', label: 'Remove Background' },
                    { href: '/tools/image/converter', label: 'Format Converter' },
                ]
            }}
        >
            {children}
        </ToolLayoutWrapper>
    );
}
