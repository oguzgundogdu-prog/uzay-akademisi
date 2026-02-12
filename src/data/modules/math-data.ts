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
            unlockThreshold: 100,
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
                    text: '34 + 26 işleminin sonucu kaçtır?',
                    answer: 60,
                    options: [50, 60, 54, 64],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '4 + 6 = 10, 30 + 20 = 50. Toplam 60.'
                },
                {
                    id: 'm2-q6',
                    text: 'Hangi sayının 15 fazlası 40 eder?',
                    answer: 25,
                    options: [20, 25, 30, 35],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '40 - 15 = 25.'
                },
                {
                    id: 'm2-q7',
                    text: 'En büyük bir basamaklı sayı ile en küçük iki basamaklı sayının toplamı kaçtır?',
                    answer: 19,
                    options: [10, 18, 19, 20],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '9 + 10 = 19.'
                },
                {
                    id: 'm2-q8',
                    text: '25 + 25 + 25 işleminin sonucu kaçtır?',
                    answer: 75,
                    options: [50, 60, 70, 75],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '25 + 25 = 50, 50 + 25 = 75.'
                },
                {
                    id: 'm2-q9',
                    text: 'Ece 12, ablası 18 yaşındadır. 5 yıl sonra ikisinin yaşları toplamı kaç olur?',
                    answer: 40,
                    options: [30, 35, 40, 45],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: 'Şimdi 30. 5 yıl sonra her biri 5 yaş büyür: 30 + 5 + 5 = 40.'
                },
                {
                    id: 'm2-q10',
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
            unlockThreshold: 200,
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
                    text: '75 - 18 = ?',
                    answer: 57,
                    options: [67, 57, 53, 62],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '15 - 8 = 7, 6 - 1 = 5. Sonuç 57.'
                },
                {
                    id: 'm3-q4',
                    text: 'Cebimdeki 50 TL\'nin 12 TL\'sini harcadım. Kaç TL kaldı?',
                    answer: 38,
                    options: [48, 38, 42, 32],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '50 - 12 = 38.'
                },
                {
                    id: 'm3-q5',
                    text: '90 sayısından hangi sayıyı çıkarırsak 45 kalır?',
                    answer: 45,
                    options: [40, 50, 45, 55],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '90 - 45 = 45.'
                },
                {
                    id: 'm3-q6',
                    text: 'Bir çıkarma işleminde eksilen 64, çıkan 27 ise fark kaçtır?',
                    answer: 37,
                    options: [47, 37, 33, 43],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '64 - 27 = 37.'
                },
                {
                    id: 'm3-q7',
                    text: 'Hangi sayının 20 eksiği 35 eder?',
                    answer: 55,
                    options: [45, 55, 65, 15],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '35 + 20 = 55.'
                },
                {
                    id: 'm3-q8',
                    text: '80 sayısından 2 deste çıkarırsak kaç kalır?',
                    answer: 60,
                    options: [70, 60, 50, 40],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '2 deste = 20. 80 - 20 = 60.'
                },
                {
                    id: 'm3-q9',
                    text: '3 basamaklı en küçük sayıdan 1 çıkarırsak kaç kalır?',
                    answer: 99,
                    options: [9, 90, 99, 101],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: '100 - 1 = 99.'
                },
                {
                    id: 'm3-q10',
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
            unlockThreshold: 350,
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
                    text: 'Karenin kaç kenarı vardır?',
                    answer: 4,
                    options: [3, 4, 5, 6],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Karenin 4 eşit kenarı vardır.'
                },
                {
                    id: 'm4-q4',
                    text: 'Tüm kenarları birbirine eşit olan geometrik şekil hangisidir?',
                    answer: 'Kare',
                    options: ['Dikdörtgen', 'Kare', 'Üçgen', 'Daire'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Karenin bütün kenar uzunlukları aynıdır.'
                },
                {
                    id: 'm4-q5',
                    text: 'Hangi cisim yuvarlanabilir?',
                    answer: 'Küre',
                    options: ['Küp', 'Küre', 'Prizma', 'Kare'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Küre (top gibi) yuvarlak olduğu için yuvarlanır.'
                },
                {
                    id: 'm4-q6',
                    text: 'Dikdörtgenin kaç köşesi vardır?',
                    answer: 4,
                    options: [4, 3, 2, 0],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Dikdörtgenin 4 köşesi vardır.'
                },
                {
                    id: 'm4-q7',
                    text: 'Bir silindirin kaç tane düz yüzü vardır?',
                    answer: 2,
                    options: [1, 2, 3, 0],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: 'Silindirin alt ve üstünde 2 tane daire şeklinde düz yüzü vardır.'
                },
                {
                    id: 'm4-q8',
                    text: 'Üçgen prizmanın kaç köşesi vardır?',
                    answer: 6,
                    options: [3, 4, 5, 6],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: 'Altta 3, üstte 3 toplam 6 köşesi vardır.'
                },
                {
                    id: 'm4-q9',
                    text: 'Aşağıdakilerden hangisinin köşesi yoktur?',
                    answer: 'Çember',
                    options: ['Kare', 'Üçgen', 'Çember', 'Dikdörtgen'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Çember ve dairenin köşesi yoktur.'
                },
                {
                    id: 'm4-q10',
                    text: 'Geometrik şekiller neyine göre isimlendirilir?',
                    answer: 'Kenar sayısına',
                    options: ['Rengine', 'Boyuna', 'Kenar sayısına', 'Ağırlığına'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '3 kenarı varsa üçgen, 4 kenarı varsa dörtgen denir.'
                }
            ]
        },
        {
            id: 'math-lvl-5',
            title: 'Zamanlararası Yolculuk',
            description: 'Saatler, günler ve mevsimler.',
            order: 5,
            unlockThreshold: 500,
            rewards: { xp: 300, gems: 60 },
            questions: [
                {
                    id: 'm5-q1',
                    text: 'Bir gün kaç saattir?',
                    answer: 24,
                    options: [12, 24, 7, 30],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Bir tam gün 24 saat sürer.'
                },
                {
                    id: 'm5-q2',
                    text: 'Yelkovan 6\'yı, akrep 3 ile 4\'ün arasını gösteriyorsa saat kaçtır?',
                    answer: '03:30',
                    options: ['03:00', '04:30', '03:30', '06:15'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Yelkovan 6\'da ise saat buçuktur.'
                },
                {
                    id: 'm5-q3',
                    text: 'Bir haftada kaç gün vardır?',
                    answer: 7,
                    options: [5, 7, 12, 30],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Pazartesiden Pazara 7 gün vardır.'
                },
                {
                    id: 'm5-q4',
                    text: 'Saat 10:00 iken 1 saat sonra kaç olur?',
                    answer: '11:00',
                    options: ['10:30', '11:00', '09:00', '12:00'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '10\'a 1 eklersek 11 olur.'
                },
                {
                    id: 'm5-q5',
                    text: 'Bir yılda kaç mevsim vardır?',
                    answer: 4,
                    options: [4, 7, 12, 52],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Sonbahar, Kış, İlkbahar, Yaz olmak üzere 4 mevsim vardır.'
                },
                {
                    id: 'm5-q6',
                    text: 'Dün Salı ise yarın hangi gündür?',
                    answer: 'Perşembe',
                    options: ['Çarşamba', 'Perşembe', 'Pazartesi', 'Cuma'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Dün Salı ise bugün Çarşamba, yarın Perşembedir.'
                },
                {
                    id: 'm5-q7',
                    text: '1 saat kaç dakikadır?',
                    answer: 60,
                    options: [30, 45, 60, 100],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '1 tam saat 60 dakikadır.'
                },
                {
                    id: 'm5-q8',
                    text: 'Akrep saati, yelkovan neyi gösterir?',
                    answer: 'Dakikayı',
                    options: ['Saniyeyi', 'Günü', 'Dakikayı', 'Yılı'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Uzun çubuk (yelkovan) dakikayı gösterir.'
                },
                {
                    id: 'm5-q9',
                    text: 'Cumhuriyet Bayramı hangi aydadır?',
                    answer: 'Ekim',
                    options: ['Nisan', 'Mayıs', 'Ekim', 'Ağustos'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '29 Ekim Cumhuriyet Bayramı\'dır.'
                },
                {
                    id: 'm5-q10',
                    text: 'Hangi ay 28 veya 29 gün çeker?',
                    answer: 'Şubat',
                    options: ['Ocak', 'Şubat', 'Mart', 'Nisan'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Şubat ayı diğerlerinden daha kısadır.'
                }
            ]
        },
        {
            id: 'math-lvl-6',
            title: 'Çarpma Galaksisi',
            description: 'Çarpım tablosu ve hızlı çarpma.',
            order: 6,
            unlockThreshold: 700,
            rewards: { xp: 350, gems: 70 },
            questions: [
                {
                    id: 'm6-q1',
                    text: '3 x 4 işleminin sonucu kaçtır?',
                    answer: 12,
                    options: [7, 10, 12, 16],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '3 tane 4, 12 eder.'
                },
                {
                    id: 'm6-q2',
                    text: '5 x 5 = ?',
                    answer: 25,
                    options: [20, 25, 30, 10],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '5 tane 5, 25 eder.'
                },
                {
                    id: 'm6-q3',
                    text: 'Her birinde 3 elma olan 6 tabakta toplam kaç elma vardır?',
                    answer: 18,
                    options: [9, 15, 18, 21],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '6 x 3 = 18.'
                },
                {
                    id: 'm6-q4',
                    text: '2 x 9 işleminin sonucu hangisine eşittir?',
                    answer: '9 + 9',
                    options: ['9 + 9', '2 + 9', '2 + 2', '9 x 9'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Çarpma, aynı sayıların toplamıdır.'
                },
                {
                    id: 'm6-q5',
                    text: '0 x 8 işleminin sonucu nedir?',
                    answer: 0,
                    options: [0, 8, 80, 1],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Sıfır yutan elemandır, sonuç her zaman 0 olur.'
                },
                {
                    id: 'm6-q6',
                    text: '1 x 15 işleminin sonucu nedir?',
                    answer: 15,
                    options: [1, 0, 15, 16],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '1 etkisiz elemandır, sonuç sayının kendisidir.'
                },
                {
                    id: 'm6-q7',
                    text: '4 x 10 işleminin sonucu kaçtır?',
                    answer: 40,
                    options: [14, 40, 44, 100],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Bir sayıyı 10 ile çarpmak yanına 0 eklemektir.'
                },
                {
                    id: 'm6-q8',
                    text: 'Hangi sayının 3 katı 15 eder?',
                    answer: 5,
                    options: [3, 5, 6, 45],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '5 x 3 = 15.'
                },
                {
                    id: 'm6-q9',
                    text: '5 tane 2 kaç eder?',
                    answer: 10,
                    options: [7, 10, 12, 15],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '5 x 2 = 10.'
                },
                {
                    id: 'm6-q10',
                    text: '4 x 5 işleminin sonucu kaçtır?',
                    answer: 20,
                    options: [10, 15, 20, 25],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '4 tane 5, 20 eder.'
                }
            ]
        },
        {
            id: 'math-lvl-7',
            title: 'Bölme Karadeliği',
            description: 'Gruplama ve paylaştırma işlemleri.',
            order: 7,
            unlockThreshold: 900,
            rewards: { xp: 400, gems: 80 },
            questions: [
                {
                    id: 'm7-q1',
                    text: '12 elmayı 3 arkadaşa eşit paylaştırırsak her birine kaç elma düşer?',
                    answer: 4,
                    options: [3, 4, 5, 6],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '12 / 3 = 4.'
                },
                {
                    id: 'm7-q2',
                    text: '20 portakalı 4 tabağa eşit koyarsak her tabakta kaç portakal olur?',
                    answer: 5,
                    options: [4, 5, 6, 10],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '20 / 4 = 5.'
                },
                {
                    id: 'm7-q3',
                    text: '15 / 5 işleminin sonucu kaçtır?',
                    answer: 3,
                    options: [2, 3, 5, 10],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '15 içinde 5, 3 defa vardır.'
                },
                {
                    id: 'm7-q4',
                    text: 'Hangi sayıyı 2\'ye bölersek 8 olur?',
                    answer: 16,
                    options: [4, 10, 16, 18],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '8 x 2 = 16.'
                },
                {
                    id: 'm7-q5',
                    text: 'Bir bölme işleminde bölünen 18, bölen 3 ise bölüm kaçtır?',
                    answer: 6,
                    options: [5, 6, 7, 9],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '18 / 3 = 6.'
                }
            ]
        },
        {
            id: 'math-lvl-8',
            title: 'Ölçme Meteorları',
            description: 'Uzunluk ve sıvı ölçme birimleri.',
            order: 8,
            unlockThreshold: 1100,
            rewards: { xp: 450, gems: 90 },
            questions: [
                {
                    id: 'm8-q1',
                    text: 'Standart uzunluk ölçme birimi nedir?',
                    answer: 'Metre',
                    options: ['Kilo', 'Litre', 'Metre', 'Saat'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Uzunlukları metre ile ölçeriz.'
                },
                {
                    id: 'm8-q2',
                    text: 'Hangisi sıvıları ölçmek için kullanılır?',
                    answer: 'Litre',
                    options: ['Metre', 'Kilo', 'Litre', 'Santimetre'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Su, süt gibi sıvıları litre ile ölçeriz.'
                },
                {
                    id: 'm8-q3',
                    text: '1 metre kaç santimetredir?',
                    answer: 100,
                    options: [10, 50, 100, 1000],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '1 Metre = 100 Santimetredir (cm).'
                },
                {
                    id: 'm8-q4',
                    text: 'Kalemimizin boyunu ne ile ölçeriz?',
                    answer: 'Cetvel',
                    options: ['Metre', 'Cetvel', 'Baskül', 'Termometre'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Küçük uzunluklar cetvel ile ölçülür.'
                }
            ]
        },
        {
            id: 'math-lvl-9',
            title: 'Para Roketleri',
            description: 'Paralarımızı tanıyalım ve hesaplayalım.',
            order: 9,
            unlockThreshold: 1300,
            rewards: { xp: 500, gems: 100 },
            questions: [
                {
                    id: 'm9-q1',
                    text: 'En büyük kağıt paramız hangisidir?',
                    answer: '200 TL',
                    options: ['50 TL', '100 TL', '200 TL', '500 TL'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Şu anki en büyük kağıt paramız 200 Türk Lirasıdır.'
                },
                {
                    id: 'm9-q2',
                    text: '2 tane 50 kuruş kaç TL eder?',
                    answer: '1 TL',
                    options: ['1 TL', '2 TL', '5 TL', '50 TL'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: '50 + 50 = 100 kuruş, yani 1 TL.'
                },
                {
                    id: 'm9-q3',
                    text: '4 tane 25 kuruş kaç TL eder?',
                    answer: '1 TL',
                    options: ['1 TL', '2 TL', '50 kuruş', '5 TL'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '4 tane 25 kuruş 100 kuruş eder.'
                },
                {
                    id: 'm9-q4',
                    text: 'Hangi kağıt paramızın değeri daha azdır?',
                    answer: '5 TL',
                    options: ['5 TL', '10 TL', '20 TL', '50 TL'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'En küçük kağıt paramız 5 TL\'dir.'
                }
            ]
        },
        {
            id: 'math-lvl-10',
            title: 'Veri Uzayı',
            description: 'Tablo ve grafik okuma.',
            order: 10,
            unlockThreshold: 1500,
            rewards: { xp: 600, gems: 120 },
            questions: [
                {
                    id: 'm10-q1',
                    text: 'Verileri göstermek için çizilen çizelgeye ne denir?',
                    answer: 'Tablo',
                    options: ['Resim', 'Defter', 'Tablo', 'Harita'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Sayıları ve bilgileri tablo yaparak düzenleriz.'
                }
            ]
        }
    ]
};
