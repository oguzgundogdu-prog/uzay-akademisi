import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BookOpen, ArrowLeft, Scroll, Feather } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, cn } from '../../components/ui/core';
import { useGameStore } from '../../store/gameStore';
import { socialCurriculum } from '../../data/curriculum';
import { GameOverlay } from '../../components/game/GameOverlay';

type Question = {
    id: string;
    text: string;
    answer: string | number;
    options: (string | number)[];
    explanation?: string;
};

export const SocialGame = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addXp, markQuestionSeen, useHeart, hearts, addGem, unlockNode } = useGameStore();

    const [selectedTopic, setSelectedTopic] = useState<string | null>(location.state?.topic || null);
    const nodeId = location.state?.nodeId;
    const isCampaign = !!nodeId;
    const isPractice = location.state?.mode === 'practice';

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

        const topicData = socialCurriculum.topics.find(t => t.id === selectedTopic);

        if (topicData && topicData.items.length > 0) {
            const randomItem = topicData.items[Math.floor(Math.random() * topicData.items.length)];
            const options = [...randomItem.options].sort(() => Math.random() - 0.5);

            setQuestion({
                id: randomItem.id,
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
            colors: ['#D4AF37', '#C0C0C0', '#CD7F32']
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

    const handleAnswer = (option: string | number) => {
        if (!question || feedback) return;

        if (option === question.answer) {
            setFeedback('correct');
            setStreak(s => s + 1);
            addXp(20 + (streak * 5));
            markQuestionSeen(question.id);

            if (isCampaign) {
                setQuestionsLeft(prev => prev - 1);
            }

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#D4AF37', '#C0C0C0', '#CD7F32']
            });

            // Auto-advance only if NOT practice (practice waits for user to read)
            if (!isPractice) {
                if (isCampaign && questionsLeft <= 1) {
                    setTimeout(() => handleWin(), 1500);
                } else {
                    setTimeout(generateQuestion, 3500);
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
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <Button variant="secondary" onClick={() => navigate('/')} className="gap-2">
                        <ArrowLeft size={20} />
                        Ana Üs
                    </Button>
                    <h1 className="text-3xl font-bold text-white">Tarih ve Kültür</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {socialCurriculum.topics.map((topic) => (
                        <motion.button
                            key={topic.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedTopic(topic.id)}
                            className="bg-[#2D1B0E]/80 border-2 border-[#D4AF37]/30 p-8 rounded-2xl text-left hover:border-[#D4AF37] transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-pattern-parchment opacity-10 pointer-events-none" />
                            <div className="flex items-center gap-4 mb-4 relative z-10">
                                <div className="p-3 bg-[#D4AF37]/20 rounded-xl text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#2D1B0E] transition-colors">
                                    {topic.id === 'scientists' ? <Scroll size={32} /> : <Feather size={32} />}
                                </div>
                                <h3 className="text-2xl font-bold text-[#F5DEB3]">{topic.title}</h3>
                            </div>
                            <p className="text-[#D2B48C] text-lg relative z-10">{topic.description}</p>
                        </motion.button>
                    ))}
                </div>
            </div>
        );
    }

    if (!question) return <div>Yükleniyor...</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
                <Button variant="secondary" onClick={() => setSelectedTopic(null)} className="gap-2">
                    <ArrowLeft size={20} />
                    Konular
                </Button>

                {isCampaign && (
                    <div className="flex-1 mx-8">
                        <div className="h-4 bg-[#1A0F08] rounded-full overflow-hidden border border-[#D4AF37]/20">
                            <div
                                className="h-full bg-[#D4AF37] transition-all duration-500"
                                style={{ width: `${((10 - questionsLeft) / 10) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2 bg-red-900/20 px-3 py-1 rounded-full border border-red-500/30">
                    <div className="text-red-500">❤️</div>
                    <span className="font-bold text-white">{hearts}</span>
                </div>
            </div>

            <Card className="text-center py-12 relative overflow-visible bg-[#2D1B0E] border-[#8B4513]">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#2D1B0E] p-4 rounded-full border-4 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                    <BookOpen size={48} className="text-[#D4AF37]" />
                </div>

                <div className="mt-8 mb-12 px-6">
                    <div className="min-h-[160px] flex items-center justify-center">
                        <motion.div
                            key={question.text}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-2xl md:text-3xl font-serif text-[#F5DEB3] max-w-2xl mx-auto leading-relaxed"
                        >
                            {question.text}
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
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
                                className={cn(
                                    "p-6 font-bold rounded-xl border-2 transition-all flex items-center justify-center text-lg font-serif",
                                    feedback === 'correct' && option === question.answer
                                        ? "bg-green-900/40 border-green-500 text-green-400"
                                        : feedback === 'wrong' && option !== question.answer
                                            ? "opacity-50"
                                            : "bg-[#1A0F08] border-[#8B4513]/50 text-[#D2B48C] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
                                )}
                                disabled={feedback !== null}
                            >
                                {option}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={cn(
                                "mt-8 text-xl font-bold px-6 py-4 rounded-xl mx-auto max-w-xl",
                                feedback === 'correct' ? "bg-green-900/20 text-green-400 border border-green-500/30" : "bg-red-900/20 text-red-400 border border-red-500/30"
                            )}
                        >
                            <div className="mb-2">
                                {feedback === 'correct' ? "Harika! Tarih Bilgin Çok İyi! 📜" : "Tekrar Dene, Öğreniyorsun! 🕯️"}
                            </div>
                            {question.explanation && (
                                <div className="text-lg text-[#F5DEB3]/90 font-serif font-normal italic mb-4">
                                    💡 "{question.explanation}"
                                </div>
                            )}

                            {isPractice && (
                                <Button
                                    onClick={handleNextQuestion}
                                    className="bg-[#D4AF37] text-[#2D1B0E] hover:bg-[#F5DEB3] font-bold px-8 py-3 text-lg"
                                >
                                    Sıradaki Soru <ArrowLeft className="rotate-180 ml-2" />
                                </Button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    );
};
