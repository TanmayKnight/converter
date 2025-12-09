export type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'time' | 'digital' | 'speed' | 'pressure' | 'power' | 'energy' | 'force' | 'currency' | 'torque' | 'acceleration' | 'flow' | 'current' | 'voltage' | 'resistance' | 'charge' | 'magnetism' | 'illuminance' | 'radiation';

export interface UnitDefinition {
    id: string;
    name: string; // Display name
    symbol: string; // e.g., "m", "kg"
    ratio: number; // Ratio relative to the base unit of the category
    offset?: number; // For temperature (e.g., Kelvin, Fahrenheit)
}

export interface CategoryDefinition {
    id: UnitCategory;
    name: string;
    baseUnit: string; // ID of the base unit
    units: UnitDefinition[];
}

export const unitDefinitions: Record<UnitCategory, CategoryDefinition> = {
    length: {
        id: 'length',
        name: 'Length',
        baseUnit: 'meter',
        units: [
            { id: 'meter', name: 'Meter', symbol: 'm', ratio: 1 },
            { id: 'kilometer', name: 'Kilometer', symbol: 'km', ratio: 1000 },
            { id: 'centimeter', name: 'Centimeter', symbol: 'cm', ratio: 0.01 },
            { id: 'millimeter', name: 'Millimeter', symbol: 'mm', ratio: 0.001 },
            { id: 'micrometer', name: 'Micrometer', symbol: 'µm', ratio: 1e-6 },
            { id: 'nanometer', name: 'Nanometer', symbol: 'nm', ratio: 1e-9 },
            { id: 'mile', name: 'Mile', symbol: 'mi', ratio: 1609.344 },
            { id: 'yard', name: 'Yard', symbol: 'yd', ratio: 0.9144 },
            { id: 'foot', name: 'Foot', symbol: 'ft', ratio: 0.3048 },
            { id: 'inch', name: 'Inch', symbol: 'in', ratio: 0.0254 },
            { id: 'nautical-mile', name: 'Nautical Mile', symbol: 'nmi', ratio: 1852 },
        ],
    },
    weight: {
        id: 'weight',
        name: 'Weight',
        baseUnit: 'kilogram',
        units: [
            { id: 'kilogram', name: 'Kilogram', symbol: 'kg', ratio: 1 },
            { id: 'gram', name: 'Gram', symbol: 'g', ratio: 0.001 },
            { id: 'milligram', name: 'Milligram', symbol: 'mg', ratio: 1e-6 },
            { id: 'metric-ton', name: 'Metric Ton', symbol: 't', ratio: 1000 },
            { id: 'pound', name: 'Pound', symbol: 'lb', ratio: 0.45359237 },
            { id: 'ounce', name: 'Ounce', symbol: 'oz', ratio: 0.028349523125 },
            { id: 'stone', name: 'Stone', symbol: 'st', ratio: 6.35029318 },
            { id: 'us-ton', name: 'US Ton', symbol: 'ton', ratio: 907.18474 },
            { id: 'imperial-ton', name: 'Imperial Ton', symbol: 'long ton', ratio: 1016.0469088 },
        ],
    },
    temperature: {
        id: 'temperature',
        name: 'Temperature',
        baseUnit: 'celsius',
        units: [
            { id: 'celsius', name: 'Celsius', symbol: '°C', ratio: 1, offset: 0 },
            { id: 'fahrenheit', name: 'Fahrenheit', symbol: '°F', ratio: 0.5555555555555556, offset: 32 }, // (F - 32) * 5/9 = C
            { id: 'kelvin', name: 'Kelvin', symbol: 'K', ratio: 1, offset: 273.15 }, // K - 273.15 = C
        ],
    },
    volume: {
        id: 'volume',
        name: 'Volume',
        baseUnit: 'liter',
        units: [
            { id: 'liter', name: 'Liter', symbol: 'L', ratio: 1 },
            { id: 'milliliter', name: 'Milliliter', symbol: 'mL', ratio: 0.001 },
            { id: 'cubic-meter', name: 'Cubic Meter', symbol: 'm³', ratio: 1000 },
            { id: 'gallon-us', name: 'Gallon (US)', symbol: 'gal', ratio: 3.785411784 },
            { id: 'quart-us', name: 'Quart (US)', symbol: 'qt', ratio: 0.946352946 },
            { id: 'pint-us', name: 'Pint (US)', symbol: 'pt', ratio: 0.473176473 },
            { id: 'cup-us', name: 'Cup (US)', symbol: 'cup', ratio: 0.2365882365 },
            { id: 'fluid-ounce-us', name: 'Fluid Ounce (US)', symbol: 'fl oz', ratio: 0.0295735295625 },
            { id: 'gallon-imperial', name: 'Gallon (Imp)', symbol: 'gal', ratio: 4.54609 },
        ],
    },
    area: {
        id: 'area',
        name: 'Area',
        baseUnit: 'square-meter',
        units: [
            { id: 'square-meter', name: 'Square Meter', symbol: 'm²', ratio: 1 },
            { id: 'square-kilometer', name: 'Square Kilometer', symbol: 'km²', ratio: 1e6 },
            { id: 'square-mile', name: 'Square Mile', symbol: 'mi²', ratio: 2.589988110336e6 },
            { id: 'square-yard', name: 'Square Yard', symbol: 'yd²', ratio: 0.83612736 },
            { id: 'square-foot', name: 'Square Foot', symbol: 'ft²', ratio: 0.09290304 },
            { id: 'square-inch', name: 'Square Inch', symbol: 'in²', ratio: 0.00064516 },
            { id: 'hectare', name: 'Hectare', symbol: 'ha', ratio: 10000 },
            { id: 'acre', name: 'Acre', symbol: 'ac', ratio: 4046.8564224 },
        ],
    },
    time: {
        id: 'time',
        name: 'Time',
        baseUnit: 'second',
        units: [
            { id: 'second', name: 'Second', symbol: 's', ratio: 1 },
            { id: 'millisecond', name: 'Millisecond', symbol: 'ms', ratio: 0.001 },
            { id: 'minute', name: 'Minute', symbol: 'min', ratio: 60 },
            { id: 'hour', name: 'Hour', symbol: 'h', ratio: 3600 },
            { id: 'day', name: 'Day', symbol: 'd', ratio: 86400 },
            { id: 'week', name: 'Week', symbol: 'wk', ratio: 604800 },
            { id: 'month', name: 'Month (Avg)', symbol: 'mo', ratio: 2.628e6 }, // 30.44 days
            { id: 'year', name: 'Year', symbol: 'yr', ratio: 3.154e7 }, // 365.25 days
        ],
    },
    digital: {
        id: 'digital',
        name: 'Data Storage',
        baseUnit: 'byte',
        units: [
            { id: 'byte', name: 'Byte', symbol: 'B', ratio: 1 },
            { id: 'bit', name: 'Bit', symbol: 'b', ratio: 0.125 },
            { id: 'kilobyte', name: 'Kilobyte', symbol: 'KB', ratio: 1024 },
            { id: 'megabyte', name: 'Megabyte', symbol: 'MB', ratio: 1048576 },
            { id: 'gigabyte', name: 'Gigabyte', symbol: 'GB', ratio: 1073741824 },
            { id: 'terabyte', name: 'Terabyte', symbol: 'TB', ratio: 1099511627776 },
            { id: 'petabyte', name: 'Petabyte', symbol: 'PB', ratio: 1.125899906842624e15 },
        ],
    },
    speed: {
        id: 'speed',
        name: 'Speed',
        baseUnit: 'meter-per-second',
        units: [
            { id: 'meter-per-second', name: 'Meter/Second', symbol: 'm/s', ratio: 1 },
            { id: 'kilometer-per-hour', name: 'Kilometer/Hour', symbol: 'km/h', ratio: 0.277777778 },
            { id: 'mile-per-hour', name: 'Mile/Hour', symbol: 'mph', ratio: 0.44704 },
            { id: 'knot', name: 'Knot', symbol: 'kn', ratio: 0.514444444 },
            { id: 'foot-per-second', name: 'Foot/Second', symbol: 'ft/s', ratio: 0.3048 },
        ],
    },
    pressure: {
        id: 'pressure',
        name: 'Pressure',
        baseUnit: 'pascal',
        units: [
            { id: 'pascal', name: 'Pascal', symbol: 'Pa', ratio: 1 },
            { id: 'bar', name: 'Bar', symbol: 'bar', ratio: 100000 },
            { id: 'psi', name: 'PSI', symbol: 'psi', ratio: 6894.757293 },
            { id: 'standard-atmosphere', name: 'Atmosphere', symbol: 'atm', ratio: 101325 },
            { id: 'torr', name: 'Torr', symbol: 'Torr', ratio: 133.322368 },
        ],
    },
    power: {
        id: 'power',
        name: 'Power',
        baseUnit: 'watt',
        units: [
            { id: 'watt', name: 'Watt', symbol: 'W', ratio: 1 },
            { id: 'kilowatt', name: 'Kilowatt', symbol: 'kW', ratio: 1000 },
            { id: 'horsepower', name: 'Horsepower (hp)', symbol: 'hp', ratio: 745.699872 },
            { id: 'horsepower-metric', name: 'Horsepower (PS)', symbol: 'ps', ratio: 735.49875 },
        ],
    },
    energy: {
        id: 'energy',
        name: 'Energy',
        baseUnit: 'joule',
        units: [
            { id: 'joule', name: 'Joule', symbol: 'J', ratio: 1 },
            { id: 'kilojoule', name: 'Kilojoule', symbol: 'kJ', ratio: 1000 },
            { id: 'gram-calorie', name: 'Calorie', symbol: 'cal', ratio: 4.184 },
            { id: 'kilocalorie', name: 'Kilocalorie', symbol: 'kcal', ratio: 4184 },
            { id: 'kilowatt-hour', name: 'Kilowatt-hour', symbol: 'kWh', ratio: 3.6e6 },
            { id: 'electronvolt', name: 'Electronvolt', symbol: 'eV', ratio: 1.60218e-19 },
        ],
    },
    force: {
        id: 'force',
        name: 'Force',
        baseUnit: 'newton',
        units: [
            { id: 'newton', name: 'Newton', symbol: 'N', ratio: 1 },
            { id: 'kilonewton', name: 'Kilonewton', symbol: 'kN', ratio: 1000 },
            { id: 'pound-force', name: 'Pound-force', symbol: 'lbf', ratio: 4.448221615 },
            { id: 'dyne', name: 'Dyne', symbol: 'dyn', ratio: 1e-5 },
        ],
    },
    currency: {
        id: 'currency',
        name: 'Currency',
        baseUnit: 'USD',
        units: [
            { id: 'USD', name: 'US Dollar', symbol: '$', ratio: 1 },
            { id: 'EUR', name: 'Euro', symbol: '€', ratio: 1.08 },
            { id: 'GBP', name: 'British Pound', symbol: '£', ratio: 1.26 },
            { id: 'INR', name: 'Indian Rupee', symbol: '₹', ratio: 0.012 },
            { id: 'JPY', name: 'Japanese Yen', symbol: '¥', ratio: 0.0067 },
            { id: 'AUD', name: 'Australian Dollar', symbol: 'A$', ratio: 0.65 },
            { id: 'CAD', name: 'Canadian Dollar', symbol: 'C$', ratio: 0.74 },
        ],
    },
    torque: {
        id: 'torque',
        name: 'Torque',
        baseUnit: 'newton-meter',
        units: [
            { id: 'newton-meter', name: 'Newton-Meter', symbol: 'N·m', ratio: 1 },
            { id: 'pound-force-foot', name: 'Pound-force Foot', symbol: 'lbf·ft', ratio: 1.3558179483 },
            { id: 'pound-force-inch', name: 'Pound-force Inch', symbol: 'lbf·in', ratio: 0.112984829 },
            { id: 'kilogram-force-meter', name: 'Kilogram-force Meter', symbol: 'kgf·m', ratio: 9.80665 },
        ]
    },
    acceleration: {
        id: 'acceleration',
        name: 'Acceleration',
        baseUnit: 'meter-per-second-squared',
        units: [
            { id: 'meter-per-second-squared', name: 'Meter/Second²', symbol: 'm/s²', ratio: 1 },
            { id: 'g-force', name: 'G-force', symbol: 'g', ratio: 9.80665 },
            { id: 'foot-per-second-squared', name: 'Foot/Second²', symbol: 'ft/s²', ratio: 0.3048 },
        ]
    },
    flow: {
        id: 'flow',
        name: 'Flow Rate',
        baseUnit: 'cubic-meter-per-second',
        units: [
            { id: 'cubic-meter-per-second', name: 'Cubic Meter/Second', symbol: 'm³/s', ratio: 1 },
            { id: 'liter-per-minute', name: 'Liter/Minute', symbol: 'L/min', ratio: 1.666667e-5 },
            { id: 'gallon-us-per-minute', name: 'Gallon (US)/Minute', symbol: 'GPM', ratio: 6.30902e-5 },
            { id: 'cubic-foot-per-second', name: 'Cubic Foot/Second', symbol: 'CFS', ratio: 0.028316847 },
        ]
    },
    current: {
        id: 'current',
        name: 'Current',
        baseUnit: 'ampere',
        units: [
            { id: 'ampere', name: 'Ampere', symbol: 'A', ratio: 1 },
            { id: 'milliampere', name: 'Milliampere', symbol: 'mA', ratio: 0.001 },
            { id: 'kiloampere', name: 'Kiloampere', symbol: 'kA', ratio: 1000 },
        ]
    },
    voltage: {
        id: 'voltage',
        name: 'Voltage',
        baseUnit: 'volt',
        units: [
            { id: 'volt', name: 'Volt', symbol: 'V', ratio: 1 },
            { id: 'millivolt', name: 'Millivolt', symbol: 'mV', ratio: 0.001 },
            { id: 'kilovolt', name: 'Kilovolt', symbol: 'kV', ratio: 1000 },
        ]
    },
    resistance: {
        id: 'resistance',
        name: 'Electric Resistance',
        baseUnit: 'ohm',
        units: [
            { id: 'ohm', name: 'Ohm', symbol: 'Ω', ratio: 1 },
            { id: 'kiloohm', name: 'Kiloohm', symbol: 'kΩ', ratio: 1000 },
            { id: 'megaohm', name: 'Megaohm', symbol: 'MΩ', ratio: 1e6 },
        ]
    },
    charge: {
        id: 'charge',
        name: 'Electric Charge',
        baseUnit: 'coulomb',
        units: [
            { id: 'coulomb', name: 'Coulomb', symbol: 'C', ratio: 1 },
            { id: 'milliampere-hour', name: 'Milliampere-hour', symbol: 'mAh', ratio: 3.6 },
            { id: 'ampere-hour', name: 'Ampere-hour', symbol: 'Ah', ratio: 3600 },
        ]
    },
    magnetism: {
        id: 'magnetism',
        name: 'Magnetism (Field)',
        baseUnit: 'tesla',
        units: [
            { id: 'tesla', name: 'Tesla', symbol: 'T', ratio: 1 },
            { id: 'gauss', name: 'Gauss', symbol: 'G', ratio: 1e-4 },
        ]
    },
    illuminance: {
        id: 'illuminance',
        name: 'Illuminance',
        baseUnit: 'lux',
        units: [
            { id: 'lux', name: 'Lux', symbol: 'lx', ratio: 1 },
            { id: 'foot-candle', name: 'Foot-candle', symbol: 'fc', ratio: 10.76391 },
        ]
    },
    radiation: {
        id: 'radiation',
        name: 'Radiation (Dose)',
        baseUnit: 'gray',
        units: [
            { id: 'gray', name: 'Gray', symbol: 'Gy', ratio: 1 },
            { id: 'sievert', name: 'Sievert', symbol: 'Sv', ratio: 1 }, // Equivalent for 1:1 QF
            { id: 'rad', name: 'Rad', symbol: 'rad', ratio: 0.01 },
            { id: 'rem', name: 'Rem', symbol: 'rem', ratio: 0.01 },
        ]
    },
};
