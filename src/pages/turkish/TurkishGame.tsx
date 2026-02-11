import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BookOpen, ArrowLeft, RefreshCw, GitCompare, MessageSquare, Trophy } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../components/ui/core';
import { NeonButton, GlassCard } from '../../components/ui';
import { useGameStore } from '../../store/gameStore';
import { turkishCurriculum } from '../../data/curriculum';
import { GameOverlay } from '../../components/game/GameOverlay';

type WordPair = {
    id: string;
    word: string;
    match: string;
    options: string[];
    type: 'synonym' | 'antonym' | 'reading';
    explanation?: string;
};

// Flatten all words initially
const allWordData: WordPair[] = turkishCurriculum.topics.flatMap(t => t.items.map(i => ({
    id: i.id,
    word: i.question,
    match: i.answer as string,
    options: i.options as string[],
    type: t.id === 'synonyms' ? 'synonym' : t.id === 'antonyms' ? 'antonym' : 'reading',
    explanation: i.explanation
})));

export const TurkishGame = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addXp, useHeart, hearts, addGem, unlockNode } = useGameStore();

    const [selectedTopic, setSelectedTopic] = useState<string | null>(location.state?.topic || null);
    const nodeId = location.state?.nodeId;
    const isCampaign = !!nodeId;

    const [currentPair, setCurrentPair] = useState<WordPair | null>(null);
    const [options, setOptions] = useState<string[]>([]);
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

        let availableWords = allWordData;
        if (selectedTopic) {
            if (selectedTopic === 'synonyms') availableWords = allWordData.filter(w => w.type === 'synonym');
            else if (selectedTopic === 'antonyms') availableWords = allWordData.filter(w => w.type === 'antonym');
            else if (selectedTopic === 'reading') availableWords = allWordData.filter(w => w.type === 'reading');

            // Fallback if empty (shouldn't happen with correct data)
            if (availableWords.length === 0) availableWords = allWordData;
        }

        const randomPair = availableWords[Math.floor(Math.random() * availableWords.length)];
        setCurrentPair(randomPair);
        setOptions([...randomPair.options].sort(() => Math.random() - 0.5));
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
            colors: ['#BD00FF', '#FFD700', '#F472B6']
        });
    };

    useEffect(() => {
        if (selectedTopic) {
            generateQuestion();
        }
    }, [selectedTopic]);

    const handleNextQuestion = () => {
        generateQuestion();
    };

    const handleAnswer = (selectedOption: string) => {
        if (!currentPair || feedback) return;

        if (selectedOption === currentPair.match) {
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
                colors: ['#BD00FF', '#FFD700', '#F472B6']
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
                    <NeonButton variant="pink" onClick={() => navigate('/')} className="gap-2">
                        <ArrowLeft size={20} />
                        ANA ÜS
                    </NeonButton>
                    <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-purple-500 neon-text">
                        İLETİŞİM MERKEZİ
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Synonyms */}
                    <GlassCard
                        hoverEffect
                        onClick={() => setSelectedTopic('synonyms')}
                        className="group border-neon-pink/20 hover:border-neon-pink/60 cursor-pointer"
                    >
                        <div className="p-4 bg-neon-pink/20 rounded-2xl w-fit mb-4 text-neon-pink group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,0,153,0.3)]">
                            <RefreshCw size={40} />
                        </div>
                        <h3 className="text-2xl font-bold font-display text-white mb-2">EŞ ANLAM</h3>
                        <p className="text-pink-200/70">Kelimelerin ikiz kardeşlerini bul.</p>
                    </GlassCard>

                    {/* Antonyms */}
                    <GlassCard
                        hoverEffect
                        onClick={() => setSelectedTopic('antonyms')}
                        className="group border-neon-purple/20 hover:border-neon-purple/60 cursor-pointer"
                    >
                        <div className="p-4 bg-neon-purple/20 rounded-2xl w-fit mb-4 text-neon-purple group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(189,0,255,0.3)]">
                            <GitCompare size={40} />
                        </div>
                        <h3 className="text-2xl font-bold font-display text-white mb-2">ZIT ANLAM</h3>
                        <p className="text-purple-200/70">Tam tersini düşün!</p>
                    </GlassCard>

                    {/* Reading */}
                    <GlassCard
                        hoverEffect
                        onClick={() => setSelectedTopic('reading')}
                        className="group border-neon-cyan/20 hover:border-neon-cyan/60 cursor-pointer"
                    >
                        <div className="p-4 bg-neon-cyan/20 rounded-2xl w-fit mb-4 text-neon-cyan group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                            <MessageSquare size={40} />
                        </div>
                        <h3 className="text-2xl font-bold font-display text-white mb-2">OKUMA</h3>
                        <p className="text-cyan-200/70">Gizli mesajları çöz.</p>
                    </GlassCard>
                </div>
            </div>
        );
    }

    if (!currentPair) return <div className="text-center text-neon-pink animate-pulse mt-20 text-2xl">SİNYAL ARANIYOR...</div>;

    const isLongText = currentPair.word.length > 20 || currentPair.type === 'reading';

    return (
        <div className="max-w-4xl mx-auto space-y-8 relative">
            {/* HUD Header */}
            <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
                <NeonButton variant="pink" size='sm' onClick={() => navigate('/')} className="gap-2">
                    <ArrowLeft size={16} />
                    ÇIKIŞ
                </NeonButton>

                {isCampaign && (
                    <div className="flex-1 mx-8 flex flex-col gap-1">
                        <div className="flex justify-between text-xs text-neon-pink/70 font-mono">
                            <span>SİNYAL GÜCÜ</span>
                            <span>{10 - questionsLeft} / 10</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/10 relative">
                            <motion.div
                                className="h-full bg-gradient-to-r from-neon-pink to-purple-500 shadow-[0_0_10px_#FF0099]"
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

            <GlassCard className="text-center py-12 relative overflow-visible bg-space-deep/80 border-neon-pink/30 shadow-[0_0_50px_rgba(255,0,153,0.1)]">
                {/* Holographic Projector Effect */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1A0F2E] p-4 rounded-full border-4 border-neon-pink shadow-[0_0_30px_rgba(255,0,153,0.5)] z-20">
                    <BookOpen size={40} className="text-white animate-pulse" />
                </div>

                <div className="mt-8 mb-12 relative z-10 px-6">
                    <span className="inline-block px-4 py-1 rounded-full bg-neon-pink/10 text-sm text-neon-pink mb-6 border border-neon-pink/30 font-mono tracking-widest">
                        {currentPair.type === 'synonym' ? 'EŞLEŞEN SİNYAL (EŞ ANLAM)' :
                            currentPair.type === 'antonym' ? 'TERS KUTUP (ZIT ANLAM)' :
                                'ŞİFRE ÇÖZME (OKUMA)'}
                    </span>

                    <motion.div
                        key={currentPair.word}
                        initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        className={cn(
                            "font-bold text-white leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]",
                            isLongText ? "text-2xl md:text-3xl text-left bg-black/20 p-6 rounded-2xl border border-white/5" : "text-5xl md:text-6xl"
                        )}
                    >
                        {currentPair.word}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto px-4 relative z-10">
                    <AnimatePresence mode='popLayout'>
                        {options.map((option, idx) => (
                            <motion.button
                                key={`${currentPair.id}-${option}`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleAnswer(option)}
                                disabled={feedback !== null}
                                className={cn(
                                    "p-6 text-xl font-bold rounded-xl border-2 transition-all shadow-lg text-left relative overflow-hidden group",
                                    feedback === 'correct' && option === currentPair.match
                                        ? "bg-neon-green text-black border-neon-green shadow-[0_0_20px_#00FF9D]"
                                        : feedback === 'wrong' && option !== currentPair.match
                                            ? "opacity-40 grayscale"
                                            : feedback === 'wrong' && option === currentPair.match
                                                ? "bg-neon-green/50 text-white border-neon-green"
                                                : "bg-space-light/40 border-white/10 text-white hover:border-neon-pink hover:bg-neon-pink/10"
                                )}
                            >
                                <span className="relative z-10">{option}</span>
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
                                        <span>BAĞLANTI BAŞARILI!</span>
                                    </>
                                ) : (
                                    <>
                                        <span>⚠️ SİNYAL KOPTU</span>
                                    </>
                                )}
                            </div>

                            <div className="text-white text-lg font-mono">
                                Doğru Cevap: <span className="font-bold text-neon-gold">{currentPair.match}</span>
                            </div>

                            {currentPair.explanation && (
                                <div className="text-base text-gray-300 mt-2 max-w-md mx-auto">
                                    💡 {currentPair.explanation}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>
        </div>
    );
};
