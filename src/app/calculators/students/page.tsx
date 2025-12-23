
import Link from 'next/link';
import { Metadata } from 'next';
import {
    GraduationCap,
    Calculator,
    BookOpen,
    Clock,
} from 'lucide-react';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Free Student Calculators - GPA, Scientific & Finance | UnitMaster',
    description: 'Essential tools for students. Calculate GPA, solve complex math, and plan financial aid. Private, secure, and offline.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/students',
    },
    openGraph: {
        title: 'Free Student Calculators | UnitMaster',
        description: 'Ace your classes with our privacy-first student toolkit.',
        url: 'https://unitmaster.io/calculators/students',
        type: 'website',
    },
};

const tools = [
    {
        name: 'GPA Calculator',
        slug: 'gpa',
        icon: GraduationCap,
        desc: 'Calculate Semester and Cumulative GPA on a 4.0 scale.'
    },
    // Placeholders for future tools (Scientific, Financial Aid)
    {
        name: 'Scientific Calculator',
        slug: 'scientific',
        icon: Calculator,
        desc: 'Advanced functions (Sin, Cos, Log) for homework.'
    },
    {
        name: 'Financial Aid',
        slug: 'financial-aid',
        icon: BookOpen,
        desc: 'Estimate college costs, grants, and net price.'
    },
    {
        name: 'Grade Calculator',
        slug: 'grade',
        icon: Calculator,
        desc: 'What do I need on my final exam?'
    },
    {
        name: 'Citation Generator',
        slug: 'citation',
        icon: BookOpen, // Reusing BookOpen for now, or could import Quote/Pen
        desc: 'APA, MLA & Chicago formats for bibliographies.'
    },
    {
        name: 'Pomodoro Timer',
        slug: 'pomodoro',
        icon: Clock,
        desc: 'Boost focus with study intervals.'
    },
];

export default function StudentCalculatorsPage() {
    return (
        <div className="space-y-12 container mx-auto px-4 py-12 max-w-screen-xl">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-orange-500/10 text-orange-600 mb-4">
                    <GraduationCap className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Student Tools</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Focus on studying, not calculating.
                    Simple, privacy-first tools for your academic journey.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.slug}
                        href={`/ calculators / students / ${tool.slug} `}
                        className="group relative bg-card hover:bg-gradient-to-br from-card to-orange-500/5 border border-border hover:border-orange-500/30 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md flex flex-col"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600 transition-colors">
                                <tool.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
                            {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {tool.desc}
                        </p>
                    </Link>
                ))}
            </div>

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Student Tools', path: '/calculators/students' }
                ]}
            />
        </div>
    );
}
