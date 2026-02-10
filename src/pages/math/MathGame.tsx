import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Rocket, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, cn } from '../../components/ui/core';
import { useGameStore } from '../../store/gameStore';

type Question = {
    n1: number;
    n2: number;
    operation: '+' | '-';
    answer: number;
    options: number[];
};

export const MathGame = () => {
    const navigate = useNavigate();
    const { addXp } = useGameStore();
    const [question, setQuestion] = useState<Question | null>(null);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    const generateQuestion = () => {
        const operation = Math.random() > 0.5 ? '+' : '-';
        let n1, n2, answer;

        if (operation === '+') {
            n1 = Math.floor(Math.random() * 50) + 1;
            n2 = Math.floor(Math.random() * 40) + 1;
            answer = n1 + n2;
        } else {
            n1 = Math.floor(Math.random() * 50) + 10;
            n2 = Math.floor(Math.random() * n1);
            answer = n1 - n2;
        }

        // Generate options
        const options = new Set<number>([answer]);
        while (options.size < 4) {
            const offset = Math.floor(Math.random() * 10) - 5;
            const option: number = answer + offset;
            if (option > 0 && option !== answer) {
                options.add(option);
            }
        }

        setQuestion({
            n1,
            n2,
            operation,
            answer,
            options: Array.from(options).sort(() => Math.random() - 0.5),
        });
        setFeedback(null);
    };

    useEffect(() => {
        generateQuestion();
    }, []);

    const handleAnswer = (option: number) => {
        if (!question) return;

        if (option === question.answer) {
            setFeedback('correct');
            setStreak(s => s + 1);
            addXp(10 + (streak * 2));
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00F0FF', '#BD00FF', '#FFD700']
            });
            setTimeout(generateQuestion, 1500);
        } else {
            setFeedback('wrong');
            setStreak(0);
        }
    };

    if (!question) return <div>Yükleniyor...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="secondary" onClick={() => navigate('/')} className="gap-2">
                    <ArrowLeft size={20} />
                    Ana Üs
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
                    <h2 className="text-blue-200 text-lg mb-4">İşlemi Çöz, Roketi Fırlat!</h2>
                    <div className="text-7xl font-bold font-mono flex items-center justify-center gap-6">
                        <motion.div
                            key={question.n1}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-white/5 p-4 rounded-2xl"
                        >
                            {question.n1}
                        </motion.div>
                        <span className="text-neon-blue">{question.operation}</span>
                        <motion.div
                            key={question.n2}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/5 p-4 rounded-2xl"
                        >
                            {question.n2}
                        </motion.div>
                        <span className="text-gray-400">=</span>
                        <div className="w-24 h-24 bg-white/10 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center text-4xl text-neon-blue">
                            ?
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <AnimatePresence mode='popLayout'>
                        {question.options.map((option: number, idx: number) => (
                            <motion.button
                                key={`${question.n1}-${question.n2}-${option}`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAnswer(option)}
                                className={cn(
                                    "p-6 text-2xl font-bold rounded-xl border-2 transition-all",
                                    feedback === 'correct' && option === question.answer
                                        ? "bg-green-500/20 border-green-500 text-green-400"
                                        : feedback === 'wrong' && option !== question.answer
                                            ? "opacity-50" // Dim wrong answers
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
                                "mt-8 text-xl font-bold",
                                feedback === 'correct' ? "text-green-400" : "text-red-400"
                            )}
                        >
                            {feedback === 'correct' ? "Harika! Doğru Cevap! 🚀" : "Tekrar Dene! 🛸"}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    );
};
