import { Message, Phone } from './types.ts';

export async function sendMessage(msg: string): Promise<Message | null> {
    return await fetch('http://localhost:5000/chat', {
        method: 'POST',
        body: JSON.stringify({ msg }),
        headers: {
            Accept: 'application/json',

        },
    }).then(async (response) => {
        if (response.ok) return JSON.parse(await response.text()) as Message;
        return null;
    });
}

export async function getPhones(): Promise<Phone[] | null> {
    return await fetch(`http://localhost:5000/phones`).then(
        async (response) => {
            if (response.ok)
                return JSON.parse(await response.text()) as Phone[];
            return null;
        }
    );
}
