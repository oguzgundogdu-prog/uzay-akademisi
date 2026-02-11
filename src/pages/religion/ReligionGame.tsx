import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Moon, BookOpen, Heart, Sparkles, Trophy } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../components/ui/core';
import { NeonButton, GlassCard } from '../../components/ui';
import { useGameStore } from '../../store/gameStore';
import { religiousCurriculum } from '../../data/curriculum';
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
    const { addXp, markQuestionSeen, useHeart, hearts, addGem, unlockNode } = useGameStore();

    const [selectedTopic, setSelectedTopic] = useState<string | null>(location.state?.topic || null);
    const nodeId = location.state?.nodeId;
    const isCampaign = !!nodeId;
    const isPractice = location.state?.mode === 'practice';

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
            const topic = religiousCurriculum.topics.find(t => t.id === selectedTopic);
            if (topic) available = topic.items;
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
            colors: ['#4CAF50', '#FFD700', '#FFFFFF']
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

    const handleAnswer = (selectedOption: string | number) => {
        if (!currentQuestion || feedback) return;

        if (selectedOption === currentQuestion.answer) {
            setFeedback('correct');
            setStreak(s => s + 1);
            addXp(20 + (streak * 5));
            markQuestionSeen(currentQuestion.id);

            if (isCampaign) {
                setQuestionsLeft(prev => prev - 1);
            }

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#4CAF50', '#FFD700', '#FFFFFF']
            });

            // Auto-advance only if NOT practice
            if (!isPractice) {
                if (isCampaign && questionsLeft <= 1) {
                    setTimeout(() => handleWin(), 1500);
                } else {
                    setTimeout(generateQuestion, 2500);
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
                    <NeonButton variant="green" onClick={() => navigate('/')} className="gap-2">
                        <ArrowLeft size={20} />
                        ANA ÜS
                    </NeonButton>
                    <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 neon-text">
                        GÖKSEL İLİMLER
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {religiousCurriculum.topics.map((topic) => (
                        <GlassCard
                            key={topic.id}
                            hoverEffect
                            onClick={() => setSelectedTopic(topic.id)}
                            className="group border-emerald-500/20 hover:border-emerald-500/60 cursor-pointer h-full flex flex-col"
                        >
                            <div className="p-4 bg-emerald-500/20 rounded-2xl w-fit mb-4 text-emerald-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(80,200,120,0.3)]">
                                {topic.id === 'prayer-duas' ? <Sparkles size={40} /> :
                                    topic.id === 'surahs' ? <BookOpen size={40} /> : <Moon size={40} />}
                            </div>
                            <h3 className="text-2xl font-bold font-display text-white mb-2">{topic.title}</h3>
                            <p className="text-emerald-100/70 text-lg">{topic.description}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        );
    }

    if (!currentQuestion) return <div className="text-center text-emerald-400 animate-pulse mt-20 text-2xl">NUR İNİYOR...</div>;

    const isArabic = currentQuestion.type === 'letter';

    return (
        <div className="max-w-3xl mx-auto space-y-8 relative">
            {/* HUD Header */}
            <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
                <NeonButton variant="green" size='sm' onClick={() => setSelectedTopic(null)} className="gap-2">
                    <ArrowLeft size={16} />
                    KONULAR
                </NeonButton>

                {isCampaign && (
                    <div className="flex-1 mx-8 flex flex-col gap-1">
                        <div className="flex justify-between text-xs text-emerald-400/70 font-mono">
                            <span>RUHANİ İLERLEME</span>
                            <span>{10 - questionsLeft} / 10</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/10 relative">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 shadow-[0_0_10px_#50C878]"
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
                        <Heart size={20} fill="currentColor" />
                    </motion.div>
                    <span className="font-bold text-white font-mono text-xl">{hearts}</span>
                </div>
            </div>

            <GlassCard className="text-center py-12 relative overflow-visible bg-[#0F172A]/80 border-emerald-500/30 shadow-[0_0_50px_rgba(80,200,120,0.1)]">
                {/* Holographic Projector Effect */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0F172A] p-4 rounded-full border-4 border-emerald-500 shadow-[0_0_30px_rgba(80,200,120,0.5)] z-20">
                    <Sparkles size={40} className="text-emerald-400 animate-pulse" />
                </div>

                <div className="mt-8 mb-12 relative z-10 px-6">
                    <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-sm text-emerald-400 mb-6 border border-emerald-500/30 font-mono tracking-widest uppercase">
                        {currentQuestion.type === 'letter' ? 'Harf Tanıma' :
                            currentQuestion.type === 'surah' ? 'Sure/Dua Bilgisi' : 'İslami Bilgi'}
                    </span>

                    <motion.div
                        key={currentQuestion.id}
                        initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        className={cn(
                            "font-bold text-white leading-relaxed drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]",
                            isArabic ? "text-8xl font-serif py-4 text-emerald-200" : "text-2xl md:text-4xl font-display"
                        )}
                    >
                        {currentQuestion.question}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto px-4 relative z-10">
                    <AnimatePresence mode='popLayout'>
                        {options.map((option, idx) => (
                            <motion.button
                                key={`${currentQuestion.id}-${option}`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleAnswer(option)}
                                disabled={feedback !== null}
                                className={cn(
                                    "p-6 text-xl font-bold rounded-xl border-2 transition-all shadow-lg text-center relative overflow-hidden group flex items-center justify-center font-display",
                                    feedback === 'correct' && option === currentQuestion.answer
                                        ? "bg-emerald-600 border-emerald-400 text-white shadow-[0_0_20px_rgba(80,200,120,0.5)]"
                                        : feedback === 'wrong' && option !== currentQuestion.answer
                                            ? "opacity-40 grayscale"
                                            : feedback === 'wrong' && option === currentQuestion.answer
                                                ? "bg-emerald-900/40 border-emerald-400 text-emerald-200"
                                                : "bg-[#1E293B]/80 border-slate-700 text-slate-200 hover:border-emerald-500 hover:bg-emerald-900/20"
                                )}
                            >
                                <span className="relative z-10">{option}</span>
                                {/* Celestial Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
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
                                    ? "bg-emerald-900/90 border-emerald-500 text-emerald-100 shadow-emerald-900/50"
                                    : "bg-red-900/90 border-red-500 text-red-100 shadow-red-900/50"
                            )}
                        >
                            <div className="text-2xl font-bold mb-2 flex items-center gap-3 justify-center">
                                {feedback === 'correct' ? (
                                    <>
                                        <Trophy className="w-8 h-8 text-yellow-400" />
                                        <span>MAŞALLAH! DOĞRU!</span>
                                    </>
                                ) : (
                                    <>
                                        <span>YANLIŞ CEVAP</span>
                                    </>
                                )}
                            </div>

                            <div className="text-white text-lg font-mono">
                                Doğrusu: <span className="font-bold text-emerald-300">{currentQuestion.answer}</span>
                            </div>

                            {currentQuestion.explanation && (
                                <div className="text-lg text-emerald-200/80 mt-2 max-w-md mx-auto italic">
                                    ✨ {currentQuestion.explanation}
                                </div>
                            )}

                            {isPractice && (
                                <NeonButton
                                    variant="green"
                                    onClick={handleNextQuestion}
                                    className="mt-4 mx-auto"
                                >
                                    SIRADAKİ SORU
                                </NeonButton>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>
        </div>
    );
};
