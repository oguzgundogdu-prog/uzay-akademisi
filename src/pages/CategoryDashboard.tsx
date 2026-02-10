
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Calculator,
    BookOpen,
    FlaskConical,
    ScrollText,
    Star,
    Zap,
    Trophy,
    Gamepad2
} from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const CategoryDashboard = () => {
    const navigate = useNavigate();
    const { hearts, gems, xp } = useGameStore();

    const categories = [
        {
            id: 'math',
            title: 'Matematik',
            subtitle: 'Sayıların Dünyası',
            icon: <Calculator size={48} />,
            color: 'from-blue-500 to-cyan-500',
            borderColor: 'border-blue-400',
            bg: 'bg-blue-500/10',
            path: '/math',
            state: { mode: 'practice', topic: 'mixed' } // Default to mixed for quick start
        },
        {
            id: 'religion',
            title: 'Kuran & Değerler',
            subtitle: 'Elif-Ba ve Sureler',
            icon: <Star size={48} />,
            color: 'from-emerald-500 to-green-600',
            borderColor: 'border-emerald-400',
            bg: 'bg-emerald-500/10',
            path: '/religion',
            state: { mode: 'practice', topic: 'elif-ba' }
        },
        {
            id: 'turkish',
            title: 'Türkçe',
            subtitle: 'Kelime Hazinesi',
            icon: <BookOpen size={48} />,
            color: 'from-pink-500 to-rose-500',
            borderColor: 'border-pink-400',
            bg: 'bg-pink-500/10',
            path: '/turkish',
            state: { mode: 'practice', topic: 'synonyms' }
        },
        {
            id: 'social',
            title: 'Tarih & Kültür',
            subtitle: 'Kahramanlar',
            icon: <ScrollText size={48} />,
            color: 'from-amber-500 to-orange-600',
            borderColor: 'border-amber-400',
            bg: 'bg-amber-500/10',
            path: '/social',
            state: { mode: 'practice', topic: 'ottoman-heroes' }
        },
        {
            id: 'science',
            title: 'Fen Bilimleri',
            subtitle: 'Doğa ve Uzay',
            icon: <FlaskConical size={48} />,
            color: 'from-violet-500 to-purple-600',
            borderColor: 'border-violet-400',
            bg: 'bg-violet-500/10',
            path: '/science',
            state: { mode: 'practice', topic: 'general-science' }
        }
    ];

    return (
        <div className="min-h-screen p-6 pb-24 space-y-8">
            {/* Header Stats */}
            <div className="flex items-center justify-between glass-panel p-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Trophy className="text-white" size={24} />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Seviye 1</div>
                        <div className="font-bold text-xl text-white">{Math.floor(xp / 100) + 1}</div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-xl border border-red-500/30">
                        <div className="text-red-500 drop-shadow-md">❤️</div>
                        <span className="font-bold text-white text-lg">{hearts}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-cyan-500/20 px-4 py-2 rounded-xl border border-cyan-500/30">
                        <div className="text-cyan-400 drop-shadow-md">💎</div>
                        <span className="font-bold text-white text-lg">{gems}</span>
                    </div>
                </div>
            </div>

            {/* Title */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mb-4 drop-shadow-sm">
                    Uzay Akademisi 🚀
                </h1>
                <p className="text-blue-200/60 text-lg">Bugün ne öğrenmek istersin?</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {categories.map((cat, idx) => (
                    <motion.button
                        key={cat.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(cat.path, { state: cat.state })}
                        className={`relative overflow-hidden p-6 rounded-3xl border-2 ${cat.borderColor} ${cat.bg} group text-left min-h-[160px] flex flex-col justify-between shadow-xl`}
                    >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                        <div className="flex justify-between items-start">
                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${cat.color} shadow-lg group-hover:shadow-xl transition-all`}>
                                <div className="text-white">
                                    {cat.icon}
                                </div>
                            </div>
                            <div className="bg-white/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <Zap size={20} className="text-yellow-400" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{cat.title}</h3>
                            <p className="text-white/60 font-medium">{cat.subtitle}</p>
                        </div>
                    </motion.button>
                ))}

                {/* Coming Soon Card */}
                <div className="relative overflow-hidden p-6 rounded-3xl border-2 border-white/10 bg-white/5 flex flex-col justify-center items-center text-center opacity-60">
                    <Gamepad2 size={40} className="text-white/40 mb-3" />
                    <div className="text-xl font-bold text-white/40">Yakında...</div>
                    <div className="text-sm text-white/20">Kodlama Oyunu</div>
                </div>
            </div>

            <div className="text-center mt-12 text-white/20 text-sm">
                Uzay Akademisi v2.0 • Eğitim Amaçlıdır
            </div>
        </div>
    );
};
