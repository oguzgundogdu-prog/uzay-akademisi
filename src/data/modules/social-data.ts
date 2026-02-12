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
                },
                {
                    id: 'soc1-q4',
                    text: 'Kantinden bir şey alırken neye uymalıyız?',
                    answer: 'Sıraya girmeliyiz',
                    options: ['En öne geçmeliyiz', 'Sıraya girmeliyiz', 'Bağırmalıyız', 'Koşmalıyız'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'soc1-q5',
                    text: 'Okulda bir arkadaşımız yere düştüğünde ne yapmalıyız?',
                    answer: 'Yardım etmeliyiz',
                    options: ['Gülmeliyiz', 'Kaçmalıyız', 'Yardım etmeliyiz', 'Bakmamalıyız'],
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
            unlockThreshold: 100,
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
                },
                {
                    id: 'soc2-q4',
                    text: 'Okula servis ile giderken ne takmalıyız?',
                    answer: 'Emniyet kemeri',
                    options: ['Kask', 'Emniyet kemeri', 'Gözlük', 'Şapka'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'soc2-q5',
                    text: 'Karşıdan karşıya geçerken önce nereye bakmalıyız?',
                    answer: 'Sola',
                    options: ['Sağa', 'Sola', 'Arkaya', 'Yukarıya'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Trafik Kurallarına Göre: Önce sola, sonra sağa, tekrar sola bakıp geçmeliyiz.'
                }
            ]
        },
        {
            id: 'soc-lvl-3',
            title: 'Milli Kültürümüz',
            description: 'Bayramlar, gelenekler ve değerlerimiz.',
            order: 3,
            unlockThreshold: 200,
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
                },
                {
                    id: 'soc3-q3',
                    text: 'İstiklal Marşımızın yazarı kimdir?',
                    answer: 'Mehmet Akif Ersoy',
                    options: ['Mustafa Kemal Atatürk', 'Mehmet Akif Ersoy', 'Ziya Gökalp', 'Enver Paşa'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'soc3-q4',
                    text: 'Bayrağımızın renkleri nelerdir?',
                    answer: 'Al ve Ak',
                    options: ['Mavi ve Beyaz', 'Al ve Ak', 'Yeşil ve Sarı', 'Siyah ve Beyaz'],
                    type: 'multiple-choice',
                    difficulty: 'easy',
                    explanation: 'Al (Kırmızı) ve Ak (Beyaz).'
                },
                {
                    id: 'soc3-q5',
                    text: 'Atatürk\'ün mezarı (Anıtkabir) nerededir?',
                    answer: 'Ankara',
                    options: ['İstanbul', 'Selanik', 'Ankara', 'İzmir'],
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
            unlockThreshold: 350,
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
                },
                {
                    id: 'soc4-q3',
                    text: 'İhtiyacımız olmadığı halde aldığımız şeylere ne denir?',
                    answer: 'İstek',
                    options: ['İhtiyaç', 'İstek', 'Görev', 'Ödev'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'soc4-q4',
                    text: 'Diş fırçalarken neyi açık bırakmamalıyız?',
                    answer: 'Musluğu',
                    options: ['Işığı', 'Kapıyı', 'Musluğu', 'Televizyonu'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'soc-lvl-5',
            title: 'Sağlıklı Hayat',
            description: 'Kişisel bakım ve sağlık.',
            order: 5,
            unlockThreshold: 500,
            rewards: { xp: 300, gems: 60 },
            questions: [
                {
                    id: 'soc5-q1',
                    text: 'Hastalanınca nereye gitmeliyiz?',
                    answer: 'Hastaneye',
                    options: ['Okula', 'Markete', 'Hastaneye', 'Parka'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'soc5-q2',
                    text: 'Vücudumuzun sağlıklı olması için ne yapmalıyız?',
                    answer: 'Spor yapmalıyız',
                    options: ['Sürekli uyumalıyız', 'Çok şeker yemeliyiz', 'Spor yapmalıyız', 'Televizyon izlemeliyiz'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'soc-lvl-6',
            title: 'Doğada Hayat',
            description: 'Çevremiz ve hayvanlar.',
            order: 6,
            unlockThreshold: 650,
            rewards: { xp: 350, gems: 70 },
            questions: [
                {
                    id: 'soc6-q1',
                    text: 'Geceleri gökyüzünde hangisini görürüz?',
                    answer: 'Ay ve Yıldızlar',
                    options: ['Güneş', 'Bulutlar', 'Ay ve Yıldızlar', 'Gökkuşağı'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'soc6-q2',
                    text: 'Çevremizi temiz tutmak için çöpleri nereye atmalıyız?',
                    answer: 'Çöp kutusuna',
                    options: ['Yere', 'Denize', 'Çöp kutusuna', 'Bahçeye'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        }
    ]
};
