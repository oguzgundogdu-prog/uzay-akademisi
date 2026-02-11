import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Trophy, Lock, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../../components/ui/core';
import { NeonButton, GlassCard } from '../../components/ui';
import { useGameStore } from '../../store/gameStore';
import { GameOverlay } from '../../components/game/GameOverlay';
import { mathData } from '../../data/modules/math-data'; // New Data Source
import type { Level, Question } from '../../data/types';

import { useSound } from '../../hooks/useSound';

export const MathGame = () => {
    const navigate = useNavigate();
    // Removed unused location hook
    const { addXp, useHeart, hearts, addGem } = useGameStore();
    const { playCorrect, playWrong, playComplete, playGameOver } = useSound();

    // -- STATE --
    const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0); // Tracks correct answers
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'level-complete' | 'game-over'>('menu');
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    // Derived State
    const currentLevel: Level | undefined = mathData.levels.find(l => l.id === selectedLevelId);
    const currentQuestion: Question | undefined = currentLevel?.questions[currentQuestionIndex];
    const totalQuestions = currentLevel?.questions.length || 0;

    // -- HELPERS --
    const startGame = (levelId: string) => {
        setSelectedLevelId(levelId);
        setCurrentQuestionIndex(0);
        setScore(0);
        setGameState('playing');
        setFeedback(null);
    };

    const handleAnswer = (option: string | number) => {
        if (!currentQuestion || feedback) return; // Prevent double clicks

        const isCorrect = option === currentQuestion.answer;

        if (isCorrect) {
            playCorrect();
            setFeedback('correct');
            setScore(s => s + 1);
            addXp(15);

            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#00FF9D', '#00F0FF']
            });
        } else {
            playWrong();
            setFeedback('wrong');
            useHeart(); // Deduct 1 heart

            // Check if game over immediately due to hearts? 
            if (hearts <= 1) { // 1 because useHeart hasn't updated state yet in this render cycle roughly
                // Actually useHeart updates store, but local 'hearts' valid might be stale? 
                // Better: Let the store subscription handle it or check GameOverlay. 
                // We will rely on hearts check in render or checking store value.
                // allow animation to play first.
            }
        }

        // AUTO ADVANCE LOGIC (The "Fix")
        // Whether right or wrong, we move on after a delay.
        setTimeout(() => {
            if (hearts <= 0 && !isCorrect) { // Double check hearts
                playGameOver();
                setGameState('game-over');
                return;
            }

            if (currentQuestionIndex < totalQuestions - 1) {
                // Next Question
                setCurrentQuestionIndex(prev => prev + 1);
                setFeedback(null);
            } else {
                // Modified: Finish Level
                finishLevel();
            }
        }, isCorrect ? 1500 : 3000); // 3s wait for wrong answers to read explanation
    };

    const finishLevel = () => {
        // Calculate Stars
        const percentage = (score / totalQuestions) * 100;
        let stars = 0;
        if (percentage >= 90) stars = 3;
        else if (percentage >= 70) stars = 2;
        else if (percentage >= 50) stars = 1;

        if (stars > 0) {
            playComplete();
            setGameState('level-complete');
            addGem(currentLevel?.rewards.gems || 0);
            addXp(currentLevel?.rewards.xp || 0);
            confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        } else {
            playGameOver();
            setGameState('game-over'); // Failed to pass
        }
    };

    // -- RENDER: GAME OVER / WIN --
    if (gameState === 'level-complete' || gameState === 'game-over') {
        return (
            <GameOverlay
                type={gameState}
                gemsEarned={gameState === 'level-complete' ? currentLevel?.rewards.gems : 0}
                onRestart={() => {
                    if (selectedLevelId) startGame(selectedLevelId);
                }}
                onHome={() => setGameState('menu')}
            />
        );
    }

    // -- RENDER: PLAYING --
    if (gameState === 'playing' && currentQuestion) {
        return (
            <div className="max-w-4xl mx-auto space-y-8 relative py-8">
                {/* HUD */}
                <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg top-0 sticky z-50">
                    <NeonButton variant="blue" size='sm' onClick={() => setGameState('menu')} className="gap-2">
                        <ArrowLeft size={16} />
                        GÖREV İPTAL
                    </NeonButton>

                    <div className="flex-1 mx-8 flex flex-col gap-1">
                        <div className="flex justify-between text-xs text-neon-cyan/70 font-mono">
                            <span>GÖREV İLERLEMESİ</span>
                            <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/10 relative">
                            <motion.div
                                className="h-full bg-gradient-to-r from-neon-blue to-purple-500 shadow-[0_0_10px_#2979FF]"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/30">
                        <div className="animate-pulse text-red-500">❤️</div>
                        <span className="font-bold text-white font-mono text-xl">{hearts}</span>
                    </div>
                </div>

                {/* GAME AREA */}
                <GlassCard className="text-center py-12 relative overflow-visible bg-space-deep/80 border-neon-blue/30 min-h-[400px] flex flex-col justify-center">
                    {/* Question */}
                    <motion.div
                        key={currentQuestion.id} // Re-animate on new question
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="mb-12 relative z-10 px-6"
                    >
                        <h2 className={cn(
                            "font-bold font-display text-white leading-relaxed drop-shadow-lg",
                            currentQuestion.text.length > 50 ? "text-2xl" : "text-4xl"
                        )}>
                            {currentQuestion.text}
                        </h2>
                    </motion.div>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto px-4 w-full relative z-10">
                        <AnimatePresence mode='popLayout'>
                            {currentQuestion.options.map((option, idx) => {
                                // Dynamic Styling based on state
                                let btnVariant: any = "cyan"; // default
                                let extraClasses = "";

                                if (feedback === 'correct' && option === currentQuestion.answer) {
                                    btnVariant = "green";
                                    extraClasses = "ring-4 ring-green-400 scale-105";
                                } else if (feedback === 'wrong') {
                                    if (option === currentQuestion.answer) {
                                        btnVariant = "green"; // Show correct answer
                                        extraClasses = "opacity-100 ring-2 ring-green-400";
                                    } else if (option !== currentQuestion.answer) {
                                        extraClasses = "opacity-30 grayscale";
                                    }
                                }

                                return (
                                    <motion.div
                                        key={`${currentQuestion.id}-${idx}`}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <NeonButton
                                            variant={btnVariant}
                                            onClick={() => handleAnswer(option)}
                                            disabled={feedback !== null}
                                            className={cn("w-full py-6 text-xl h-full", extraClasses)}
                                        >
                                            {option}
                                        </NeonButton>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* FEEDBACK OVERLAY (For wrong answers) */}
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={cn(
                                    "absolute bottom-4 left-0 right-0 mx-auto w-[90%] p-4 rounded-xl border backdrop-blur-xl shadow-2xl z-50",
                                    feedback === 'correct'
                                        ? "bg-green-900/90 border-green-500"
                                        : "bg-red-900/90 border-red-500"
                                )}
                            >
                                <div className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                                    {feedback === 'correct' ? (
                                        <><Trophy size={24} className="text-yellow-400" /> DOĞRU!</>
                                    ) : (
                                        <><Lock size={24} className="text-red-300" /> YANLIŞ CEVAP - DOĞRUSU:</>
                                    )}
                                </div>

                                <div className="text-white text-lg">
                                    <span className="font-bold text-base bg-black/30 px-3 py-1 rounded-lg">
                                        {currentQuestion.answer}
                                    </span>
                                </div>

                                {currentQuestion.explanation && (
                                    <div className="text-sm text-white/80 mt-2 italic">
                                        "{currentQuestion.explanation}"
                                    </div>
                                )}

                                <div className="mt-2 text-xs text-white/50 animate-pulse">
                                    {feedback === 'correct' ? "Devam ediliyor..." : "3 saniye içinde geçiliyor..."}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </GlassCard>
            </div>
        );
    }

    // -- RENDER: MENU (Start Screen) --
    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20 pt-8">
            <div className="flex items-center justify-between">
                <NeonButton variant="blue" onClick={() => navigate('/')} className="gap-2">
                    <ArrowLeft size={20} />
                    ANA ÜS
                </NeonButton>
                <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-500 neon-text">
                    MATEMATİK ÜSSÜ
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mathData.levels.map((level) => {
                    const { xp } = useGameStore();
                    const isLocked = xp < level.unlockThreshold;

                    return (
                        <GlassCard
                            key={level.id}
                            className={cn(
                                "relative group overflow-hidden transition-all duration-300 border-2",
                                isLocked
                                    ? "border-white/5 opacity-70 grayscale cursor-not-allowed"
                                    : "border-neon-blue/30 hover:border-neon-blue hover:shadow-[0_0_30px_rgba(41,121,255,0.3)] cursor-pointer"
                            )}
                            onClick={() => !isLocked && startGame(level.id)}
                            hoverEffect={!isLocked}
                        >
                            {/* Level Number Badge */}
                            <div className={cn(
                                "absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center font-bold border",
                                isLocked ? "bg-white/5 border-white/10 text-gray-500" : "bg-white/10 text-white border-white/20"
                            )}>
                                {isLocked ? <Lock size={16} /> : level.order}
                            </div>

                            {/* Rewards Pill */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-1 rounded border border-neon-purple/30">
                                    +{level.rewards.xp} XP
                                </span>
                            </div>

                            {/* Content */}
                            <div className="mt-12 text-center space-y-4">
                                <div className={cn(
                                    "w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                                    isLocked ? "bg-white/5" : "bg-neon-blue/20 shadow-[0_0_20px_rgba(41,121,255,0.4)]"
                                )}>
                                    {isLocked ? <Lock size={32} /> : <Play size={32} className="ml-1" />}
                                </div>

                                <h3 className="text-2xl font-bold font-display text-white">{level.title}</h3>
                                <p className="text-gray-400 text-sm px-4 min-h-[40px]">{level.description}</p>

                                {/* Lock Requirement or Start */}
                                {isLocked ? (
                                    <div className="mt-4 text-xs text-red-400 font-mono bg-red-900/20 py-1 px-3 rounded inline-block">
                                        GEREKEN: {level.unlockThreshold} XP
                                    </div>
                                ) : (
                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-neon-cyan text-sm tracking-widest font-bold">BAŞLAT &gt;</span>
                                    </div>
                                )}
                            </div>
                        </GlassCard>
                    );
                })}
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl text-center max-w-2xl mx-auto mt-12">
                <Sparkles className="inline-block text-yellow-400 mb-2" />
                <h4 className="text-xl font-bold text-white mb-2">YENİ MODÜL: GÖREV SİSTEMİ</h4>
                <p className="text-blue-200">
                    Artık sorular sonsuz değil! Her gezegeni tamamla, yıldızları topla ve bir sonraki seviyeyi aç.
                    Yanlış yapsan bile oyun devam eder!
                </p>
            </div>
        </div>
    );
};


