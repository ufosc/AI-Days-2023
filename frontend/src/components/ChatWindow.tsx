import Window from './Window';
import ChatLog from './ChatLog';
import InputBar from './InputBar';
import { Message, Phone } from '../backend/types.ts'

interface Props {
    messages: Message[];
    phones: Phone[];
    handleQuery: (msg: string) => Promise<void>;
    addFavorite: (phone_id: number) => void;
}

export default function ChatWindow({ messages, phones, handleQuery, addFavorite }: Props) {
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
                    <ChatLog messages={messages} phones={phones} addFavorite={addFavorite} />
                </div>
                <InputBar handleQuery={handleQuery} />
            </Window>
        </div>
    );
}
