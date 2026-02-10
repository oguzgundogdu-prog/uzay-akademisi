import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BookOpen, Star, ArrowLeft, Scroll, Feather } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, cn } from '../../components/ui/core';
import { useGameStore } from '../../store/gameStore';
import { socialCurriculum } from '../../data/curriculum';

type Question = {
    id: string;
    text: string;
    answer: string | number;
    options: (string | number)[];
    explanation?: string;
};

export const SocialGame = () => {
    const navigate = useNavigate();
    const { addXp, markQuestionSeen } = useGameStore();
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [question, setQuestion] = useState<Question | null>(null);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    const generateQuestion = () => {
        if (!selectedTopic) return;

        const topicData = socialCurriculum.topics.find(t => t.id === selectedTopic);

        if (topicData && topicData.items.length > 0) {
            const randomItem = topicData.items[Math.floor(Math.random() * topicData.items.length)];
            const options = [...randomItem.options].sort(() => Math.random() - 0.5);

            setQuestion({
                id: randomItem.id,
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
            addXp(20 + (streak * 5)); // Higher XP for reading tasks
            markQuestionSeen(question.id);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#D4AF37', '#C0C0C0', '#CD7F32'] // Gold, Silver, Bronze colors for history
            });
            setTimeout(generateQuestion, 3500); // Longer time to read explanation
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
                    <h1 className="text-3xl font-bold text-white">Tarih ve Kültür</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {socialCurriculum.topics.map((topic) => (
                        <motion.button
                            key={topic.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedTopic(topic.id)}
                            className="bg-[#2D1B0E]/80 border-2 border-[#D4AF37]/30 p-8 rounded-2xl text-left hover:border-[#D4AF37] transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-pattern-parchment opacity-10 pointer-events-none" />
                            <div className="flex items-center gap-4 mb-4 relative z-10">
                                <div className="p-3 bg-[#D4AF37]/20 rounded-xl text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#2D1B0E] transition-colors">
                                    {topic.id === 'scientists' ? <Scroll size={32} /> : <Feather size={32} />}
                                </div>
                                <h3 className="text-2xl font-bold text-[#F5DEB3]">{topic.title}</h3>
                            </div>
                            <p className="text-[#D2B48C] text-lg relative z-10">{topic.description}</p>
                        </motion.button>
                    ))}
                </div>
            </div>
        );
    }

    if (!question) return <div>Yükleniyor...</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="secondary" onClick={() => setSelectedTopic(null)} className="gap-2">
                    <ArrowLeft size={20} />
                    Konular
                </Button>
                <div className="flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-2 rounded-xl border border-[#D4AF37]/30">
                    <Star className="fill-current" size={20} />
                    <span className="font-bold">{streak} Seri</span>
                </div>
            </div>

            <Card className="text-center py-12 relative overflow-visible bg-[#2D1B0E] border-[#8B4513]">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#2D1B0E] p-4 rounded-full border-4 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                    <BookOpen size={48} className="text-[#D4AF37]" />
                </div>

                <div className="mt-8 mb-12 px-6">
                    <div className="min-h-[160px] flex items-center justify-center">
                        <motion.div
                            key={question.text}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-2xl md:text-3xl font-serif text-[#F5DEB3] max-w-2xl mx-auto leading-relaxed"
                        >
                            {question.text}
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <AnimatePresence mode='popLayout'>
                        {question.options.map((option, idx) => (
                            <motion.button
                                key={`${idx}-${option}`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleAnswer(option)}
                                className={cn(
                                    "p-6 font-bold rounded-xl border-2 transition-all flex items-center justify-center text-lg font-serif",
                                    feedback === 'correct' && option === question.answer
                                        ? "bg-green-900/40 border-green-500 text-green-400"
                                        : feedback === 'wrong' && option !== question.answer
                                            ? "opacity-50"
                                            : "bg-[#1A0F08] border-[#8B4513]/50 text-[#D2B48C] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
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
                                "mt-8 text-xl font-bold px-6 py-4 rounded-xl mx-auto max-w-xl",
                                feedback === 'correct' ? "bg-green-900/20 text-green-400 border border-green-500/30" : "bg-red-900/20 text-red-400 border border-red-500/30"
                            )}
                        >
                            <div className="mb-2">
                                {feedback === 'correct' ? "Harika! Tarih Bilgin Çok İyi! 📜" : "Tekrar Dene, Öğreniyorsun! 🕯️"}
                            </div>
                            {question.explanation && (
                                <div className="text-lg text-[#F5DEB3]/90 font-serif font-normal italic">
                                    💡 "{question.explanation}"
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    );
};
