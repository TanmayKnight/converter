import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
    title: 'UnitMaster Blog - Tips, Tutorials & Digital Guides',
    description: 'Learn how to manage PDFs, edit images, and calculate finances efficiently. Expert guides and tutorials using free online tools.',
    alternates: {
        canonical: '/blog',
    },
};

export default function BlogIndexPage() {
    const posts = getBlogPosts();

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="bg-secondary/30 border-b border-border">
                <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl text-center">
                    <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800">
                        UnitMaster Academy
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Master Your Digital Workflow
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Expert guides on document management, image editing, and financial planning.
                        Simple tutorials for complex tasks.
                    </p>
                </div>
            </div>

            {/* Post Grid */}
            <div className="container mx-auto px-4 max-w-6xl mt-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                            <article className="flex flex-col h-full bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group-hover:border-primary/20">
                                {/* Image Area */}
                                <div className="h-52 w-full relative overflow-hidden bg-muted group-hover:opacity-90 transition-opacity">
                                    {post.image ? (
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-muted-foreground/30 font-bold text-4xl">
                                            BLOG
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Date & Tags Row */}
                                    <div className="flex items-center justify-between gap-4 mb-4">
                                        {post.tags && post.tags.length > 0 && (
                                            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">
                                                {post.tags[0]}
                                            </span>
                                        )}
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                            <Calendar className="h-3 w-3" />
                                            {post.date}
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                        {post.title}
                                    </h2>
                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center text-sm font-semibold text-primary pt-4 border-t border-border/40 mt-auto">
                                        Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
