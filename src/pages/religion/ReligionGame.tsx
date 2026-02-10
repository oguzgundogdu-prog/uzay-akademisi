
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Star, Heart } from 'lucide-react'; // Changed icons for variety
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, cn } from '../../components/ui/core';
import { useGameStore } from '../../store/gameStore';
import { religiousCurriculum } from '../../data/curriculum'; // Import the new curriculum
import { GameOverlay } from '../../components/game/GameOverlay';

type QuestionItem = {
    id: string;
    question: string;
    answer: string | number;
    options: (string | number)[];
    type: string;
    explanation?: string;
};

// Flatten data
const allRelData: QuestionItem[] = religiousCurriculum.topics.flatMap(t => t.items);

export const ReligionGame = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addXp, useHeart, hearts, addGem, unlockNode } = useGameStore();

    const [selectedTopic] = useState<string | null>(location.state?.topic || null);
    const nodeId = location.state?.nodeId;
    const isCampaign = !!nodeId;

    const [currentQuestion, setCurrentQuestion] = useState<QuestionItem | null>(null);
    const [options, setOptions] = useState<(string | number)[]>([]);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    const [gameState, setGameState] = useState<'playing' | 'win' | 'lose'>('playing');
    const [questionsLeft, setQuestionsLeft] = useState(10);

    const generateQuestion = () => {
        if (isCampaign && questionsLeft <= 0) {
            handleWin();
            return;
        }

        let available = allRelData;
        if (selectedTopic) {
            // Simple filtering based on topic ID from mapData matching curriculum topic IDs
            // We might need to ensure mapData topicIds matches curriculum 'id's or we filter by checking item IDs prefix
            if (selectedTopic === 'elif-ba') available = religiousCurriculum.topics.find(t => t.id === 'elif-ba')?.items || [];
            else if (selectedTopic === 'prophets') available = religiousCurriculum.topics.find(t => t.id === 'prophets')?.items || [];
        }

        if (available.length === 0) available = allRelData;

        const randomQ = available[Math.floor(Math.random() * available.length)];
        setCurrentQuestion(randomQ);
        // Shuffle options
        setOptions([...randomQ.options].sort(() => Math.random() - 0.5));
        setFeedback(null);
    };

    const handleWin = () => {
        if (!isCampaign) return;
        setGameState('win');
        unlockNode(nodeId);
        addGem(50);
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4CAF50', '#FFC107', '#FFFFFF'] // Green/Gold/White
        });
    };

    useEffect(() => {
        generateQuestion();
    }, []);

    const handleAnswer = (selectedOption: string | number) => {
        if (!currentQuestion || feedback) return;

        if (selectedOption === currentQuestion.answer) {
            setFeedback('correct');
            setStreak(s => s + 1);
            addXp(20 + (streak * 5));

            if (isCampaign) {
                setQuestionsLeft(prev => prev - 1);
            }

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#4CAF50']
            });

            if (isCampaign && questionsLeft <= 1) {
                setTimeout(() => handleWin(), 1500);
            } else {
                setTimeout(generateQuestion, 2500);
            }
        } else {
            setFeedback('wrong');
            setStreak(0);

            const hasHearts = useHeart();
            if (!hasHearts) {
                setGameState('lose');
            }
        }
    };

    if (gameState !== 'playing') {
        return (
            <GameOverlay
                type={gameState === 'win' ? 'level-complete' : 'game-over'}
                gemsEarned={50}
                onRestart={() => window.location.reload()}
                onHome={() => navigate('/')}
            />
        );
    }

    if (!currentQuestion) return <div className="text-center text-white mt-20">Yükleniyor...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <Button variant="secondary" onClick={() => navigate('/')} className="gap-2">
                    <ArrowLeft size={20} />
                    Çıkış
                </Button>

                {isCampaign && (
                    <div className="flex-1 mx-8">
                        <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 transition-all duration-500"
                                style={{ width: `${((10 - questionsLeft) / 10) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2 bg-red-900/20 px-3 py-1 rounded-full border border-red-500/30">
                    <Heart className="text-red-500 fill-red-500" size={20} />
                    <span className="font-bold text-white">{hearts}</span>
                </div>
            </div>

            <Card className="text-center py-12 relative overflow-visible bg-[#0F172A] border-green-500/30">
                {/* Decorative Icon */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0F172A] p-4 rounded-full border-4 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <Star size={48} className="text-green-400 animate-pulse" />
                </div>

                <div className="mt-8 mb-12">
                    <span className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-sm text-green-200 mb-4 border border-green-500/20">
                        {currentQuestion.type === 'letter' ? 'Bu harf hangisidir?' :
                            currentQuestion.type === 'surah' ? 'Bu hangi suredir?' :
                                'Soruya cevap ver'}
                    </span>

                    <motion.div
                        key={currentQuestion.id}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={cn(
                            "font-bold bg-white/5 inline-block px-12 py-6 rounded-3xl border-2 border-green-500/50 mt-4 block",
                            currentQuestion.type === 'letter' ? "text-8xl font-serif" :
                                currentQuestion.type === 'surah' ? "text-3xl md:text-4xl leading-relaxed font-serif" :
                                    "text-3xl md:text-5xl"
                        )}
                    >
                        {currentQuestion.question}
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto px-4">
                    <AnimatePresence mode='popLayout'>
                        {options.map((option, idx) => (
                            <motion.button
                                key={`${currentQuestion.id}-${option}`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAnswer(option)}
                                className={cn(
                                    "p-6 text-xl font-bold rounded-xl border-2 transition-all shadow-lg",
                                    feedback === 'correct' && option === currentQuestion.answer
                                        ? "bg-green-600 border-green-400 text-white shadow-green-500/50"
                                        : feedback === 'wrong' && option !== currentQuestion.answer
                                            ? "opacity-50"
                                            : "bg-[#1E293B] border-[#334155] text-white hover:border-green-500 hover:bg-[#2D3F54]"
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
                                {feedback === 'correct' ? "Maşallah! Doğru Bildin! 🌟" : `Yanlış. Doğrusu: ${currentQuestion.answer}`}
                            </div>
                            {currentQuestion.explanation && (
                                <div className="text-lg text-white/80 mt-2 font-normal">
                                    💡 {currentQuestion.explanation}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    );
};
