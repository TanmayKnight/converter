'use client'

import { useState, useEffect } from 'react'
import { Country, State, City } from 'country-state-city'

interface LocationSelectorProps {
    defaultValues?: {
        country?: string
        state?: string
        city?: string
    }
    onChange: (values: {
        country: string,
        state: string,
        city: string,
        phoneCode: string,
        isoCode: string
    }) => void
}

export function LocationSelector({ defaultValues, onChange }: LocationSelectorProps) {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
    const [selectedState, setSelectedState] = useState<string | null>(null)
    const [selectedCity, setSelectedCity] = useState<string | null>(null)

    // Initial Load
    useEffect(() => {
        if (defaultValues?.country) {
            // Find country object by name to get ISO code
            const countryObj = Country.getAllCountries().find(c => c.name === defaultValues.country)
            if (countryObj) {
                setSelectedCountry(countryObj.isoCode)

                if (defaultValues.state) {
                    const stateObj = State.getStatesOfCountry(countryObj.isoCode).find(s => s.name === defaultValues.state)
                    if (stateObj) setSelectedState(stateObj.isoCode)
                }

                if (defaultValues.city) setSelectedCity(defaultValues.city)
            }
        }
    }, [])

    // Notify Parent on Change
    useEffect(() => {
        const countryData = selectedCountry ? Country.getCountryByCode(selectedCountry) : null
        const stateData = (selectedCountry && selectedState) ? State.getStateByCodeAndCountry(selectedState, selectedCountry) : null

        onChange({
            country: countryData?.name || '',
            state: stateData?.name || '',
            city: selectedCity || '',
            phoneCode: countryData?.phonecode ? `+${countryData.phonecode}` : '',
            isoCode: selectedCountry || ''
        })
    }, [selectedCountry, selectedState, selectedCity])

    const countries = Country.getAllCountries()
    const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : []
    const cities = (selectedCountry && selectedState) ? City.getCitiesOfState(selectedCountry, selectedState) : []

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
                {/* Country */}
                <div>
                    <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Country</label>
                    <select
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 dark:text-white text-sm"
                        value={selectedCountry || ''}
                        onChange={(e) => {
                            setSelectedCountry(e.target.value)
                            setSelectedState(null) // Reset state
                            setSelectedCity(null) // Reset city
                        }}
                    >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                            <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {/* State */}
                <div>
                    <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">State / Province</label>
                    <select
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 dark:text-white text-sm"
                        value={selectedState || ''}
                        onChange={(e) => {
                            setSelectedState(e.target.value)
                            setSelectedCity(null) // Reset city
                        }}
                        disabled={!selectedCountry}
                    >
                        <option value="">Select State</option>
                        {states.map((s) => (
                            <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* City */}
            <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">City</label>
                {cities.length > 0 ? (
                    <select
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 dark:text-white text-sm"
                        value={selectedCity || ''}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled={!selectedState}
                    >
                        <option value="">Select City</option>
                        {cities.map((c) => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                ) : (
                    // Fallback to text input if no cities found for state (edge cases)
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 dark:text-white text-sm"
                        placeholder="Enter City"
                        value={selectedCity || ''}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled={!selectedCountry}
                    />
                )}
            </div>
        </div>
    )
}
