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

    // v2.0 Gamification
    hearts: number;
    maxHearts: number;
    lastHeartRegen: number; // Timestamp
    gems: number;
    completedNodes: string[]; // Node IDs for the map
    currentUnit: string;

    // v2.1 Streak & Combo
    currentStreak: number;
    bestStreak: number;

    addXp: (amount: number, multiplier?: number) => void;
    addBadge: (badge: string) => void;
    completeMission: (missionId: string) => void;
    updateStudyTime: (seconds: number) => void;
    markQuestionSeen: (questionId: string) => void;

    // v2.0 Actions
    useHeart: () => boolean;
    restoreHearts: () => void;
    addGem: (amount: number) => void;
    unlockNode: (nodeId: string) => void;

    // v2.1 Streak Actions
    incrementStreak: () => void;
    resetStreak: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            xp: 0,
            level: 1,
            badges: [],
            completedMissions: [],
            dailyStudyTime: 0,
            lastStudyDate: new Date().toISOString().split('T')[0],
            seenQuestions: [],

            // v2.0 Defaults
            hearts: 5,
            maxHearts: 5,
            lastHeartRegen: Date.now(),
            gems: 0,
            completedNodes: ['start'], // Start node unlocked by default
            currentUnit: 'unit-1',

            // v2.1 Defaults
            currentStreak: 0,
            bestStreak: 0,

            addXp: (amount, multiplier = 1) => set((state) => {
                const totalAmount = amount * multiplier;
                const newXp = state.xp + totalAmount;
                const newLevel = Math.floor(newXp / 1000) + 1;

                // Badge Logic Checks
                const newBadges = [...state.badges];
                if (newLevel >= 5 && !newBadges.includes('lvl5')) newBadges.push('lvl5');
                if (newLevel >= 10 && !newBadges.includes('lvl10')) newBadges.push('lvl10');
                if (state.dailyStudyTime > 1800 && !newBadges.includes('focus')) newBadges.push('focus');

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
                const newSeen = [...state.seenQuestions, questionId];
                if (newSeen.length > 200) newSeen.shift();
                return { seenQuestions: newSeen };
            }),

            // v2.0 Action Implementations
            useHeart: () => {
                const state = get();
                const now = Date.now();
                const timeDiff = now - state.lastHeartRegen;
                const heartsToRegen = Math.floor(timeDiff / (15 * 60 * 1000));

                let currentHearts = state.hearts;
                if (heartsToRegen > 0) {
                    currentHearts = Math.min(state.maxHearts, currentHearts + heartsToRegen);
                    set({ lastHeartRegen: now, hearts: currentHearts });
                }

                if (currentHearts > 0) {
                    set((state) => ({ hearts: state.hearts - 1 }));
                    return true;
                }
                return false;
            },

            restoreHearts: () => set((state) => ({ hearts: state.maxHearts, lastHeartRegen: Date.now() })),

            addGem: (amount) => set((state) => ({ gems: state.gems + amount })),

            unlockNode: (nodeId) => set((state) => {
                if (state.completedNodes.includes(nodeId)) return state;
                return { completedNodes: [...state.completedNodes, nodeId] };
            }),

            // v2.1 Streak Implementations
            incrementStreak: () => set((state) => {
                const nextStreak = state.currentStreak + 1;
                return {
                    currentStreak: nextStreak,
                    bestStreak: Math.max(state.bestStreak, nextStreak)
                };
            }),

            resetStreak: () => set({ currentStreak: 0 }),
        }),
        {
            name: 'uzay-akademisi-v2-storage',
        }
    )
);
