import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Shapes, Calculator, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button, Card, cn } from '../../components/ui/core';
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
            origin: { y: 0.6 }
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
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <Button variant="secondary" onClick={() => navigate('/')} className="gap-2">
                        <ArrowLeft size={20} />
                        Ana Üs
                    </Button>
                    <h1 className="text-3xl font-bold text-white">Görev Seçimi</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedTopic('mixed')}
                        className="col-span-1 md:col-span-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500/50 p-8 rounded-2xl text-left hover:border-pink-500 transition-colors group"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-pink-500/20 rounded-xl text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                                <Sparkles size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Karışık Sınav Modu</h3>
                        </div>
                        <p className="text-gray-400 text-lg">Hepsinden biraz! Kendini dene.</p>
                    </motion.button>

                    {mathCurriculum.topics.map((topic) => (
                        <motion.button
                            key={topic.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedTopic(topic.id)}
                            className="bg-space-dark/80 border-2 border-neon-blue/30 p-8 rounded-2xl text-left hover:border-neon-blue transition-colors group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-neon-blue/20 rounded-xl text-neon-blue group-hover:bg-neon-blue group-hover:text-black transition-colors">
                                    {topic.id === 'time' ? <Clock size={32} /> :
                                        topic.id === 'geometry' ? <Shapes size={32} /> :
                                            topic.id === 'patterns' ? <Sparkles size={32} /> :
                                                <Calculator size={32} />}
                                </div>
                                <h3 className="text-2xl font-bold text-white">{topic.title}</h3>
                            </div>
                            <p className="text-gray-400 text-lg">{topic.description}</p>
                        </motion.button>
                    ))}
                </div>
            </div>
        );
    }

    if (!question) return <div>Yükleniyor...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-8 relative">
            {/* Header with Hearts/Progress */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <Button variant="secondary" onClick={() => navigate('/')} className="gap-2">
                    <ArrowLeft size={20} />
                    Çıkış
                </Button>

                {isCampaign && (
                    <div className="flex-1 mx-8">
                        <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 transition-all duration-500"
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

            <Card className="text-center py-16 relative overflow-hidden bg-[#1A0F2E] border-purple-500/30">
                {/* Question Content */}
                {question.type === 'static' ? (
                    <div className="mb-12 px-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                            {question.text}
                        </h2>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-4 text-6xl font-bold font-mono text-white mb-12">
                        <motion.span
                            key={question.n1} // Force animation on change
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            {question.n1}
                        </motion.span>
                        <span className="text-neon-blue">{question.operation}</span>
                        <motion.span
                            key={question.n2}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            {question.n2}
                        </motion.span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-400">?</span>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto px-4">
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
                                className={cn(
                                    "h-20 text-2xl font-bold rounded-2xl border-2 transition-all shadow-lg",
                                    feedback === 'correct' && option === question.answer
                                        ? "bg-green-500 border-green-400 text-white shadow-green-500/50"
                                        : feedback === 'wrong' && option !== question.answer
                                            ? "opacity-50"
                                            : "bg-[#2D1B4E] border-[#4D2B8E] text-white hover:border-neon-blue hover:bg-[#3D2B6E]"
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
                                "mt-8 text-xl font-bold px-4",
                                feedback === 'correct' ? "text-green-400" : "text-red-400"
                            )}
                        >
                            <div>
                                {feedback === 'correct' ? "Harika! Doğru Cevap! 📚" : `Yanlış! Doğru cevap: ${question.answer}`}
                            </div>
                            {question.explanation && (
                                <div className="text-lg text-white/80 mt-2 font-normal">
                                    💡 {question.explanation}
                                </div>
                            )}

                            {isPractice && (
                                <Button
                                    onClick={handleNextQuestion}
                                    className="bg-neon-blue text-black hover:bg-white font-bold px-8 py-3 text-lg mt-4"
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
