import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BookOpen, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, cn } from '../../components/ui/core';
import { useGameStore } from '../../store/gameStore';

type WordPair = {
    id: string;
    word: string;
    match: string;
    type: 'synonym' | 'antonym'; // Eş Anlam | Zıt Anlam
};

import { turkishCurriculum } from '../../data/curriculum';

const wordData = turkishCurriculum.topics.flatMap(t => t.items.map(i => ({
    id: i.id,
    word: i.question,
    match: i.answer as string,
    type: t.id === 'synonyms' ? 'synonym' : 'antonym' as 'synonym' | 'antonym'
})));

export const TurkishGame = () => {
    const navigate = useNavigate();
    const { addXp } = useGameStore();
    const [currentPair, setCurrentPair] = useState<WordPair | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    const generateQuestion = () => {
        const randomPair = wordData[Math.floor(Math.random() * wordData.length)];

        // Generate distractors
        const distractors = new Set<string>();
        distractors.add(randomPair.match);

        while (distractors.size < 4) {
            const randomDistractor = wordData[Math.floor(Math.random() * wordData.length)].match;
            if (randomDistractor !== randomPair.match) {
                distractors.add(randomDistractor);
            }
        }

        setCurrentPair(randomPair);
        setOptions(Array.from(distractors).sort(() => Math.random() - 0.5));
        setFeedback(null);
    };

    useEffect(() => {
        generateQuestion();
    }, []);

    const handleAnswer = (selectedOption: string) => {
        if (!currentPair) return;

        if (selectedOption === currentPair.match) {
            setFeedback('correct');
            setStreak(s => s + 1);
            addXp(15 + (streak * 3));
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#BD00FF', '#FFD700', '#F472B6']
            });
            setTimeout(generateQuestion, 1500);
        } else {
            setFeedback('wrong');
            setStreak(0);
        }
    };

    if (!currentPair) return <div>Yükleniyor...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="secondary" onClick={() => navigate('/')} className="gap-2">
                    <ArrowLeft size={20} />
                    Ana Üs
                </Button>
                <div className="flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-xl border border-purple-500/30">
                    <Star className="fill-current" size={20} />
                    <span className="font-bold">{streak} Seri</span>
                </div>
            </div>

            <Card className="text-center py-12 relative overflow-visible">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-space-light p-4 rounded-full border-4 border-purple-500 shadow-[0_0_30px_rgba(189,0,255,0.3)]">
                    <BookOpen size={48} className="text-white animate-pulse" />
                </div>

                <div className="mt-8 mb-12">
                    <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-sm text-blue-200 mb-4 border border-white/20">
                        {currentPair.type === 'synonym' ? 'EŞ ANLAM' : 'ZIT ANLAM'}
                    </span>
                    <h2 className="text-blue-200 text-lg mb-4">Bu kelimenin eşi hangisi?</h2>

                    <motion.div
                        key={currentPair.word}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl font-bold bg-white/5 inline-block px-12 py-6 rounded-3xl border-2 border-purple-500/50"
                    >
                        {currentPair.word}
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <AnimatePresence mode='popLayout'>
                        {options.map((option, idx) => (
                            <motion.button
                                key={`${currentPair.id}-${option}`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAnswer(option)}
                                className={cn(
                                    "p-6 text-xl font-bold rounded-xl border-2 transition-all",
                                    feedback === 'correct' && option === currentPair.match
                                        ? "bg-green-500/20 border-green-500 text-green-400"
                                        : feedback === 'wrong' && option !== currentPair.match
                                            ? "opacity-50"
                                            : "bg-white/5 border-white/10 hover:border-purple-500 hover:bg-purple-500/10"
                                )}
                                disabled={feedback !== null}
                            >
                                {option}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={cn(
                                "mt-8 text-xl font-bold",
                                feedback === 'correct' ? "text-green-400" : "text-red-400"
                            )}
                        >
                            {feedback === 'correct' ? "Harika! Kelime Hazinen Gelişiyor! 📚" : "Tekrar Dene! 🌱"}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    );
};
