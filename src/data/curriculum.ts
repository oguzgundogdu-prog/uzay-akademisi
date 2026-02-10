export type QuestionType = 'math' | 'word-match' | 'fill-blank';

export interface CurriculumItem {
    id: string;
    question: string;
    answer: string | number;
    options: (string | number)[];
    type: QuestionType;
    difficulty: 1 | 2 | 3;
}

export interface Topic {
    id: string;
    title: string;
    description: string;
    items: CurriculumItem[];
}

export interface Subject {
    id: string;
    title: string;
    topics: Topic[];
}

export const mathCurriculum: Subject = {
    id: 'math',
    title: 'Matematik',
    topics: [
        {
            id: 'addition',
            title: 'Toplama İşlemi',
            description: 'Sayıları topla, sonucu bul!',
            items: [] // Will serve as a template, implementation will generate these dynamically for infinite play
        },
        {
            id: 'subtraction',
            title: 'Çıkarma İşlemi',
            description: 'Farkı bul, roketi ateşle!',
            items: []
        },
        {
            id: 'multiplication',
            title: 'Çarpım Tablosu',
            description: 'Çarpma işlemini öğren!',
            items: []
        },
        {
            id: 'division',
            title: 'Bölme İşlemi',
            description: 'Paylaştırmayı öğren!',
            items: []
        }
    ]
};

export const turkishCurriculum: Subject = {
    id: 'turkish',
    title: 'Türkçe',
    topics: [
        {
            id: 'synonyms',
            title: 'Eş Anlamlılar',
            description: 'Aynı anlama gelen kelimeyi bul.',
            items: [
                { id: 't1', question: 'Siyah', answer: 'Kara', options: ['Kara', 'Beyaz', 'Kırmızı', 'Mavi'], type: 'word-match', difficulty: 1 },
                { id: 't2', question: 'Cevap', answer: 'Yanıt', options: ['Yanıt', 'Soru', 'Ses', 'Söz'], type: 'word-match', difficulty: 1 },
                { id: 't3', question: 'Konuk', answer: 'Misafir', options: ['Misafir', 'Ev', 'Komşu', 'Arkadaş'], type: 'word-match', difficulty: 1 },
                { id: 't4', question: 'Hediye', answer: 'Armağan', options: ['Armağan', 'Ödül', 'Ceza', 'Para'], type: 'word-match', difficulty: 1 },
                { id: 't5', question: 'Yıl', answer: 'Sene', options: ['Sene', 'Ay', 'Gün', 'Hafta'], type: 'word-match', difficulty: 1 }
            ]
        },
        {
            id: 'antonyms',
            title: 'Zıt Anlamlılar',
            description: 'Tam tersini bul.',
            items: [
                { id: 't6', question: 'Büyük', answer: 'Küçük', options: ['Küçük', 'İri', 'Kocaman', 'Geniş'], type: 'word-match', difficulty: 1 },
                { id: 't7', question: 'Ağır', answer: 'Hafif', options: ['Hafif', 'Zor', 'Güçlü', 'Sert'], type: 'word-match', difficulty: 1 },
                { id: 't8', question: 'Gel', answer: 'Git', options: ['Git', 'Koş', 'Dur', 'Bak'], type: 'word-match', difficulty: 1 },
                { id: 't9', question: 'Erken', answer: 'Geç', options: ['Geç', 'Hızlı', 'Yavaş', 'Zaman'], type: 'word-match', difficulty: 1 },
                { id: 't10', question: 'Taze', answer: 'Bayat', options: ['Bayat', 'Yeni', 'Sıcak', 'Soğuk'], type: 'word-match', difficulty: 1 }
            ]
        }
    ]
};
