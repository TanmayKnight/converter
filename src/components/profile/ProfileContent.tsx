'use client'

import { useState } from 'react'
import { LogOut, Save, User as UserIcon, Mail, Phone, Calendar, MapPin, KeyRound, Pencil } from 'lucide-react'
import { EditProfileForm } from '@/components/profile/EditProfileForm'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type ProfileData = {
    first_name: string | null
    last_name: string | null
    phone: string | null
    street: string | null
    city: string | null
    state: string | null
    zip_code: string | null
    country: string | null
}

export function ProfileContent({
    user,
    profile
}: {
    user: any,
    profile: ProfileData
}) {
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const firstName = profile?.first_name || 'User'
    const lastName = profile?.last_name || ''
    const fullName = `${firstName} ${lastName}`.trim()
    const initials = (firstName[0] || '') + (lastName[0] || '')

    const sendPasswordReset = async () => {
        if (!user?.email) return
        const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
            redirectTo: `${window.location.origin}/profile/update-password`,
        })
        if (!error) {
            alert('A secure link to change your password has been sent to your email.')
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
        router.replace('/')
    }

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-zinc-900 shadow-lg">
                        {initials || <UserIcon className="h-10 w-10" />}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{fullName || 'Welcome!'}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold border border-green-200 dark:border-green-800 flex items-center gap-1">
                                Verified Member
                            </span>
                            <span className="text-sm text-zinc-500">{user.email}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={sendPasswordReset}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-200 rounded-lg transition-colors font-medium text-sm"
                    >
                        <KeyRound className="h-4 w-4" />
                        Change Password
                    </button>
                    <button
                        onClick={signOut}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg transition-all border border-zinc-200 dark:border-zinc-700 shadow-sm font-medium text-sm"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="grid gap-6">
                {/* Personal Details Card */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <UserIcon className="h-5 w-5 text-primary" />
                            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Personal Details</h2>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                        >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit Profile
                        </button>
                    </div>

                    <div className="p-6 grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">First Name</label>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100 text-lg">
                                {profile?.first_name || <span className="text-zinc-400 italic">Not set</span>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Last Name</label>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100 text-lg">
                                {profile?.last_name || <span className="text-zinc-400 italic">Not set</span>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Email Address</label>
                            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium">
                                <Mail className="h-4 w-4 text-zinc-400" />
                                {user.email}
                                <span className="h-2 w-2 rounded-full bg-green-500" title="Verified" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Phone Number</label>
                            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium">
                                <Phone className="h-4 w-4 text-zinc-400" />
                                {profile?.phone || <span className="text-zinc-400 italic">Not provided</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Card */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Address</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Street Address</label>
                                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {profile?.street || <span className="text-zinc-400 italic">Not provided</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">City</label>
                                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {profile?.city || <span className="text-zinc-400 italic">-</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">State / Province</label>
                                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {profile?.state || <span className="text-zinc-400 italic">-</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Postal Code</label>
                                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {profile?.zip_code || <span className="text-zinc-400 italic">-</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Country</label>
                                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {profile?.country || <span className="text-zinc-400 italic">-</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Status Card */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Account Status</h2>
                    </div>
                    <div className="p-6 grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Membership Tier</label>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                                Free Plan
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">User ID</label>
                            <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-500 font-mono">
                                {user.id}
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            {isEditing && (
                <EditProfileForm profile={profile} onClose={() => setIsEditing(false)} />
            )}
        </>
    )
}
