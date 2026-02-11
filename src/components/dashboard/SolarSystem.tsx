import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const modules = [
    {
        id: 'math',
        name: 'Matematik Üssü',
        path: '/math',
        color: 'from-blue-500 to-cyan-400',
        icon: '📐',
        orbit: 'w-[280px] h-[280px]',
        position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
        size: 'w-24 h-24',
        delay: 0
    },
    {
        id: 'turkish',
        name: 'Türkçe İstasyonu',
        path: '/turkish',
        color: 'from-red-500 to-orange-400',
        icon: '📚',
        orbit: 'w-[420px] h-[420px]',
        position: 'bottom-10 right-10',
        size: 'w-28 h-28',
        delay: 0.2
    },
    {
        id: 'science',
        name: 'Fen Laboratuvarı',
        path: '/science',
        color: 'from-green-500 to-emerald-400',
        icon: '🧬',
        orbit: 'w-[560px] h-[560px]',
        position: 'top-20 right-20',
        size: 'w-26 h-26',
        delay: 0.4
    },
    {
        id: 'social',
        name: 'Sosyal Bilimler',
        path: '/social',
        color: 'from-yellow-500 to-amber-400',
        icon: '🌍',
        orbit: 'w-[350px] h-[350px]',
        position: 'bottom-20 left-20',
        size: 'w-24 h-24',
        delay: 0.6
    },
    {
        id: 'religion',
        name: 'Değerler Eğitimi',
        path: '/religion',
        color: 'from-purple-500 to-pink-400',
        icon: '🕌',
        orbit: 'w-[500px] h-[500px]',
        position: 'top-1/2 left-10 -translate-y-1/2',
        size: 'w-22 h-22',
        delay: 0.8
    },
    {
        id: 'life',
        name: 'Yaşam Merkezi',
        path: '/life',
        color: 'from-indigo-500 to-violet-400',
        icon: '🌱',
        orbit: 'w-[650px] h-[650px]',
        position: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
        size: 'w-20 h-20',
        delay: 1.0
    },
];

export const SolarSystem: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-[80vh] flex items-center justify-center perspective-1000 overflow-hidden">

            {/* Central Star (Sun/Hub) */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                        '0 0 50px rgba(255, 215, 0, 0.2)',
                        '0 0 100px rgba(255, 215, 0, 0.4)',
                        '0 0 50px rgba(255, 215, 0, 0.2)'
                    ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_100px_rgba(255,100,0,0.5)]"
            >
                <div className="text-center text-white font-bold tracking-wider relative z-20">
                    <div className="text-3xl">🚀</div>
                    <div className="text-xs mt-1 font-display">MERKEZ</div>
                </div>

                {/* Sun Glow */}
                <div className="absolute inset-0 rounded-full bg-orange-500 blur-xl opacity-50 animate-pulse" />
            </motion.div>

            {/* Orbits & Planets */}
            {modules.map((module, index) => (
                <React.Fragment key={module.id}>
                    {/* Orbital Ring (Decorative) */}
                    <div className={`absolute border border-white/5 rounded-full ${module.orbit} pointer-events-none`} />

                    {/* Planet Container - using absolute positioning relative to center for simplicity in this version, 
              in a real 3D system we'd use rotation transforms */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: module.delay, duration: 0.5, type: 'spring' }}
                        className={`absolute ${module.orbit} pointer-events-none flex items-center justify-center animate-spin-slow`}
                        style={{ animationDuration: `${20 + index * 10}s` }}
                    >
                        {/* The Planet Itself (Counter-rotating to stay upright) */}
                        <motion.div
                            whileHover={{ scale: 1.2, zIndex: 50 }}
                            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto group`}
                            style={{ animation: `spin-reverse ${20 + index * 10}s linear infinite` }}
                            onClick={() => navigate(module.path)}
                        >
                            {/* Planet Body */}
                            <div className={`${module.size} rounded-full bg-gradient-to-br ${module.color} shadow-[0_0_30px_rgba(255,255,255,0.2)] relative overflow-hidden group-hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-shadow duration-300`}>
                                {/* Atmosphere effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute -top-2 -left-2 w-1/2 h-1/2 bg-white/20 blur-lg rounded-full" />

                                {/* Icon */}
                                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                                    {module.icon}
                                </div>
                            </div>

                            {/* Planet Label */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                {module.name}
                            </div>
                        </motion.div>
                    </motion.div>
                </React.Fragment>
            ))}

            {/* Global CSS for reverse spin to keep planets upright */}
            <style>{`
        @keyframes spin-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>
        </div>
    );
};
