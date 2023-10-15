import MessageBubble from './MessageBubble.tsx';
import {Message, Phone} from '../backend/types.ts';
import {useEffect, useRef} from 'react';

interface Props {
    messages: Message[];
    phones: Phone[];
    addFavorite: (phone_id: number) => void;
}

export default function ChatLog({messages, phones, addFavorite}: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const scrollToBottom = () => {
        const container = ref.current;
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div ref={ref}
            style={{overflow: "scroll", maxHeight: "55vh"}}
            className={'hide-scrollbar'}
        >
            {messages.map((m, index) => (
                <MessageBubble
                    key={index}
                    message={m}
                    phones={phones}
                    addFavorite={addFavorite}
                />
            ))}
        </div>
    );
}
