import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Star, Clock, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/ui/core';
import { useGameStore } from '../store/gameStore';

export const Dashboard = () => {
    const navigate = useNavigate();
    const { xp, level, badges } = useGameStore();

    const nextLevelXp = level * 1000;
    const progressToNext = Math.min(100, Math.floor((xp % 1000) / 10));

    return (
        <div className="space-y-8">
            <section className="text-center space-y-4">
                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-purple-400 to-neon-purple"
                >
                    Görev Kontrol Merkezi
                </motion.h1>
                <p className="text-blue-200 text-lg">Hoş geldin Kaptan! Bugün hangi gezegeni keşfedeceğiz?</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={<Star className="text-yellow-400" />}
                    title="Toplam Puan (XP)"
                    value={xp.toLocaleString()}
                    desc={`Sonraki rütbe: ${nextLevelXp} XP`}
                />
                <StatCard
                    icon={<Trophy className="text-purple-400" />}
                    title="Rozetler"
                    value={badges.length}
                    desc="Kazanılan ödüller"
                />
                <StatCard
                    icon={<Brain className="text-neon-blue" />}
                    title="Rütbe"
                    value={`Seviye ${level}`}
                    desc={`%${progressToNext} Tamamlandı`}
                />
                <StatCard
                    icon={<Clock className="text-green-400" />}
                    title="Çalışma Süresi"
                    value="0 dk"
                    desc="Bugün"
                />
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-neon-blue rounded-full"></span>
                Görev Konsolu
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MissionCard
                    title="Sayılarla Oyna"
                    category="Matematik"
                    difficulty="Karışık"
                    xp="10-50 XP"
                    color="bg-blue-500/20 border-blue-500/30"
                    onClick={() => navigate('/math')}
                />
                <MissionCard
                    title="Kelime Avcısı"
                    category="Türkçe"
                    difficulty="Karışık"
                    xp="15-60 XP"
                    color="bg-purple-500/20 border-purple-500/30"
                    onClick={() => navigate('/turkish')}
                />
                <MissionCard
                    title="Erdemli İnsan"
                    category="Yaşam"
                    difficulty="Kolay"
                    xp="20-100 XP"
                    color="bg-pink-500/20 border-pink-500/30"
                    onClick={() => navigate('/life')}
                />
                <MissionCard
                    title="Gökbilimci Rozeti"
                    category="Uzay Bilimi"
                    difficulty="Bilgi"
                    xp="15-50 XP"
                    color="bg-cyan-500/20 border-cyan-500/30"
                    onClick={() => navigate('/science')}
                />
            </div>
        </div>
    );
};

function StatCard({ icon, title, value, desc }: any) {
    return (
        <Card className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-xl">
                {React.cloneElement(icon, { size: 28 })}
            </div>
            <div>
                <p className="text-blue-200 text-sm">{title}</p>
                <h3 className="text-2xl font-bold text-white my-1">{value}</h3>
                <p className="text-xs text-white/40">{desc}</p>
            </div>
        </Card>
    );
}

function MissionCard({ title, category, difficulty, xp, color, onClick }: any) {
    return (
        <Card
            className={`group cursor-pointer hover:border-white/40 transition-all ${color} border`}
            onClick={onClick}
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold px-2 py-1 rounded bg-black/20 text-white/70">
                    {category}
                </span>
                <span className="text-sm font-bold text-yellow-400">{xp}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">{title}</h3>
            <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-blue-200">{difficulty}</span>
                <Button size="sm" variant="secondary" className="group-hover:bg-neon-blue group-hover:text-black">
                    Başla
                </Button>
            </div>
        </Card>
    );
}
