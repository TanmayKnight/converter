
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { CheckCircle2, HelpCircle, BookOpen } from 'lucide-react';

export interface FAQItem {
    question: string;
    answer: string;
}

export interface FeatureItem {
    title: string;
    description: string;
}

export interface SeoContentProps {
    title: string; // The "What is..." title
    description: string; // The main intro text
    features?: FeatureItem[];
    benefits?: string[]; // Brief bullet points
    faqs?: FAQItem[];
    jsonLd?: Record<string, any>;
}

export function SeoContentSection({ title, description, features, benefits, faqs, jsonLd }: SeoContentProps) {
    return (
        <section className="py-16 space-y-16">
            {/* JSON-LD Injection */}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}

            {/* Main Content Block */}
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="space-y-6 mb-12">
                    <h2 className="text-3xl font-bold text-center">{title}</h2>
                    <div className="prose dark:prose-invert max-w-3xl mx-auto text-left text-muted-foreground leading-relaxed text-lg">
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                </div>

                {/* Features Grid */}
                {features && features.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {features.map((feature, idx) => (
                            <Card key={idx} className="p-6 border-border/50 hover:border-primary/20 transition-colors">
                                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Benefits List (Bullet points for scannability) */}
                {benefits && benefits.length > 0 && (
                    <div className="bg-secondary/20 rounded-2xl p-8 mb-12">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-primary" />
                            Why choose UnitMaster?
                        </h3>
                        <ul className="grid md:grid-cols-2 gap-4">
                            {benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                                    <span className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* FAQ Section */}
                {faqs && faqs.length > 0 && (
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                            <HelpCircle className="w-6 h-6 text-primary" />
                            Frequently Asked Questions
                        </h2>
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`}>
                                    <AccordionTrigger className="text-left font-medium">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground whitespace-pre-line">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                )}
            </div>
        </section>
    );
}
