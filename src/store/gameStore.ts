import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
    xp: number;
    level: number;
    badges: string[];
    completedMissions: string[];
    dailyStudyTime: number; // in seconds
    lastStudyDate: string; // YYYY-MM-DD
    seenQuestions: string[]; // IDs of questions answered correctly

    addXp: (amount: number) => void;
    addBadge: (badge: string) => void;
    completeMission: (missionId: string) => void;
    updateStudyTime: (seconds: number) => void;
    markQuestionSeen: (questionId: string) => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            xp: 0,
            level: 1,
            badges: [],
            completedMissions: [],
            dailyStudyTime: 0,
            lastStudyDate: new Date().toISOString().split('T')[0],
            seenQuestions: [],

            addXp: (amount) => set((state) => {
                const newXp = state.xp + amount;
                const newLevel = Math.floor(newXp / 1000) + 1;

                // Badge Logic Checks
                const newBadges = [...state.badges];
                if (newLevel >= 5 && !newBadges.includes('lvl5')) newBadges.push('lvl5');
                if (newLevel >= 10 && !newBadges.includes('lvl10')) newBadges.push('lvl10');
                if (state.dailyStudyTime > 1800 && !newBadges.includes('focus')) newBadges.push('focus'); // 30 mins

                return { xp: newXp, level: newLevel, badges: newBadges };
            }),

            addBadge: (badge) => set((state) => {
                if (state.badges.includes(badge)) return state;
                return { badges: [...state.badges, badge] };
            }),

            completeMission: (missionId) => set((state) => {
                if (state.completedMissions.includes(missionId)) return state;
                return { completedMissions: [...state.completedMissions, missionId] };
            }),

            updateStudyTime: (seconds) => set((state) => {
                const today = new Date().toISOString().split('T')[0];
                if (today !== state.lastStudyDate) {
                    return { dailyStudyTime: seconds, lastStudyDate: today };
                }
                return { dailyStudyTime: state.dailyStudyTime + seconds };
            }),

            markQuestionSeen: (questionId) => set((state) => {
                if (state.seenQuestions.includes(questionId)) return state;
                // Keep only last 100 questions to avoid large state
                const newSeen = [...state.seenQuestions, questionId];
                if (newSeen.length > 100) newSeen.shift();
                return { seenQuestions: newSeen };
            }),
        }),
        {
            name: 'uzay-akademisi-storage',
        }
    )
);
