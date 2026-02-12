import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Languages } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../../components/ui/core';
import { NeonButton, GlassCard } from '../../components/ui';
import { useGameStore } from '../../store/gameStore';
import { GameOverlay } from '../../components/game/GameOverlay';
import { englishData } from '../../data/modules/english-data';
import type { Level, Question } from '../../data/types';
import { LectureModal } from '../../components/game/LectureModal';

import { useSound } from '../../hooks/useSound';

export const EnglishGame = () => {
    const navigate = useNavigate();
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
    const [gameStatus, setGameStatus] = useState<'menu' | 'playing' | 'completed' | 'failed'>('menu');
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [showLecture, setShowLecture] = useState(false);

    // Powerups
    const [isFiftyFiftyUsed, setIsFiftyFiftyUsed] = useState(false);
    const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);

    // Time Bonus
    const [questionStartTime, setQuestionStartTime] = useState<number>(0);
    const [lastBonus, setLastBonus] = useState<number>(0);

    // Motivational Popup
    const [showMotivation, setShowMotivation] = useState<string | null>(null);

    // Derived State
    const currentLevel: Level | undefined = englishData.levels.find(l => l.id === selectedLevelId);
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
        const level = englishData.levels.find(l => l.id === levelId);
        if (!level) return;

        setSelectedLevelId(levelId);
        setShuffledQuestions(shuffleArray(level.questions));
        setCurrentQuestionIndex(0);
        setScore(0);
        setGameStatus('playing');
        setFeedback(null);
        setIsFiftyFiftyUsed(false);
        setHiddenOptions([]);
        setQuestionStartTime(Date.now());
        resetStreak();

        if (level.lecture) {
            setShowLecture(true);
        }
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

            const streakBonus = Math.min(currentStreak, 5);
            const timeBonus = timeTaken < 6 ? 10 : 0;
            setLastBonus(timeBonus);
            addXp(15 + timeBonus, streakBonus);

            if (currentStreak > 0 && currentStreak % 3 === 0) {
                const messages = ["EXCELLENT!", "PRO LEARNER!", "SPEEDY!", "UNSTOPPABLE!"];
                setShowMotivation(messages[Math.min(Math.floor(currentStreak / 3) - 1, messages.length - 1)]);
                setTimeout(() => setShowMotivation(null), 2000);
            }

            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#ffffff']
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
                setGameStatus('failed');
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
        const toHide = shuffleArray(incorrectIndices).slice(0, 2);
        setHiddenOptions(toHide);
        setIsFiftyFiftyUsed(true);
        addGem(-5);
    };

    const finishLevel = () => {
        const percentage = (score / totalQuestions) * 100;
        if (percentage >= 50) {
            playComplete();
            setGameStatus('completed');
            addGem(currentLevel?.rewards.gems || 0);
            addXp(currentLevel?.rewards.xp || 0);
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        } else {
            playGameOver();
            setGameStatus('failed');
        }
    };

    if (gameStatus === 'completed' || gameStatus === 'failed') {
        return (
            <GameOverlay
                type={gameStatus === 'completed' ? 'level-complete' : 'game-over'}
                gemsEarned={gameStatus === 'completed' ? currentLevel?.rewards.gems : 0}
                onRestart={() => selectedLevelId && startGame(selectedLevelId)}
                onHome={() => setGameStatus('menu')}
            />
        );
    }

    if (gameStatus === 'playing' && currentQuestion) {
        return (
            <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0b0c15] to-black py-8 px-4 flex flex-col items-center">
                <LectureModal
                    isOpen={showLecture}
                    title={currentLevel?.lecture?.title || ''}
                    content={currentLevel?.lecture?.content || ''}
                    onComplete={() => {
                        setShowLecture(false);
                        setQuestionStartTime(Date.now());
                    }}
                />

                <AnimatePresence>
                    {showMotivation && (
                        <motion.div
                            initial={{ scale: 0, y: 50 }}
                            animate={{ scale: 1.5, y: -100 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 font-display font-black text-indigo-500 drop-shadow-[0_0_20px_#6366f1] z-[100] text-4xl pointer-events-none"
                        >
                            {showMotivation}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={`max-w-4xl w-full space-y-8 transition-all duration-500 ${showLecture ? 'blur-lg opacity-50' : ''}`}>
                    {/* HUD */}
                    <div className="flex justify-between items-center bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 sticky top-0 z-50">
                        <NeonButton variant="blue" size="sm" onClick={() => setGameStatus('menu')} className="gap-2 shrink-0">
                            <ArrowLeft size={16} />
                            <span className="hidden sm:inline">QUIT</span>
                        </NeonButton>

                        <div className="flex-1 mx-4 sm:mx-8 flex flex-col gap-1">
                            <div className="flex justify-between text-[10px] sm:text-xs text-indigo-400/70 font-mono font-bold">
                                <span>COMBO: {currentStreak}x</span>
                                <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
                            </div>
                            <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 shadow-[0_0_10px_#6366f1]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/30">
                            <div className="animate-pulse text-indigo-500">❤️</div>
                            <span className="font-bold text-white font-mono text-lg">{hearts}</span>
                        </div>
                    </div>

                    <GlassCard className="p-8 md:p-12 relative overflow-visible border-indigo-500/20 min-h-[450px] flex flex-col justify-center text-center">
                        <AnimatePresence>
                            {lastBonus > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 0 }}
                                    animate={{ opacity: 1, y: -40 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute top-4 right-4 text-indigo-400 font-mono font-bold"
                                >
                                    +{lastBonus} XP SPEED BONUS! ⚡
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.h2
                            key={currentQuestion.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl md:text-3xl font-bold text-white mb-12 leading-relaxed"
                        >
                            {currentQuestion.text}
                        </motion.h2>

                        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl mx-auto">
                            <AnimatePresence mode='popLayout'>
                                {currentQuestion.options.map((option, idx) => {
                                    if (hiddenOptions.includes(idx)) return null;

                                    let btnVariant: any = "blue";
                                    let extraClasses = "";

                                    if (feedback === 'correct' && option === currentQuestion.answer) {
                                        btnVariant = "green";
                                        extraClasses = "ring-4 ring-green-400 scale-105 shadow-[0_0_30px_rgba(34,197,94,0.4)]";
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
                                            key={`${currentQuestion.id}-${idx}`}
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <NeonButton
                                                variant={btnVariant}
                                                fullWidth
                                                size="lg"
                                                onClick={() => handleAnswer(option)}
                                                className={cn("min-h-[80px] font-bold", extraClasses)}
                                            >
                                                {option}
                                            </NeonButton>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>

                        {feedback === 'wrong' && currentQuestion.explanation && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl"
                            >
                                <p className="text-indigo-200 font-medium italic">💡 {currentQuestion.explanation}</p>
                            </motion.div>
                        )}

                        {!feedback && (
                            <div className="mt-12">
                                <NeonButton
                                    variant="pink"
                                    size="sm"
                                    disabled={isFiftyFiftyUsed}
                                    onClick={useFiftyFifty}
                                    className="gap-2"
                                >
                                    <Languages size={16} /> 50:50 ({isFiftyFiftyUsed ? 'USED' : '5 💎'})
                                </NeonButton>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0f1020] to-[#050608] p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="text-center space-y-4 mb-12">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block p-4 rounded-3xl bg-indigo-500/20 border-2 border-indigo-500/50 mb-4"
                    >
                        <Languages className="text-indigo-400 w-12 h-12" />
                    </motion.div>
                    <h1 className="text-6xl font-black font-display text-white italic drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                        ENGLISH <span className="text-indigo-500">STAR</span>
                    </h1>
                    <p className="text-xl text-indigo-200/70 font-medium tracking-wide">
                        Ready to explore the universe of languages?
                    </p>
                    <div className="flex justify-center mt-6">
                        <NeonButton variant="blue" size="sm" onClick={() => navigate('/')}>
                            <ArrowLeft size={16} className="mr-2" /> RETURN TO BASE
                        </NeonButton>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {englishData.levels.map((level, index) => {
                        const isLocked = xp < (level.unlockThreshold || 0);

                        return (
                            <motion.div
                                key={level.id}
                                whileHover={!isLocked ? { scale: 1.02, y: -5 } : {}}
                                whileTap={!isLocked ? { scale: 0.98 } : {}}
                            >
                                <GlassCard className={cn(
                                    "group h-full flex flex-col p-8 border-2 transition-all duration-500",
                                    isLocked ? "border-white/5 opacity-50" : "border-indigo-500/20 hover:border-indigo-500/50 bg-indigo-900/10"
                                )}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2",
                                            isLocked ? "bg-white/5 border-white/10 text-white/20" : "bg-indigo-500/20 border-indigo-500/30 text-indigo-400"
                                        )}>
                                            {isLocked ? <div className="i-lucide-lock w-7 h-7" /> : <span>{index + 1}</span>}
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="px-3 py-1 rounded-full bg-indigo-400/10 border border-indigo-400/30 text-indigo-400 text-xs font-bold">
                                                {level.rewards.xp} XP + {level.rewards.gems} 💎
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                        {level.title}
                                    </h3>
                                    <p className="text-indigo-200/60 mb-8 flex-grow leading-relaxed">
                                        {level.description}
                                    </p>

                                    {isLocked ? (
                                        <div className="space-y-3">
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-indigo-500/20"
                                                    style={{ width: `${(xp / level.unlockThreshold!) * 100}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-center font-bold text-white/40 uppercase tracking-widest">
                                                {level.unlockThreshold} XP REQUIRED
                                            </p>
                                        </div>
                                    ) : (
                                        <NeonButton
                                            variant="blue"
                                            fullWidth
                                            size="lg"
                                            onClick={() => startGame(level.id)}
                                            className="gap-2 shadow-[0_4px_20px_rgba(99,102,241,0.2)]"
                                        >
                                            START MISSION
                                        </NeonButton>
                                    )}
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
