
import type { Metadata } from 'next';
import { PomodoroTimer } from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Free Pomodoro Timer - Online Study Focus Tool | UnitMaster',
    description: 'Boost your productivity with our free Pomodoro Timer. Customizable intervals (25/5), audio alerts, and distraction-free mode. Works in your browser.',
    keywords: [
        'pomodoro timer',
        'study timer',
        'focus timer online',
        'tomato timer',
        'productivity timer',
        '25 minute timer',
        'study clock',
    ],
    openGraph: {
        title: 'Free Pomodoro Timer - Boost Study Focus | UnitMaster',
        description: 'Stay focused with our free, distraction-free Pomodoro Timer. Perfect for studying and deep work.',
        type: 'website',
    }
};

export default function PomodoroTimerPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Calculators', path: '/calculators' },
                    { name: 'Students', path: '/calculators/students' },
                    { name: 'Pomodoro Timer', path: '/calculators/students/pomodoro' },
                ]}
            />

            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Focus Timer</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Master your time with the Pomodoro Technique. Work for 25 minutes, break for 5.
                </p>
            </div>

            <PomodoroTimer />

            <div className="mt-20">
                <SeoContentSection
                    title="How to Use the Pomodoro Technique"
                    description="The Pomodoro Technique is a proven method to improve focus and prevent burnout. It breaks work into manageable chunks, separated by short breaks. This tool handles the timing so you can handle the work."
                    features={[
                        { title: "Standard Intervals", description: "Default 25-minute focus blocks with 5-minute breaks." },
                        { title: "Audio Alerts", description: "Gentle notification sounds when your timer completes." },
                        { title: "Long Break Support", description: "Take a longer 15-minute break after 4 work cycles." },
                        { title: "Privacy-First", description: "No tracking. Your work habits are your own business." },
                    ]}
                    faqs={[
                        {
                            question: "Does this timer work in the background?",
                            answer: "Yes, the timer will continue to run even if you switch to another tab or minimize the window."
                        },
                        {
                            question: "What is the best way to use this?",
                            answer: "Decide on a task, start the 25-minute 'Focus' timer, and work until it rings. Then take a mandatory 5-minute break. Repeat."
                        }
                    ]}
                    jsonLd={{ // Corrected prop name
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "UnitMaster Pomodoro Timer",
                        "applicationCategory": "ProductivityApplication",
                        "operatingSystem": "Any",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "featureList": "Timer, Audio Alerts, Productivity Tool",
                    }}
                />
            </div>
        </div>
    );
}
