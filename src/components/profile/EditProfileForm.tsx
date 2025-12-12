'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/profile/actions'
import { Loader2, X, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LocationSelector } from '@/components/common/LocationSelector'
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js'

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

export function EditProfileForm({ profile, onClose }: { profile: ProfileData, onClose: () => void }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    // Form State
    const [street, setStreet] = useState(profile.street || '')
    const [city, setCity] = useState(profile.city || '')
    const [state, setState] = useState(profile.state || '')
    const [zipCode, setZipCode] = useState(profile.zip_code || '')
    const [country, setCountry] = useState(profile.country || '')
    const [phone, setPhone] = useState(profile.phone || '') // Assuming phone stored includes country code
    const [countryIso, setCountryIso] = useState('') // Need logic to detect from country name if possible, or leave empty on init
    const [phoneCode, setPhoneCode] = useState('')

    // Validation Helpers
    const validateZipCode = (zip: string, country: string) => {
        if (country === 'United States') {
            return /^\d{5}(-\d{4})?$/.test(zip)
        }
        return zip.length >= 3 && zip.length <= 10
    }

    async function handleSubmit(formData: FormData) {
        setError(null)
        setLoading(true)

        try {
            // Location overrides
            formData.set('country', country)
            formData.set('state', state)
            formData.set('city', city)

            // Phone Validation & Formatting
            const inputPhone = formData.get('phone') as string
            // If we have a country selected, use strict validation
            if (countryIso) {
                try {
                    // If user didn't type code, prepend it. If they did, it's fine.
                    // A naive approach: if phone doesn't start with +, prepend code. 
                    // PROD: Use a separate phone input that handles this better, for now using pure validation.

                    // Actually, let's trust the user entered it or we prepended it previously.
                    // Better: use the phoneCode from selector if available.

                    const fullPhone = inputPhone.startsWith('+') ? inputPhone : `${phoneCode}${inputPhone}`
                    const phoneNumber = parsePhoneNumber(fullPhone, countryIso as CountryCode)

                    if (!phoneNumber || !phoneNumber.isValid()) {
                        throw new Error(`Invalid phone number for ${country}.`)
                    }

                    formData.set('phone', fullPhone) // Save formatted
                } catch (err) {
                    throw new Error(`Invalid phone number format for ${country}.`)
                }
            }

            // Zip Validation
            if (!validateZipCode(zipCode, country)) {
                throw new Error(`Invalid Zip/Postal Code for ${country}.`)
            }

            const result = await updateProfile(formData)

            if (result.error) {
                throw new Error(result.error)
            } else {
                onClose()
                router.refresh()
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Edit Profile</h2>
                    <button onClick={onClose} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                        <X className="h-5 w-5 text-zinc-500" />
                    </button>
                </div>

                <form action={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">First Name</label>
                            <input name="first_name" defaultValue={profile.first_name || ''} className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Last Name</label>
                            <input name="last_name" defaultValue={profile.last_name || ''} className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white" required />
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Phone Number</label>
                        <div className="relative flex">
                            {/* Show code if available, otherwise just input */}
                            {phoneCode && (
                                <div className="flex items-center justify-center px-3 border border-r-0 border-zinc-300 dark:border-zinc-700 rounded-l-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-500 font-mono text-sm min-w-[3.5rem]">
                                    {phoneCode}
                                </div>
                            )}
                            <input
                                name="phone"
                                type="tel"
                                defaultValue={profile.phone?.replace(phoneCode, '') || ''} // Strip code for display if possible, ideally we parse it
                                className={`flex-1 w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 ${phoneCode ? 'rounded-r-lg' : 'rounded-lg'} bg-transparent dark:text-white`}
                                placeholder={phoneCode ? "000 0000" : "+1 555 000 0000"}
                            />
                        </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Address</label>
                            {country && <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{country}</span>}
                        </div>

                        <div className="grid gap-3">
                            <input
                                name="street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                                placeholder="Street Address"
                                required
                            />

                            <LocationSelector
                                defaultValues={{
                                    country: profile.country || undefined,
                                    state: profile.state || undefined,
                                    city: profile.city || undefined
                                }}
                                onChange={(val) => {
                                    setCountry(val.country)
                                    setState(val.state)
                                    setCity(val.city)
                                    setPhoneCode(val.phoneCode)
                                    setCountryIso(val.isoCode)
                                }}
                            />

                            <div className="grid grid-cols-1 gap-3">
                                <input
                                    name="zip_code"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg bg-transparent dark:text-white ${zipCode && country && !validateZipCode(zipCode, country)
                                            ? 'border-red-500'
                                            : 'border-zinc-300 dark:border-zinc-700'
                                        }`}
                                    placeholder="ZIP Code"
                                    required
                                />
                                {zipCode && country && !validateZipCode(zipCode, country) && (
                                    <p className="text-xs text-red-500">Invalid postal code format for {country}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2">
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
