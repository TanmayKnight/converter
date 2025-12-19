import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { BlogHeroImage } from '@/components/blog/BlogHeroImage';
import { RelatedTool } from '@/components/blog/RelatedTool';

// ... imports remain the same

// ... inside BlogPostPage ...


import Link from 'next/link';
import { ChevronLeft, Calendar, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const post = getBlogPost(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: `${post.title} | UnitMaster Blog`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
        },
    };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    // Generate Share URLs
    const baseUrl = 'https://unitmaster.io';
    const shareUrl = `${baseUrl}/blog/${params.slug}`;
    const shareText = `Check out this guide: ${post.title}`;

    const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Immersive Scroll Progress (Optional, keeping it clean for now) */}

            {/* Hero Section */}
            <div className="relative w-full bg-secondary/30 border-b border-border/50">
                <div className="container mx-auto px-4 pt-12 pb-16 max-w-4xl">
                    {/* Breadcrumb / Back */}
                    <div className="mb-8 flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild className="-ml-3 text-muted-foreground hover:text-primary transition-colors">
                            <Link href="/blog">
                                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Academy
                            </Link>
                        </Button>
                    </div>

                    {/* Meta Tags */}
                    <div className="flex gap-3 mb-6">
                        {post.tags?.map(tag => (
                            <span key={tag} className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider shadow-sm border border-primary/20">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-foreground leading-[1.1]">
                        {post.title}
                    </h1>

                    {/* Author & Date */}
                    <div className="flex items-center justify-between border-t border-border/50 pt-8">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full ring-2 ring-background shadow-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-foreground text-base">{post.author}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5" /> {post.date}
                                </div>
                            </div>
                        </div>

                        {/* Desktop Share Header */}
                        <div className="hidden sm:flex gap-2">
                            <Button variant="outline" size="sm" asChild className="rounded-full">
                                <a href={twitterShare} target="_blank" rel="noopener noreferrer">
                                    <Share2 className="h-3.5 w-3.5 mr-2" /> Share on X
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Image Area */}
            {post.image && (
                <div className="container max-w-5xl mx-auto px-4 -mt-10 relative z-10">
                    <BlogHeroImage src={post.image} alt={post.title} />
                </div>
            )}

            <div className="container mx-auto px-4 max-w-3xl mt-16 grid grid-cols-1 gap-12">

                {/* Main Content */}
                <article className="prose prose-lg dark:prose-invert prose-indigo max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-img:rounded-xl prose-img:shadow-lg">
                    <Markdown
                        components={{
                            // Override H2 for anchor links if needed
                            h2: ({ node, ...props }) => <h2 className="mt-12 mb-6 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props} />,
                            li: ({ node, ...props }) => <li className="my-2" {...props} />
                        }}
                    >
                        {post.content}
                    </Markdown>

                    {/* Dynamic CTA Injection */}
                    {post.relatedTool && <RelatedTool toolId={post.relatedTool} />}
                </article>

                <hr className="border-border" />

                {/* Mobile/Bottom Share */}
                <div className="py-8">
                    <h3 className="font-bold mb-4 text-center">Share this article</h3>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" className="w-40" asChild>
                            <a href={twitterShare} target="_blank" rel="noopener noreferrer">Twitter</a>
                        </Button>
                        <Button variant="outline" className="w-40" asChild>
                            <a href={linkedinShare} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </Button>
                    </div>
                </div>

            </div>

            {/* Schema.org Article Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.title,
                        description: post.description,
                        image: post.image ? `${baseUrl}${post.image}` : undefined,
                        author: {
                            '@type': 'Person',
                            name: post.author,
                        },
                        datePublished: post.date,
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': shareUrl
                        }
                    }),
                }}
            />
        </div>
    );
}
