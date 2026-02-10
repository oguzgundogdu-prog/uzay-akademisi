import { motion } from 'framer-motion';
import { Heart, Star, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../ui/core';

interface GameOverlayProps {
    type: 'game-over' | 'level-complete';
    onRestart?: () => void;
    onHome: () => void;
    gemsEarned?: number;
}

export const GameOverlay = ({ type, onRestart, onHome, gemsEarned = 0 }: GameOverlayProps) => {
    const isWin = type === 'level-complete';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1A0F2E] border-2 border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
                <div className="flex justify-center mb-6">
                    {isWin ? (
                        <div className="relative">
                            <Star size={80} className="text-yellow-400 fill-yellow-400 animate-bounce" />
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="absolute -bottom-2 -right-2 bg-blue-500 text-white font-bold px-3 py-1 rounded-full border-2 border-white"
                            >
                                +{gemsEarned} 💎
                            </motion.div>
                        </div>
                    ) : (
                        <Heart size={80} className="text-gray-600 fill-gray-600/20" />
                    )}
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">
                    {isWin ? "Harika İş! 🎉" : "Enerjin Bitti! 🔋"}
                </h2>
                <p className="text-gray-400 mb-8">
                    {isWin
                        ? "Bu bölümü başarıyla tamamladın."
                        : "Biraz dinlenip canlarının dolmasını bekle."}
                </p>

                <div className="space-y-3">
                    {isWin ? (
                        <Button onClick={onHome} className="w-full py-6 text-lg bg-green-600 hover:bg-green-500">
                            Devam Et <ArrowRight className="ml-2" />
                        </Button>
                    ) : (
                        <>
                            {onRestart && (
                                <Button onClick={onRestart} className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-500 mb-3">
                                    <RotateCcw className="mr-2" /> Tekrar Dene
                                </Button>
                            )}
                            <Button onClick={onHome} variant="secondary" className="w-full py-6 text-lg">
                                Ana Üsse Dön
                            </Button>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
