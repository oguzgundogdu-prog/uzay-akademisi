import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { NeonButton } from '../ui/NeonButton';
import { GlassCard } from '../ui/GlassCard';

interface LectureModalProps {
    isOpen: boolean;
    title: string;
    content: string;
    onComplete: () => void;
}

export const LectureModal: React.FC<LectureModalProps> = ({ isOpen, title, content, onComplete }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="max-w-2xl w-full"
                    >
                        <GlassCard className="p-8 border-neon-gold/30">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-full bg-neon-gold/20 text-neon-gold">
                                    <Lightbulb size={32} />
                                </div>
                                <h2 className="text-3xl font-display font-bold text-white">
                                    Ders Notu: <span className="text-neon-gold">{title}</span>
                                </h2>
                            </div>

                            <div className="prose prose-invert max-w-none mb-8">
                                <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                                    {content}
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <NeonButton variant="gold" onClick={onComplete} className="gap-2">
                                    ANLADIM, BAŞLA <ArrowRight size={20} />
                                </NeonButton>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
