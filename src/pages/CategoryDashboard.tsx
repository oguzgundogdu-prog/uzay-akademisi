import React from 'react';
import { GalaxyGrid } from '../components/dashboard/GalaxyGrid';

export const CategoryDashboard: React.FC = () => {
    return (
        <div className="h-full min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0b0c15] to-black">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-20 text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    GÖREV MERKEZİ
                </h1>
                <p className="text-neon-cyan mt-2 font-mono tracking-widest text-sm uppercase">Sistem Seçimi Yapınız</p>
            </div>

            <GalaxyGrid />
        </div>
    );
};
