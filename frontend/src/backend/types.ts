export interface Message {
    role: 'user' | 'assistant';
    phone_ids: number[];
    content: string;
}

export interface Phone {
    id: number;
    name: string;
    color: string;
    images: string[];
    storage: number | null;
    description: string | null;
    used: boolean;
    brand: string;
    screen_size: number | null;
    url: string;
    price: number;
    battery: string | null;
    camera: {
        front: string | null;
        rear: string | null;
        video: string | null;
        modes: string | null;
        general: string | null;
    };
}
