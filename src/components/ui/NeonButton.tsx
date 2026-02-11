import React from 'react';
import { motion } from 'framer-motion';

interface NeonButtonProps {
    children: React.ReactNode;
    variant?: 'cyan' | 'pink' | 'gold' | 'green' | 'red' | 'blue';
    onClick?: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
    children,
    variant = 'cyan',
    onClick,
    className = '',
    size = 'md',
    fullWidth = false,
    disabled = false
}) => {
    const baseStyles = "relative group font-display font-bold tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        cyan: "text-black bg-neon-cyan hover:bg-neon-cyan/80 shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)]",
        pink: "text-white bg-neon-pink hover:bg-neon-pink/80 shadow-[0_0_20px_rgba(255,0,153,0.5)] hover:shadow-[0_0_40px_rgba(255,0,153,0.7)]",
        gold: "text-black bg-neon-gold hover:bg-neon-gold/80 shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_40px_rgba(255,215,0,0.7)]",
        green: "text-black bg-neon-green hover:bg-neon-green/80 shadow-[0_0_20px_rgba(0,255,157,0.5)] hover:shadow-[0_0_40px_rgba(0,255,157,0.7)]",
        red: "text-white bg-neon-red hover:bg-neon-red/80 shadow-[0_0_20px_rgba(255,0,85,0.5)] hover:shadow-[0_0_40px_rgba(255,0,85,0.7)]",
        blue: "text-white bg-neon-blue hover:bg-neon-blue/80 shadow-[0_0_20px_rgba(41,121,255,0.5)] hover:shadow-[0_0_40px_rgba(41,121,255,0.7)]",
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg font-bold',
    };

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            className={`
                ${baseStyles}
                overflow-hidden
                border-2 rounded-lg uppercase
                shadow-[0_0_15px_rgba(0,0,0,0.5)]
                backdrop-blur-sm
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? 'w-full' : ''}
                ${className}
                ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
            `}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    );
};
