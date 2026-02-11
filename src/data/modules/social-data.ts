import type { ModuleData } from '../types';

export const socialData: ModuleData = {
    id: 'social',
    title: 'Toplum Merkezi',
    levels: [
        {
            id: 'soc-lvl-1',
            title: 'Okul Heyecanı',
            description: 'Okul kuralları ve arkadaşlık.',
            order: 1,
            unlockThreshold: 0,
            rewards: { xp: 100, gems: 20 },
            questions: [
                {
                    id: 'soc1-q1',
                    text: 'Ders zili çaldığında ne yapmalıyız?',
                    answer: 'Sınıfa girmeliyiz',
                    options: ['Eve gitmeliyiz', 'Sınıfa girmeliyiz', 'Kantinde beklemeliyiz', 'Bahçede oynamalıyız'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'soc1-q2',
                    text: 'Sınıfta söz almak için ne yaparız?',
                    answer: 'Parmak kaldırırız',
                    options: ['Bağırırız', 'Ayağa kalkarız', 'Parmak kaldırırız', 'Arkadaşımızı dürteriz'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'soc1-q3',
                    text: 'Okul eşyalarını nasıl kullanmalıyız?',
                    answer: 'Özenli ve temiz',
                    options: ['Kırarak', 'Kirleterek', 'Özenli ve temiz', 'Eve götürerek'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'soc-lvl-2',
            title: 'Güvenli Hayat',
            description: 'Trafik kuralları ve acil durumlar.',
            order: 2,
            unlockThreshold: 3,
            rewards: { xp: 150, gems: 30 },
            questions: [
                {
                    id: 'soc2-q1',
                    text: 'Trafik ışığında kırmızı yandığında ne yapmalıyız?',
                    answer: 'Durmalıyız',
                    options: ['Geçmeliyiz', 'Durmalıyız', 'Koşmalıyız', 'Oturmalıyız'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'soc2-q2',
                    text: 'Yaralanma veya kaza anında hangi numarayı aramalıyız?',
                    answer: '112',
                    options: ['155', '110', '112', '114'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Acil Çağrı Merkezi numarası 112\'dir.'
                },
                {
                    id: 'soc2-q3',
                    text: 'Tanımadığımız kişiler bize hediye verirse ne yapmalıyız?',
                    answer: 'Kabul etmemeliyiz',
                    options: ['Teşekkür edip almalıyız', 'Kabul etmemeliyiz', 'Saklamalıyız', 'Hemen yemeliyiz'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'soc-lvl-3',
            title: 'Milli Kültürümüz',
            description: 'Bayramlar, gelenekler ve değerlerimiz.',
            order: 3,
            unlockThreshold: 3,
            rewards: { xp: 200, gems: 40 },
            questions: [
                {
                    id: 'soc3-q1',
                    text: '29 Ekim\'de hangi bayramı kutlarız?',
                    answer: 'Cumhuriyet Bayramı',
                    options: ['Zafer Bayramı', 'Çocuk Bayramı', 'Cumhuriyet Bayramı', 'Gençlik Bayramı'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'soc3-q2',
                    text: 'Ramazan Bayramı nasıl bir bayramdır?',
                    answer: 'Dini Bayram',
                    options: ['Milli Bayram', 'Dini Bayram', 'Mevsimlik Bayram', 'Okul Bayramı'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'soc-lvl-4',
            title: 'Üretim ve Tüketim',
            description: 'Tasarruf ve meslekler.',
            order: 4,
            unlockThreshold: 3,
            rewards: { xp: 250, gems: 50 },
            questions: [
                {
                    id: 'soc4-q1',
                    text: 'Ekmek yapılan yer neresidir?',
                    answer: 'Fırın',
                    options: ['Manav', 'Fırın', 'Kasap', 'Eczane'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'soc4-q2',
                    text: 'Elektriği boşa harcamamak için ne yapmalıyız?',
                    answer: 'Gereksiz lambaları söndürmeliyiz',
                    options: ['Daha çok lamba yakmalıyız', 'Gereksiz lambaları söndürmeliyiz', 'Karanlıkta oturmalıyız', 'Televizyonu açık bırakmalıyız'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};
