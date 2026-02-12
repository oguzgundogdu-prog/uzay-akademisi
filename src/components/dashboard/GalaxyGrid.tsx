import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, Book, FlaskConical, Globe, Moon, Languages, Hammer } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const subjects = [
    {
        id: 'math',
        title: '🔢 Matematik',
        icon: Calculator,
        path: '/math',
        color: 'text-neon-blue',
        bg: 'bg-neon-blue/20',
        border: 'border-neon-blue/40',
        delay: 0.1
    },
    {
        id: 'turkish',
        title: '📖 Türkçe',
        icon: Book,
        path: '/turkish',
        color: 'text-neon-red',
        bg: 'bg-neon-red/20',
        border: 'border-neon-red/40',
        delay: 0.2
    },
    {
        id: 'science',
        title: '🔬 Bilim',
        icon: FlaskConical,
        path: '/science',
        color: 'text-neon-green',
        bg: 'bg-neon-green/20',
        border: 'border-neon-green/40',
        delay: 0.3
    },
    {
        id: 'social',
        title: '🌍 Hayat Bilgisi',
        icon: Globe,
        path: '/social',
        color: 'text-neon-gold',
        bg: 'bg-neon-gold/20',
        border: 'border-neon-gold/40',
        delay: 0.4
    },
    {
        id: 'english',
        title: '🇬🇧 İngilizce',
        icon: Languages,
        path: '/english',
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/20',
        border: 'border-indigo-500/40',
        delay: 0.5
    },
    {
        id: 'religion',
        title: '☪️ Din Kültürü',
        icon: Moon,
        path: '/religion',
        color: 'text-neon-cyan',
        bg: 'bg-neon-cyan/20',
        border: 'border-neon-cyan/40',
        delay: 0.6
    },
    {
        id: 'lego',
        title: '🔨 Uzay Mühendisi',
        icon: Hammer,
        path: '/lego-builder',
        color: 'text-orange-400',
        bg: 'bg-orange-500/20',
        border: 'border-orange-500/40',
        delay: 0.7
    }
];

export const GalaxyGrid: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto px-4 w-full z-30">
            {subjects.map((subject) => (
                <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: subject.delay }}
                >
                    <GlassCard
                        hoverEffect
                        onClick={() => navigate(subject.path)}
                        className={`group cursor-pointer relative overflow-hidden p-4 md:p-6 flex flex-col md:flex-row items-center text-center md:text-left gap-4 md:gap-6 transition-all duration-300 ${subject.border}`}
                    >
                        {/* Background Glow */}
                        <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity ${subject.bg.replace('/20', '')}`} />

                        {/* Icon Container */}
                        <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl ${subject.bg} flex items-center justify-center border ${subject.border} shadow-[0_0_15px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-300`}>
                            <subject.icon size={28} className={`${subject.color} drop-shadow-md`} />
                        </div>

                        {/* Text */}
                        <div className="flex-1 relative z-10">
                            <h3 className={`text-lg md:text-2xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors`}>
                                {subject.title}
                            </h3>
                            <p className="text-white/40 text-[10px] md:text-xs font-mono tracking-wider mt-1 uppercase">
                                Görev İstasyonu
                            </p>
                        </div>

                        {/* Arrow Indication (hidden on mobile grid for space) */}
                        <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                            <span className={`${subject.color} text-2xl font-bold`}>&gt;</span>
                        </div>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
    );
};
