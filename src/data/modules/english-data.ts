import type { ModuleData } from '../types';

export const englishData: ModuleData = {
    id: 'english',
    title: 'İngilizce İstasyonu',
    levels: [
        {
            id: 'eng-1',
            title: 'Colors & Numbers',
            description: 'Renkleri ve sayıları öğrenelim!',
            order: 1,
            unlockThreshold: 0,
            lecture: {
                title: 'Renkler ve Sayılar',
                content: `Merhaba Astronot! 👩‍🚀
                
                Bugün İngilizce renkleri ve sayıları öğreneceğiz.
                
                🔴 **Red:** Kırmızı
                🔵 **Blue:** Mavi
                🟡 **Yellow:** Sarı
                🟢 **Green:** Yeşil
                
                Ve sayılar:
                1️⃣ **One:** Bir
                2️⃣ **Two:** İki
                3️⃣ **Three:** Üç
                
                Hazır mısın? Başlayalım!`
            },
            rewards: { xp: 100, gems: 15 },
            questions: [
                {
                    id: 'q1',
                    text: 'Hangi renk "Red" dir?',
                    answer: 'Kırmızı',
                    options: ['Kırmızı', 'Mavi', 'Yeşil', 'Sarı'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q2',
                    text: '"Blue" ne demek?',
                    answer: 'Mavi',
                    options: ['Mavi', 'Siyah', 'Beyaz', 'Turuncu'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q3',
                    text: '"Five" hangi sayıdır?',
                    answer: 5,
                    options: [5, 3, 4, 2],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q4',
                    text: '"Ten" eksi "Two" kaç eder?',
                    answer: 8,
                    options: [8, 7, 9, 10],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Ten (10) - Two (2) = Eight (8)'
                },
                {
                    id: 'q5',
                    text: 'Güneş ("Sun") hangi renktir?',
                    answer: 'Yellow',
                    options: ['Yellow', 'Green', 'Purple', 'Pink'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'eng-2',
            title: 'Animals & Family',
            description: 'Hayvanları ve aile üyelerini tanıyalım.',
            order: 2,
            unlockThreshold: 40,
            rewards: { xp: 120, gems: 20 },
            questions: [
                {
                    id: 'q6',
                    text: '"Cat" ne demek?',
                    answer: 'Kedi',
                    options: ['Kedi', 'Köpek', 'Kuş', 'Balık'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q7',
                    text: '"Dog" ne demek?',
                    answer: 'Köpek',
                    options: ['Köpek', 'At', 'İnek', 'Koyun'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q8',
                    text: '"Mother" kimdir?',
                    answer: 'Anne',
                    options: ['Anne', 'Baba', 'Kardeş', 'Dede'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q9',
                    text: '"Father" kimdir?',
                    answer: 'Baba',
                    options: ['Baba', 'Amca', 'Dayı', 'Kuzen'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q10',
                    text: 'Hangisi uçabilir (Fly)?',
                    answer: 'Bird',
                    options: ['Bird', 'Dog', 'Cat', 'Fish'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'eng-3',
            title: 'School Objects',
            description: 'Sınıfımızdaki eşyaları öğrenelim.',
            order: 3,
            unlockThreshold: 60,
            rewards: { xp: 150, gems: 25 },
            questions: [
                {
                    id: 'q11',
                    text: '"Pencil" nedir?',
                    answer: 'Kalem',
                    options: ['Kalem', 'Silgi', 'Kitap', 'Çanta'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q12',
                    text: '"Book" nedir?',
                    answer: 'Kitap',
                    options: ['Kitap', 'Defter', 'Masa', 'Sandalye'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q13',
                    text: 'Yazı tahtası ("Board") hangi renktir?',
                    answer: 'White/Black',
                    options: ['White/Black', 'Pink', 'Purple', 'Orange'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'q14',
                    text: '"Teacher" kimdir?',
                    answer: 'Öğretmen',
                    options: ['Öğretmen', 'Öğrenci', 'Müdür', 'Hademe'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q15',
                    text: '"Student" kimdir?',
                    answer: 'Öğrenci',
                    options: ['Öğrenci', 'Doktor', 'Polis', 'Pilot'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'eng-4',
            title: 'Greetings',
            description: 'Selamlaşma ve basit cümleler.',
            order: 4,
            unlockThreshold: 80,
            rewards: { xp: 200, gems: 30 },
            questions: [
                {
                    id: 'q16',
                    text: '"Hello" ne demek?',
                    answer: 'Merhaba',
                    options: ['Merhaba', 'Güle güle', 'Günaydın', 'İyi geceler'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q17',
                    text: '"Good Morning" ne zaman denir?',
                    answer: 'Sabah',
                    options: ['Sabah', 'Öğle', 'Akşam', 'Gece'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q18',
                    text: '"What is your name?" sorusuna nasıl cevap verilir?',
                    answer: 'My name is Ali',
                    options: ['My name is Ali', 'I am fine', 'Good bye', 'Thank you'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'q19',
                    text: '"How are you?" ne demek?',
                    answer: 'Nasılsın?',
                    options: ['Nasılsın?', 'Nerelisin?', 'Kaç yaşındasın?', 'Adın ne?'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'q20',
                    text: '"Clean the board" ne demektir?',
                    answer: 'Tahtayı temizle',
                    options: ['Tahtayı temizle', 'Kapıyı aç', 'Pencereyi kapat', 'Otur'],
                    type: 'multiple-choice',
                    difficulty: 'hard'
                }
            ]
        }
    ]
};
