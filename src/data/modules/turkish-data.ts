import type { ModuleData } from '../types';

export const turkishData: ModuleData = {
    id: 'turkish',
    title: 'Türkçe İstasyonu',
    levels: [
        {
            id: 'tr-lvl-1',
            title: 'Kelime Gezegeni',
            description: 'Eş anlamlı ve zıt anlamlı kelimeleri öğreniyoruz.',
            order: 1,
            unlockThreshold: 0,
            rewards: { xp: 100, gems: 20 },
            questions: [
                {
                    id: 'tr1-q1',
                    text: '"Kara" kelimesinin eş anlamlısı hangisidir?',
                    answer: 'Siyah',
                    options: ['Beyaz', 'Siyah', 'Kırmızı', 'Mavi'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Kara ve Siyah aynı anlama gelir.'
                },
                {
                    id: 'tr1-q2',
                    text: '"İhtiyar" kelimesinin eş anlamlısı nedir?',
                    answer: 'Yaşlı',
                    options: ['Genç', 'Çocuk', 'Yaşlı', 'Bebek'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'İhtiyar, yaşlı demektir.'
                },
                {
                    id: 'tr1-q3',
                    text: '"Uzun" kelimesinin zıt anlamlısı hangisidir?',
                    answer: 'Kısa',
                    options: ['Büyük', 'Geniş', 'Kısa', 'Küçük'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr1-q4',
                    text: '"Acı" kelimesinin zıt anlamlısı nedir?',
                    answer: 'Tatlı',
                    options: ['Ekşi', 'Tuzlu', 'Tatlı', 'Sıcak'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr1-q5',
                    text: '"Hızlı" kelimesinin zıt anlamlısı hangisidir?',
                    answer: 'Yavaş',
                    options: ['Çabuk', 'Süratli', 'Yavaş', 'Acele'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr1-q6',
                    text: '"Konuk" kelimesinin eş anlamlısı nedir?',
                    answer: 'Misafir',
                    options: ['Ev sahibi', 'Misafir', 'Yolcu', 'Arkadaş'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr1-q7',
                    text: '"Doğa" kelimesinin eş anlamlısı hangisidir?',
                    answer: 'Tabiat',
                    options: ['Dünya', 'Hava', 'Tabiat', 'Orman'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr1-q8',
                    text: '"Zayıf" kelimesinin zıt anlamlısı hangisidir?',
                    answer: 'Şişman',
                    options: ['Cılız', 'Güçsüz', 'Şişman', 'Uzun'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr1-q9',
                    text: '"Mektep" kelimesinin eş anlamlısı nedir?',
                    answer: 'Okul',
                    options: ['Sınıf', 'Okul', 'Bahçe', 'Kitap'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr1-q10',
                    text: 'Hangi kelime çifti zıt anlamlıdır?',
                    answer: 'Aşağı - Yukarı',
                    options: ['Kırmızı - Al', 'Okul - Mektep', 'Aşağı - Yukarı', 'Ses - Ün'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'tr-lvl-2',
            title: 'Cümle Mühendisliği',
            description: 'Kurallı ve anlamlı cümleler kuralım.',
            order: 2,
            unlockThreshold: 100,
            rewards: { xp: 150, gems: 30 },
            questions: [
                {
                    id: 'tr2-q1',
                    text: '"Süt - içtim - sabah - ılık" kelimeleriyle oluşan kurallı cümle hangisidir?',
                    answer: 'Sabah ılık süt içtim.',
                    options: ['Sabah ılık süt içtim.', 'İçtim sabah süt ılık.', 'Süt içtim ılık sabah.', 'Ilık sabah içtim süt.'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr2-q2',
                    text: 'Sonuna soru işareti (?) gelmesi gereken cümle hangisidir?',
                    answer: 'Ödevini yaptın mı',
                    options: ['Okula gittim', 'Ödevini yaptın mı', 'Parkta oynadık', 'Hava çok güzel'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr2-q3',
                    text: 'Hangi cümlenin sonuna ünlem işareti (!) konmalıdır?',
                    answer: 'Eyvah, yangın var',
                    options: ['Bugün hava güneşli', 'Adın ne', 'Eyvah, yangın var', 'Kitap okuyorum'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr2-q4',
                    text: '"Geldi - eve - babam - akşam" kelimeleriyle anlamlı bir cümle kurarsak son kelime hangisi olur?',
                    answer: 'Geldi',
                    options: ['Eve', 'Babam', 'Akşam', 'Geldi'],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: 'Kurallı cümlelerde iş bildiren kelime (geldi) sonda olur: Akşam babam eve geldi.'
                },
                {
                    id: 'tr2-q5',
                    text: 'Hangi cümlenin sonuna nokta (.) konmalıdır?',
                    answer: 'Ders çalışıyorum',
                    options: ['Nereye gidiyorsun', 'Ders çalışıyorum', 'İmdat, yardım edin', 'Sen de gelecek misin'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr2-q6',
                    text: '"Yaşasın, sınavdan yüz aldım" cümlesinin sonuna hangisi gelir?',
                    answer: '!',
                    options: ['.', '?', '!', ','],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr2-q7',
                    text: 'Hangi cümle kurallıdır?',
                    answer: 'Kitap okumayı çok seviyorum.',
                    options: ['Seviyorum kitap okumayı çok.', 'Okumayı seviyorum kitap çok.', 'Kitap okumayı çok seviyorum.', 'Çok seviyorum okumayı.'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr2-q8',
                    text: 'Cümleler her zaman hangi harfle başlar?',
                    answer: 'Büyük Harf',
                    options: ['Küçük Harf', 'Büyük Harf', 'Rakam', 'Soru İşareti'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'tr-lvl-3',
            title: 'Okuma Kulesi',
            description: 'Paragrafı okuyup soruları cevaplayalım.',
            order: 3,
            unlockThreshold: 250,
            rewards: { xp: 200, gems: 40 },
            questions: [
                {
                    id: 'tr3-q1',
                    text: 'PARAGRAF: "Ayşe sabah erkenden uyandı. Elini yüzünü yıkadı. Kahvaltısını yapıp okula gitti." soru: Ayşe uyanınca ne yaptı?',
                    answer: 'Elini yüzünü yıkadı',
                    options: ['Televizyon izledi', 'Elini yüzünü yıkadı', 'Oyun oynadı', 'Uyudu'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Metinde "Elini yüzünü yıkadı" yazıyor.'
                },
                {
                    id: 'tr3-q2',
                    text: 'PARAGRAF: "Kış mevsimi gelmişti. Her yer bembeyaz karla kaplandı. Ali ve Veli kartopu oynamak için dışarı çıktılar." Soru: Ali ve Veli neden dışarı çıktı?',
                    answer: 'Kartopu oynamak için',
                    options: ['Yüzmek için', 'Kartopu oynamak için', 'Piknik yapmak için', 'Bisiklet sürmek için'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr3-q3',
                    text: 'PARAGRAF: "Minik kedi Pamuk, bahçedeki ağacın dalına çıktı. Orada mahsur kalınca miyavlamaya başladı. Sonunda itfaiye gelip onu kurtardı." Soru: Pamuk neden miyavladı?',
                    answer: 'Mahsur kaldığı için',
                    options: ['Acıktığı için', 'Uykusu geldiği için', 'Mahsur kaldığı için', 'Oyun istediği için'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr3-q4',
                    text: 'Aşağıdaki metinlerden hangisi bir masalın başlangıcı olabilir?',
                    answer: 'Bir varmış, bir yokmuş...',
                    options: ['Bugün hava çok güzeldi.', 'Bir varmış, bir yokmuş...', 'Sevgili günlük...', 'Okuldan eve geldim.'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'tr-lvl-4',
            title: 'Dil Bilgisi Üssü',
            description: 'Noktalama işaretleri ve yazım kuralları.',
            order: 4,
            unlockThreshold: 450,
            rewards: { xp: 250, gems: 50 },
            questions: [
                {
                    id: 'tr4-q1',
                    text: 'Özel isimlerin ilk harfi nasıl yazılır?',
                    answer: 'Büyük yazılır',
                    options: ['Küçük yazılır', 'Büyük yazılır', 'Eğik yazılır', 'Altı çizili yazılır'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr4-q2',
                    text: 'Hangisi özel isimdir?',
                    answer: 'Mehmet',
                    options: ['Kedi', 'Masa', 'Mehmet', 'Okul'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr4-q3',
                    text: 'Satır sonuna sığmayan kelimeleri ayırmak için hangi işaret kullanılır?',
                    answer: 'Kısa çizgi (-)',
                    options: ['Nokta (.)', 'Virgül (,)', 'Kısa çizgi (-)', 'Soru işareti (?)'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr4-q4',
                    text: '"Elma - armut - çilek ve muz aldım." cümlesinde hangi işaret eksiktir?',
                    answer: 'Virgül (,)',
                    options: ['Nokta (.)', 'Soru işareti (?)', 'Virgül (,)', 'Ünlem (!)'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Sıralı kelimeler arasına virgül konur.'
                },
                {
                    id: 'tr4-q5',
                    text: 'Zeynep\'in kedisinin adı "Pamuk" olsun. "Pamuk" nasıl yazılmalıdır?',
                    answer: 'P harfi büyük',
                    options: ['Hepsi küçük', 'P harfi büyük', 'Hepsi büyük', 'Fark etmez'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Hayvanlara verilen isimler özel isimdir ve büyük harfle başlar.'
                },
                {
                    id: 'tr4-q6',
                    text: 'Özel isimlere gelen ekleri ayırmak için ne kullanılır?',
                    answer: 'Kesme işareti (\')',
                    options: ['Virgül (,)', 'Nokta (.)', 'Kesme işareti (\')', 'Eksi işareti (-)'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'tr-lvl-5',
            title: 'Hece Galaksisi',
            description: 'Kelimeleri hecelerine ayıralım.',
            order: 5,
            unlockThreshold: 650,
            rewards: { xp: 300, gems: 60 },
            questions: [
                {
                    id: 'tr5-q1',
                    text: '"Bilgisayar" kelimesi kaç hecedir?',
                    answer: 4,
                    options: [2, 3, 4, 5],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Bil - gi - sa - yar'
                },
                {
                    id: 'tr5-q2',
                    text: '"Okul" kelimesi kaç hecedir?',
                    answer: 2,
                    options: [1, 2, 3, 4],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr5-q3',
                    text: 'Hangi kelime doğru hecelenmiştir?',
                    answer: 'A-ra-ba',
                    options: ['Ar-a-ba', 'A-rab-a', 'A-ra-ba', 'Ara-ba'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr5-q4',
                    text: '"Tren" kelimesi kaç hecedir?',
                    answer: 1,
                    options: [1, 2, 3, 4],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: 'Tren tek hecedir çünkü içinde bir tane ünlü (sesli) harf vardır.'
                },
                {
                    id: 'tr5-q5',
                    text: 'Türkçede bir hecede en fazla kaç harf bulunabilir?',
                    answer: 4,
                    options: [2, 3, 4, 5],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: 'Örneğin "Kurt", "Türk", "Sert" kelimeleri 4 harfli tek hecedir.'
                }
            ]
        },
        {
            id: 'tr-lvl-6',
            title: 'Harf Meteorları',
            description: 'Sesli ve sessiz harfleri tanıyalım.',
            order: 6,
            unlockThreshold: 850,
            rewards: { xp: 350, gems: 70 },
            questions: [
                {
                    id: 'tr6-q1',
                    text: 'Alfabemizde kaç harf vardır?',
                    answer: 29,
                    options: [25, 27, 29, 31],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr6-q2',
                    text: 'Kaç tane ünlü (sesli) harfimiz vardır?',
                    answer: 8,
                    options: [5, 8, 10, 21],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr6-q3',
                    text: 'Hangisi bir ünlü (sesli) harftir?',
                    answer: 'A',
                    options: ['B', 'C', 'A', 'K'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr6-q4',
                    text: 'Hangisi bir ünsüz (sessiz) harftir?',
                    answer: 'T',
                    options: ['A', 'E', 'O', 'T'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'tr6-q5',
                    text: 'Hangi kelime sadece ünlü harflerden oluşur?',
                    answer: 'Hiçbiri',
                    options: ['Ali', 'Ece', 'Oya', 'Hiçbiri'],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: 'Kelimeler en az bir sessiz harf içermelidir (tek başına kullanılanlar hariç).'
                }
            ]
        },
        {
            id: 'tr-lvl-7',
            title: 'Sözlük Roketi',
            description: 'Kelimeleri alfabetik sıraya dizelim.',
            order: 7,
            unlockThreshold: 1050,
            rewards: { xp: 400, gems: 80 },
            questions: [
                {
                    id: 'tr7-q1',
                    text: '"Elma - Armut - Muz" kelimelerinden hangisi sözlükte en önce gelir?',
                    answer: 'Armut',
                    options: ['Elma', 'Armut', 'Muz', 'Hepsi aynı'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr7-q2',
                    text: '"Kitap - Kalem - Kedi" kelimelerini sıralarsak hangisi 1. olur?',
                    answer: 'Kalem',
                    options: ['Kitap', 'Kalem', 'Kedi', 'Kitapçı'],
                    type: 'multiple-choice',
                    difficulty: 'hard',
                    explanation: 'Hepsi K ile başlıyor. 2. harflere bakarız: a, e, i. "Kalem"deki "a" en öncedir.'
                }
            ]
        },
        {
            id: 'tr-lvl-8',
            title: 'Yazım Dedektifi',
            description: 'Doğru yazımları bulalım.',
            order: 8,
            unlockThreshold: 1250,
            rewards: { xp: 450, gems: 90 },
            questions: [
                {
                    id: 'tr8-q1',
                    text: 'Hangisinin yazımı doğrudur?',
                    answer: 'Spor',
                    options: ['Sipor', 'Spor', 'Sepor', 'Isıpor'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'tr8-q2',
                    text: 'Hangisinin yazımı yanlıştır?',
                    answer: 'Herkez',
                    options: ['Herkes', 'Yalnız', 'Yanlış', 'Herkez'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '"Herkes" sonunda "s" ile yazılır.'
                },
                {
                    id: 'tr8-q3',
                    text: 'Hangisi doğru yazılmıştır?',
                    answer: 'Öğretmen',
                    options: ['Öretmen', 'Öğretmen', 'Öyretmen', 'Öğritmen'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        }
    ]
};
