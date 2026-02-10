export type QuestionType = 'math' | 'word-match' | 'fill-blank' | 'reading' | 'visual';

export interface CurriculumItem {
    id: string;
    question: string;
    answer: string | number;
    options: (string | number)[];
    type: QuestionType;
    difficulty: 1 | 2 | 3;
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
            id: 'space-basics',
            title: 'Güneş Sistemi',
            description: 'Gezegenleri ve uzayı tanıyalım!',
            items: [
                { id: 'sci1', question: 'Dünyamızın ısı ve ışık kaynağı nedir?', answer: 'Güneş', options: ['Ay', 'Güneş', 'Mars', 'Yıldızlar'], type: 'word-match', difficulty: 1, explanation: 'Güneş dev bir yıldızdır ve dünyamızı ısıtır.' },
                { id: 'sci2', question: 'Dünyamızın uydusu hangisidir?', answer: 'Ay', options: ['Güneş', 'Ay', 'Mars', 'Venüs'], type: 'word-match', difficulty: 1, explanation: 'Ay, dünyamızın etrafında dönen tek uydudur.' },
                { id: 'sci3', question: 'Üzerinde yaşadığımız gezegen hangisidir?', answer: 'Dünya', options: ['Mars', 'Júpiter', 'Dünya', 'Satürn'], type: 'word-match', difficulty: 1, explanation: 'Biz Dünya gezegeninde yaşıyoruz.' },
                { id: 'sci4', question: 'Kızıl Gezegen olarak bilinen gezegen hangisidir?', answer: 'Mars', options: ['Dünya', 'Mars', 'Venüs', 'Merkür'], type: 'word-match', difficulty: 2, explanation: 'Mars yüzeyindeki paslı toprak rengi yüzünden kırmızı görünür.' },
                { id: 'sci5', question: 'Halkası olan gezegen hangisidir?', answer: 'Satürn', options: ['Mars', 'Dünya', 'Satürn', 'Merkür'], type: 'word-match', difficulty: 2, explanation: 'Satürn\'ün buz ve taşlardan oluşan kocaman halkaları vardır.' },
                { id: 'sci6', question: 'En büyük gezegen hangisidir?', answer: 'Júpiter', options: ['Dünya', 'Mars', 'Júpiter', 'Satürn'], type: 'word-match', difficulty: 2, explanation: 'Jüpiter, güneş sistemindeki diğer tüm gezegenlerden büyüktür.' }
            ]
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
                { id: 't1', question: 'Siyah', answer: 'Kara', options: ['Kara', 'Beyaz', 'Kırmızı', 'Mavi'], type: 'word-match', difficulty: 1, explanation: 'Siyah ve Kara aynı renktir.' },
                { id: 't2', question: 'Cevap', answer: 'Yanıt', options: ['Yanıt', 'Soru', 'Ses', 'Söz'], type: 'word-match', difficulty: 1, explanation: 'Bir soruya verilen karşılığa cevap veya yanıt denir.' },
                { id: 't3', question: 'Konuk', answer: 'Misafir', options: ['Misafir', 'Ev', 'Komşu', 'Arkadaş'], type: 'word-match', difficulty: 1, explanation: 'Evimize gelen kişiye konuk veya misafir deriz.' },
                { id: 't4', question: 'Hediye', answer: 'Armağan', options: ['Armağan', 'Ödül', 'Ceza', 'Para'], type: 'word-match', difficulty: 1, explanation: 'Hediyeleşmek ve armağan vermek aynı şeydir.' },
                { id: 't5', question: 'Yıl', answer: 'Sene', options: ['Sene', 'Ay', 'Gün', 'Hafta'], type: 'word-match', difficulty: 1, explanation: 'Kaç yaşındasın demekle kaç seneliksin demek benzerdir.' }
            ]
        },
        {
            id: 'antonyms',
            title: 'Zıt Anlamlılar',
            description: 'Tam tersini bul.',
            items: [
                { id: 't6', question: 'Büyük', answer: 'Küçük', options: ['Küçük', 'İri', 'Kocaman', 'Geniş'], type: 'word-match', difficulty: 1, explanation: 'Büyüğün tam tersi küçüktür.' },
                { id: 't7', question: 'Ağır', answer: 'Hafif', options: ['Hafif', 'Zor', 'Güçlü', 'Sert'], type: 'word-match', difficulty: 1, explanation: 'Kuş tüyü hafiftir, taş ağırdır.' },
                { id: 't8', question: 'Gel', answer: 'Git', options: ['Git', 'Koş', 'Dur', 'Bak'], type: 'word-match', difficulty: 1, explanation: 'Gelmek yaklaşmak, gitmek uzaklaşmaktır.' },
                { id: 't9', question: 'Erken', answer: 'Geç', options: ['Geç', 'Hızlı', 'Yavaş', 'Zaman'], type: 'word-match', difficulty: 1, explanation: 'Okula erken gitmelisin, geç kalma.' },
                { id: 't10', question: 'Taze', answer: 'Bayat', options: ['Bayat', 'Yeni', 'Sıcak', 'Soğuk'], type: 'word-match', difficulty: 1, explanation: 'Ekmek fırından yeni çıkınca tazedir, bekleyince bayatlar.' }
            ]
        }
    ]
};

export const socialCurriculum: Subject = {
    id: 'social',
    title: 'Tarih ve Kültür',
    topics: [
        {
            id: 'scientists',
            title: 'Müslüman Bilim Adamları',
            description: 'Tarihimize yön veren büyük isimleri tanı!',
            items: [
                {
                    id: 'sci-ali',
                    question: 'Ay\'ın haritasını çıkaran ve Fatih Sultan Mehmet zamanında İstanbul\'a gelen büyük gökbilimci kimdir?',
                    answer: 'Ali Kuşçu',
                    options: ['Ali Kuşçu', 'Piri Reis', 'Mimar Sinan', 'İbn-i Sina'],
                    type: 'reading',
                    difficulty: 2,
                    explanation: 'Ali Kuşçu, Ayasofya medresesinde müderrislik yapmış büyük bir matematikçi ve astronomdur.'
                },
                {
                    id: 'sci-piri',
                    question: 'Dünya haritasını çizen ünlü Türk denizcisi kimdir?',
                    answer: 'Piri Reis',
                    options: ['Barbaros Hayrettin', 'Piri Reis', 'Seydi Ali', 'Oruç Reis'],
                    type: 'reading',
                    difficulty: 2,
                    explanation: 'Piri Reis, Kitab-ı Bahriye adlı eseri ve çizdiği dünya haritası ile tanınır.'
                },
                {
                    id: 'sci-sinan',
                    question: 'Süleymaniye ve Selimiye camilerini yapan, "Koca Sinan" lakaplı mimarımız kimdir?',
                    answer: 'Mimar Sinan',
                    options: ['Mimar Sinan', 'Mimar Kemaleddin', 'Sedefkar Mehmet', 'Balyan Kardeşler'],
                    type: 'reading',
                    difficulty: 1,
                    explanation: 'Mimar Sinan, Osmanlı İmparatorluğu\'nun baş mimarıdır ve yüzlerce eseri vardır.'
                },
                {
                    id: 'sci-ibni',
                    question: '"Tıbbın Babası" olarak bilinen ve yazdığı tıp kitapları Avrupa\'da yüzyıllarca okutulan bilim adamı kimdir?',
                    answer: 'İbn-i Sina',
                    options: ['Farabi', 'İbn-i Sina', 'Biruni', 'Harezmi'],
                    type: 'reading',
                    difficulty: 2,
                    explanation: 'İbn-i Sina (Avicenna), El-Kanun fi\'t-Tıb kitabının yazarıdır.'
                }
            ]
        },
        {
            id: 'culture',
            title: 'Kültürümüz',
            description: 'Geleneklerimiz ve değerlerimiz.',
            items: [
                {
                    id: 'cult-golge',
                    question: 'Perde arkasında oynatılan, biri bilgili diğeri halktan iki karakterin atışmasına dayanan gölge oyunumuz nedir?',
                    answer: 'Hacivat ve Karagöz',
                    options: ['Keloğlan', 'Nasreddin Hoca', 'Hacivat ve Karagöz', 'Meddah'],
                    type: 'reading',
                    difficulty: 1,
                    explanation: 'Hacivat ve Karagöz, geleneksel Türk gölge oyununun en önemli karakterleridir.'
                },
                {
                    id: 'cult-sadaka',
                    question: 'Osmanlı\'da zenginlerin para bıraktığı, ihtiyacı olanın ise sadece ihtiyacı kadarını aldığı taşın adı nedir?',
                    answer: 'Sadaka Taşı',
                    options: ['Mola Taşı', 'Sadaka Taşı', 'Nişan Taşı', 'Musalla Taşı'],
                    type: 'reading',
                    difficulty: 2,
                    explanation: 'Sadaka taşları, Osmanlı\'da yardımlaşmanın ne kadar zarif yapıldığının göstergesidir.'
                }
            ]
        }
    ]
};
