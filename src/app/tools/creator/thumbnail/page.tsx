import type { Metadata } from 'next';
import ThumbnailClient from './client';

export const metadata: Metadata = {
    title: 'YouTube Thumbnail Downloader - HD & 4K | UnitMaster Creator Studio',
    description: 'Download high-quality YouTube thumbnails in MaxRes, HD, and SD formats instantly. Free tool for content creators.',
    keywords: ['youtube thumbnail downloader', 'download youtube thumbnail', 'get youtube thumbnail', 'thumbnail grabber', 'youtube image extractor'],
};

export default function ThumbnailPage() {
    return (
        <div className="space-y-8">
            <ThumbnailClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>The Science of a Click-Worthy YouTube Thumbnail</h2>
                <p>
                    Your thumbnail is the billboard for your video. A great video with a bad thumbnail will never get clicked.
                    <strong>UnitMaster Downloader</strong> lets you extract high-resolution thumbnails from any public YouTube video for analysis, archiving, or inspiration.
                </p>

                <h3>Resolutions Explained</h3>
                <p>
                    YouTube stores several versions of a thumbnail:
                </p>
                <ul>
                    <li><strong>MaxRes (1280x720)</strong>: The highest definition available. Always aim for this.</li>
                    <li><strong>High (480x360)</strong>: Good fallback if HD isn't available.</li>
                    <li><strong>Medium & Standard</strong>: Lower quality, used for mobile grid views.</li>
                </ul>

                <h3>Fair Use & Copyright</h3>
                <p>
                    <strong>Warning:</strong> Thumbnails are copyrighted artistic works.
                </p>
                <div className="bg-destructive/10 p-4 rounded-lg border-l-4 border-destructive my-6 not-prose">
                    <p className="text-sm">
                        Do not simply download someone else's thumbnail and use it as your own. That is copyright infringement.
                        Legal uses include: creating a collage, analyzing competitors, archiving your own videos, or using fair-use commentary.
                    </p>
                </div>

                <h3>Why Download Thumbnails?</h3>
                <ul>
                    <li><strong>Inspiration/Mood Boards</strong>: Collect the top 10 thumbnails in your niche to see what colors and fonts are trending.</li>
                    <li><strong>A/B Testing</strong>: Compare your design against competitors side-by-side.</li>
                    <li><strong>Recover Assets</strong>: Lost your original source file? Recover the thumbnail from your old uploads.</li>
                </ul>
            </div>
        </div>
    );
}
