import React from 'react';
import { motion } from 'framer-motion';

interface NeonButtonProps {
    children: React.ReactNode;
    variant?: 'cyan' | 'pink' | 'gold' | 'green' | 'red';
    onClick?: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
    children,
    variant = 'cyan',
    onClick,
    className = '',
    size = 'md',
    fullWidth = false
}) => {
    const colors = {
        cyan: 'shadow-neon-cyan/50 text-neon-cyan border-neon-cyan hover:bg-neon-cyan hover:text-black',
        pink: 'shadow-neon-pink/50 text-neon-pink border-neon-pink hover:bg-neon-pink hover:text-black',
        gold: 'shadow-neon-gold/50 text-neon-gold border-neon-gold hover:bg-neon-gold hover:text-black',
        green: 'shadow-neon-green/50 text-neon-green border-neon-green hover:bg-neon-green hover:text-black',
        red: 'shadow-neon-red/50 text-neon-red border-neon-red hover:bg-neon-red hover:text-white',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg font-bold',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
        relative overflow-hidden
        border-2 rounded-lg font-display uppercase tracking-wider
        shadow-[0_0_15px_rgba(0,0,0,0.5)]
        backdrop-blur-sm transition-all duration-300
        ${colors[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            onClick={onClick}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    );
};
