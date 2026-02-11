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
            unlockThreshold: 3,
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
                }
            ]
        },
        {
            id: 'tr-lvl-3',
            title: 'Okuma Kulesi',
            description: 'Paragrafı okuyup soruları cevaplayalım.',
            order: 3,
            unlockThreshold: 3,
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
                }
            ]
        },
        {
            id: 'tr-lvl-4',
            title: 'Dil Bilgisi Üssü',
            description: 'Noktalama işaretleri ve yazım kuralları.',
            order: 4,
            unlockThreshold: 3,
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
                }
            ]
        }
    ]
};
