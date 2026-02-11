import React from 'react';
import { SolarSystem } from '../components/dashboard/SolarSystem';
import { NeonButton } from '../components/ui/NeonButton';

export const CategoryDashboard: React.FC = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <div className="absolute top-24 z-20 text-center">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    GÖREV MERKEZİ
                </h1>
                <p className="text-neon-cyan mt-2 font-mono tracking-widest text-sm">SİSTEM SEÇİMİ YAPILIZIYOR...</p>
            </div>

            <SolarSystem />

            <div className="absolute bottom-20 z-20 flex gap-4">
                <NeonButton variant="cyan" size="sm">
                    GÜNLÜK GÖREVLER
                </NeonButton>
                <NeonButton variant="gold" size="sm">
                    LİDERLİK TABLOSU
                </NeonButton>
            </div>
        </div>
    );
};
