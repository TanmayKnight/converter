import type { Metadata } from 'next';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us | UnitMaster Support',
    description: 'Get in touch with the UnitMaster team. We are here to help with any questions, feedback, or support requests regarding our free online tools.',
    robots: {
        index: true,
        follow: true,
    },
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl text-muted-foreground">
                    We're here to help and answer any question you might have.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Contact Card */}
                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <Mail className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Email Support</h2>
                            <p className="text-sm text-muted-foreground">Direct line to our team</p>
                        </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                        For specific inquiries, bug reports, or partnership opportunities, the best way to reach us is via email. We aim to respond within 24 hours.
                    </p>

                    <a
                        href="mailto:curiousmindshex@gmail.com"
                        className="text-lg font-medium hover:text-primary transition-colors mb-2"
                    >
                        curiousmindshex@gmail.com
                    </a>
                </div>

                {/* FAQ / Context */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-lg">Feedback</h3>
                        </div>
                        <p className="text-muted-foreground">
                            We are constantly improving our tools based on user suggestions. If you have an idea for a new calculator or feature, please let us know!
                        </p>
                    </div>

                    <div className="h-px bg-border/50" />

                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <HelpCircle className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-lg">Report an Issue</h3>
                        </div>
                        <p className="text-muted-foreground">
                            Found a bug? Precision is our top priority. If you spot a calculation error or a UI glitch, please report it immediately so we can fix it.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
