import type { ModuleData } from '../types';

export const religionData: ModuleData = {
    id: 'religion',
    title: 'Göksel İlimler',
    levels: [
        {
            id: 'rel-lvl-1',
            title: 'Namaz Duaları',
            description: 'Sübhaneke, Tahiyyat ve diğer namaz duaları.',
            order: 1,
            unlockThreshold: 0,
            rewards: { xp: 100, gems: 20 },
            questions: [
                {
                    id: 'rel1-q1',
                    text: 'Sübhaneke duasının ilk cümlesi nedir?',
                    answer: 'Sübhâneke Allâhümme',
                    options: ['Elhamdülillâhi', 'Sübhâneke Allâhümme', 'Allahü ekber', 'Esselâmü aleyküm'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'rel1-q2',
                    text: '"Ve tebârekesmük, ve teâlâ ceddük" cümlesi hangi duada geçer?',
                    answer: 'Sübhaneke',
                    options: ['Fatiha', 'Sübhaneke', 'Tahiyyat', 'Kunut'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'rel1-q3',
                    text: 'Tahiyyat duasında kelime-i şehadet var mıdır?',
                    answer: 'Vardır',
                    options: ['Vardır', 'Yoktur'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: '"Eşhedü en lâ ilâhe illallah..." kısmı kelime-i şehadettir.'
                },
                {
                    id: 'rel1-q4',
                    text: 'Namazda rükuda ne deriz?',
                    answer: 'Sübhâne rabbiye\'l-azîm',
                    options: ['Sübhâne rabbiye\'l-a\'lâ', 'Sübhâne rabbiye\'l-azîm', 'Sümiallâhü limen hamideh', 'Allâhü ekber'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'rel1-q5',
                    text: 'Namazda secdede ne deriz?',
                    answer: 'Sübhâne rabbiye\'l-a\'lâ',
                    options: ['Sübhâne rabbiye\'l-a\'lâ', 'Sübhâne rabbiye\'l-azîm', 'Elhamdülillâh', 'Allahü ekber'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'rel-lvl-2',
            title: 'Kısa Sureler',
            description: 'Fatiha, İhlas, Kevser gibi sureleri tanıyalım.',
            order: 2,
            unlockThreshold: 100,
            rewards: { xp: 150, gems: 30 },
            questions: [
                {
                    id: 'rel2-q1',
                    text: 'Kur\'an-ı Kerim\'in ilk suresi hangisidir?',
                    answer: 'Fatiha',
                    options: ['Yasin', 'Fatiha', 'İhlas', 'Nas'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'rel2-q2',
                    text: '"Kul hüvellâhü ehad" hangi surenin ilk ayetidir?',
                    answer: 'İhlas',
                    options: ['Fatiha', 'Kevser', 'İhlas', 'Felak'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'rel2-q3',
                    text: 'En kısa sure hangisidir?',
                    answer: 'Kevser',
                    options: ['Bakara', 'Kevser', 'Fatiha', 'Asr'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'rel2-q4',
                    text: '"İnnâ a\'taynâ kel-kevser" hangi suredir?',
                    answer: 'Kevser',
                    options: ['İhlas', 'Kevser', 'Fatiha', 'Fil'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'rel2-q5',
                    text: 'Surelerin başındaki "Bismillahirrahmanirrahim"e ne denir?',
                    answer: 'Besmele',
                    options: ['Hamdele', 'Besmele', 'Salvele', 'Tekbir'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'rel-lvl-3',
            title: 'Peygamberimiz',
            description: 'Hz. Muhammed (s.a.v) hayatı.',
            order: 3,
            unlockThreshold: 250,
            rewards: { xp: 200, gems: 40 },
            questions: [
                {
                    id: 'rel3-q1',
                    text: 'Peygamber Efendimiz nerede doğmuştur?',
                    answer: 'Mekke',
                    options: ['Medine', 'Mekke', 'İstanbul', 'Kudüs'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'rel3-q2',
                    text: 'Peygamberimizin annesinin adı nedir?',
                    answer: 'Amine',
                    options: ['Hatice', 'Fatıma', 'Amine', 'Ayşe'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'rel3-q3',
                    text: 'Peygamberimizin babasının adı nedir?',
                    answer: 'Abdullah',
                    options: ['Ebu Talip', 'Abdullah', 'Abdulmuttalip', 'Hamza'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'rel3-q4',
                    text: 'Peygamber Efendimiz hangi tarihte doğmuştur?',
                    answer: '571',
                    options: ['610', '571', '632', '1453'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'rel3-q5',
                    text: 'Peygamberimizin dedesinin adı nedir?',
                    answer: 'Abdulmuttalip',
                    options: ['Ebu Talip', 'Abdulmuttalip', 'Hamza', 'Abbas'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'rel-lvl-4',
            title: 'İslam\'ın Şartları',
            description: 'İslam\'ın 5 temel şartını öğrenelim.',
            order: 4,
            unlockThreshold: 450,
            rewards: { xp: 250, gems: 50 },
            questions: [
                {
                    id: 'rel4-q1',
                    text: 'İslam\'ın şartı kaçtır?',
                    answer: 5,
                    options: [3, 4, 5, 6],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'rel4-q2',
                    text: 'Günde kaç vakit namaz kılarız?',
                    answer: 5,
                    options: [2, 3, 5, 7],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'rel4-q3',
                    text: 'Zengin Müslümanların yılda bir kez fakirlere verdiği paraya ne denir?',
                    answer: 'Zekat',
                    options: ['Sadaka', 'Zekat', 'Vergi', 'Kira'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'rel4-q4',
                    text: 'Ramazan ayında hangi ibadeti yaparız?',
                    answer: 'Oruç',
                    options: ['Hac', 'Oruç', 'Zekat', 'Kurban'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'rel-lvl-5',
            title: 'Güzel Ahlak',
            description: 'Doğruluk, dürüstlük ve temizlik.',
            order: 5,
            unlockThreshold: 650,
            rewards: { xp: 300, gems: 60 },
            questions: [
                {
                    id: 'rel5-q1',
                    text: 'Temizlik neyin yarısıdır?',
                    answer: 'İmanın',
                    options: ['İmanın', 'Çalışmanın', 'Uyumanın', 'Yemenin'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Hadis-i Şerif: "Temizlik imanın yarısıdır."'
                },
                {
                    id: 'rel5-q2',
                    text: 'Bir işe başlarken ne söyleriz?',
                    answer: 'Besmele',
                    options: ['Elhamdülillah', 'Selamünaleyküm', 'Besmele', 'Subhanallah'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'rel5-q3',
                    text: 'Anne ve babamıza karşı nasıl davranmalıyız?',
                    answer: 'Saygılı ve yardımcı',
                    options: ['Kaba', 'Saygılı ve yardımcı', 'Kızgın', 'Uzak'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'rel-lvl-6',
            title: 'Abdest ve Temizlik',
            description: 'Namazın anahtarı abdest.',
            order: 6,
            unlockThreshold: 850,
            rewards: { xp: 350, gems: 70 },
            questions: [
                {
                    id: 'rel6-q1',
                    text: 'Namaz kılmak için önce hangisini almalıyız?',
                    answer: 'Abdest',
                    options: ['Abdest', 'Yemek', 'Hediye', 'Para'],
                    type: 'multiple-choice',
                    difficulty: 'easy'
                },
                {
                    id: 'rel6-q2',
                    text: 'Abdestte yüzümüzü kaç kere yıkarız?',
                    answer: 3,
                    options: [1, 2, 3, 5],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'rel-lvl-7',
            title: 'İslam Kahramanları',
            description: 'Tarihimizdeki önemli isimler.',
            order: 7,
            unlockThreshold: 1050,
            rewards: { xp: 400, gems: 80 },
            questions: [
                {
                    id: 'rel7-q1',
                    text: 'İstanbul\'u fetheden padişah kimdir?',
                    answer: 'Fatih Sultan Mehmet',
                    options: ['Kanuni Sultan Süleyman', 'Fatih Sultan Mehmet', 'Yavuz Sultan Selim', 'Osman Bey'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                },
                {
                    id: 'rel7-q2',
                    text: 'Gemileri karadan yürüten kahraman kimdir?',
                    answer: 'Fatih Sultan Mehmet',
                    options: ['Barbaros Hayrettin', 'Fatih Sultan Mehmet', 'Seyit Onbaşı', 'Nene Hatun'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};
