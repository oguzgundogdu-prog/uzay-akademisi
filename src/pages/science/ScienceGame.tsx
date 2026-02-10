import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Rocket, Star, ArrowLeft, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, cn } from '../../components/ui/core';
import { useGameStore } from '../../store/gameStore';
import { scienceCurriculum } from '../../data/curriculum';

type Question = {
    text: string;
    answer: string | number;
    options: (string | number)[];
    explanation?: string;
};

export const ScienceGame = () => {
    const navigate = useNavigate();
    const { addXp } = useGameStore();
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [question, setQuestion] = useState<Question | null>(null);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    const generateQuestion = () => {
        if (!selectedTopic) return;

        const topicData = scienceCurriculum.topics.find(t => t.id === selectedTopic);

        if (topicData && topicData.items.length > 0) {
            const randomItem = topicData.items[Math.floor(Math.random() * topicData.items.length)];
            const options = [...randomItem.options].sort(() => Math.random() - 0.5);

            setQuestion({
                text: randomItem.question,
                answer: randomItem.answer,
                options: options,
                explanation: randomItem.explanation
            });
            setFeedback(null);
        }
    };

    useEffect(() => {
        if (selectedTopic) {
            generateQuestion();
        }
    }, [selectedTopic]);

    const handleAnswer = (option: string | number) => {
        if (!question) return;

        if (option === question.answer) {
            setFeedback('correct');
            setStreak(s => s + 1);
            addXp(15 + (streak * 3));
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00F0FF', '#BD00FF', '#FFD700']
            });
            setTimeout(generateQuestion, 2500); // Time to read explanation
        } else {
            setFeedback('wrong');
            setStreak(0);
        }
    };

    if (!selectedTopic) {
        return (
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <Button variant="secondary" onClick={() => navigate('/')} className="gap-2">
                        <ArrowLeft size={20} />
                        Ana Üs
                    </Button>
                    <h1 className="text-3xl font-bold text-white">Uzay Bilimi</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {scienceCurriculum.topics.map((topic) => (
                        <motion.button
                            key={topic.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedTopic(topic.id)}
                            className="bg-space-dark/80 border-2 border-neon-blue/30 p-8 rounded-2xl text-left hover:border-neon-blue transition-colors group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-neon-blue/20 rounded-xl text-neon-blue group-hover:bg-neon-blue group-hover:text-black transition-colors">
                                    <Globe size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{topic.title}</h3>
                            </div>
                            <p className="text-gray-400 text-lg">{topic.description}</p>
                        </motion.button>
                    ))}
                </div>
            </div>
        );
    }

    if (!question) return <div>Yükleniyor...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="secondary" onClick={() => setSelectedTopic(null)} className="gap-2">
                    <ArrowLeft size={20} />
                    Konular
                </Button>
                <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-xl border border-yellow-500/30">
                    <Star className="fill-current" size={20} />
                    <span className="font-bold">{streak} Seri</span>
                </div>
            </div>

            <Card className="text-center py-12 relative overflow-visible">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-space-light p-4 rounded-full border-4 border-neon-blue shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                    <Rocket size={48} className="text-white animate-pulse" />
                </div>

                <div className="mt-8 mb-12">
                    <h2 className="text-blue-200 text-lg mb-4">Bilgini Göster!</h2>

                    <div className="min-h-[160px] flex items-center justify-center">
                        <motion.div
                            key={question.text}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-2xl md:text-3xl font-bold text-white max-w-lg mx-auto leading-relaxed"
                        >
                            {question.text}
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                    <AnimatePresence mode='popLayout'>
                        {question.options.map((option, idx) => (
                            <motion.button
                                key={`${idx}-${option}`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAnswer(option)}
                                className={cn(
                                    "p-6 font-bold rounded-xl border-2 transition-all flex items-center justify-center",
                                    typeof option === 'string' && option.length > 15 ? "text-lg" : "text-xl",
                                    feedback === 'correct' && option === question.answer
                                        ? "bg-green-500/20 border-green-500 text-green-400"
                                        : feedback === 'wrong' && option !== question.answer
                                            ? "opacity-50"
                                            : "bg-white/5 border-white/10 hover:border-neon-blue hover:bg-neon-blue/10"
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
                                "mt-8 text-xl font-bold px-4",
                                feedback === 'correct' ? "text-green-400" : "text-red-400"
                            )}
                        >
                            <div>
                                {feedback === 'correct' ? "Harika! Doğru Bildin! 🌍" : "Tekrar Dene! ☄️"}
                            </div>
                            {question.explanation && (
                                <div className="text-lg text-white/80 mt-2 font-normal">
                                    💡 {question.explanation}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    );
};
