import { useState } from 'react';
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
    const {
        addXp, useHeart, hearts, addGem, xp,
        currentStreak, incrementStreak, resetStreak
    } = useGameStore();
    const { playCorrect, playWrong, playComplete, playGameOver } = useSound();

    // -- STATE --
    const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
    const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'level-complete' | 'game-over'>('menu');
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    // Powerups
    const [isFiftyFiftyUsed, setIsFiftyFiftyUsed] = useState(false);
    const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);

    // Time Bonus
    const [questionStartTime, setQuestionStartTime] = useState<number>(0);
    const [lastBonus, setLastBonus] = useState<number>(0);

    // Motivational Popup
    const [showMotivation, setShowMotivation] = useState<string | null>(null);

    // Derived State
    const currentLevel: Level | undefined = mathData.levels.find(l => l.id === selectedLevelId);
    const currentQuestion: Question | undefined = shuffledQuestions[currentQuestionIndex];
    const totalQuestions = shuffledQuestions.length || 0;

    // -- HELPERS --
    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    const startGame = (levelId: string) => {
        const level = mathData.levels.find(l => l.id === levelId);
        if (!level) return;

        setSelectedLevelId(levelId);
        setShuffledQuestions(shuffleArray(level.questions));
        setCurrentQuestionIndex(0);
        setScore(0);
        setGameState('playing');
        setFeedback(null);
        setIsFiftyFiftyUsed(false);
        setHiddenOptions([]);
        setQuestionStartTime(Date.now());
        resetStreak();
    };

    const handleAnswer = (option: string | number) => {
        if (!currentQuestion || feedback) return;

        const isCorrect = option === currentQuestion.answer;
        const endTime = Date.now();
        const timeTaken = (endTime - questionStartTime) / 1000;

        if (isCorrect) {
            playCorrect();
            setFeedback('correct');
            setScore(s => s + 1);
            incrementStreak();

            // Calculate XP with Multiplier
            const streakBonus = Math.min(currentStreak, 5); // Max 5x multiplier for fun
            const timeBonus = timeTaken < 5 ? 10 : 0; // 10 XP bonus for < 5s answers
            setLastBonus(timeBonus);

            addXp(15 + timeBonus, streakBonus);

            // Motivational Message
            if (currentStreak > 0 && currentStreak % 3 === 0) {
                const messages = ["MUHTEŞEM!", "DURDURULAMAZSIN!", "HARİKA GİDİYORSUN!", "UZAY REKORU!"];
                setShowMotivation(messages[Math.min(Math.floor(currentStreak / 3) - 1, messages.length - 1)]);
                setTimeout(() => setShowMotivation(null), 2000);
            }

            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#00FF9D', '#00F0FF']
            });
        } else {
            playWrong();
            setFeedback('wrong');
            resetStreak();
            useHeart();
        }

        setTimeout(() => {
            if (hearts <= 0 && !isCorrect) {
                playGameOver();
                setGameState('game-over');
                return;
            }

            if (currentQuestionIndex < totalQuestions - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setFeedback(null);
                setHiddenOptions([]);
                setQuestionStartTime(Date.now());
                setLastBonus(0);
            } else {
                finishLevel();
            }
        }, isCorrect ? 1500 : 3000);
    };

    const useFiftyFifty = () => {
        if (isFiftyFiftyUsed || !currentQuestion || feedback) return;

        const incorrectIndices = currentQuestion.options
            .map((opt, idx) => (opt !== currentQuestion.answer ? idx : -1))
            .filter(idx => idx !== -1);

        // Randomly pick 2 incorrect indices to hide
        const toHide = shuffleArray(incorrectIndices).slice(0, 2);
        setHiddenOptions(toHide);
        setIsFiftyFiftyUsed(true);
        addGem(-5); // Costs 5 gems? Maybe just free for now or uses store gem subtraction
    };

    const finishLevel = () => {
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
            setGameState('game-over');
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
            <div className="max-w-4xl mx-auto space-y-8 relative py-8 px-4">
                {/* Motivation Popup */}
                <AnimatePresence>
                    {showMotivation && (
                        <motion.div
                            initial={{ scale: 0, y: 50 }}
                            animate={{ scale: 1.5, y: -100 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 font-display font-black text-neon-cyan drop-shadow-[0_0_20px_#00F0FF] z-[100] text-4xl pointer-events-none"
                        >
                            {showMotivation}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* HUD */}
                <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg top-0 sticky z-50">
                    <NeonButton variant="blue" size='sm' onClick={() => setGameState('menu')} className="gap-2 shrink-0">
                        <ArrowLeft size={16} />
                        <span className="hidden sm:inline">VAZGEÇ</span>
                    </NeonButton>

                    <div className="flex-1 mx-4 sm:mx-8 flex flex-col gap-1">
                        <div className="flex justify-between text-[10px] sm:text-xs text-neon-cyan/70 font-mono">
                            <span className="flex items-center gap-1">
                                STREAK: <span className="text-neon-cyan font-bold">{currentStreak}x</span>
                            </span>
                            <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/10 relative">
                            <motion.div
                                className="h-full bg-gradient-to-r from-neon-blue to-purple-500 shadow-[0_0_10px_#2979FF]"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}% ` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-red-500/30">
                        <div className="animate-pulse text-red-500">❤️</div>
                        <span className="font-bold text-white font-mono text-lg sm:text-xl">{hearts}</span>
                    </div>
                </div>

                {/* GAME AREA */}
                <GlassCard className="text-center py-12 relative overflow-visible bg-space-deep/80 border-neon-blue/30 min-h-[400px] flex flex-col justify-center">
                    {/* Time Bonus Indicator */}
                    <AnimatePresence>
                        {lastBonus > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: -40 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-4 right-4 text-neon-cyan font-mono font-bold"
                            >
                                +{lastBonus} XP HIZ BONUSU! ⚡
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Question */}
                    <motion.div
                        key={currentQuestion.id}
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
                    <div className="flex flex-col gap-4 max-w-3xl mx-auto px-4 w-full relative z-10 sm:grid sm:grid-cols-2 sm:gap-6">
                        <AnimatePresence mode='popLayout'>
                            {currentQuestion.options.map((option, idx) => {
                                if (hiddenOptions.includes(idx)) return null;

                                let btnVariant: any = "cyan";
                                let extraClasses = "";

                                if (feedback === 'correct' && option === currentQuestion.answer) {
                                    btnVariant = "green";
                                    extraClasses = "ring-4 ring-green-400 scale-105 shadow-[0_0_30px_rgba(0,255,157,0.5)]";
                                } else if (feedback === 'wrong') {
                                    if (option === currentQuestion.answer) {
                                        btnVariant = "green";
                                        extraClasses = "opacity-100 ring-2 ring-green-400";
                                    } else {
                                        extraClasses = "opacity-30 grayscale scale-95";
                                    }
                                }

                                return (
                                    <motion.div
                                        key={`${currentQuestion.id} -${idx} `}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <NeonButton
                                            variant={btnVariant}
                                            fullWidth
                                            size="lg"
                                            onClick={() => handleAnswer(option)}
                                            className={cn(
                                                "min-h-[80px] text-xl font-bold transition-all duration-300",
                                                extraClasses
                                            )}
                                        >
                                            {option}
                                        </NeonButton>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Explanation (Wrong Answer) */}
                    <AnimatePresence>
                        {feedback === 'wrong' && currentQuestion.explanation && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 p-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl mx-4"
                            >
                                <p className="text-red-200 font-medium text-lg italic">
                                    💡 {currentQuestion.explanation}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Powerups Area */}
                    {!feedback && (
                        <div className="mt-12 flex justify-center gap-4">
                            <NeonButton
                                variant="pink"
                                size="sm"
                                disabled={isFiftyFiftyUsed}
                                onClick={useFiftyFifty}
                                className="gap-2 px-6"
                            >
                                <Sparkles size={16} />
                                50:50 ({isFiftyFiftyUsed ? 'KULLANILDI' : 'ÜCRETSİZ'})
                            </NeonButton>
                        </div>
                    )}
                </GlassCard>
            </div>
        );
    }

    // -- RENDER: MENU (Galaxy Selection) --
    return (
        <div className="max-w-6xl mx-auto space-y-12 py-12 px-4">
            <header className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block p-4 rounded-3xl bg-neon-blue/20 border-2 border-neon-blue/50 mb-4"
                >
                    <Trophy className="text-neon-blue w-12 h-12" />
                </motion.div>
                <h1 className="text-6xl font-black font-display text-white italic drop-shadow-[0_0_15px_rgba(41,121,255,0.5)]">
                    MATEMATİK <span className="text-neon-cyan">GALAKSİSİ</span>
                </h1>
                <p className="text-xl text-blue-200/70 font-medium tracking-wide">
                    Sayılar ve işlemler arasında heyecan dolu bir yolculuğa hazır mısın?
                </p>
                <div className="flex items-center justify-center gap-8 mt-6">
                    <div className="p-3 bg-black/40 rounded-2xl border border-white/10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center text-neon-blue text-xl font-bold">XP</div>
                        <div className="text-left">
                            <div className="text-xs text-blue-300/50 uppercase font-bold">Senin Gücün</div>
                            <div className="text-xl font-black text-white">{xp}</div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mathData.levels.map((level) => {
                    const isLocked = xp < (level.unlockThreshold || 0);

                    return (
                        <motion.div
                            key={level.id}
                            whileHover={!isLocked ? { scale: 1.02, y: -5 } : {}}
                            whileTap={!isLocked ? { scale: 0.98 } : {}}
                        >
                            <GlassCard className={cn(
                                "group h-full flex flex-col p-8 border-2 transition-all duration-500",
                                isLocked ? "border-white/5 opacity-50" : "border-neon-blue/20 hover:border-neon-blue/50 bg-space-deep/60"
                            )}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2",
                                        isLocked ? "bg-white/5 border-white/10 text-white/20" : "bg-neon-blue/20 border-neon-blue/30 text-neon-blue"
                                    )}>
                                        {isLocked ? <Lock size={28} /> : <span>{level.order}</span>}
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <div className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold">
                                            {level.rewards.xp} XP + {level.rewards.gems} 💎
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                                    {level.title}
                                </h3>
                                <p className="text-blue-200/60 mb-8 flex-grow leading-relaxed">
                                    {level.description}
                                </p>

                                {isLocked ? (
                                    <div className="space-y-3">
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-white/20"
                                                style={{ width: `${(xp / level.unlockThreshold!) * 100}% ` }}
                                            />
                                        </div>
                                        <p className="text-xs text-center font-bold text-white/40 uppercase tracking-widest">
                                            {level.unlockThreshold} XP GEREKLİ
                                        </p>
                                    </div>
                                ) : (
                                    <NeonButton
                                        variant="cyan"
                                        fullWidth
                                        size="lg"
                                        onClick={() => startGame(level.id)}
                                        className="gap-2 shadow-[0_4px_20px_rgba(0,240,255,0.2)]"
                                    >
                                        <Play size={20} fill="currentColor" /> BAŞLA
                                    </NeonButton>
                                )}
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
