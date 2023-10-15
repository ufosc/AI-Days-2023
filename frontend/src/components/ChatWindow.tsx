import Window from './Window';
import ChatLog from './ChatLog';
import InputBar from './InputBar';
import { Message } from '../backend/types.ts';

interface Props {
    messages: Message[];
    handleQuery: (msg: string) => Promise<void>;
}

export default function ChatWindow({ messages, handleQuery }: Props) {
    return (
        <div style={{ minWidth: '100%' }}>
            <Window>
                <div
                    style={{
                        margin: '10px',
                        maxHeight: '50vh',
                        height: '50vh',
                    }}
                >
                    <ChatLog messages={messages} />
                </div>
                <InputBar handleQuery={handleQuery} />
            </Window>
        </div>
    );
}
