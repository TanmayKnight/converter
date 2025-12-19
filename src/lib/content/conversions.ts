export interface RichConversionContent {
    title?: string; // Optional override
    intro: string; // The "Human" paragraph explaining the conversion
    benefits?: string[]; // Bullet points
    faq?: {
        question: string;
        answer: string;
    }[];
}

// Map key is "category/from-to-to" e.g. "digital/terabyte-to-bit"
export const richConversionContent: Record<string, RichConversionContent> = {
    'digital/terabyte-to-bit': {
        intro: "In the world of data storage and networking, understanding the difference between Terabytes (TB) and Bits (b) is crucial. Hard drive manufacturers sell storage capacity in Terabytes (TB), but Internet Service Providers (ISPs) measure network speed in bits (Gbps or Mbps). This conversion helps you understand exactly how long a file transfer will take or how much raw data you actually have.",
        benefits: [
            "Calculate accurate file transfer times based on network speed.",
            "Understand the difference between Storage (Bytes) and Transmission (bits).",
            "Avoid common calculation errors by using our precision tool."
        ],
        faq: [
            {
                question: "Why convert Terabytes to Bits?",
                answer: "You typically need this conversion when calculating download times. For example, if you have a 1 TB hard drive and a 1 Gbps internet connection, you need to convert 1 TB to bits to divide it by your download speed (1,000,000,000 bits/sec)."
            },
            {
                question: "Is a Terabit the same as a Terabyte?",
                answer: "No. A Terabyte (TB) is 8 times larger than a Terabit (Tb). There are 8 bits in 1 Byte. Always check the capitalization: 'B' usually means Byte, while 'b' means bit."
            }
        ]
    },
    'length/meter-to-foot': {
        intro: "Converting meters to feet is one of the most common tasks in construction, real estate, and aviation. While the rest of the world standardizes on the Metric system (meters), the US and UK often utilize Imperial units (feet). Accurate conversion is vital for architectural plans, height restrictions, and land surveys.",
        faq: [
            {
                question: "How many feet are in a meter exactly?",
                answer: "1 meter is equal to roughly 3.28084 feet. For quick mental math, you can multiply meters by 3.3 to get an approximate foot value."
            },
            {
                question: "Why is this conversion important?",
                answer: "It bridges the gap between different engineering standards. For instance, international flight altitudes are measured in feet, but runway lengths in many countries are in meters."
            }
        ]
    },
    // Common Weight: kg to lbs
    'mass/kilogram-to-pound': {
        title: "Convert Kilograms to Pounds (kg to lbs)",
        intro: "Converting Kilograms (kg) to Pounds (lbs) is essential for international shipping, fitness tracking, and cooking. While most of the world uses Kilograms (Metric), the United States and UK frequently use Pounds (Imperial/US Customary).",
        benefits: [
            "Accurately calculate shipping weights to avoid excess fees.",
            "Translate body weight between medical (kg) and personal (lbs) records.",
            "Follow international recipes that specify metric weights."
        ],
        faq: [
            {
                question: "What is the quick rule for kg to lbs?",
                answer: "A rough estimate is to multiply the kg value by 2.2. For example, 10kg is roughly 22lbs."
            },
            {
                question: "Which is heavier: a kg or a lb?",
                answer: "A Kilogram is much heavier. 1 Kilogram is approximately equal to 2.20462 Pounds."
            }
        ]
    },
    // Common Temp: Celsius to Fahrenheit
    'temperature/celsius-to-fahrenheit': {
        title: "Convert Celsius to Fahrenheit (°C to °F)",
        intro: "Temperature conversion is one of the most frequently searched utilities. Whether you are traveling to the US from Europe (C to F) or dealing with scientific data (where C is standard), this tool gives you the exact equivalent instantly.",
        faq: [
            {
                question: "What is the formula for C to F?",
                answer: "Multiply by 1.8 (or 9/5) and add 32. Formula: (°C × 9/5) + 32 = °F."
            },
            {
                question: "What is normal room temperature?",
                answer: "20°C to 22°C is considered comfortable room temperature, which equals 68°F to 72°F."
            }
        ]
    },
    // Common Distance: km to miles
    'length/kilometer-to-mile': {
        title: "Convert Kilometers to Miles",
        intro: "Driving in a foreign country? Speed limits and road signs often change from Miles (US/UK) to Kilometers (Europe/Canada/Asia). Use this tool to instantly convert distances and speeds so you stay safe and legal.",
        faq: [
            {
                question: "How many kilometers are in a mile?",
                answer: "1 Mile is equal to approximately 1.609 Kilometers. A 5K run is about 3.1 miles."
            },
            {
                question: "Is 100 km/h fast?",
                answer: "100 km/h is equal to 62 mph, which is a standard highway speed limit in many parts of the world."
            }
        ]
    }
};
