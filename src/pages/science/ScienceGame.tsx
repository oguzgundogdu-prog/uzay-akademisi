import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Atom, FlaskConical, Dna, Microscope, Trophy } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../components/ui/core';
import { NeonButton, GlassCard } from '../../components/ui';
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
            origin: { y: 0.6 },
            colors: ['#00FF9D', '#00F0FF', '#FFFFFF']
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
                colors: ['#00FF9D', '#00F0FF', '#FFFFFF']
            });

            if (isCampaign && questionsLeft <= 1) {
                setTimeout(() => handleWin(), 1500);
            } else {
                setTimeout(generateQuestion, 2000);
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
            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                <div className="flex items-center justify-between">
                    <NeonButton variant="green" onClick={() => navigate('/')} className="gap-2">
                        <ArrowLeft size={20} />
                        ANA ÜS
                    </NeonButton>
                    <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-teal-400 neon-text">
                        BİLİM LAB
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {scienceCurriculum.topics.map((topic) => {
                        // Dynamic icon selection based on topic ID
                        const Icon = topic.id.includes('bio') ? Dna :
                            topic.id.includes('chem') ? FlaskConical :
                                topic.id.includes('space') ? Atom : Microscope;

                        return (
                            <GlassCard
                                key={topic.id}
                                hoverEffect
                                onClick={() => setSelectedTopic(topic.id)}
                                className="group border-neon-green/20 hover:border-neon-green/60 cursor-pointer h-full flex flex-col"
                            >
                                <div className="p-4 bg-neon-green/20 rounded-2xl w-fit mb-4 text-neon-green group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,255,157,0.3)]">
                                    <Icon size={40} />
                                </div>
                                <h3 className="text-2xl font-bold font-display text-white mb-2">{topic.title}</h3>
                                <p className="text-green-100/70 text-lg">{topic.description}</p>
                            </GlassCard>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (!question) return <div className="text-center text-neon-green animate-pulse mt-20 text-2xl">VERİ ANALİZ EDİLİYOR...</div>;

    const isLongText = question.text.length > 50;

    return (
        <div className="max-w-4xl mx-auto space-y-8 relative">
            {/* HUD Header */}
            <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
                <NeonButton variant="green" size='sm' onClick={() => setSelectedTopic(null)} className="gap-2">
                    <ArrowLeft size={16} />
                    KONULAR
                </NeonButton>

                {isCampaign && (
                    <div className="flex-1 mx-8 flex flex-col gap-1">
                        <div className="flex justify-between text-xs text-neon-green/70 font-mono">
                            <span>ANALİZ DURUMU</span>
                            <span>{10 - questionsLeft} / 10</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/10 relative">
                            <motion.div
                                className="h-full bg-gradient-to-r from-neon-green to-teal-500 shadow-[0_0_10px_#00FF9D]"
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

            <GlassCard className="text-center py-12 relative overflow-visible bg-space-light/50 border-neon-green/30 shadow-[0_0_50px_rgba(0,255,157,0.1)]">
                {/* Holographic Projector Effect */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0a1a15] p-4 rounded-full border-4 border-neon-green shadow-[0_0_30px_rgba(0,255,157,0.5)] z-20">
                    <Atom size={40} className="text-white animate-spin-slow" />
                </div>

                <div className="mt-8 mb-12 relative z-10 px-6">
                    <span className="inline-block px-4 py-1 rounded-full bg-neon-green/10 text-sm text-neon-green mb-6 border border-neon-green/30 font-mono tracking-widest">
                        BİLİMSEL SORGU
                    </span>

                    <motion.div
                        key={question.text}
                        initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        className={cn(
                            "font-bold text-white leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]",
                            isLongText ? "text-xl md:text-2xl text-left bg-black/20 p-6 rounded-2xl border border-white/5" : "text-3xl md:text-4xl"
                        )}
                    >
                        {question.text}
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
                                    "p-6 text-xl font-bold rounded-xl border-2 transition-all shadow-lg text-left relative overflow-hidden group flex items-center justify-center",
                                    feedback === 'correct' && option === question.answer
                                        ? "bg-neon-green text-black border-neon-green shadow-[0_0_20px_#00FF9D]"
                                        : feedback === 'wrong' && option !== question.answer
                                            ? "opacity-40 grayscale"
                                            : feedback === 'wrong' && option === question.answer
                                                ? "bg-neon-green/50 text-white border-neon-green"
                                                : "bg-[#0a1a15] border-white/10 text-white hover:border-neon-green hover:bg-neon-green/10"
                                )}
                            >
                                <span className="relative z-10 text-center">{option}</span>
                                {/* Hover scanline effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
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
                                    ? "bg-neon-green/10 border-neon-green text-neon-green shadow-neon-green/20"
                                    : "bg-neon-red/10 border-neon-red text-neon-red shadow-neon-red/20"
                            )}
                        >
                            <div className="text-2xl font-bold mb-2 flex items-center gap-3 justify-center">
                                {feedback === 'correct' ? (
                                    <>
                                        <Trophy className="w-8 h-8" />
                                        <span>HIPOTEZ DOĞRULANDI!</span>
                                    </>
                                ) : (
                                    <>
                                        <span>⚠️ DENEY BAŞARISIZ</span>
                                    </>
                                )}
                            </div>

                            <div className="text-white text-lg font-mono">
                                Doğru Cevap: <span className="font-bold text-neon-gold">{question.answer}</span>
                            </div>

                            {question.explanation && (
                                <div className="text-base text-gray-300 mt-2 max-w-md mx-auto">
                                    💡 {question.explanation}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>
        </div>
    );
};
