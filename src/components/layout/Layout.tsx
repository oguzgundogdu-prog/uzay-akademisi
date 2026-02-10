import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Rocket, Brain, BookOpen, Heart, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../ui/core';

export const Layout = () => {
    return (
        <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center bg-fixed text-white font-sans selection:bg-neon-blue selection:text-space-dark">
            <div className="min-h-screen bg-space-dark/80 backdrop-blur-sm flex flex-col">
                {/* Top Navigation Bar */}
                <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-space-dark/60 backdrop-blur-md">
                    <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-neon-blue/20 p-2 rounded-lg">
                                <Rocket className="text-neon-blue w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-purple-500">
                                UZAY AKADEMİSİ
                            </span>
                        </div>

                        <nav className="hidden md:flex items-center gap-2">
                            <NavItem to="/" icon={<Home size={20} />} label="Ana Üs" />
                            <NavItem to="/math" icon={<Brain size={20} />} label="Matematik" />
                            <NavItem to="/turkish" icon={<BookOpen size={20} />} label="Türkçe" />
                            <NavItem to="/life" icon={<Heart size={20} />} label="Yaşam" />
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm text-blue-200">Hoş geldin, Kaptan!</p>
                                <div className="flex items-center gap-2 text-xs text-yellow-500">
                                    <span>⭐ 1,250 XP</span>
                                    <span className="text-gray-500">|</span>
                                    <span>🏆 Seviye 5</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-blue to-purple-500 p-0.5">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                    alt="Avatar"
                                    className="w-full h-full rounded-full bg-space-dark"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 container mx-auto px-4 pt-28 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <>
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
                        isActive
                            ? "bg-neon-blue/20 text-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                            : "text-blue-200 hover:bg-white/5 hover:text-white"
                    )}>
                        {icon}
                        <span className="font-medium">{label}</span>
                    </div>
                    {isActive && (
                        <motion.div
                            layoutId="navbar-glow"
                            className="absolute inset-0 bg-neon-blue/5 rounded-xl -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </>
            )}
        </NavLink>
    );
}
