import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className = '',
    hoverEffect = false,
    onClick
}) => {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -5, boxShadow: '0 10px 30px -10px rgba(0, 240, 255, 0.3)' } : {}}
            className={`
        relative overflow-hidden
        bg-space-light/30 backdrop-blur-xl
        border border-white/10 rounded-2xl
        shadow-xl
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
            onClick={onClick}
        >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 p-6">
                {children}
            </div>
        </motion.div>
    );
};
