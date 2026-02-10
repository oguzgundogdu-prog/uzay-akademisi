export type NodeType = 'start' | 'lesson' | 'challenge' | 'chest' | 'finish';

export interface MapNode {
    id: string;
    type: NodeType;
    x: number; // Percentage 0-100 for horizontal positioning
    y: number; // Vertical spacing index
    title?: string;
    topicId?: string; // Links to curriculum topic
    locked?: boolean;
    stars?: 0 | 1 | 2 | 3;
}

export interface MapUnit {
    id: string;
    title: string;
    description: string;
    color: string;
    nodes: MapNode[];
}

export const missionMap: MapUnit[] = [
    {
        id: 'unit-1',
        title: 'Başlangıç İstasyonu',
        description: 'Uzay yolculuğuna hazırlan!',
        color: 'from-blue-600 to-indigo-900',
        nodes: [
            { id: 'start', type: 'start', x: 50, y: 0, title: 'Kalkış' },
            { id: 'math-1', type: 'lesson', x: 50, y: 1, title: 'Sayılar', topicId: 'addition' },
            { id: 'rel-1', type: 'lesson', x: 20, y: 2, title: 'Elif-Ba', topicId: 'elif-ba' },
            { id: 'turk-1', type: 'lesson', x: 80, y: 2, title: 'Kelimeler', topicId: 'synonyms' },
            { id: 'math-2', type: 'lesson', x: 50, y: 3, title: 'Şekiller', topicId: 'geometry' },
            { id: 'chest-1', type: 'chest', x: 50, y: 4, title: 'Hazine' },
            { id: 'soc-1', type: 'lesson', x: 40, y: 5, title: 'Tarih', topicId: 'general-history' },
            { id: 'chal-1', type: 'challenge', x: 60, y: 6, title: 'Büyük Sınav', topicId: 'mixed' },
        ]
    },
    {
        id: 'unit-2',
        title: 'Matematik Nebulası',
        description: 'Sayıların derinliklerine in.',
        color: 'from-purple-600 to-pink-900',
        nodes: [
            { id: 'math-3', type: 'lesson', x: 50, y: 0, title: 'Çarpma', topicId: 'multiplication' },
            { id: 'rel-2', type: 'lesson', x: 80, y: 1, title: 'Peygamberler', topicId: 'prophets' },
            { id: 'math-4', type: 'lesson', x: 20, y: 1, title: 'Zaman', topicId: 'time' },
            { id: 'sci-1', type: 'lesson', x: 30, y: 2, title: 'Fen', topicId: 'general-science' },
            { id: 'turk-2', type: 'lesson', x: 70, y: 2, title: 'Zıtlar', topicId: 'antonyms' },
            { id: 'chest-2', type: 'chest', x: 50, y: 3, title: 'Hazine' },
            { id: 'chal-2', type: 'challenge', x: 50, y: 4, title: 'Nebula Sınavı', topicId: 'mixed' },
        ]
    }
];
