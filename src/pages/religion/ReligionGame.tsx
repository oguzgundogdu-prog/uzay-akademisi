import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Moon, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { NeonButton, GlassCard } from '../../components/ui';
import { useGameStore } from '../../store/gameStore';
import { GameOverlay } from '../../components/game/GameOverlay';
import { religionData } from '../../data/modules/religion-data';
import type { Level, Question } from '../../data/types';

export const ReligionGame = () => {
    const navigate = useNavigate();
    const { addXp, useHeart, addGem } = useGameStore();

    // -- STATE --
    const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
    const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
    const [score, setScore] = useState(0);
    const [gameStatus, setGameStatus] = useState<'menu' | 'playing' | 'completed' | 'failed'>('menu');
    const [questions, setQuestions] = useState<Question[]>([]);

    // -- INITIALIZATION --
    useEffect(() => {
        if (selectedLevelId) {
            const level = religionData.levels.find(l => l.id === selectedLevelId);
            if (level) {
                setCurrentLevel(level);
                setQuestions([...level.questions].sort(() => Math.random() - 0.5));
                setGameStatus('playing');
                setCurrentQuestionIndex(0);
                setScore(0);
                setShowResult(null);
            }
        }
    }, [selectedLevelId]);

    const handleLevelSelect = (levelId: string) => {
        setSelectedLevelId(levelId);
    };

    const handleAnswer = (option: string | number) => {
        if (showResult) return;

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = option === currentQuestion.answer;

        if (isCorrect) {
            setShowResult('correct');
            setScore(s => s + 10);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#06b6d4', '#ffffff'] // Cyan and White
            });
            setTimeout(nextQuestion, 1500);
        } else {
            setShowResult('incorrect');
            useHeart();
            setTimeout(nextQuestion, 3000);
        }
    };

    const nextQuestion = () => {
        setShowResult(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            finishLevel();
        }
    };

    const finishLevel = () => {
        const passed = score > 0;
        if (passed) {
            setGameStatus('completed');
            if (currentLevel) {
                addXp(currentLevel.rewards.xp);
                addGem(currentLevel.rewards.gems);
            }
        } else {
            setGameStatus('failed');
        }
    };

    const returnToMenu = () => {
        setGameStatus('menu');
        setSelectedLevelId(null);
        setCurrentLevel(null);
    };

    const getDifficultyColor = (difficulty?: string) => {
        switch (difficulty) {
            case 'easy': return 'text-green-400';
            case 'medium': return 'text-yellow-400';
            case 'hard': return 'text-red-400';
            default: return 'text-blue-400';
        }
    };

    if (gameStatus === 'menu') {
        return (
            <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/40 via-[#0f1020] to-[#050608] p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <NeonButton variant="cyan" size='sm' onClick={() => navigate('/')} className="gap-2">
                            <ArrowLeft size={16} />
                            ÇIKIŞ
                        </NeonButton>
                        <div className="flex items-center gap-4">
                            <GlassCard className="px-4 py-2 flex items-center gap-2 !rounded-full bg-cyan-500/10 border-cyan-500/30">
                                <Moon className="text-cyan-400" size={20} />
                                <span className="text-cyan-100 font-bold">{religionData.title}</span>
                            </GlassCard>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {religionData.levels.map((level, index) => (
                            <GlassCard
                                key={level.id}
                                hoverEffect
                                onClick={() => handleLevelSelect(level.id)}
                                className="group cursor-pointer relative overflow-hidden border-cyan-500/20 hover:border-cyan-500/50"
                            >
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Sparkles size={80} />
                                </div>
                                <div className="flex flex-col h-full relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 text-cyan-400 font-bold text-xl font-display">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{level.title}</h3>
                                    <p className="text-sm text-gray-400 mb-4 flex-grow">{level.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-cyan-300 bg-cyan-900/20 w-fit px-2 py-1 rounded-md">
                                        <Trophy size={12} />
                                        <span>+{level.rewards.xp} XP</span>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#0b0c15] to-black flex items-center justify-center p-4">

            {(gameStatus === 'completed' || gameStatus === 'failed') && (
                <GameOverlay
                    type={gameStatus === 'completed' ? 'level-complete' : 'game-over'}
                    onRestart={() => {
                        setGameStatus('playing');
                        setCurrentQuestionIndex(0);
                        setScore(0);
                    }}
                    onHome={returnToMenu}
                    gemsEarned={currentLevel?.rewards.gems}
                />
            )}

            <div className="max-w-4xl w-full">
                <div className="flex justify-between items-center mb-8 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                        <NeonButton variant="cyan" size="sm" onClick={returnToMenu}>
                            <ArrowLeft size={16} />
                        </NeonButton>
                        <div className="text-cyan-400 font-display tracking-wider">
                            {currentLevel?.title} <span className="text-white/30 mx-2">|</span> Soru {currentQuestionIndex + 1}/{questions.length}
                        </div>
                    </div>
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full"
                    >
                        <GlassCard className="p-8 md:p-12 relative overflow-hidden border-cyan-500/20">
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest font-bold">
                                <span className={getDifficultyColor(currentQuestion.difficulty)}>{currentQuestion.difficulty || 'Normal'}</span>
                            </div>

                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-12 text-center leading-relaxed">
                                {currentQuestion.text}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQuestion.options.map((option, idx) => {
                                    const isCorrectAnswer = option === currentQuestion.answer;
                                    let variant: 'cyan' | 'red' | 'green' = 'cyan';
                                    let opacity = 'opacity-100';

                                    if (showResult) {
                                        if (isCorrectAnswer) {
                                            variant = 'green';
                                        } else {
                                            opacity = 'opacity-50';
                                            variant = 'red';
                                        }
                                    }

                                    return (
                                        <NeonButton
                                            key={idx}
                                            variant={variant}
                                            className={`h-20 text-lg md:text-xl ${opacity} transition-all duration-300`}
                                            onClick={() => handleAnswer(option)}
                                            disabled={showResult !== null}
                                            fullWidth
                                        >
                                            {option}
                                        </NeonButton>
                                    );
                                })}
                            </div>

                            {showResult === 'incorrect' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 text-center"
                                >
                                    <p className="text-red-400 font-bold text-xl mb-1">Yanlış Cevap!</p>
                                    <p className="text-white/70">Doğru cevap: <span className="text-green-400 font-bold">{currentQuestion.answer}</span></p>
                                    {currentQuestion.explanation && (
                                        <p className="text-sm text-white/50 mt-2">{currentQuestion.explanation}</p>
                                    )}
                                </motion.div>
                            )}

                        </GlassCard>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
