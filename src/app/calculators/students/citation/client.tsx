'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Quote, Book, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type CitationStyle = 'apa' | 'mla' | 'chicago';
type SourceType = 'website' | 'book';

interface CitationData {
    authors: string; // "Smith, John and Doe, Jane"
    title: string;
    sourceTitle: string; // Website Name or Publisher
    url: string;
    date: string; // YYYY-MM-DD
    year: string;
}

export function CitationGenerator() {
    const [style, setStyle] = useState<CitationStyle>('apa');
    const [type, setType] = useState<SourceType>('website');

    const [formData, setFormData] = useState<CitationData>({
        authors: '',
        title: '',
        sourceTitle: '',
        url: '',
        date: new Date().toISOString().split('T')[0],
        year: '',
    });

    const [generatedCitation, setGeneratedCitation] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const handleInputChange = (field: keyof CitationData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const generateCitation = () => {
        let citation = '';
        const { authors, title, sourceTitle, url, date, year } = formData;
        const authorList = authors.trim();
        const cleanDate = new Date(date);
        const dateFormatted = cleanDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        const yearOnly = cleanDate.getFullYear();

        if (style === 'apa') {
            // APA 7 Format
            // Website: Author, A. A. (Year, Month Day). Title of page. Site Name. URL
            // Book: Author, A. A. (Year). Title of work. Publisher.

            const authorText = authorList ? `${authorList}.` : '(n.d.).';

            if (type === 'website') {
                citation = `${authorText} (${dateFormatted}). *${title}*. ${sourceTitle}. ${url}`;
            } else {
                citation = `${authorText} (${year || yearOnly}). *${title}*. ${sourceTitle}.`;
            }
        } else if (style === 'mla') {
            // MLA 9 Format
            // Website: Author. "Title." Site Name, Date, URL.
            // Book: Author. Title. Publisher, Year.

            const authorText = authorList ? `${authorList}.` : '';
            if (type === 'website') {
                citation = `${authorText} "${title}." *${sourceTitle}*, ${dateFormatted}, ${url}.`;
            } else {
                citation = `${authorText} *${title}*. ${sourceTitle}, ${year || yearOnly}.`;
            }
        } else if (style === 'chicago') {
            // Chicago (Author-Date)
            // Website: Author. Year. "Title." Site Name. Month Day, Year. URL.
            const authorText = authorList ? `${authorList}.` : '';
            if (type === 'website') {
                citation = `${authorText} ${yearOnly}. "${title}." ${sourceTitle}. ${dateFormatted}. ${url}.`;
            } else {
                citation = `${authorText} ${year || yearOnly}. *${title}*. ${sourceTitle}.`;
            }
        }

        setGeneratedCitation(citation);
        setCopied(false);
    };

    const copyToClipboard = () => {
        // Strip markdown italics asterisks for plain text copy, or keep them if we want rich text?
        // For now, let's strip them for raw text, but ideally we'd copy HTML.
        const plainText = generatedCitation.replace(/\*/g, '');
        navigator.clipboard.writeText(plainText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Helper to render the citation with italics
    const renderCitationHTML = () => {
        if (!generatedCitation) return null;
        const html = generatedCitation.replace(/\*(.*?)\*/g, '<i class="italic">$1</i>');
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-7 space-y-6">
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Quote className="w-5 h-5 text-primary" />
                            Citation Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        <div className="flex gap-4">
                            <div className="w-1/2 space-y-2">
                                <Label>Style</Label>
                                <Select value={style} onValueChange={(v: any) => setStyle(v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="apa">APA 7</SelectItem>
                                        <SelectItem value="mla">MLA 9</SelectItem>
                                        <SelectItem value="chicago">Chicago</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-1/2 space-y-2">
                                <Label>Source Type</Label>
                                <Tabs value={type} onValueChange={(v: any) => setType(v)} className="w-full">
                                    <TabsList className="w-full grid grid-cols-2">
                                        <TabsTrigger value="website" className="flex gap-2"><Globe className="w-3 h-3" /> Website</TabsTrigger>
                                        <TabsTrigger value="book" className="flex gap-2"><Book className="w-3 h-3" /> Book</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Authors (Last, First)</Label>
                                <Input
                                    placeholder="e.g. Smith, John"
                                    value={formData.authors}
                                    onChange={(e) => handleInputChange('authors', e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">For multiple, separate with commas.</p>
                            </div>

                            <div className="space-y-2">
                                <Label>{type === 'website' ? 'Page Title' : 'Book Title'}</Label>
                                <Input
                                    placeholder={type === 'website' ? 'e.g. How to Cite Sources' : 'e.g. The Great Gatsby'}
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>{type === 'website' ? 'Website Name' : 'Publisher'}</Label>
                                <Input
                                    placeholder={type === 'website' ? 'e.g. Wikipedia' : 'e.g. Penguin Books'}
                                    value={formData.sourceTitle}
                                    onChange={(e) => handleInputChange('sourceTitle', e.target.value)}
                                />
                            </div>

                            {type === 'website' ? (
                                <>
                                    <div className="space-y-2">
                                        <Label>URL</Label>
                                        <Input
                                            placeholder="https://example.com/article"
                                            value={formData.url}
                                            onChange={(e) => handleInputChange('url', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date Published/Accessed</Label>
                                        <Input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => handleInputChange('date', e.target.value)}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <Label>Year Published</Label>
                                    <Input
                                        placeholder="e.g. 2023"
                                        value={formData.year}
                                        onChange={(e) => handleInputChange('year', e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        <Button className="w-full" size="lg" onClick={generateCitation}>
                            Generate Citation
                        </Button>

                    </CardContent>
                </Card>
            </div>

            {/* Result Section */}
            <div className="lg:col-span-5">
                <div className="sticky top-24 space-y-6">
                    <Card className="bg-muted/30 border-dashed border-2">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                                Your Citation ({style.toUpperCase()})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {generatedCitation ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-background border rounded-lg shadow-sm font-serif text-lg leading-relaxed text-foreground select-all">
                                        {renderCitationHTML()}
                                    </div>
                                    <Button
                                        variant={copied ? "default" : "outline"}
                                        className={cn("w-full transition-all", copied && "bg-green-600 hover:bg-green-700")}
                                        onClick={copyToClipboard}
                                    >
                                        {copied ? <><Check className="mr-2 w-4 h-4" /> Copied!</> : <><Copy className="mr-2 w-4 h-4" /> Copy to Clipboard</>}
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    <Quote className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>Fill out the form to generate your formatted citation.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-600/80 dark:text-blue-400">
                        <p className="flex items-start gap-2">
                            <Check className="w-4 h-4 mt-0.5 shrink-0" />
                            <strong>Privacy Note:</strong> This citation is generated locally in your browser. We do not store your bibliography data.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
