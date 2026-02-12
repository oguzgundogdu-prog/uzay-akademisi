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
                },
                {
                    id: 'sc1-q4',
                    text: 'Aşağıdakilerden hangisi bir gazdır?',
                    answer: 'Hava',
                    options: ['Su', 'Taş', 'Hava', 'Zeytinyağı'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'sc1-q5',
                    text: 'Suyu ısıtırsak hangi hale geçer?',
                    answer: 'Gaz (Buhar)',
                    options: ['Katı', 'Gaz (Buhar)', 'Buz', 'Toprak'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'sci-lvl-2',
            title: 'Canlılar Âlemi',
            description: 'Bitkiler, hayvanlar ve yaşam döngüleri.',
            order: 2,
            unlockThreshold: 100,
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
                },
                {
                    id: 'sc2-q4',
                    text: 'Çiçeklerin tohumları nerede bulunur?',
                    answer: 'Meyvenin içinde',
                    options: ['Yapraklarda', 'Meyvenin içinde', 'Köklerde', 'Dallarda'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'sc2-q5',
                    text: 'Uçabilen ama kuş olmayan canlı hangisidir?',
                    answer: 'Yarasa',
                    options: ['Kartal', 'Arı', 'Yarasa', 'Güvercin'],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: 'Yarasa uçan bir memelidir, kuş değildir.'
                }
            ]
        },
        {
            id: 'sci-lvl-3',
            title: 'Kuvvet ve Hareket',
            description: 'İtme, çekme ve hareket türleri.',
            order: 3,
            unlockThreshold: 200,
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
                },
                {
                    id: 'sc3-q3',
                    text: 'Hareket halindeki bir bisikleti durdurmak için ne yaparız?',
                    answer: 'Frene basarız',
                    options: ['Pedal çeviririz', 'Frene basarız', 'Zili çalarız', 'Hızlanırız'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'sc3-q4',
                    text: 'Hangisi sallanma hareketi yapar?',
                    answer: 'Salıncak',
                    options: ['Araba', 'Salıncak', 'Top', 'Bisiklet'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'sci-lvl-4',
            title: 'Dünya ve Uzay',
            description: 'Gezegenimiz ve gökyüzü.',
            order: 4,
            unlockThreshold: 350,
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
                },
                {
                    id: 'sc4-q3',
                    text: 'Gökyüzünde geceleri gördüğümüz ama aslında ışık yaymayan gök cismi hangisidir?',
                    answer: 'Ay',
                    options: ['Güneş', 'Yıldız', 'Ay', 'Kuyruklu Yıldız'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Ay, Güneş\'ten aldığı ışığı yansıtır.'
                },
                {
                    id: 'sc4-q4',
                    text: 'Mevsimler neyin sonucunda oluşur?',
                    answer: 'Dünya\'nın Güneş etrafında dolanması',
                    options: ['Dünya\'nın kendi etrafında dönmesi', 'Dünya\'nın Güneş etrafında dolanması', 'Ay\'ın dönmesi', 'Rüzgarların esmesi'],
                    type: 'multiple-choice',
                    difficulty: 'hard'
                }
            ]
        },
        {
            id: 'sci-lvl-5',
            title: 'Vücudumuzu Tanıyalım',
            description: 'Organlarımız ve duyu organları.',
            order: 5,
            unlockThreshold: 500,
            rewards: { xp: 300, gems: 60 },
            questions: [
                {
                    id: 'sc5-q1',
                    text: 'Görmemizi sağlayan duyu organımız hangisidir?',
                    answer: 'Göz',
                    options: ['Kulak', 'Burun', 'Göz', 'Dil'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'sc5-q2',
                    text: 'Vücudumuzdaki kanı pompalayan organ hangisidir?',
                    answer: 'Kalp',
                    options: ['Mide', 'Akciğer', 'Kalp', 'Beyin'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'sc5-q3',
                    text: 'Duyma organımız hangisidir?',
                    answer: 'Kulak',
                    options: ['Göz', 'Kulak', 'Burun', 'Deri'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'sc5-q4',
                    text: 'Nefes almamızı sağlayan organ hangisidir?',
                    answer: 'Akciğer',
                    options: ['Mide', 'Kalp', 'Akciğer', 'Böbrek'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'sci-lvl-6',
            title: 'Sağlıklı Yaşam',
            description: 'Beslenme ve kişisel bakım.',
            order: 6,
            unlockThreshold: 650,
            rewards: { xp: 350, gems: 70 },
            questions: [
                {
                    id: 'sc6-q1',
                    text: 'Dişlerimizi günde en az kaç kez fırçalamalıyız?',
                    answer: 2,
                    options: [1, 2, 5, 0],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'sc6-q2',
                    text: 'Hangisi sağlıklı bir besindir?',
                    answer: 'Elma',
                    options: ['Cips', 'Elma', 'Şeker', 'Hamburger'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'sc6-q3',
                    text: 'Yemeklerden önce ve sonra ne yapmalıyız?',
                    answer: 'Ellerimizi yıkamalıyız',
                    options: ['Oyun oynamalıyız', 'Ellerimizi yıkamalıyız', 'Uyumalıyız', 'Su içmeliyiz'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'sci-lvl-7',
            title: 'Geri Dönüşüm',
            description: 'Çevremizi koruyalım.',
            order: 7,
            unlockThreshold: 800,
            rewards: { xp: 400, gems: 80 },
            questions: [
                {
                    id: 'sc7-q1',
                    text: 'Kağıt, cam ve plastik atıkları nereye atmalıyız?',
                    answer: 'Geri dönüşüm kutusuna',
                    options: ['Yere', 'Geri dönüşüm kutusuna', 'Denize', 'Bahçeye'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'sc7-q2',
                    text: 'Bitmiş pilleri nereye atmalıyız?',
                    answer: 'Atık pil kutusuna',
                    options: ['Çöpe', 'Toprağa', 'Atık pil kutusuna', 'Suya'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};
