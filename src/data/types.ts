export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
    id: string;
    text: string;
    answer: string | number;
    options: (string | number)[];
    type: 'multiple-choice' | 'input' | 'matching'; // Future proofing
    explanation?: string;
    difficulty: Difficulty;
    image?: string; // For visual questions
}

export interface Level {
    id: string;
    title: string;
    description: string;
    order: number;
    questions: Question[];
    unlockThreshold: number; // Stars needed to unlock next (e.g., 2 stars)
    rewards: {
        xp: number;
        gems: number;
        item?: string; // Unlockable avatar/badge ID
    };
    isBossLevel?: boolean; // Special challenging levels
    lecture?: {
        title: string;
        content: string;
    };
}

export interface ModuleData {
    id: string;
    title: string;
    levels: Level[];
}
