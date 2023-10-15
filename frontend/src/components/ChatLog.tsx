import MessageBubble from './MessageBubble.tsx';
import { Message } from '../backend/types.ts';
import { useEffect, useRef } from 'react';

interface Props {
    messages: Message[];
}

export default function ChatLog({ messages }: Props) {
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
        <div
            ref={ref}
            style={{
                maxHeight: '50vh',
                minHeight: '50vh',
                overflow: 'scroll',
                scrollbarWidth: 'none',
            }}
            className={'hide-scrollbar'}
        >
            {messages.map((m) => (
                <MessageBubble message={m} />
            ))}
        </div>
    );
}
