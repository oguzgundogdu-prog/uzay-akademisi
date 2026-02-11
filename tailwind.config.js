/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                space: {
                    void: '#0B0C15',
                    deep: '#1A1B2E',
                    panel: 'rgba(255, 255, 255, 0.05)',
                    border: 'rgba(255, 255, 255, 0.1)',
                },
                neon: {
                    cyan: '#00F0FF',
                    pink: '#FF0099',
                    gold: '#FFD700',
                    green: '#00FF9D',
                    red: '#FF0055',
                    purple: '#BD00FF', // Keep existing purple as backup/accent
                    blue: '#2979FF',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'space-gradient': 'linear-gradient(to bottom, #0B0C15, #1A1B2E)',
                'glass-panel': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'spin-slow': 'spin 12s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px currentColor' },
                    '100%': { boxShadow: '0 0 20px currentColor' },
                }
            }
        },
    },
    plugins: [],
}
