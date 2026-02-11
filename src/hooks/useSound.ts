import { useCallback } from 'react';

// Simple synthesizer for game sound effects using Web Audio API
// No external assets required!

const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

export const useSound = () => {
    const playTone = useCallback((frequency: number, type: OscillatorType, duration: number, startTime: number = 0) => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioContext.currentTime + startTime);

        gain.gain.setValueAtTime(0.1, audioContext.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(audioContext.currentTime + startTime);
        osc.stop(audioContext.currentTime + startTime + duration);
    }, []);

    const playCorrect = useCallback(() => {
        // High major chord arpeggio
        playTone(600, 'sine', 0.1, 0);
        playTone(800, 'sine', 0.1, 0.1);
        playTone(1000, 'sine', 0.2, 0.2); // Ding!
    }, [playTone]);

    const playWrong = useCallback(() => {
        // Low dissonant tone
        playTone(200, 'sawtooth', 0.3, 0);
        playTone(150, 'sawtooth', 0.3, 0.1);
    }, [playTone]);

    const playClick = useCallback(() => {
        // Short high blip
        playTone(1200, 'sine', 0.05, 0);
    }, [playTone]);

    const playComplete = useCallback(() => {
        // Victory fanfare
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            playTone(freq, 'triangle', 0.2, i * 0.1);
        });
    }, [playTone]);

    const playGameOver = useCallback(() => {
        // Sad trombone-ish
        playTone(300, 'sawtooth', 0.3, 0);
        playTone(280, 'sawtooth', 0.3, 0.3);
        playTone(260, 'sawtooth', 0.6, 0.6);
    }, [playTone]);

    return {
        playCorrect,
        playWrong,
        playClick,
        playComplete,
        playGameOver
    };
};
