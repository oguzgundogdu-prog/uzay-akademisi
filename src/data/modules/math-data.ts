import type { ModuleData } from '../types';

export const mathData: ModuleData = {
    id: 'math',
    title: 'Matematik Üssü',
    levels: [
        {
            id: 'math-lvl-1',
            title: 'Sayılar Gezegeni',
            description: 'Doğal sayıları, onlukları ve birlikleri tanıyalım.',
            order: 1,
            unlockThreshold: 0, // First level is open
            rewards: { xp: 100, gems: 20 },
            questions: [
                {
                    id: 'm1-q1',
                    text: '4 onluk ve 3 birlikten oluşan sayı kaçtır?',
                    answer: 43,
                    options: [34, 43, 40, 30],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '4 onluk (40) + 3 birlik (3) = 43 eder.'
                },
                {
                    id: 'm1-q2',
                    text: '75 sayısının onlar basamağındaki rakamın basamak değeri kaçtır?',
                    answer: 70,
                    options: [7, 5, 70, 75],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '7 rakamı onlar basamağındadır, değeri 70\'tir.'
                },
                {
                    id: 'm1-q3',
                    text: 'Aşağıdaki sayılardan hangisi bir düzinedir?',
                    answer: 12,
                    options: [10, 12, 20, 24],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Bir düzine 12 tanedir.'
                },
                {
                    id: 'm1-q4',
                    text: '2 düzine kaç tane eder?',
                    answer: 24,
                    options: [12, 20, 24, 30],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '12 + 12 = 24 eder.'
                },
                {
                    id: 'm1-q5',
                    text: 'Aşağıdaki sayılardan hangisi en yakın onluğa yuvarlandığında 50 olur?',
                    answer: 48,
                    options: [42, 55, 48, 62],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: '48 sayısı 50\'ye daha yakındır.'
                },
                {
                    id: 'm1-q6',
                    text: '60\'tan başlayıp geriye doğru 5\'er ritmik sayarken 3. söylediğimiz sayı kaçtır?',
                    answer: 50,
                    options: [55, 50, 45, 60],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '60, 55, 50... Üçüncü sayı 50\'dir.'
                },
                {
                    id: 'm1-q7',
                    text: 'Hangi sayı 2 deste eder?',
                    answer: 20,
                    options: [10, 20, 12, 24],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '1 deste 10 tanedir. 2 deste 20 eder.'
                },
                {
                    id: 'm1-q8',
                    text: '83 sayısının birler basamağındaki rakam kaçtır?',
                    answer: 3,
                    options: [8, 80, 3, 30],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '83 sayısının birler basamağında 3 vardır.'
                },
                {
                    id: 'm1-q9',
                    text: '24 ile 36 arasındaki sayılardan hangisi çifttir?',
                    answer: 30,
                    options: [25, 29, 30, 35],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Çift sayıların sonu 0, 2, 4, 6, 8 ile biter.'
                },
                {
                    id: 'm1-q10',
                    text: '9 onluk kaç eder?',
                    answer: 90,
                    options: [9, 19, 90, 99],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '9 tane onluk 90 eder.'
                }
            ]
        },
        {
            id: 'math-lvl-2',
            title: 'Toplama Üssü',
            description: 'Eldeli toplama işlemleri ve problemler.',
            order: 2,
            unlockThreshold: 3, // Requires stars from prev level
            rewards: { xp: 150, gems: 30 },
            questions: [
                {
                    id: 'm2-q1',
                    text: '28 + 15 işlemi kaç eder?',
                    answer: 43,
                    options: [33, 43, 42, 38],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '8+5=13 (elde var 1), 2+1=3, eldeyi ekle 4. Sonuç 43.'
                },
                {
                    id: 'm2-q2',
                    text: '45 fındığım vardı, 17 tane daha topladım. Kaç fındığım oldu?',
                    answer: 62,
                    options: [52, 62, 58, 60],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '45 + 17 = 62 eder.'
                },
                {
                    id: 'm2-q3',
                    text: '63 + 29 = ?',
                    answer: 92,
                    options: [82, 92, 90, 89],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: '3+9=12, 6+2=8, elde var 1 -> 9. Sonuç 92.'
                },
                {
                    id: 'm2-q4',
                    text: 'Bir otobüste 24 yolcu vardı. Durakta 18 yolcu daha bindi. Toplam kaç yolcu oldu?',
                    answer: 42,
                    options: [32, 42, 44, 40],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '24 + 18 = 42.'
                },
                {
                    id: 'm2-q5',
                    text: 'Hangi iki sayının toplamı 80 eder?',
                    answer: '35 + 45',
                    options: ['30 + 40', '35 + 45', '25 + 50', '40 + 30'],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: '35 ile 45\'i toplarsan 80 eder.'
                }
            ]
        },
        {
            id: 'math-lvl-3',
            title: 'Çıkarma Asteroitleri',
            description: 'Onluk bozarak çıkarma işlemleri.',
            order: 3,
            unlockThreshold: 3,
            rewards: { xp: 200, gems: 40 },
            questions: [
                {
                    id: 'm3-q1',
                    text: '82 - 35 işleminin sonucu kaçtır?',
                    answer: 47,
                    options: [57, 47, 53, 43],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: '2\'den 5 çıkmaz, onluk alırız. 12-5=7. 7-3=4. Sonuç 47.'
                },
                {
                    id: 'm3-q2',
                    text: 'Bir ağaçta 60 kuş vardı. 24 tanesi uçtu. Geriye kaç kuş kaldı?',
                    answer: 36,
                    options: [46, 36, 34, 44],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '60 - 24 = 36.'
                },
                {
                    id: 'm3-q3',
                    text: 'Farkı 25 olan işlem hangisidir?',
                    answer: '50 - 25',
                    options: ['60 - 30', '50 - 25', '40 - 10', '80 - 50'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '50 eksi 25, 25 eder.'
                }
            ]
        },
        {
            id: 'math-lvl-4',
            title: 'Geometri İstasyonu',
            description: 'Şekiller, cisimler ve özellikleri.',
            order: 4,
            unlockThreshold: 3,
            rewards: { xp: 250, gems: 50 },
            questions: [
                {
                    id: 'm4-q1',
                    text: '3 köşesi ve 3 kenarı olan şekil hangisidir?',
                    answer: 'Üçgen',
                    options: ['Kare', 'Üçgen', 'Daire', 'Dikdörtgen'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Üçgenin 3 köşesi ve 3 kenarı vardır.'
                },
                {
                    id: 'm4-q2',
                    text: 'Küpün kaç yüzü vardır?',
                    answer: 6,
                    options: [4, 6, 8, 12],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Küpün 6 adet karesel yüzü vardır.'
                },
                {
                    id: 'm4-q3',
                    text: 'Aşağıdakilerden hangisinin köşesi yoktur?',
                    answer: 'Çember',
                    options: ['Kare', 'Üçgen', 'Çember', 'Dikdörtgen'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Çember ve dairenin köşesi yoktur.'
                }
            ]
        },
        {
            id: 'math-lvl-5',
            title: 'Zamanlararası Yolculuk',
            description: 'Saatler, günler ve mevsimler.',
            order: 5,
            unlockThreshold: 3,
            rewards: { xp: 300, gems: 60, item: 'badge-time-lord' },
            questions: [
                {
                    id: 'm5-q1',
                    text: 'Bir gün kaç saattir?',
                    answer: 24,
                    options: [12, 24, 7, 30],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Dünya kendi etrafında 24 saatte döner.'
                },
                {
                    id: 'm5-q2',
                    text: 'Yelkovan 6\'yı, akrep 3 ile 4\'ün arasını gösteriyorsa saat kaçtır?',
                    answer: '03:30',
                    options: ['03:00', '04:30', '03:30', '06:15'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Yelkovan 6\'da ise saat buçuktur.'
                }
            ]
        }
    ]
};
