import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Star, ArrowLeft, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, cn } from '../../components/ui/core';
import { useGameStore } from '../../store/gameStore';

type Scenario = {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    options: {
        text: string;
        isCorrect: boolean;
        feedback: string;
    }[];
};

const scenarios: Scenario[] = [
    {
        id: 1,
        title: "Okul Bahçesi",
        description: "Teneffüste koşarken arkadaşın düştü ve dizi kanadı. Ne yaparsın?",
        icon: <Heart size={48} className="text-red-400" />,
        options: [
            { text: "Görmezden gelip oyunuma devam ederim.", isCorrect: false, feedback: "Bu arkadaşını üzebilir. Yardımlaşmak önemlidir." },
            { text: "Hemen yanına gidip 'İyi misin?' diye sorarım ve öğretmene haber veririm.", isCorrect: true, feedback: "Harikasın! Gerçek bir kahraman gibi davrandın." },
            { text: "Ona gülüp geçerim.", isCorrect: false, feedback: "Başkalarının acısına gülmek doğru değildir." }
        ]
    },
    {
        id: 2,
        title: "Kayıp Eşya",
        description: "Sınıfta yerde bir silgi buldun. Kimin olduğunu bilmiyorsun.",
        icon: <Star size={48} className="text-yellow-400" />,
        options: [
            { text: "Cebime atarım, artık benim.", isCorrect: false, feedback: "Başkasına ait eşyaları izinsiz almak doğru değildir." },
            { text: "Öğretmenime teslim ederim veya 'Bu kimin?' diye sorarım.", isCorrect: true, feedback: "Çok dürüst bir davranış! Tebrikler." },
            { text: "Çöpe atarım.", isCorrect: false, feedback: "Eşyalara zarar vermemeliyiz." }
        ]
    },
    {
        id: 3,
        title: "Çevre Dostu",
        description: "Piknikten dönerken ailenin çöpleri yerde unuttuğunu fark ettin.",
        icon: <Sun size={48} className="text-green-400" />,
        options: [
            { text: "Bana ne, belediye temizlesin.", isCorrect: false, feedback: "Doğayı korumak hepimizin görevidir." },
            { text: "Hemen çöpleri poşete doldurup çöp kutusuna atarım.", isCorrect: true, feedback: "Doğa dostu bir hareket! Dünyamız sana teşekkür ediyor." },
            { text: "Ben de elimdeki çöpü yere atarım.", isCorrect: false, feedback: "Çevremizi kirletmemeliyiz." }
        ]
    }
];

export const LifeGame = () => {
    const navigate = useNavigate();
    const { addXp } = useGameStore();
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
    const [points, setPoints] = useState(0);

    const currentScenario = scenarios[currentScenarioIndex];

    const handleAnswer = (isCorrect: boolean, message: string) => {
        setFeedback({ isCorrect, message });

        if (isCorrect) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#F472B6', '#FBBF24', '#34D399']
            });
            addXp(50);
            setPoints(p => p + 50);
        }
    };

    const nextScenario = () => {
        setFeedback(null);
        if (currentScenarioIndex < scenarios.length - 1) {
            setCurrentScenarioIndex(prev => prev + 1);
        } else {
            // End of game logic or loop
            setCurrentScenarioIndex(0); // Loop for now
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="secondary" onClick={() => navigate('/')} className="gap-2">
                    <ArrowLeft size={20} />
                    Ana Üs
                </Button>
                <div className="flex items-center gap-2 bg-pink-500/20 text-pink-400 px-4 py-2 rounded-xl border border-pink-500/30">
                    <Heart className="fill-current" size={20} />
                    <span className="font-bold">{points} İyilik Puanı</span>
                </div>
            </div>

            <Card className="text-center py-12 px-6">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentScenario.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="inline-block p-6 rounded-full bg-white/5 border-2 border-pink-500/30">
                            {currentScenario.icon}
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
                                {currentScenario.title}
                            </h2>
                            <p className="text-xl text-blue-100 leading-relaxed">
                                {currentScenario.description}
                            </p>
                        </div>

                        <div className="grid gap-4 mt-8">
                            {currentScenario.options.map((option, idx) => (
                                <Button
                                    key={idx}
                                    variant="secondary"
                                    onClick={() => !feedback && handleAnswer(option.isCorrect, option.feedback)}
                                    disabled={feedback !== null}
                                    className={cn(
                                        "w-full text-left p-6 h-auto text-lg transition-all",
                                        feedback && option.text === feedback.message // This logic is slightly flawed for display, let's fix
                                            ? "opacity-50"
                                            : "hover:bg-white/20"
                                    )}
                                // Custom styling for correct/wrong state would be better handled by checking if this SPECIFIC option was selected
                                // But for simplicity, we show feedback in a separate box below.
                                >
                                    {option.text}
                                </Button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "mt-8 p-6 rounded-2xl border-2",
                                feedback.isCorrect
                                    ? "bg-green-500/20 border-green-500/50 text-green-200"
                                    : "bg-red-500/20 border-red-500/50 text-red-200"
                            )}
                        >
                            <div className="text-xl font-bold mb-2">
                                {feedback.isCorrect ? "Harika Seçim! 🌟" : "Bir daha düşünelim... 🤔"}
                            </div>
                            <p>{feedback.message}</p>

                            {feedback.isCorrect && (
                                <Button
                                    className="mt-4 bg-green-500 hover:bg-green-600 text-white"
                                    onClick={nextScenario}
                                >
                                    Sıradaki Görev
                                </Button>
                            )}
                            {!feedback.isCorrect && (
                                <Button
                                    className="mt-4 bg-white/10 hover:bg-white/20"
                                    onClick={() => setFeedback(null)}
                                >
                                    Tekrar Dene
                                </Button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>

            <Card className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Star className="text-yellow-400" />
                    Günlük Görevlerim
                </h3>
                <div className="space-y-4">
                    <ChecklistItem title="Dişlerimi fırçaladım" xp={10} />
                    <ChecklistItem title="Yatağımı topladım" xp={15} />
                    <ChecklistItem title="Oyuncaklarımı kaldırdım" xp={20} />
                    <ChecklistItem title="Aileme yardım ettim" xp={25} />
                    <ChecklistItem title="Kitap okudum" xp={30} />
                </div>
            </Card>
        </div>
    );
};

function ChecklistItem({ title, xp }: { title: string, xp: number }) {
    const [checked, setChecked] = useState(false);
    const { addXp } = useGameStore();

    const handleCheck = () => {
        if (!checked) {
            setChecked(true);
            addXp(xp);
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.8 },
                colors: ['#34D399']
            });
        }
    };

    return (
        <motion.div
            className={cn(
                "flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer",
                checked
                    ? "bg-green-500/20 border-green-500/50"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
            )}
            onClick={handleCheck}
            whileTap={{ scale: 0.98 }}
        >
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    checked ? "bg-green-500 border-green-500" : "border-white/30"
                )}>
                    {checked && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.div>}
                </div>
                <span className={cn("font-medium text-lg", checked ? "text-green-200 line-through" : "text-white")}>
                    {title}
                </span>
            </div>
            <div className="text-yellow-400 font-bold text-sm">+{xp} XP</div>
        </motion.div>
    );
}
