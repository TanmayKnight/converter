import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tools = {
    'remove-bg': {
        title: 'Remove Background Tool',
        description: 'Try it now for free directly in your browser.',
        href: '/tools/image/remove-bg',
        icon: Sparkles,
    },
    'pdf-merge': {
        title: 'Merge PDF Tool',
        description: 'Combine your PDFs instantly.',
        href: '/tools/pdf/merge',
        icon: Sparkles, // Placeholder
    },
    // Add more mappings as needed
};

interface RelatedToolProps {
    toolId: string;
}

export function RelatedTool({ toolId }: RelatedToolProps) {
    const tool = tools[toolId as keyof typeof tools];

    if (!tool) return null;

    const Icon = tool.icon;

    return (
        <div className="my-8 not-prose">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-white dark:bg-indigo-900 p-3 rounded-lg shadow-sm text-indigo-600 dark:text-indigo-300">
                        <Icon className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-indigo-950 dark:text-indigo-100">Recommended Tool</h3>
                        <p className="text-indigo-600/80 dark:text-indigo-300/80 text-sm">{tool.title}: {tool.description}</p>
                    </div>
                </div>

                <Button asChild className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-md shadow-indigo-200 dark:shadow-none">
                    <Link href={tool.href}>
                        Use Tool Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
