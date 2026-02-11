import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Shapes, Calculator, Sparkles, Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../../components/ui/core';
import { NeonButton, GlassCard } from '../../components/ui';
import { mathCurriculum } from '../../data/curriculum';
import { useGameStore } from '../../store/gameStore';
import { GameOverlay } from '../../components/game/GameOverlay';
import { MathGenerator } from '../../utils/MathGenerator';

type Question = {
    text?: string;
    n1?: number;
    n2?: number;
    operation?: '+' | '-' | 'x' | '÷';
    answer: number | string;
    options: (number | string)[];
    type: 'procedural' | 'static';
    explanation?: string;
};

export const MathGame = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addXp, useHeart, hearts, addGem, unlockNode } = useGameStore();

    // Campaign Mode: topic & nodeId passed via state
    const [selectedTopic, setSelectedTopic] = useState<string | null>(location.state?.topic || null);
    const nodeId = location.state?.nodeId;
    const isCampaign = !!nodeId;
    const isPractice = location.state?.mode === 'practice';

    const [question, setQuestion] = useState<Question | null>(null);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [streak, setStreak] = useState(0);

    // Game State
    const [gameState, setGameState] = useState<'playing' | 'win' | 'lose'>('playing');
    const [questionsLeft, setQuestionsLeft] = useState(10); // 10 questions per level

    const generateQuestion = () => {
        if (!selectedTopic) return;

        // If Campaign mode finished
        if (isCampaign && questionsLeft <= 0) {
            handleWin();
            return;
        }

        let newQuestion;

        // Use the generator based on topic
        if (selectedTopic === 'mixed') {
            newQuestion = MathGenerator.mixed();
        } else if (selectedTopic === 'addition') {
            newQuestion = MathGenerator.addition(isCampaign ? 1 : 2);
        } else if (selectedTopic === 'subtraction') {
            newQuestion = MathGenerator.subtraction(isCampaign ? 1 : 2);
        } else if (selectedTopic === 'multiplication') {
            newQuestion = MathGenerator.multiplication(isCampaign ? 1 : 2);
        } else if (selectedTopic === 'division') {
            newQuestion = MathGenerator.division(isCampaign ? 1 : 2);
        } else {
            // Fallback for other topics like patterns/geo (keep existing logic or use static data)
            const topicData = mathCurriculum.topics.find(t => t.id === selectedTopic);
            if (topicData && topicData.items.length > 0) {
                const randomItem = topicData.items[Math.floor(Math.random() * topicData.items.length)];
                setQuestion({
                    text: randomItem.question,
                    answer: randomItem.answer,
                    options: [...randomItem.options].sort(() => Math.random() - 0.5),
                    type: 'static',
                    explanation: randomItem.explanation
                });
                setFeedback(null);
                return;
            }
            // Fallback if data missing
            newQuestion = MathGenerator.addition(1);
        }

        setQuestion({
            n1: newQuestion.n1,
            n2: newQuestion.n2,
            operation: newQuestion.operation,
            text: newQuestion.text,
            answer: newQuestion.answer,
            options: newQuestion.options,
            type: 'procedural'
        });
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
            colors: ['#00F0FF', '#BD00FF', '#FFD700']
        });
    };

    useEffect(() => {
        if (selectedTopic) {
            generateQuestion();
        }
    }, [selectedTopic]);

    // Manual Advance for Practice
    const handleNextQuestion = () => {
        generateQuestion();
    };

    const handleAnswer = (option: number | string) => {
        if (!question || feedback) return;

        if (option === question.answer) {
            setFeedback('correct');
            setStreak(s => s + 1);
            addXp(10 + (streak * 2));

            if (isCampaign) {
                setQuestionsLeft(prev => prev - 1);
            }

            confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.7 },
                colors: ['#00F0FF', '#BD00FF', '#FFD700']
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
                onRestart={() => window.location.reload()} // Simple restart
                onHome={() => navigate('/')}
            />
        );
    }

    if (!selectedTopic) {
        return (
            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                <div className="flex items-center justify-between">
                    <NeonButton variant="blue" onClick={() => navigate('/')} className="gap-2">
                        <ArrowLeft size={20} />
                        ANA ÜS
                    </NeonButton>
                    <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-500 neon-text">
                        GÖREV SEÇİMİ
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Mixed Mode Card */}
                    <GlassCard
                        hoverEffect
                        onClick={() => setSelectedTopic('mixed')}
                        className="col-span-1 md:col-span-2 bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 border-neon-pink/30 group"
                    >
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-neon-pink/20 rounded-2xl text-neon-pink group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,0,153,0.3)]">
                                <Trophy size={40} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-display font-bold text-white mb-2">KARIŞIK SINAV MODU</h3>
                                <p className="text-blue-200 text-lg">Hepsinden biraz! Yeteneklerini sına.</p>
                            </div>
                        </div>
                    </GlassCard>

                    {mathCurriculum.topics.map((topic, index) => (
                        <GlassCard
                            key={topic.id}
                            hoverEffect
                            onClick={() => setSelectedTopic(topic.id)}
                            className="group border-neon-cyan/20 hover:border-neon-cyan/60"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`p-4 rounded-xl text-black transition-all duration-300 shadow-[0_0_15px_currentColor] group-hover:scale-110
                                    ${index % 2 === 0 ? 'bg-neon-cyan text-black' : 'bg-neon-gold text-black'}
                                `}>
                                    {topic.id === 'time' ? <Clock size={32} /> :
                                        topic.id === 'geometry' ? <Shapes size={32} /> :
                                            topic.id === 'patterns' ? <Sparkles size={32} /> :
                                                <Calculator size={32} />}
                                </div>
                                <h3 className="text-2xl font-bold font-display text-white group-hover:text-neon-cyan transition-colors">
                                    {topic.title}
                                </h3>
                            </div>
                            <p className="text-gray-300 text-lg">{topic.description}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        );
    }

    if (!question) return <div className="text-center text-neon-blue animate-pulse mt-20 text-2xl">YÜKLENİYOR...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 relative">
            {/* HUD Header */}
            <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
                <NeonButton variant="blue" size='sm' onClick={() => navigate('/')} className="gap-2">
                    <ArrowLeft size={16} />
                    ÇIKIŞ
                </NeonButton>

                {isCampaign && (
                    <div className="flex-1 mx-8 flex flex-col gap-1">
                        <div className="flex justify-between text-xs text-neon-cyan/70 font-mono">
                            <span>İLERLEME</span>
                            <span>{10 - questionsLeft} / 10</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/10 relative">
                            <motion.div
                                className="h-full bg-gradient-to-r from-neon-green to-emerald-500 shadow-[0_0_10px_#00FF9D]"
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

            <GlassCard className="text-center py-16 relative overflow-hidden bg-space-deep/80 border-neon-purple/30 shadow-[0_0_50px_rgba(189,0,255,0.1)]">
                {/* Background Grid Animation */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />
                <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />

                {/* Question Content */}
                {question.type === 'static' ? (
                    <div className="mb-12 px-6 relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-white leading-relaxed drop-shadow-lg">
                            {question.text}
                        </h2>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-6 text-7xl font-bold font-mono text-white mb-16 relative z-10">
                        <motion.div
                            key={question.n1}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-black/30 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                        >
                            {question.n1}
                        </motion.div>
                        <span className="text-neon-pink text-8xl drop-shadow-[0_0_10px_rgba(255,0,153,0.5)]">{question.operation}</span>
                        <motion.div
                            key={question.n2}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-black/30 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                        >
                            {question.n2}
                        </motion.div>
                        <span className="text-gray-500 text-6xl">=</span>
                        <div className="w-32 h-32 flex items-center justify-center bg-white/5 rounded-2xl border-2 border-dashed border-white/20 text-neon-gold animate-pulse">
                            ?
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto px-4 relative z-10">
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
                                disabled={feedback !== null}
                                className={cn(
                                    "h-24 text-3xl font-bold rounded-2xl border-2 transition-all shadow-lg font-mono tracking-wider relative overflow-hidden",
                                    feedback === 'correct' && option === question.answer
                                        ? "bg-neon-green text-black border-neon-green shadow-[0_0_30px_#00FF9D]"
                                        : feedback === 'wrong' && option !== question.answer
                                            ? "opacity-30 grayscale"
                                            : feedback === 'wrong' && option === question.answer // Show correct answer even on wrong guess
                                                ? "bg-neon-green/50 text-white border-neon-green"
                                                : "bg-space-light/50 border-white/10 text-white hover:border-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                                )}
                            >
                                {option}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
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
                                        <span>HARİKA! DOĞRU CEVAP!</span>
                                    </>
                                ) : (
                                    <>
                                        <span>⚠️ YANLIŞ CEVAP</span>
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

                            {isPractice && (
                                <NeonButton
                                    onClick={handleNextQuestion}
                                    variant="cyan"
                                    className="mt-4 w-full"
                                >
                                    SIRADAKİ SORU <ArrowLeft className="rotate-180 ml-2 inline-block" />
                                </NeonButton>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>
        </div>
    );
};

