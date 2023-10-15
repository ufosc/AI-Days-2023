import { Message } from '../backend/types.ts';

interface Props {
    message: Message;
}

export default function MessageBubble({ message }: Props) {
    const { role, phone_ids, content } = message;

    return (
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
    );
}
