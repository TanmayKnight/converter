'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowRight, RefreshCw, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function VerifyEmailPage() {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')

    // UI State
    const [resending, setResending] = useState(false)
    const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [countdown, setCountdown] = useState(0)
    const supabase = createClient()

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    const handleResend = async () => {
        if (!email) return
        if (countdown > 0) return

        setResending(true)
        setResendStatus('idle')

        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`
                }
            })

            if (error) throw error

            setResendStatus('success')
            setCountdown(60) // Disable for 60 seconds
        } catch (error) {
            console.error('Resend error:', error)
            setResendStatus('error')
        } finally {
            setResending(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950">
            <div className="w-full max-w-md text-center">
                {/* Icon Animation */}
                <div className="relative mx-auto h-24 w-24 mb-8">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-75"></div>
                    <div className="relative bg-white dark:bg-zinc-900 rounded-full h-24 w-24 flex items-center justify-center shadow-lg border border-zinc-100 dark:border-zinc-800">
                        <Mail className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 border-4 border-white dark:border-zinc-950">
                        <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                    Check your inbox
                </h1>

                <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto">
                    We've sent a verification link to <br />
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200 mt-1 block">{email || 'your email'}</span>
                </p>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8 text-left">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-200 mb-2">Next steps:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <li>Open the email from <strong>UnitMaster</strong>.</li>
                        <li>Click the <strong>Confirm Email</strong> link.</li>
                        <li>You will be verified and redirected to the dashboard automatically.</li>
                    </ol>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={handleResend}
                            disabled={resending || countdown > 0 || !email}
                            className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-6 py-2.5 rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 w-full justify-center sm:w-auto"
                        >
                            {resending ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                                <Mail className="h-4 w-4" />
                            )}
                            {countdown > 0 ? `Resend available in ${countdown}s` : 'Resend Verification Email'}
                        </button>

                        {resendStatus === 'success' && (
                            <p className="text-xs text-green-600 font-medium animate-in fade-in slide-in-from-top-1">
                                Email sent successfully!
                            </p>
                        )}
                        {resendStatus === 'error' && (
                            <p className="text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
                                Failed to resend. Please try again later.
                            </p>
                        )}
                    </div>

                    <Link
                        href="/login"
                        className="inline-flex items-center text-sm text-zinc-500 hover:text-primary transition-colors mt-4"
                    >
                        Back to Log In <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
