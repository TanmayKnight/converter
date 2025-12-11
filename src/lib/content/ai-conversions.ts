export interface EnhancedContent {
    history: string;
    realWorld: {
        title: string;
        description: string;
    }[];
    faqs: {
        question: string;
        answer: string;
    }[];
}

// Map of "category/from-to" slug to enhanced content
export const conversionContent: Record<string, EnhancedContent> = {
    'length/meter-to-foot': {
        history: "The meter was originally defined in 1793 as one ten-millionth of the distance from the equator to the North Pole. The foot, historically based on the human foot, varies by culture but was standardized in 1959 as exactly 0.3048 meters.",
        realWorld: [
            {
                title: "Building Height",
                description: "A standard story in a building is about 3 meters or 10 feet. So a 10-story building is roughly 30 meters or 100 feet tall."
            },
            {
                title: "Athletics",
                description: "The 100-meter dash track is approximately 328 feet long."
            }
        ],
        faqs: [
            {
                question: "How do I convert meters to feet for construction?",
                answer: "Multiply your meter value by 3.28084. For a rough estimate, you can multiply by 3.3."
            },
            {
                question: "Is a meter longer than a yard?",
                answer: "Yes, slightly. One meter is about 1.09 yards or 3.28 feet."
            }
        ]
    }
};
