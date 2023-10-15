import { Message, Phone } from '../backend/types.ts';
import PhoneGallery from './PhoneGallery.tsx';

interface Props {
    message: Message;
    phones: Phone[];
    addFavorite: (phone_id: number) => void;
}

export default function MessageBubble({ message, phones, addFavorite }: Props) {
    const { role, phone_ids, content } = message;

    const phonesInGallery = phone_ids.map((id) =>
        phones.find((p) => p.id == id)
    ) as Phone[];
    return (
        <div>
            <div style={{ display: 'block' }}>
                <PhoneGallery phones={phonesInGallery} addFavorite={addFavorite} />
            </div>
        <div
            style={{
                display: 'flex',
                margin: '0 5px 4px 5px',
                justifyContent: role == 'assistant' ? 'flex-start' : 'flex-end',
            }}
        >

            <div
                dangerouslySetInnerHTML={{ __html: content }}
                style={{
                    display: 'inline-block',
                    borderRadius: 10,
                    maxWidth: 400,
                    padding: '5px 7px 5px 7px',
                    fontFamily: 'Inter',
                    fontSize: 14,
                }}
                className={
                    role == 'assistant' ? 'assistant-message' : 'user-message'
                }
            />
        </div>
        </div>
    );
}
