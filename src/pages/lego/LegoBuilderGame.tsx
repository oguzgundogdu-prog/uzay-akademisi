import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Hammer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { NeonButton, GlassCard } from '../../components/ui';
import { useGameStore } from '../../store/gameStore';
import { GameOverlay } from '../../components/game/GameOverlay';
import { useSound } from '../../hooks/useSound';
import type { Question } from '../../data/types';

// Import All Data Modules
import { englishData } from '../../data/modules/english-data';
import { turkishData } from '../../data/modules/turkish-data';
import { mathData } from '../../data/modules/math-data';
import { scienceData } from '../../data/modules/science-data';
import { socialData } from '../../data/modules/social-data';

// Color palette for "Lego Bricks"
const BRICK_COLORS = [
    'bg-red-500', 'bg-blue-500', 'bg-yellow-400', 'bg-green-500',
    'bg-indigo-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-400'
];

interface Brick {
    id: number;
    color: string;
    unlocked: boolean;
}

const TOTAL_BRICKS = 20; // 5x4 Grid for the rocket
const QUESTIONS_PER_SESSION = 20;

export const LegoBuilderGame = () => {
    const navigate = useNavigate();
    const { addXp, useHeart, addGem } = useGameStore();
    const { playCorrect, playWrong, playComplete, playGameOver } = useSound();

    // -- STATE --
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [bricks, setBricks] = useState<Brick[]>([]);
    const [score, setScore] = useState(0);
    const [gameStatus, setGameStatus] = useState<'playing' | 'completed' | 'failed'>('playing');
    const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);

    // -- INITIALIZATION --
    useEffect(() => {
        // 1. Initialize Bricks
        const initialBricks: Brick[] = Array.from({ length: TOTAL_BRICKS }, (_, i) => ({
            id: i,
            color: BRICK_COLORS[Math.floor(Math.random() * BRICK_COLORS.length)],
            unlocked: false
        }));
        setBricks(initialBricks);

        // 2. Pool Questions
        const allQuestions: Question[] = [
            ...(englishData.levels.flatMap(l => l.questions) || []),
            ...(turkishData.levels.flatMap(l => l.questions) || []),
            ...(mathData.levels.flatMap(l => l.questions) || []),
            ...(scienceData.levels.flatMap(l => l.questions) || []),
            ...(socialData.levels.flatMap(l => l.questions) || [])
        ];

        // 3. Shuffle and Slice
        const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_SESSION);
        setQuestions(shuffled);

    }, []);

    const handleAnswer = (option: string | number) => {
        if (showResult) return;

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = option === currentQuestion.answer;

        if (isCorrect) {
            playCorrect();
            setShowResult('correct');
            setScore(s => s + 1);

            // Unlock a brick
            setBricks(prev => {
                const nextBricks = [...prev];
                // Find first locked brick
                const brickIndex = nextBricks.findIndex(b => !b.unlocked);
                if (brickIndex !== -1) {
                    nextBricks[brickIndex].unlocked = true;
                    // Mini confetti for brick placement
                    confetti({
                        particleCount: 20,
                        spread: 30,
                        origin: { y: 0.8, x: 0.8 }, // Bottom right
                        colors: ['#FFA500'] // Construction orange
                    });
                }
                return nextBricks;
            });

            setTimeout(nextQuestion, 1000);
        } else {
            playWrong();
            setShowResult('incorrect');
            useHeart();
            setTimeout(nextQuestion, 2500);
        }
    };

    const nextQuestion = () => {
        setShowResult(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            finishGame();
        }
    };

    const finishGame = () => {
        const passed = score >= (QUESTIONS_PER_SESSION * 0.6); // 60% pass rate
        if (passed) {
            playComplete();
            setGameStatus('completed');
            addXp(50); // Bonus XP
            addGem(10);
            confetti({ particleCount: 150, spread: 100 });
        } else {
            playGameOver();
            setGameStatus('failed');
        }
    };

    if (questions.length === 0) return null; // Loading state

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/40 via-[#1a1025] to-black p-4 flex flex-col md:flex-row gap-4 items-center justify-center">

            {(gameStatus === 'completed' || gameStatus === 'failed') && (
                <GameOverlay
                    type={gameStatus === 'completed' ? 'level-complete' : 'game-over'}
                    onRestart={() => window.location.reload()}
                    onHome={() => navigate('/')}
                    gemsEarned={gameStatus === 'completed' ? 10 : 0}
                />
            )}

            {/* HEADER Mobile Only */}
            <div className="md:hidden w-full flex justify-between items-center mb-4">
                <NeonButton variant="cyan" size="sm" onClick={() => navigate('/')}>
                    <ArrowLeft size={16} />
                </NeonButton>
                <div className="text-orange-400 font-display">
                    UZAY MÜHENDİSİ
                </div>
            </div>

            {/* LEFT: Question Card */}
            <div className="w-full md:w-1/2 max-w-xl">
                <div className="hidden md:flex justify-between items-center mb-8 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                    <NeonButton variant="cyan" size="sm" onClick={() => navigate('/')}>
                        <ArrowLeft size={16} /> ÇIKIŞ
                    </NeonButton>
                    <div className="text-orange-400 font-display tracking-wider flex items-center gap-2">
                        <Hammer size={18} />
                        UZAY MÜHENDİSİ
                    </div>
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        <GlassCard className="p-6 md:p-10 border-orange-500/20">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm text-gray-400">Soru {currentQuestionIndex + 1}/{questions.length}</span>
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${currentQuestion.difficulty === 'hard' ? 'bg-red-500/20 text-red-400' :
                                    currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-green-500/20 text-green-400'
                                    }`}>
                                    {currentQuestion.difficulty || 'Normal'}
                                </span>
                            </div>

                            <h2 className="text-xl md:text-3xl font-bold text-white mb-8 text-center leading-relaxed">
                                {currentQuestion.text}
                            </h2>

                            <div className="grid grid-cols-1 gap-3">
                                {currentQuestion.options.map((option, idx) => {
                                    const isCorrect = option === currentQuestion.answer;
                                    let variant: 'cyan' | 'green' | 'red' | 'gold' = 'cyan';
                                    let opacity = 'opacity-100';

                                    if (showResult) {
                                        if (isCorrect) variant = 'green';
                                        else {
                                            variant = 'red';
                                            opacity = 'opacity-50';
                                        }
                                    } else {
                                        variant = 'gold'; // Default for Lego mode
                                    }

                                    return (
                                        <NeonButton
                                            key={idx}
                                            variant={variant}
                                            className={`h-16 text-lg justify-start px-6 ${opacity}`}
                                            onClick={() => handleAnswer(option)}
                                            disabled={showResult !== null}
                                            fullWidth
                                        >
                                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs mr-3">
                                                {String.fromCharCode(65 + idx)}
                                            </span>
                                            {option}
                                        </NeonButton>
                                    );
                                })}
                            </div>

                            {showResult === 'incorrect' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 text-center text-red-400 bg-red-900/10 p-3 rounded-lg border border-red-500/20"
                                >
                                    <p className="font-bold">Yanlış Cevap!</p>
                                    {currentQuestion.explanation && (
                                        <p className="text-sm text-white/50 mt-1">{currentQuestion.explanation}</p>
                                    )}
                                </motion.div>
                            )}
                        </GlassCard>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* RIGHT: Lego Grid (The Blueprint) */}
            <div className="w-full md:w-1/2 max-w-md">
                <GlassCard className="p-4 bg-blue-900/10 border-blue-500/20 relative overflow-hidden min-h-[400px] flex flex-col">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-blue-300 font-display text-sm tracking-widest">BLUEPRINT: ROCKET-V2</h3>
                        <div className="text-xs text-blue-400/60 font-mono">
                            BUILDING... ({score}/{TOTAL_BRICKS})
                        </div>
                    </div>

                    {/* GRID BOARD */}
                    <div className="flex-grow flex items-center justify-center bg-[#0a0f1c] rounded-lg border border-white/5 p-4 shadow-inner shadow-black/50">
                        <div className="grid grid-cols-5 gap-2 w-full max-w-[300px]">
                            {bricks.map((brick) => (
                                <motion.div
                                    key={brick.id}
                                    initial={false}
                                    animate={{
                                        scale: brick.unlocked ? [0, 1.2, 1] : 1,
                                        opacity: brick.unlocked ? 1 : 0.2
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className={`
                                        aspect-square rounded-sm relative shadow-lg
                                        ${brick.unlocked ? brick.color : 'bg-gray-800 border border-white/5'}
                                    `}
                                >
                                    {/* Stud Effect */}
                                    <div className={`
                                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                        w-[60%] h-[60%] rounded-full opacity-30
                                        ${brick.unlocked ? 'bg-white shadow-inner' : 'bg-transparent'}
                                    `} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-orange-500 to-yellow-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${(score / TOTAL_BRICKS) * 100}%` }}
                        />
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
