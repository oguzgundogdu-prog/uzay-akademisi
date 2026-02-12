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
                },
                {
                    id: 'q5-1',
                    text: 'Hangi sayı "Zero" dur?',
                    answer: 0,
                    options: [0, 1, 10, 100],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q5-2',
                    text: '"Pink" hangi renktir?',
                    answer: 'Pembe',
                    options: ['Pembe', 'Mor', 'Turuncu', 'Gri'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'eng-2',
            title: 'Animals & Family',
            description: 'Hayvanları ve aile üyelerini tanıyalım.',
            order: 2,
            unlockThreshold: 100,
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
                },
                {
                    id: 'q10-1',
                    text: '"Lion" hangi hayvandır?',
                    answer: 'Aslan',
                    options: ['Kaplan', 'Aslan', 'Ayı', 'Kurt'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'q10-2',
                    text: '"Sister" ne demektir?',
                    answer: 'Kız Kardeş',
                    options: ['Erkek Kardeş', 'Kız Kardeş', 'Teyze', 'Hala'],
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
            unlockThreshold: 220,
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
                },
                {
                    id: 'q15-1',
                    text: '"Eraser" nedir?',
                    answer: 'Silgi',
                    options: ['Kalem', 'Silgi', 'Kitap', 'Defter'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'eng-4',
            title: 'Greetings',
            description: 'Selamlaşma ve basit cümleler.',
            order: 4,
            unlockThreshold: 370,
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
                },
                {
                    id: 'q20-1',
                    text: '"Good Bye" ne demektir?',
                    answer: 'Hoşçakal',
                    options: ['Merhaba', 'Hoşçakal', 'Günaydın', 'Tünaydın'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'eng-5',
            title: 'My Body',
            description: 'Vücudumuzun bölümlerini öğrenelim.',
            order: 5,
            unlockThreshold: 570,
            rewards: { xp: 250, gems: 35 },
            questions: [
                {
                    id: 'q21',
                    text: '"Head" ne demektir?',
                    answer: 'Baş / Kafa',
                    options: ['Baş / Kafa', 'Kol', 'Bacak', 'El'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q22',
                    text: '"Hand" ne demektir?',
                    answer: 'El',
                    options: ['Ayak', 'El', 'Parmak', 'Omuz'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q23',
                    text: '"Eye" ne demektir?',
                    answer: 'Göz',
                    options: ['Burun', 'Kulak', 'Göz', 'Ağız'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'eng-6',
            title: 'Food & Drinks',
            description: 'Yiyecek ve içecekler.',
            order: 6,
            unlockThreshold: 820,
            rewards: { xp: 300, gems: 40 },
            questions: [
                {
                    id: 'q24',
                    text: '"Apple" hangi meyvedir?',
                    answer: 'Elma',
                    options: ['Armut', 'Elma', 'Muz', 'Çilek'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q25',
                    text: '"Water" ne demektir?',
                    answer: 'Su',
                    options: ['Süt', 'Meyve suyu', 'Su', 'Çay'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'q26',
                    text: '"Milk" ne demektir?',
                    answer: 'Süt',
                    options: ['Yoğurt', 'Peynir', 'Süt', 'Ekmek'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        }
    ]
};
