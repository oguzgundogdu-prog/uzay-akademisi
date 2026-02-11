import React from 'react';
import { useLocation } from 'react-router-dom';
import { StarField } from './StarField';
import { motion, AnimatePresence } from 'framer-motion';

interface SpaceLayoutProps {
    children: React.ReactNode;
}

export const SpaceLayout: React.FC<SpaceLayoutProps> = ({ children }) => {
    const location = useLocation();

    return (
        <div className="relative min-h-screen text-white font-sans overflow-hidden selection:bg-neon-cyan selection:text-black">
            {/* Background Layer */}
            <StarField />

            {/* HUD Frame - Top Bar */}
            <div className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-6 bg-gradient-to-b from-space-void via-space-void/80 to-transparent pointer-events-none">
                <div className="flex items-center gap-4 pointer-events-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-blue-600 p-[2px] shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full rounded-full bg-space-deep" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-brand-blue-300 font-display tracking-widest text-neon-cyan">KAPTAN</span>
                        <span className="font-bold">Öğrenci</span>
                    </div>
                </div>

                <div className="flex items-center gap-6 pointer-events-auto">
                    {/* XP Bar Mockup */}
                    <div className="hidden md:flex flex-col w-48 gap-1">
                        <div className="flex justify-between text-[10px] text-neon-cyan/70 font-mono">
                            <span>LEVEL 3</span>
                            <span>1.250 XP</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden border border-white/10">
                            <div className="h-full w-[65%] bg-gradient-to-r from-neon-cyan to-blue-500 shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="relative z-10 pt-20 pb-10 px-4 container mx-auto min-h-[calc(100vh-80px)]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="h-full"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* HUD Graphics */}
            <div className="fixed bottom-0 left-0 w-full h-[50px] bg-gradient-to-t from-space-void to-transparent pointer-events-none z-40" />
            <div className="fixed top-0 left-0 w-[50px] h-full bg-gradient-to-r from-space-void to-transparent pointer-events-none z-40" />
            <div className="fixed top-0 right-0 w-[50px] h-full bg-gradient-to-l from-space-void to-transparent pointer-events-none z-40" />

            {/* Corner Accents */}
            <div className="fixed top-4 left-4 w-32 h-32 border-l-2 border-t-2 border-white/5 rounded-tl-3xl pointer-events-none opacity-20" />
            <div className="fixed top-4 right-4 w-32 h-32 border-r-2 border-t-2 border-white/5 rounded-tr-3xl pointer-events-none opacity-20" />
            <div className="fixed bottom-4 left-4 w-32 h-32 border-l-2 border-b-2 border-white/5 rounded-bl-3xl pointer-events-none opacity-20" />
            <div className="fixed bottom-4 right-4 w-32 h-32 border-r-2 border-b-2 border-white/5 rounded-br-3xl pointer-events-none opacity-20" />
        </div>
    );
};
