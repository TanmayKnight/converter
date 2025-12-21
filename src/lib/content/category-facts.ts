import { UnitCategory } from '@/lib/units/definitions';

interface CategoryFact {
    didYouKnow: string;
    commonUses: string;
    history?: string;
}

export const categoryFacts: Record<UnitCategory, CategoryFact> = {
    length: {
        didYouKnow: "The meter was originally defined in 1793 as one ten-millionth of the distance from the equator to the North Pole along a great circle.",
        commonUses: "Length measurements are fundamental in architecture, engineering, manufacturing, and navigation.",
        history: "Before the metric system, nearly every town in Europe had its own definitions of feet and inches."
    },
    weight: {
        didYouKnow: "The kilogram is the only SI base unit that includes a prefix ('kilo') in its name. Originally, the 'grave' was proposed as the base unit.",
        commonUses: "Weight conversion is critical in logistics (shipping costs), cooking (ingredient ratios), and healthcare (dosage calculations).",
    },
    temperature: {
        didYouKnow: "At -40 degrees, the Celsius and Fahrenheit scales are exactly the same (-40°C = -40°F).",
        commonUses: "Temperature scales are vital for meteorology, cooking, and industrial processes requiring thermal control.",
    },
    volume: {
        didYouKnow: "The liter is not an official SI unit, but it is accepted for use with the SI. The official SI unit for volume is the cubic meter.",
        commonUses: "Volume is used daily for fuel consumption, cooking recipes, and water storage capacity.",
    },
    area: {
        didYouKnow: "An acre was originally defined as the amount of land a yoke of oxen could plow in one day.",
        commonUses: "Area calculations are essential for real estate (floor plans), land surveying, and agriculture.",
    },
    time: {
        didYouKnow: "A 'jiffy' is an actual unit of time, defined in physics as the time it takes light to travel one centimeter in a vacuum (approx 33.3564 picoseconds).",
        commonUses: "Time units track duration, schedule events, and measure frequency in physics and computation.",
    },
    digital: {
        didYouKnow: "A 'nibble' is half a byte (4 bits). Early computer engineers had a sense of humor!",
        commonUses: "Digital units measure data storage capacity (hard drives, RAM) and network transmission speeds.",
    },
    speed: {
        didYouKnow: "The speed of light in a vacuum is exactly 299,792,458 meters per second. This constant is now used to define the length of a meter.",
        commonUses: "Speed conversion is used in automotive industries, aviation, and athletics.",
    },
    pressure: {
        didYouKnow: "Standard atmospheric pressure at sea level is approximately 14.7 pounds per square inch (psi) or 101,325 Pascals.",
        commonUses: "Pressure units monitor tire inflation, weather systems (barometric pressure), and hydraulic machinery.",
    },
    power: {
        didYouKnow: "One horsepower was originally defined by James Watt as the power needed to lift 33,000 pounds one foot in one minute.",
        commonUses: "Power ratings describe engines, light bulbs, and electrical appliances.",
    },
    energy: {
        didYouKnow: "A calorie (food energy) is actually a kilocalorie (1,000 chemistry calories). That's why Capital 'C' Calories are confusing!",
        commonUses: "Energy units quantify food nutrition, fuel efficiency, and work performed in physics systems.",
    },
    force: {
        didYouKnow: "One Newton is roughly the force of gravity acting on a small apple (approx 100g).",
        commonUses: "Force calculations are central to structural engineering, ensuring bridges and buildings withstand loads.",
    },
    currency: {
        didYouKnow: "The British Pound Sterling is the oldest currency still in use today, dating back to the Anglo-Saxon period.",
        commonUses: "Currency conversion is essential for international travel, global trade, and forex trading.",
    },
    torque: {
        didYouKnow: "Torque is the rotational equivalent of linear force. It's what allows you to open a jar lid or turn a wrench.",
        commonUses: "Torque is a key specification for car engines, drills, and electric motors.",
    },
    acceleration: {
        didYouKnow: "Humans can withstand about 5g of sustained force before passing out, but specialized G-suits allow pilots to handle up to 9g.",
        commonUses: "Acceleration measures how quickly velocity changes, crucial for vehicle performance and rollercoaster design.",
    },
    flow: {
        didYouKnow: "The Amazon River discharges approximately 209,000 cubic meters of water per second into the Atlantic Ocean.",
        commonUses: "Flow rate determines pipe sizing in plumbing, ventilation in HVAC systems, and dosage in IV drips.",
    },
    current: {
        didYouKnow: "Electric current is the flow of electric charge. In a wire, it's actually the electrons moving, but convention says current flows Positive to Negative.",
        commonUses: "Measuring current (Amps) prevents circuit overloads and is key to designing electronics.",
    },
    voltage: {
        didYouKnow: "High voltage itself doesn't kill; it's the current (Amps) driven through the body that is dangerous. But high voltage makes it easier for current to jump!",
        commonUses: "Voltage levels distinguish between batteries (1.5V), USB (5V), and household outlets (120V/240V).",
    },
    resistance: {
        didYouKnow: "Superconductors are materials that have zero electrical resistance when cooled to extremely low temperatures.",
        commonUses: "Resistance controls current flow in circuits, used in heaters, sensors, and fuses.",
    },
    charge: {
        didYouKnow: "A single lightning bolt can transfer about 15 Coulombs of charge, which is a massive amount of energy delivered in a fraction of a second.",
        commonUses: "Charge is stored in capacitors and batteries to be released when needed.",
    },
    magnetism: {
        didYouKnow: "The Earth's magnetic field protects us from harmful solar radiation. Its strength at the surface is only about 25 to 65 microteslas.",
        commonUses: "Magnetic field strength is measured in MRI machines and particle accelerators.",
    },
    illuminance: {
        didYouKnow: "Direct sunlight offers about 100,000 lux, while a full moon only provides about 0.2 lux.",
        commonUses: "Illuminance standards ensure workplaces and roads are sufficiently lit for safety.",
    },
    radiation: {
        didYouKnow: "Bananas are slightly radioactive because they contain Potassium-40, but you'd need to eat 10 million bananas at once to die from radiation poisoning.",
        commonUses: "Radiation units measure dosage for medical X-rays and nuclear power safety.",
    },
};
