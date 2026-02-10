import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Rocket, ArrowLeft, Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, cn } from '../../components/ui/core';
import { useGameStore } from '../../store/gameStore';
import { scienceCurriculum } from '../../data/curriculum';
import { GameOverlay } from '../../components/game/GameOverlay';

type Question = {
    text: string;
    answer: string | number;
    options: (string | number)[];
    explanation?: string;
};

export const ScienceGame = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addXp, useHeart, hearts, addGem, unlockNode } = useGameStore();

    const [selectedTopic, setSelectedTopic] = useState<string | null>(location.state?.topic || null);
    const nodeId = location.state?.nodeId;
    const isCampaign = !!nodeId;

    const [question, setQuestion] = useState<Question | null>(null);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    // Game State
    const [gameState, setGameState] = useState<'playing' | 'win' | 'lose'>('playing');
    const [questionsLeft, setQuestionsLeft] = useState(10);

    const generateQuestion = () => {
        // If Campaign mode finished
        if (isCampaign && questionsLeft <= 0) {
            handleWin();
            return;
        }

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

    const handleWin = () => {
        if (!isCampaign) return;
        setGameState('win');
        unlockNode(nodeId);
        addGem(50);
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    useEffect(() => {
        if (selectedTopic) {
            generateQuestion();
        }
    }, [selectedTopic]);

    const handleAnswer = (option: string | number) => {
        if (!question || feedback) return;

        if (option === question.answer) {
            setFeedback('correct');
            setStreak(s => s + 1);
            addXp(15 + (streak * 3));

            if (isCampaign) {
                setQuestionsLeft(prev => prev - 1);
            }

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00F0FF', '#BD00FF', '#FFD700']
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
        <div className="max-w-2xl mx-auto space-y-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <Button variant="secondary" onClick={() => setSelectedTopic(null)} className="gap-2">
                    <ArrowLeft size={20} />
                    Konular
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
                    <div className="text-red-500">❤️</div>
                    <span className="font-bold text-white">{hearts}</span>
                </div>
            </div>

            <Card className="text-center py-12 relative overflow-visible bg-[#1A0F2E] border-neon-blue/30">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1A0F2E] p-4 rounded-full border-4 border-neon-blue shadow-[0_0_30px_rgba(0,240,255,0.3)]">
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
                                    "p-6 font-bold rounded-xl border-2 transition-all flex items-center justify-center shadow-lg",
                                    typeof option === 'string' && option.length > 15 ? "text-lg" : "text-xl",
                                    feedback === 'correct' && option === question.answer
                                        ? "bg-green-500/20 border-green-500 text-green-400"
                                        : feedback === 'wrong' && option !== question.answer
                                            ? "opacity-50"
                                            : "bg-[#2D1B4E] border-[#4D2B8E] text-white hover:border-neon-blue hover:bg-[#3D2B6E]"
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
