import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Calculator, FlaskConical, ScrollText, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/core';

interface LibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LibraryModal = ({ isOpen, onClose }: LibraryModalProps) => {
    const navigate = useNavigate();

    const handlePractice = (path: string, topic?: string) => {
        navigate(path, {
            state: {
                mode: 'practice',
                topic: topic
            }
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-[#1A0F2E] border-2 border-white/10 rounded-3xl p-6 max-w-lg w-full relative shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                                Uzay Kütüphanesi 📚
                            </h2>
                            <p className="text-gray-400">
                                Canın gitmeden, özgürce çalış ve öğren!
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button
                                variant="secondary"
                                className="h-auto py-6 flex flex-col gap-3 hover:bg-yellow-500/20 hover:border-yellow-500 transition-all group"
                                onClick={() => handlePractice('/social', 'general-history')}
                            >
                                <ScrollText size={32} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                                <div className="text-center">
                                    <div className="font-bold text-lg">Tarih ve Kültür</div>
                                    <div className="text-xs text-white/50">Bilgi kartları ile öğren</div>
                                </div>
                            </Button>

                            <Button
                                variant="secondary"
                                className="h-auto py-6 flex flex-col gap-3 hover:bg-blue-500/20 hover:border-blue-500 transition-all group"
                                onClick={() => handlePractice('/math', 'mixed')}
                            >
                                <Calculator size={32} className="text-blue-500 group-hover:scale-110 transition-transform" />
                                <div className="text-center">
                                    <div className="font-bold text-lg">Matematik</div>
                                    <div className="text-xs text-white/50">Sınırsız işlem pratiği</div>
                                </div>
                            </Button>

                            <Button
                                variant="secondary"
                                className="h-auto py-6 flex flex-col gap-3 hover:bg-green-500/20 hover:border-green-500 transition-all group"
                                onClick={() => handlePractice('/science', 'general-science')}
                            >
                                <FlaskConical size={32} className="text-green-500 group-hover:scale-110 transition-transform" />
                                <div className="text-center">
                                    <div className="font-bold text-lg">Fen Bilimleri</div>
                                    <div className="text-xs text-white/50">Uzay ve doğa</div>
                                </div>
                            </Button>

                            <Button
                                variant="secondary"
                                className="h-auto py-6 flex flex-col gap-3 hover:bg-pink-500/20 hover:border-pink-500 transition-all group"
                                onClick={() => handlePractice('/turkish', 'synonyms')}
                            >
                                <BookOpen size={32} className="text-pink-500 group-hover:scale-110 transition-transform" />
                                <div className="text-center">
                                    <div className="font-bold text-lg">Türkçe</div>
                                    <div className="text-xs text-white/50">Kelime hazineni geliştir</div>
                                </div>
                            </Button>

                            <Button
                                variant="secondary"
                                className="h-auto py-6 flex flex-col gap-3 hover:bg-emerald-500/20 hover:border-emerald-500 transition-all group md:col-span-2"
                                onClick={() => handlePractice('/religion', 'elif-ba')}
                            >
                                <div className="flex items-center justify-center gap-4">
                                    <Star size={32} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                                    <div className="text-left">
                                        <div className="font-bold text-lg">Kuran ve Değerler</div>
                                        <div className="text-xs text-white/50">Elif-Ba ve Peygamberler Tarihi</div>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
