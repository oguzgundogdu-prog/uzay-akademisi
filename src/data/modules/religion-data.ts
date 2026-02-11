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
                }
            ]
        },
        {
            id: 'rel-lvl-2',
            title: 'Kısa Sureler',
            description: 'Fatiha, İhlas, Kevser gibi sureleri tanıyalım.',
            order: 2,
            unlockThreshold: 3,
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
                }
            ]
        },
        {
            id: 'rel-lvl-3',
            title: 'Peygamberimiz',
            description: 'Hz. Muhammed (s.a.v) hayatı.',
            order: 3,
            unlockThreshold: 3,
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
                }
            ]
        },
        {
            id: 'rel-lvl-4',
            title: 'Güzel Ahlak',
            description: 'Doğruluk, dürüstlük ve temizlik.',
            order: 4,
            unlockThreshold: 3,
            rewards: { xp: 250, gems: 50 },
            questions: [
                {
                    id: 'rel4-q1',
                    text: 'Temizlik neyin yarısıdır?',
                    answer: 'İmanın',
                    options: ['İmanın', 'Çalışmanın', 'Uyumanın', 'Yemenin'],
                    type: 'multiple-choice',
                    difficulty: 'medium',
                    explanation: 'Hadis-i Şerif: "Temizlik imanın yarısıdır."'
                },
                {
                    id: 'rel4-q2',
                    text: 'Müslüman, elinden ve dilinden diğer insanların ...... olduğu kimsedir.',
                    answer: 'Emin (Güvende)',
                    options: ['Korktuğu', 'Emin (Güvende)', 'Kaçtığı', 'Zarar gördüğü'],
                    type: 'multiple-choice',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};
