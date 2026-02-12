import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Globe, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../../components/ui/core';
import { NeonButton, GlassCard } from '../../components/ui';
import { useGameStore } from '../../store/gameStore';
import { GameOverlay } from '../../components/game/GameOverlay';
import { socialData } from '../../data/modules/social-data';
import type { Level, Question } from '../../data/types';

import { useSound } from '../../hooks/useSound';

export const SocialGame = () => {
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

    // Powerups
    const [isFiftyFiftyUsed, setIsFiftyFiftyUsed] = useState(false);
    const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);

    // Time Bonus
    const [questionStartTime, setQuestionStartTime] = useState<number>(0);
    const [lastBonus, setLastBonus] = useState<number>(0);

    // Motivational Popup
    const [showMotivation, setShowMotivation] = useState<string | null>(null);

    // Derived State
    const currentLevel: Level | undefined = socialData.levels.find(l => l.id === selectedLevelId);
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
        const level = socialData.levels.find(l => l.id === levelId);
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
            const timeBonus = timeTaken < 8 ? 10 : 0; // Social questions might take longer to read
            setLastBonus(timeBonus);
            addXp(15 + timeBonus, streakBonus);

            if (currentStreak > 0 && currentStreak % 3 === 0) {
                const messages = ["HARİKA!", "BİLGİ KÜPÜ!", "SOSYAL YILDIZ!", "MUHTEŞEM!"];
                setShowMotivation(messages[Math.min(Math.floor(currentStreak / 3) - 1, messages.length - 1)]);
                setTimeout(() => setShowMotivation(null), 2000);
            }

            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FCD34D', '#ffffff']
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
            <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-[#0b0c15] to-black py-8 px-4 flex flex-col items-center">
                <AnimatePresence>
                    {showMotivation && (
                        <motion.div
                            initial={{ scale: 0, y: 50 }}
                            animate={{ scale: 1.5, y: -100 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 font-display font-black text-amber-400 drop-shadow-[0_0_20px_#FCD34D] z-[100] text-4xl pointer-events-none"
                        >
                            {showMotivation}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="max-w-4xl w-full space-y-8">
                    {/* HUD */}
                    <div className="flex justify-between items-center bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 sticky top-0 z-50">
                        <NeonButton variant="gold" size="sm" onClick={() => setGameStatus('menu')} className="gap-2 shrink-0">
                            <ArrowLeft size={16} />
                            <span className="hidden sm:inline">VAZGEÇ</span>
                        </NeonButton>

                        <div className="flex-1 mx-4 sm:mx-8 flex flex-col gap-1">
                            <div className="flex justify-between text-[10px] sm:text-xs text-amber-400/70 font-mono font-bold">
                                <span>STREAK: {currentStreak}x</span>
                                <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
                            </div>
                            <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-600 shadow-[0_0_10px_#F59E0B]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}% ` }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/30">
                            <div className="animate-pulse text-red-500">❤️</div>
                            <span className="font-bold text-white font-mono text-lg">{hearts}</span>
                        </div>
                    </div>

                    <GlassCard className="p-8 md:p-12 relative overflow-visible border-amber-500/20 min-h-[450px] flex flex-col justify-center text-center">
                        <AnimatePresence>
                            {lastBonus > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 0 }}
                                    animate={{ opacity: 1, y: -40 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute top-4 right-4 text-amber-400 font-mono font-bold"
                                >
                                    +{lastBonus} XP HIZ BONUSU! ⚡
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

                                    let btnVariant: any = "gold";
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
                                            key={`${currentQuestion.id} -${idx} `}
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
                                className="mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl"
                            >
                                <p className="text-red-200 font-medium italic">💡 {currentQuestion.explanation}</p>
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
                                    <Globe size={16} /> 50:50 ({isFiftyFiftyUsed ? 'KULLANILDI' : '5 💎'})
                                </NeonButton>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/40 via-[#0f1020] to-[#050608] p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="text-center space-y-4 mb-12">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block p-4 rounded-3xl bg-amber-500/20 border-2 border-amber-500/50 mb-4"
                    >
                        <Globe className="text-amber-400 w-12 h-12" />
                    </motion.div>
                    <h1 className="text-6xl font-black font-display text-white italic drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                        SOSYAL <span className="text-amber-400">DÜNYA</span>
                    </h1>
                    <p className="text-xl text-amber-200/70 font-medium tracking-wide">
                        Çevremizi, tarihimizi ve dünyamızı keşfetmeye hazır mısın?
                    </p>
                    <div className="flex justify-center mt-6">
                        <NeonButton variant="gold" size="sm" onClick={() => navigate('/')}>
                            <ArrowLeft size={16} className="mr-2" /> ANA ÜSE DÖN
                        </NeonButton>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {socialData.levels.map((level, index) => {
                        const isLocked = xp < (level.unlockThreshold || 0);

                        return (
                            <motion.div
                                key={level.id}
                                whileHover={!isLocked ? { scale: 1.02, y: -5 } : {}}
                                whileTap={!isLocked ? { scale: 0.98 } : {}}
                            >
                                <GlassCard className={cn(
                                    "group h-full flex flex-col p-8 border-2 transition-all duration-500",
                                    isLocked ? "border-white/5 opacity-50" : "border-amber-500/20 hover:border-amber-500/50 bg-amber-900/10"
                                )}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2",
                                            isLocked ? "bg-white/5 border-white/10 text-white/20" : "bg-amber-500/20 border-amber-500/30 text-amber-400"
                                        )}>
                                            {isLocked ? <div className="i-lucide-lock w-7 h-7" /> : <span>{index + 1}</span>}
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold">
                                                {level.rewards.xp} XP + {level.rewards.gems} 💎
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                                        {level.title}
                                    </h3>
                                    <p className="text-amber-200/60 mb-8 flex-grow leading-relaxed">
                                        {level.description}
                                    </p>

                                    {isLocked ? (
                                        <div className="space-y-3">
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-amber-500/20"
                                                    style={{ width: `${(xp / level.unlockThreshold!) * 100}% ` }}
                                                />
                                            </div>
                                            <p className="text-xs text-center font-bold text-white/40 uppercase tracking-widest">
                                                {level.unlockThreshold} XP GEREKLİ
                                            </p>
                                        </div>
                                    ) : (
                                        <NeonButton
                                            variant="gold"
                                            fullWidth
                                            size="lg"
                                            onClick={() => startGame(level.id)}
                                            className="gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.2)]"
                                        >
                                            KEŞFETMEYE BAŞLA
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
