import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface CalculatorContentProps {
    title: string;
    children: React.ReactNode;
}

export function CalculatorContent({ title, children }: CalculatorContentProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mt-16 border-t border-border pt-12">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full group mb-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-left">{title}</h2>
                    </div>
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                </button>

                <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0'}`}>
                    <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h3:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground">
                        {children}
                    </article>
                </div>
            </div>
        </div>
    );
}
