import { motion } from 'framer-motion';
import { Check, Lock, Star, Rocket, BookOpen, Trophy, Flag } from 'lucide-react';
import { cn } from '../../components/ui/core';

interface LevelNodeProps {
    status: 'locked' | 'unlocked' | 'completed';
    type: 'start' | 'lesson' | 'challenge' | 'chest' | 'finish';
    x: number;
    onClick: () => void;
    icon?: any;
}

export const LevelNode = ({ status, type, x, onClick }: LevelNodeProps) => {
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';

    // let Icon = Star; // Removed unused variable
    let bgColor = 'bg-gray-600';
    let ringColor = 'ring-gray-600';

    if (type === 'start') {
        bgColor = isCompleted ? 'bg-yellow-500' : 'bg-yellow-600';
        ringColor = 'ring-yellow-500';
    } else if (type === 'chest') {
        bgColor = isCompleted ? 'bg-orange-500' : 'bg-orange-600';
        ringColor = 'ring-orange-500';
    } else if (type === 'challenge') {
        bgColor = isCompleted ? 'bg-red-500' : 'bg-red-600';
        ringColor = 'ring-red-500';
    } else {
        // Lesson
        bgColor = isCompleted ? 'bg-neon-blue' : 'bg-blue-600';
        ringColor = 'ring-neon-blue';
    }

    if (isLocked) {
        bgColor = 'bg-gray-700';
        ringColor = 'ring-gray-700';
    }

    return (
        <div
            className="absolute flex justify-center w-full"
            style={{ left: `${x}%`, transform: 'translateX(-50%)' }}
        >
            <motion.button
                whileHover={!isLocked ? { scale: 1.1 } : {}}
                whileTap={!isLocked ? { scale: 0.9 } : {}}
                onClick={!isLocked ? onClick : undefined}
                className={cn(
                    "relative w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
                    bgColor,
                    status === 'unlocked' && `ring-4 ${ringColor} ring-offset-4 ring-offset-space-dark animate-pulse`
                )}
            >
                {/* Crown/Stars for completed levels */}
                {isCompleted && type !== 'chest' && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-black p-1 rounded-full border-2 border-space-dark">
                        <Check size={12} strokeWidth={4} />
                    </div>
                )}

                {/* Icon */}
                <div className={cn(
                    "relative z-10 p-3 rounded-xl transform transition-all duration-300",
                    status === 'locked' && "grayscale opacity-50",
                    status === 'unlocked' && "scale-110 animate-bounce shadow-[0_0_15px_rgba(255,255,255,0.5)]",
                    status === 'completed' && "bg-white/20"
                )}>
                    {status === 'locked' ? (
                        <Lock size={24} className="text-white/50" />
                    ) : (
                        <>
                            {type === 'start' && <Rocket size={32} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />}
                            {type === 'lesson' && <BookOpen size={28} className="text-white" />}
                            {type === 'challenge' && <Trophy size={32} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />}
                            {type === 'chest' && <Star size={28} className="text-yellow-400" />}
                            {type === 'finish' && <Flag size={32} className="text-red-500" />}
                        </>
                    )}
                </div>

                {/* Connector Line (Visual only, usually handled by parent SVG) */}
            </motion.button>
        </div>
    );
};
