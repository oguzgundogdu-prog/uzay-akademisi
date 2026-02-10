import { synonyms, antonyms } from './wordBank';
import { scienceQuestions } from './scienceBank';
import { historyQuestions } from './historyBank';

export type QuestionType = 'math' | 'word-match' | 'fill-blank' | 'reading' | 'visual' | 'word' | 'letter' | 'surah' | 'quiz' | 'matching';

const generateOptions = (correct: string, sourceArray: { w: string, m: string }[]) => {
    const opts = new Set<string>([correct]);
    while (opts.size < 4) {
        const random = sourceArray[Math.floor(Math.random() * sourceArray.length)].m;
        if (random !== correct) opts.add(random);
    }
    return Array.from(opts).sort(() => Math.random() - 0.5);
};

export interface CurriculumItem {
    id: string;
    question: string;
    answer: string | number;
    options: (string | number)[];
    type: QuestionType;
    difficulty?: 1 | 2 | 3;
    explanation?: string;
    image?: string; // Optional image URL for visual questions
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
        },
        {
            id: 'time',
            title: 'Zamanı Ölçme',
            description: 'Saatleri ve zamanı öğrenelim!',
            items: [
                // Image 1: Daily Routines
                { id: 'time1', question: 'Saat 07:30. Kahvaltı yapıyorum. Günün hangi vakti?', answer: 'Sabah', options: ['Sabah', 'Öğle', 'Akşam', 'Gece'], type: 'word-match', difficulty: 1, explanation: 'Sabahları uyanır ve kahvaltı yaparız.' },
                { id: 'time2', question: 'Saat 12:00. Öğle yemeği yiyorum. Günün hangi vakti?', answer: 'Öğle', options: ['Sabah', 'Öğle', 'Akşam', 'Gece'], type: 'word-match', difficulty: 1, explanation: 'Güneşin en tepede olduğu zaman öğle vaktidir.' },
                { id: 'time3', question: 'Saat 19:00. Akşam yemeği yiyorum. Günün hangi vakti?', answer: 'Akşam', options: ['Sabah', 'Öğle', 'Akşam', 'Gece'], type: 'word-match', difficulty: 1, explanation: 'Güneş battıktan sonra akşam olur.' },
                { id: 'time4', question: 'Okuldan geldim, ödevimi yapıyorum. Güneş batmak üzere.', answer: 'Öğleden Sonra', options: ['Sabah', 'Öğle', 'Öğleden Sonra', 'Gece'], type: 'word-match', difficulty: 1, explanation: 'Okul çıkışı ile akşam arası öğleden sonradır.' },

                // Image 2: Duration Comparison
                { id: 'dur1', question: 'Hangisi daha uzun sürer?', answer: 'Tiyatro (37 dk)', options: ['Tiyatro (37 dk)', 'Fıkra (7 dk)'], type: 'word-match', difficulty: 2, explanation: '37 dakika, 7 dakikadan daha fazladır.' },
                { id: 'dur2', question: 'Hangisi daha uzun sürer?', answer: 'Uyku (9 saat)', options: ['Diş Fırçalama (2 dk)', 'Uyku (9 saat)'], type: 'word-match', difficulty: 2, explanation: 'Saatler dakikalardan çok daha uzundur.' },
                { id: 'dur3', question: 'Hangisi daha uzun sürer?', answer: 'Yaz Tatili (3 ay)', options: ['Yaz Tatili (3 ay)', 'Yarıyıl Tatili (2 hafta)'], type: 'word-match', difficulty: 2, explanation: 'Aylar haftalardan daha uzundur.' },
                { id: 'dur4', question: 'Hangisi daha kısadır?', answer: 'Tenefüs (15 dk)', options: ['Ders (40 dk)', 'Tenefüs (15 dk)'], type: 'word-match', difficulty: 2, explanation: '15 dakika, 40 dakikadan daha azdır.' }
            ]
        },
        {
            id: 'geometry',
            title: 'Geometri',
            description: 'Şekilleri ve özelliklerini tanı!',
            items: [
                { id: 'geo1', question: 'Üçgenin kaç kenarı vardır?', answer: 3, options: [3, 4, 5, 2], type: 'math', difficulty: 1, explanation: 'Üçgenin 3 kenarı ve 3 köşesi vardır.' },
                { id: 'geo2', question: 'Karenin kaç köşesi vardır?', answer: 4, options: [3, 4, 5, 6], type: 'math', difficulty: 1, explanation: 'Karenin 4 kenarı ve 4 köşesi vardır.' },
                { id: 'geo3', question: 'Hangisi yuvarlaktır?', answer: 'Daire', options: ['Kare', 'Üçgen', 'Daire', 'Dikdörtgen'], type: 'word-match', difficulty: 1, explanation: 'Dairenin köşesi yoktur, yuvarlaktır.' },
                { id: 'geo4', question: '5 kenarı olan şekil hangisidir?', answer: 'Beşgen', options: ['Üçgen', 'Kare', 'Beşgen', 'Altıgen'], type: 'word-match', difficulty: 2, explanation: 'Adı üstünde: Beş-gen, 5 kenarlıdır.' },
                { id: 'geo5', question: 'Top hangi şekle benzer?', answer: 'Küre', options: ['Küp', 'Küre', 'Piramit', 'Silindir'], type: 'word-match', difficulty: 2, explanation: 'Dünyamız ve toplar küre şeklindedir.' }
            ]
        },
        {
            id: 'patterns',
            title: 'Örüntüler',
            description: 'Sıradaki sayıyı bul!',
            items: [
                { id: 'pat1', question: '2, 4, 6, 8, ... Sıradaki sayı kaçtır?', answer: 10, options: [9, 10, 11, 12], type: 'math', difficulty: 1, explanation: 'Sayılar ikişer ikişer artıyor: 8 + 2 = 10' },
                { id: 'pat2', question: '5, 10, 15, 20, ... Sıradaki sayı kaçtır?', answer: 25, options: [21, 24, 25, 30], type: 'math', difficulty: 1, explanation: 'Sayılar beşer beşer artıyor: 20 + 5 = 25' },
                { id: 'pat3', question: '10, 20, 30, ... Sıradaki sayı kaçtır?', answer: 40, options: [35, 40, 50, 60], type: 'math', difficulty: 1, explanation: 'Onar onar sayıyoruz: 30 + 10 = 40' },
                { id: 'pat4', question: '1, 2, 4, 8, ... Sıradaki sayı kaçtır?', answer: 16, options: [10, 12, 16, 20], type: 'math', difficulty: 2, explanation: 'Her sayı kendisinin iki katı oluyor: 8 + 8 = 16' },
                { id: 'pat5', question: '20, 18, 16, 14, ... Sıradaki sayı kaçtır?', answer: 12, options: [10, 12, 13, 15], type: 'math', difficulty: 2, explanation: 'Sayılar ikişer ikişer azalıyor: 14 - 2 = 12' }
            ]
        }
    ]
};

export const scienceCurriculum: Subject = {
    id: 'science',
    title: 'Uzay Bilimi',
    topics: [
        {
            id: 'general-science',
            title: 'Fen Bilimleri',
            description: 'Uzay, Dünya ve Canlılar!',
            items: scienceQuestions.map((item, idx) => ({
                id: `sci-${idx}`,
                question: item.q,
                answer: item.a,
                options: item.o,
                type: 'word-match',
                difficulty: 1,
                explanation: item.e
            }))
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
            items: synonyms.map((item, idx) => ({
                id: `syn-${idx}`,
                question: item.w,
                answer: item.m,
                options: generateOptions(item.m, synonyms),
                type: 'word-match',
                difficulty: 1
            }))
        },
        {
            id: 'antonyms',
            title: 'Zıt Anlamlılar',
            description: 'Kelimelerin zıt anlamlılarını bul!',
            items: antonyms.map((item, idx) => ({
                id: `ant-${idx}`,
                question: item.w,
                answer: item.m,
                options: generateOptions(item.m, antonyms),
                type: 'word-match',
                difficulty: 1
            }))
        },
        {
            id: 'reading',
            title: 'Okuma - Anlama',
            description: 'Metni oku, soruları cevapla.',
            items: [
                {
                    id: 'read-1',
                    question: 'Nasrettin Hoca bir gün göle maya çalmış. Görenler şaşırmış. Hoca ne demiş?',
                    answer: 'Ya tutarsa!',
                    options: ['Göle yoğurt dökülmez', 'Ya tutarsa!', 'Balık tutuyorum', 'Yüzüyorum'],
                    type: 'reading',
                    difficulty: 2
                },
                {
                    id: 'read-2',
                    question: 'Hacivat ile Karagöz hangi şehrimizin simgesidir?',
                    answer: 'Bursa',
                    options: ['İstanbul', 'Bursa', 'Ankara', 'Konya'],
                    type: 'reading',
                    difficulty: 2
                }
            ]
        }
    ]
};

export const socialCurriculum: Subject = {
    id: 'social',
    title: 'Tarih ve Kültür',
    topics: [
        {
            id: 'general-history',
            title: 'Tarih ve Kültür',
            description: 'Tarihimiz, Kültürümüz ve Değerlerimiz.',
            items: historyQuestions.map((item, idx) => ({
                id: `hist-${idx}`,
                question: item.q,
                answer: item.a,
                options: item.o,
                type: 'reading',
                difficulty: 1,
                explanation: item.e
            }))
        }
    ]
};

export const religiousCurriculum: Subject = {
    id: 'religion',
    title: 'Kuran ve Değerler',
    topics: [
        {
            id: 'elif-ba',
            title: 'Elif-Ba Cüzü',
            description: 'Kuran harflerini tanıyalım',
            items: [
                { id: 'eb-1', question: 'ا', answer: 'Elif', options: ['Elif', 'Be', 'Te', 'Se'], type: 'letter' },
                { id: 'eb-2', question: 'ب', answer: 'Be', options: ['Be', 'Te', 'Se', 'Cim'], type: 'letter' },
                { id: 'eb-3', question: 'ت', answer: 'Te', options: ['Te', 'Be', 'Se', 'Ha'], type: 'letter' },
                { id: 'eb-4', question: 'ث', answer: 'Se', options: ['Se', 'Cim', 'Ha', 'Hı'], type: 'letter' },
                { id: 'eb-5', question: 'ج', answer: 'Cim', options: ['Cim', 'Ha', 'Hı', 'Dal'], type: 'letter' },
                { id: 'eb-6', question: 'ح', answer: 'Ha', options: ['Ha', 'Cim', 'Hı', 'Zal'], type: 'letter' },
                { id: 'eb-7', question: 'خ', answer: 'Hı', options: ['Hı', 'Ha', 'Cim', 'Ra'], type: 'letter' },
                { id: 'eb-8', question: 'د', answer: 'Dal', options: ['Dal', 'Zal', 'Ra', 'Ze'], type: 'letter' },
                { id: 'eb-9', question: 'ذ', answer: 'Zal', options: ['Zal', 'Dal', 'Ra', 'Ze'], type: 'letter' },
                { id: 'eb-10', question: 'ر', answer: 'Ra', options: ['Ra', 'Ze', 'Sin', 'Şın'], type: 'letter' },
                { id: 'eb-11', question: 'ز', answer: 'Ze', options: ['Ze', 'Ra', 'Sin', 'Şın'], type: 'letter' },
                { id: 'eb-12', question: 'س', answer: 'Sin', options: ['Sin', 'Şın', 'Sad', 'Dad'], type: 'letter' },
                { id: 'eb-13', question: 'ش', answer: 'Şın', options: ['Şın', 'Sin', 'Sad', 'Dad'], type: 'letter' },
                { id: 'eb-14', question: 'ص', answer: 'Sad', options: ['Sad', 'Dad', 'Tı', 'Zı'], type: 'letter' },
                { id: 'eb-15', question: 'ض', answer: 'Dad', options: ['Dad', 'Sad', 'Tı', 'Zı'], type: 'letter' },
                { id: 'eb-16', question: 'ط', answer: 'Tı', options: ['Tı', 'Zı', 'Ayn', 'Gayn'], type: 'letter' },
                { id: 'eb-17', question: 'ظ', answer: 'Zı', options: ['Zı', 'Tı', 'Ayn', 'Gayn'], type: 'letter' },
                { id: 'eb-18', question: 'ع', answer: 'Ayn', options: ['Ayn', 'Gayn', 'Fe', 'Kaf'], type: 'letter' },
                { id: 'eb-19', question: 'غ', answer: 'Gayn', options: ['Gayn', 'Ayn', 'Fe', 'Kaf'], type: 'letter' },
                { id: 'eb-20', question: 'ف', answer: 'Fe', options: ['Fe', 'Kaf', 'Kef', 'Lam'], type: 'letter' },
                { id: 'eb-21', question: 'ق', answer: 'Kaf', options: ['Kaf', 'Fe', 'Kef', 'Lam'], type: 'letter' },
                { id: 'eb-22', question: 'ك', answer: 'Kef', options: ['Kef', 'Lam', 'Mim', 'Nun'], type: 'letter' },
                { id: 'eb-23', question: 'ل', answer: 'Lam', options: ['Lam', 'Kef', 'Mim', 'Nun'], type: 'letter' },
                { id: 'eb-24', question: 'م', answer: 'Mim', options: ['Mim', 'Nun', 'Vav', 'He'], type: 'letter' },
                { id: 'eb-25', question: 'ن', answer: 'Nun', options: ['Nun', 'Mim', 'Vav', 'He'], type: 'letter' },
                { id: 'eb-26', question: 'و', answer: 'Vav', options: ['Vav', 'He', 'Lam', 'Ye'], type: 'letter' },
                { id: 'eb-27', question: 'ه', answer: 'He', options: ['He', 'Vav', 'Lam', 'Ye'], type: 'letter' },
                { id: 'eb-28', question: 'ي', answer: 'Ye', options: ['Ye', 'He', 'Vav', 'Lam'], type: 'letter' }
            ]
        },
        {
            id: 'surahs',
            title: 'Namaz Sureleri',
            description: 'Son 10 Sureyi Öğren',
            items: [
                {
                    id: 'fil',
                    question: 'Elem tera keyfe fe\'ale rabbüke bi-ashâbil fîl...',
                    answer: 'Fil Suresi',
                    options: ['Fil Suresi', 'Kureyş Suresi', 'Maun Suresi', 'Kevser Suresi'],
                    explanation: 'Fil Ordusu\'nun ebabil kuşları tarafından yenilmesini anlatır.',
                    type: 'surah'
                },
                {
                    id: 'quraysh',
                    question: 'Li-îlâfi Kureyş. Îlâfihim rihlete\'ş-şitâi ve\'s-sayf...',
                    answer: 'Kureyş Suresi',
                    options: ['Kureyş Suresi', 'Fil Suresi', 'Maun Suresi', 'Tebbet Suresi'],
                    explanation: 'Kureyş kabilesine verilen nimetleri hatırlatır.',
                    type: 'surah'
                },
                {
                    id: 'maun',
                    question: 'Eraeytellezî yükezzibü bi\'d-dîn. Fezâlikellezî yedü\'u\'l-yetîm...',
                    answer: 'Maun Suresi',
                    options: ['Maun Suresi', 'Kevser Suresi', 'Kafirun Suresi', 'Nasr Suresi'],
                    explanation: 'Yardıma engel olanlardan ve gösteriş yapanlardan bahseder.',
                    type: 'surah'
                },
                {
                    id: 'kawthar',
                    question: 'İnnâ a\'taynâ ke\'l-kevser. Fesalli li-rabbike venhar...',
                    answer: 'Kevser Suresi',
                    options: ['Kevser Suresi', 'Maun Suresi', 'İhlas Suresi', 'Felak Suresi'],
                    explanation: 'Kuran\'daki en kısa suredir. Peygamberimize Kevser havuzunun müjdesini verir.',
                    type: 'surah'
                },
                {
                    id: 'kafirun',
                    question: 'Kul yâ eyyühe\'l-kâfirûn. Lâ a\'büdü mâ ta\'büdûn...',
                    answer: 'Kafirun Suresi',
                    options: ['Kafirun Suresi', 'Nasr Suresi', 'Tebbet Suresi', 'İhlas Suresi'],
                    explanation: 'İnançta taviz verilmeyeceğini anlatır atar. "Sizin dininiz size, benim dinim banadır."',
                    type: 'surah'
                },
                {
                    id: 'nasr',
                    question: 'İzâ câe nasrullâhi ve\'l-feth. Ve raeyte\'n-nâse...',
                    answer: 'Nasr Suresi',
                    options: ['Nasr Suresi', 'Tebbet Suresi', 'Kafirun Suresi', 'İhlas Suresi'],
                    explanation: 'Allah\'ın yardımının ve fethin geldiğini müjdeler.',
                    type: 'surah'
                },
                {
                    id: 'tabbet',
                    question: 'Tebbet yedâ ebî lehebin ve tebb. Mâ ağnâ anhü mâlühü...',
                    answer: 'Tebbet Suresi',
                    options: ['Tebbet Suresi', 'Nasr Suresi', 'Fil Suresi', 'Kureyş Suresi'],
                    explanation: 'Ebu Leheb\'in İslam düşmanlığını ve cezasını anlatır.',
                    type: 'surah'
                },
                {
                    id: 'ikhlas',
                    question: 'Kul hüvallâhü ehad. Allâhü\'s-samed...',
                    answer: 'İhlas Suresi',
                    options: ['İhlas Suresi', 'Felak Suresi', 'Nas Suresi', 'Fatiha Suresi'],
                    explanation: 'Allah\'ın birliğini (Tevhid) en güzel anlatan suredir.',
                    type: 'surah'
                },
                {
                    id: 'falaq',
                    question: 'Kul e\'ûzü bi-rabbi\'l-felak. Min şerri mâ halak...',
                    answer: 'Felak Suresi',
                    options: ['Felak Suresi', 'Nas Suresi', 'İhlas Suresi', 'Tebbet Suresi'],
                    explanation: 'Kötülüklerden ve hasetçilerin şerrinden Allah\'a sığınmayı öğretir.',
                    type: 'surah'
                },
                {
                    id: 'nas',
                    question: 'Kul e\'ûzü bi-rabbi\'n-nâs. Meliki\'n-nâs. İlâhi\'n-nâs...',
                    answer: 'Nas Suresi',
                    options: ['Nas Suresi', 'Felak Suresi', 'İhlas Suresi', 'Kevser Suresi'],
                    explanation: 'İnsanların ve cinlerin vesvesesinden Allah\'a sığınmayı öğretir.',
                    type: 'surah'
                }
            ]
        },
        {
            id: 'prophets',
            title: 'Peygamberler Tarihi',
            description: 'Peygamberlerin hayatından dersler',
            items: [
                { id: 'prop-1', question: 'İlk insan ve ilk peygamber kimdir?', answer: 'Hz. Adem', options: ['Hz. Adem', 'Hz. Nuh', 'Hz. İbrahim', 'Hz. Muhammed'], type: 'quiz' },
                { id: 'prop-2', question: 'Hangi peygamber gemi yaparak insanları tufandan kurtarmıştır?', answer: 'Hz. Nuh', options: ['Hz. Nuh', 'Hz. Musa', 'Hz. İsa', 'Hz. Yunus'], type: 'quiz' },
                { id: 'prop-3', question: 'Ateşe atıldığında ateşin yakmadığı peygamber kimdir?', answer: 'Hz. İbrahim', options: ['Hz. İbrahim', 'Hz. İsmail', 'Hz. Yusuf', 'Hz. Yakub'], type: 'quiz' },
                { id: 'prop-4', question: 'Balığın karnında dua eden peygamber kimdir?', answer: 'Hz. Yunus', options: ['Hz. Yunus', 'Hz. Yusuf', 'Hz. Musa', 'Hz. Harun'], type: 'quiz' },
                { id: 'prop-5', question: 'Son peygamber kimdir?', answer: 'Hz. Muhammed (s.a.v)', options: ['Hz. Muhammed (s.a.v)', 'Hz. İsa', 'Hz. Musa', 'Hz. İbrahim'], type: 'quiz' },
                { id: 'prop-6', question: 'Hz. Muhammed\'in (s.a.v) doğduğu şehir hangisidir?', answer: 'Mekke', options: ['Mekke', 'Medine', 'Kudüs', 'Şam'], type: 'quiz' },
                { id: 'prop-7', question: 'Kuran-ı Kerim hangi peygambere indirilmiştir?', answer: 'Hz. Muhammed (s.a.v)', options: ['Hz. Muhammed (s.a.v)', 'Hz. İsa', 'Hz. Musa', 'Hz. Davud'], type: 'quiz' },
                { id: 'prop-8', question: 'Sabır taşı olarak bilinen ve hastalığına sabreden peygamber kimdir?', answer: 'Hz. Eyyüb', options: ['Hz. Eyyüb', 'Hz. Yusuf', 'Hz. Yakub', 'Hz. Süleyman'], type: 'quiz' }
            ]
        }
    ]
};
