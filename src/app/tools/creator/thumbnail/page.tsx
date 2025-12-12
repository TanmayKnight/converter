import type { Metadata } from 'next';
import ThumbnailClient from './client';

export const metadata: Metadata = {
    title: 'YouTube Thumbnail Downloader - HD & 4K | UnitMaster Creator Studio',
    description: 'Download high-quality YouTube thumbnails in MaxRes, HD, and SD formats instantly. Free tool for content creators.',
    keywords: ['youtube thumbnail downloader', 'download youtube thumbnail', 'get youtube thumbnail', 'thumbnail grabber', 'youtube image extractor'],
};

export default function ThumbnailPage() {
    return <ThumbnailClient />;
}
