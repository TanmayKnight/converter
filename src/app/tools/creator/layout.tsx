import type { Metadata } from 'next';
import { Video } from 'lucide-react';
import { CreatorNav } from '@/components/creator/CreatorNav';
import { ToolLayoutWrapper } from '@/components/tools/ToolLayoutWrapper';

export const metadata: Metadata = {
    title: {
        default: 'Creator Studio - Free Tools for YouTubers & Content Creators',
        template: '%s | UnitMaster Creator Studio',
    },
    description: 'Boost your content creation workflow with free tools. Download YouTube thumbnails, trim videos, and extract audio instantly.',
    keywords: ['youtube thumbnail downloader', 'video tools', 'content creator', 'video trimmer', 'audio extractor'],
};

export default function CreatorToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ToolLayoutWrapper
            breadcrumbs={[
                { name: 'Home', path: '/' },
                { name: 'Creator Studio', path: '/tools/creator' }
            ]}
            navbar={<CreatorNav />}
            sidebar={{
                title: 'Creator Tools',
                icon: <Video className="h-4 w-4 text-primary" />,
                adSlotId: 'sidebar-creator-1',
                links: [
                    { href: '/tools/creator/thumbnail', label: 'Thumbnail Grabber' },
                    { href: '/tools/creator/trimmer', label: 'Video Trimmer' },
                    { href: '/tools/creator/audio-extractor', label: 'Audio Extractor' },
                ]
            }}
        >
            {children}
        </ToolLayoutWrapper>
    );
}
