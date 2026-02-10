/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'space-dark': '#0B0E14',
                'space-light': '#1A1F2E',
                'neon-blue': '#00F0FF',
                'neon-purple': '#BD00FF',
                'star-yellow': '#FFD700',
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 10px #00F0FF' },
                    '100%': { boxShadow: '0 0 20px #00F0FF, 0 0 30px #00F0FF' },
                }
            }
        },
    },
    plugins: [],
}
