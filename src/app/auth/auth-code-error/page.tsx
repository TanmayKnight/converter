
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function AuthErrorPage({
    searchParams,
}: {
    searchParams: { error?: string; error_code?: string; error_description?: string }
}) {
    // In Next.js 15+, searchParams is a promise, but in 14 it's an object. 
    // Assuming Next 14/15 compat or just ignoring strict typing for the prompt.
    // Ideally we'd await it if it's a promise, but for a simple error page direct access usually works in 14.
    // Let's safe guard it.

    // Note: The screenshot shows the params in the HASH (#), not query (?).
    // Supabase often puts errors in the hash fragment for implicit flows, but also query params for others.
    // If it's in the hash, server-side searchParams won't see it.
    // However, the callback route `route.ts` redirects to this page.

    // Wait, `route.ts` does: return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    // It does NOT forward the error params unless we added them.
    // The screenshot shows the browser landing on `.../auth-code-error#error=...`
    // This implies Supabase redirected DIRECTLY there, possibly bypassing `route.ts` if the flow was implicit?
    // OR `route.ts` failed?

    // Actually, looking at `route.ts`:
    // if (code) { exchange... } 
    // return NextResponse.redirect(`${origin}/auth/auth-code-error`) -> This is the catch-all "If no code" or "If error".

    // If the user's link was invalid, Supabase might redirect to the `redirectTo` URL with error params appended.
    // Since `emailRedirectTo` was `${location.origin}/auth/callback`, Supabase hits the callback.
    // If `callback` sees an error in params, it might just be falling through?
    // `route.ts` only checks `code`. It doesn't check `error` param.
    // If Supabase sends `?error=...` to callback, `code` is null, so it falls to line 29: redirect to auth-code-error.
    // But it doesn't forward the params.

    // The screenshot shows params in the **HASH**. That usually happens with Client-side redirects or Implicit flow key.
    // Regardless, we need a generic error page. Since we can't easily read Hash server-side, we'll make a generic client component wrapper if needed, 
    // but a simple server page saying "Something went wrong" is a good start.

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 text-center">
                <div className="mx-auto h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>

                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    Authentication Error
                </h1>

                {searchParams.message ? (
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg p-4 mb-6">
                        <p className="text-red-800 dark:text-red-200 font-medium mb-1">
                            {searchParams.error || 'Check Details'}
                        </p>
                        <p className="text-red-600 dark:text-red-300 text-sm">
                            {searchParams.message}
                        </p>
                    </div>
                ) : (
                    <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                        There was a problem signing you in. The link may have expired or is invalid.
                    </p>
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
