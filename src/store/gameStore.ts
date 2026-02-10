import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
    xp: number;
    level: number;
    badges: string[];
    completedMissions: string[];
    addXp: (amount: number) => void;
    addBadge: (badge: string) => void;
    completeMission: (missionId: string) => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            xp: 0,
            level: 1,
            badges: [],
            completedMissions: [],
            addXp: (amount) => set((state) => {
                const newXp = state.xp + amount;
                const newLevel = Math.floor(newXp / 1000) + 1;
                return { xp: newXp, level: newLevel };
            }),
            addBadge: (badge) => set((state) => {
                if (state.badges.includes(badge)) return state;
                return { badges: [...state.badges, badge] };
            }),
            completeMission: (missionId) => set((state) => {
                if (state.completedMissions.includes(missionId)) return state;
                return { completedMissions: [...state.completedMissions, missionId] };
            }),
        }),
        {
            name: 'uzay-akademisi-storage',
        }
    )
);
