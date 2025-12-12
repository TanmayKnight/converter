
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default async function AuthErrorPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string; error_code?: string; error_description?: string; message?: string }>
}) {
    const params = await searchParams

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 text-center">
                <div className="mx-auto h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>

                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    Authentication Error
                </h1>

                {params.message ? (
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg p-4 mb-6">
                        <p className="text-red-800 dark:text-red-200 font-medium mb-1">
                            {params.error || 'Check Details'}
                        </p>
                        <p className="text-red-600 dark:text-red-300 text-sm">
                            {params.message}
                        </p>
                    </div>
                ) : (
                    <div className="mb-8">
                        <p className="text-zinc-500 dark:text-zinc-400 mb-2">
                            There was a problem signing you in. The link may have expired or is invalid.
                        </p>
                        {/* Fallback debug for Next 16 if params are missed */}
                        <p className="text-xs text-zinc-400">
                            Code: {params.error || 'Unknown'}
                        </p>
                    </div>
                )}

                <div className="space-y-3">
                    <Link
                        href="/login"
                        className="block w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                        Back to Sign In
                    </Link>
                    <Link
                        href="/"
                        className="block w-full py-2.5 rounded-lg font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
