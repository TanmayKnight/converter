
'use client'

import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { LogOut, User as UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ProfileData = {
    first_name?: string | null
    [key: string]: any
}

interface UserMenuProps {
    user?: User | null
    profile?: ProfileData | null
}

export function UserMenu({ user: serverUser, profile }: UserMenuProps) {
    const [user, setUser] = useState<User | null>(serverUser || null)
    const [loading, setLoading] = useState(!serverUser)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // If we have server user, we're not loading initially
        if (serverUser) setLoading(false)

        const getUser = async () => {
            // Only fetch if we didn't get it from server
            if (!serverUser) {
                const { data: { user } } = await supabase.auth.getUser()
                setUser(user)
                setLoading(false)
            }
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [serverUser])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    if (loading) return <div className="h-9 w-9 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />

    if (!user) {
        return (
            <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                title="Sign In"
            >
                <span className="hidden sm:inline">Sign In</span>
                <UserIcon className="h-5 w-5 sm:hidden" />
            </Link>
        )
    }

    const displayName = profile?.first_name || 'Profile'

    return (
        <div className="flex items-center gap-4">
            <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-primary transition-colors">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <UserIcon className="h-5 w-5" />
                </div>
                <span className="hidden sm:inline truncate max-w-[100px]">{displayName}</span>
            </Link>
            <button
                onClick={handleSignOut}
                className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                title="Sign Out"
            >
                <LogOut className="h-5 w-5" />
            </button>
        </div>
    )
}
