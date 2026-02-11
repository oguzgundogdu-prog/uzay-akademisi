import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Hourglass, Scroll, Landmark, Trophy } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../components/ui/core';
import { NeonButton, GlassCard } from '../../components/ui';
import { useGameStore } from '../../store/gameStore';
import { socialCurriculum } from '../../data/curriculum';
import { GameOverlay } from '../../components/game/GameOverlay';

type Question = {
    id: string;
    text: string;
    answer: string | number;
    options: (string | number)[];
    explanation?: string;
};

export const SocialGame = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addXp, markQuestionSeen, useHeart, hearts, addGem, unlockNode } = useGameStore();

    const [selectedTopic, setSelectedTopic] = useState<string | null>(location.state?.topic || null);
    const nodeId = location.state?.nodeId;
    const isCampaign = !!nodeId;
    const isPractice = location.state?.mode === 'practice';

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

        if (!selectedTopic) {
            console.error("No topic selected");
            return;
        }

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
        } else {
            console.error("Topic data not found or empty", selectedTopic);
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
            origin: { y: 0.6 },
            colors: ['#FFD700', '#B8860B', '#FFFFFF']
        });
    };

    useEffect(() => {
        if (selectedTopic) {
            generateQuestion();
        }
    }, [selectedTopic]);

    // Manual Advance for Practice Mode
    const handleNextQuestion = () => {
        generateQuestion();
    };

    const handleAnswer = (option: string | number) => {
        if (!question || feedback) return;

        if (option === question.answer) {
            setFeedback('correct');
            setStreak(s => s + 1);
            addXp(20 + (streak * 5));
            markQuestionSeen(question.id);

            if (isCampaign) {
                setQuestionsLeft(prev => prev - 1);
            }

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#B8860B', '#FFFFFF']
            });

            // Auto-advance only if NOT practice
            if (!isPractice) {
                if (isCampaign && questionsLeft <= 1) {
                    setTimeout(() => handleWin(), 1500);
                } else {
                    setTimeout(generateQuestion, 3500);
                }
            }
        } else {
            setFeedback('wrong');
            setStreak(0);

            if (!isPractice) {
                const hasHearts = useHeart();
                if (!hasHearts) {
                    setGameState('lose');
                }
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
            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                <div className="flex items-center justify-between">
                    <NeonButton variant="gold" onClick={() => navigate('/')} className="gap-2">
                        <ArrowLeft size={20} />
                        ANA ÜS
                    </NeonButton>
                    <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 neon-text">
                        TARİH ARŞİVİ
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {socialCurriculum.topics.map((topic) => (
                        <GlassCard
                            key={topic.id}
                            hoverEffect
                            onClick={() => setSelectedTopic(topic.id)}
                            className="group border-amber-500/20 hover:border-amber-500/60 cursor-pointer h-full flex flex-col"
                        >
                            <div className="p-4 bg-amber-500/20 rounded-2xl w-fit mb-4 text-amber-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,191,0,0.3)]">
                                {topic.id === 'general-history' ? <Hourglass size={40} /> : <Landmark size={40} />}
                            </div>
                            <h3 className="text-2xl font-bold font-display text-white mb-2">{topic.title}</h3>
                            <p className="text-amber-100/70 text-lg">{topic.description}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        );
    }

    if (!question) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-amber-400 gap-4">
                <div className="animate-spin-slow w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full" />
                <div className="text-2xl font-display animate-pulse">ARŞİV TARANIYOR...</div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 relative">
            {/* HUD Header */}
            <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
                <NeonButton variant="gold" size='sm' onClick={() => setSelectedTopic(null)} className="gap-2">
                    <ArrowLeft size={16} />
                    KONULAR
                </NeonButton>

                {isCampaign && (
                    <div className="flex-1 mx-8 flex flex-col gap-1">
                        <div className="flex justify-between text-xs text-amber-400/70 font-mono">
                            <span>ZAMAN AKIŞI</span>
                            <span>{10 - questionsLeft} / 10</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/10 relative">
                            <motion.div
                                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 shadow-[0_0_10px_#FFD700]"
                                initial={{ width: 0 }}
                                animate={{ width: `${((10 - questionsLeft) / 10) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/30 shadow-[0_0_10px_rgba(255,0,85,0.2)]">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-red-500"
                    >
                        ❤️
                    </motion.div>
                    <span className="font-bold text-white font-mono text-xl">{hearts}</span>
                </div>
            </div>

            <GlassCard className="text-center py-12 relative overflow-visible bg-[#2D1B0E]/80 border-amber-500/30 shadow-[0_0_50px_rgba(255,191,0,0.1)]">
                {/* Holographic Projector Effect */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#2D1B0E] p-4 rounded-full border-4 border-amber-500 shadow-[0_0_30px_rgba(255,191,0,0.5)] z-20">
                    <Scroll size={40} className="text-amber-400 animate-pulse" />
                </div>

                <div className="mt-8 mb-12 relative z-10 px-6">
                    <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 text-sm text-amber-400 mb-6 border border-amber-500/30 font-mono tracking-widest">
                        TARİHSEL KAYIT
                    </span>

                    <motion.div
                        key={question.text}
                        initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        className="text-2xl md:text-3xl font-serif text-[#F5DEB3] max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
                    >
                        "{question.text}"
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto px-4 relative z-10">
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
                                disabled={feedback !== null}
                                className={cn(
                                    "p-6 text-xl font-bold rounded-xl border-2 transition-all shadow-lg text-center relative overflow-hidden group flex items-center justify-center font-serif",
                                    feedback === 'correct' && option === question.answer
                                        ? "bg-green-900/60 border-green-500 text-green-300 shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                                        : feedback === 'wrong' && option !== question.answer
                                            ? "opacity-40 grayscale"
                                            : feedback === 'wrong' && option === question.answer
                                                ? "bg-green-900/40 border-green-500 text-green-300"
                                                : "bg-[#1A0F08]/80 border-amber-900/50 text-[#D2B48C] hover:border-amber-500 hover:bg-amber-900/20"
                                )}
                            >
                                <span className="relative z-10">{option}</span>
                                {/* Ancient Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none" />
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className={cn(
                                "absolute bottom-10 left-0 right-0 mx-auto w-max max-w-[90%] p-6 rounded-2xl border backdrop-blur-xl shadow-2xl z-50",
                                feedback === 'correct'
                                    ? "bg-green-900/80 border-green-500 text-green-300 shadow-green-900/50"
                                    : "bg-red-900/80 border-red-500 text-red-300 shadow-red-900/50"
                            )}
                        >
                            <div className="text-2xl font-bold mb-2 flex items-center gap-3 justify-center">
                                {feedback === 'correct' ? (
                                    <>
                                        <Trophy className="w-8 h-8 text-amber-400" />
                                        <span>KAYIT DOĞRULANDI!</span>
                                    </>
                                ) : (
                                    <>
                                        <span>⚠️ TARİHSEL HATA</span>
                                    </>
                                )}
                            </div>

                            {question.explanation && (
                                <div className="text-lg text-amber-100/90 font-serif italic mt-2 max-w-md mx-auto">
                                    📜 "{question.explanation}"
                                </div>
                            )}

                            {isPractice && (
                                <NeonButton
                                    variant="gold"
                                    onClick={handleNextQuestion}
                                    className="mt-4 mx-auto"
                                >
                                    SIRADAKİ KAYIT
                                </NeonButton>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>
        </div>
    );
};
