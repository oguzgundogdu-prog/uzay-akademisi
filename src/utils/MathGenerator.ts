
export type MathOperation = '+' | '-' | 'x' | '÷';

export interface GeneratedQuestion {
    text: string;
    n1: number;
    n2: number;
    operation: MathOperation;
    answer: number;
    options: number[];
}

export const MathGenerator = {
    generateValue: (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateOptions: (answer: number): number[] => {
        const options = new Set<number>([answer]);
        let attempts = 0;

        while (options.size < 4 && attempts < 20) {
            // Generate varied offsets depending on answer size
            const range = Math.max(5, Math.floor(answer * 0.5));
            const offset = Math.floor(Math.random() * (range * 2)) - range;
            const option = answer + offset;

            if (option >= 0 && option !== answer) {
                options.add(option);
            }
            attempts++;
        }

        // Fill with randoms if stuck (unlikely)
        while (options.size < 4) {
            options.add(Math.floor(Math.random() * 50) + 1);
        }

        return Array.from(options).sort(() => Math.random() - 0.5);
    },

    addition: (difficulty: number = 1): GeneratedQuestion => {
        // Diff 1: 1-20 + 1-20
        // Diff 2: 10-50 + 10-50
        const max = difficulty === 1 ? 20 : 50;
        const n1 = MathGenerator.generateValue(1, max);
        const n2 = MathGenerator.generateValue(1, max);
        const answer = n1 + n2;

        return {
            text: `${n1} + ${n2} = ?`,
            n1, n2, operation: '+',
            answer,
            options: MathGenerator.generateOptions(answer)
        };
    },

    subtraction: (difficulty: number = 1): GeneratedQuestion => {
        const max = difficulty === 1 ? 20 : 50;
        const n1 = MathGenerator.generateValue(5, max);
        const n2 = MathGenerator.generateValue(1, n1); // Ensure positive result
        const answer = n1 - n2;

        return {
            text: `${n1} - ${n2} = ?`,
            n1, n2, operation: '-',
            answer,
            options: MathGenerator.generateOptions(answer)
        };
    },

    multiplication: (difficulty: number = 1): GeneratedQuestion => {
        // Diff 1: 1-5 tables
        // Diff 2: 1-10 tables
        const max = difficulty === 1 ? 5 : 10;
        const n1 = MathGenerator.generateValue(1, max);
        const n2 = MathGenerator.generateValue(1, 10);
        const answer = n1 * n2;

        return {
            text: `${n1} x ${n2} = ?`,
            n1, n2, operation: 'x',
            answer,
            options: MathGenerator.generateOptions(answer)
        };
    },

    division: (difficulty: number = 1): GeneratedQuestion => {
        // Inverse multiplication for clean numbers
        const max = difficulty === 1 ? 5 : 10;
        const divisor = MathGenerator.generateValue(1, max);
        const quotient = MathGenerator.generateValue(1, 10);
        const dividend = divisor * quotient;

        return {
            text: `${dividend} ÷ ${divisor} = ?`,
            n1: dividend,
            n2: divisor,
            operation: '÷',
            answer: quotient,
            options: MathGenerator.generateOptions(quotient)
        };
    },

    mixed: (): GeneratedQuestion => {
        const types = ['add', 'sub', 'mul', 'div'];
        const type = types[Math.floor(Math.random() * types.length)];

        switch (type) {
            case 'add': return MathGenerator.addition(2);
            case 'sub': return MathGenerator.subtraction(2);
            case 'mul': return MathGenerator.multiplication(2);
            case 'div': return MathGenerator.division(2);
            default: return MathGenerator.addition(1);
        }
    }
};
