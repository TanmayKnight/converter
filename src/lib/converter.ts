import Decimal from 'decimal.js';
import { UnitCategory, unitDefinitions, CategoryDefinition } from './units/definitions';

// Configure Decimal for higher precision
Decimal.set({ precision: 20 });

export class Converter {
    private category: UnitCategory;
    private dynamicDefinition?: CategoryDefinition;

    constructor(category: UnitCategory, dynamicDefinition?: CategoryDefinition) {
        if (!dynamicDefinition && !unitDefinitions[category]) {
            throw new Error(`Invalid category: ${category}`);
        }
        this.category = category;
        this.dynamicDefinition = dynamicDefinition;
    }

    public convert(value: number | string, fromUnitId: string, toUnitId: string): string {
        const definitions = this.dynamicDefinition || unitDefinitions[this.category];
        const fromUnit = definitions.units.find((u) => u.id === fromUnitId);
        const toUnit = definitions.units.find((u) => u.id === toUnitId);

        if (!fromUnit || !toUnit) {
            throw new Error('Invalid unit definitions');
        }

        const val = new Decimal(value);

        // Special handling for Temperature (non-linear)
        if (this.category === 'temperature') {
            let valueInBase: Decimal;

            // Convert to Base (Celsius)
            if (fromUnit.id === 'celsius') {
                valueInBase = val;
            } else if (fromUnit.id === 'fahrenheit') {
                valueInBase = val.minus(32).times(new Decimal(5).div(9));
            } else if (fromUnit.id === 'kelvin') {
                valueInBase = val.minus(273.15);
            } else {
                valueInBase = val; // Should not happen based on types
            }

            // Convert from Base (Celsius)
            if (toUnit.id === 'celsius') {
                return valueInBase.toString();
            } else if (toUnit.id === 'fahrenheit') {
                return valueInBase.times(new Decimal(9).div(5)).plus(32).toString();
            } else if (toUnit.id === 'kelvin') {
                return valueInBase.plus(273.15).toString();
            }
        }

        // Standard linear conversion: (value * fromRatio) / toRatio
        const baseValue = val.times(fromUnit.ratio);
        const result = baseValue.div(toUnit.ratio);

        // Format to remove trailing zeros but keep precision
        return result.toDecimalPlaces(10).toString();
    }
}
