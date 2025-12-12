'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2, Lock, CheckCircle, AlertCircle } from 'lucide-react'

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // Verify we have a session (link worked)
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                setError('Invalid or expired reset link. Please try requesting a new one.')
            }
        }
        checkSession()
    }, [])

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) throw error

            setMessage('Password updated successfully! Redirecting...')
            setTimeout(() => {
                router.push('/profile')
            }, 2000)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8">
                <div className="flex justify-center mb-6">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Lock className="h-6 w-6" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center mb-2 text-zinc-900 dark:text-zinc-50">Set New Password</h1>
                <p className="text-center text-zinc-500 text-sm mb-8">
                    Enter your new secure password below.
                </p>

                {error ? (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm flex items-start gap-2 mb-4">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        {error}
                    </div>
                ) : (
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">New Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-zinc-800 dark:text-white"
                                placeholder="••••••••"
                                minLength={6}
                            />
                        </div>

                        {message && (
                            <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Update Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
