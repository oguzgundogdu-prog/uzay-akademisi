import type { ModuleData } from '../types';

export const scienceData: ModuleData = {
    id: 'science',
    title: 'Bilim Laboratuvarı',
    levels: [
        {
            id: 'sci-lvl-1',
            title: 'Madde Dünyası',
            description: 'Maddenin halleri ve özellikleri.',
            order: 1,
            unlockThreshold: 0,
            rewards: { xp: 100, gems: 20 },
            questions: [
                {
                    id: 'sc1-q1',
                    text: 'Aşağıdakilerden hangisi bir sıvıdır?',
                    answer: 'Su',
                    options: ['Taş', 'Su', 'Buhar', 'Kalem'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Su akışkan bir sıvıdır.'
                },
                {
                    id: 'sc1-q2',
                    text: 'Hangi madde bulunduğu kabın şeklini alır?',
                    answer: 'Süt',
                    options: ['Elma', 'Süt', 'Silgi', 'Defter'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Sıvılar (Süt) bulundukları kabın şeklini alır.'
                },
                {
                    id: 'sc1-q3',
                    text: 'Su donduğunda hangi hale geçer?',
                    answer: 'Katı (Buz)',
                    options: ['Sıvı', 'Gaz', 'Katı (Buz)', 'Buhar'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Donan su buz olur, buz katıdır.'
                }
            ]
        },
        {
            id: 'sci-lvl-2',
            title: 'Canlılar Âlemi',
            description: 'Bitkiler, hayvanlar ve yaşam döngüleri.',
            order: 2,
            unlockThreshold: 3,
            rewards: { xp: 150, gems: 30 },
            questions: [
                {
                    id: 'sc2-q1',
                    text: 'Bitkilerin büyümek için neye ihtiyacı vardır?',
                    answer: 'Su ve Güneş',
                    options: ['Çikolata', 'Su ve Güneş', 'Karanlık', 'Televizyon'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'sc2-q2',
                    text: 'Hangisi bir canlıdır?',
                    answer: 'Ağaç',
                    options: ['Araba', 'Taş', 'Ağaç', 'Bulut'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Ağaçlar büyür, beslenir ve çoğalır. Canlıdır.'
                },
                {
                    id: 'sc2-q3',
                    text: 'Hangisi hem karada hem suda yaşayabilir?',
                    answer: 'Kurbağa',
                    options: ['Aslan', 'Hamsi', 'Kurbağa', 'Serçe'],
                    type: 'multiple-choice',
                    difficulty: 'hard'
                }
            ]
        },
        {
            id: 'sci-lvl-3',
            title: 'Kuvvet ve Hareket',
            description: 'İtme, çekme ve hareket türleri.',
            order: 3,
            unlockThreshold: 3,
            rewards: { xp: 200, gems: 40 },
            questions: [
                {
                    id: 'sc3-q1',
                    text: 'Duran bir topa vurursak top ne yapar?',
                    answer: 'Hareket eder',
                    options: ['Durur', 'Hareket eder', 'Uyumaya başlar', 'Kaybolur'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'sc3-q2',
                    text: 'Çekmeceyi açmak için hangi kuvveti uygularız?',
                    answer: 'Çekme',
                    options: ['İtme', 'Çekme', 'Döndürme', 'Sallama'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'sci-lvl-4',
            title: 'Dünya ve Uzay',
            description: 'Gezegenimiz ve gökyüzü.',
            order: 4,
            unlockThreshold: 3,
            rewards: { xp: 250, gems: 50 },
            questions: [
                {
                    id: 'sc4-q1',
                    text: 'Dünyamızın ısı ve ışık kaynağı nedir?',
                    answer: 'Güneş',
                    options: ['Ay', 'Güneş', 'Yıldızlar', 'El feneri'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'sc4-q2',
                    text: 'Dünya\'nın kendi etrafında dönmesi sonucu ne oluşur?',
                    answer: 'Gece ve Gündüz',
                    options: ['Mevsimler', 'Gece ve Gündüz', 'Yıllar', 'Depremler'],
                    type: 'multiple-choice',
                    difficulty: 'hard'
                }
            ]
        }
    ]
};
