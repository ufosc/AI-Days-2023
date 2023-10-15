import MessageBubble from './MessageBubble.tsx';
import { Message, Phone } from '../backend/types.ts';
import {useEffect, useRef, useState} from 'react';

interface Props {
    messages: Message[];
    phones: Phone[];
    addFavorite: (phone_id: number) => void;
}

export default function ChatLog({ messages, phones, addFavorite }: Props) {
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
        <div>
            <div
                ref={ref}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: '100%',
                    overflow: 'scroll',
                    scrollbarWidth: 'none',
                }}
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
            <div>

            </div>
        </div>
    );
}
