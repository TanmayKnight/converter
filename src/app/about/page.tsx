import { Calculator, ShieldCheck, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">About UnitMaster</h1>
                <p className="text-xl text-muted-foreground">
                    The professional standard for engineering, scientific, and financial calculations.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                        <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Lightning Fast</h3>
                    <p className="text-muted-foreground text-sm">
                        Built on modern web technologies for instant results with no lag, ensuring your workflow never slows down.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Precision First</h3>
                    <p className="text-muted-foreground text-sm">
                        Powered by high-precision mathematical engines to ensure accuracy for engineering and financial data.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                        <Globe className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Universal</h3>
                    <p className="text-muted-foreground text-sm">
                        From easy everyday units to complex scientific formulas, we cover the entire spectrum of conversion needs.
                    </p>
                </div>
            </div>

            <div className="prose dark:prose-invert max-w-none space-y-6 bg-card p-8 rounded-3xl border border-border/50 shadow-sm">
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p>
                    In a digital world filled with cluttered and slow tools, <strong>UnitMaster</strong> was born from a simple idea:
                    computation should be beautiful, fast, and accessible to everyone.
                </p>
                <p>
                    Whether you are a student solving physics problems, a contractor estimating materials, or a finance professional calculating ROI,
                    we believe effective tools should get out of your way and let you focus on the answer.
                </p>

                <h2 className="text-2xl font-bold text-primary mt-8">Contact Us</h2>
                <p>
                    Have a suggestion, found a bug, or just want to say hi? We'd love to hear from you.
                </p>
                <p className="text-muted-foreground">
                    Email: <a href="mailto:support@unitmaster.com" className="hover:text-primary transition-colors">support@unitmaster.com</a>
                </p>
            </div>
        </div>
    );
}
