import { Message, Phone } from './types.ts';

const PORT = 5000;
export async function sendMessage(msg: string): Promise<Message | null> {
    return await fetch(`http://127.0.0.1:${PORT}/chat`, {
        method: 'POST',
        body: JSON.stringify({ msg }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(async (response) => {
        const text = await response.text();
        console.log(text);
        if (response.ok) return JSON.parse(text) as Message;
        return null;
    });
}

export async function getPhones(): Promise<Phone[] | null> {
    return await fetch(`http://127.0.0.1:${PORT}/phones`).then(
        async (response) => {
            const text = await response.text();
            if (response.ok) return JSON.parse(text) as Phone[];
            return null;
        }
    );
}
