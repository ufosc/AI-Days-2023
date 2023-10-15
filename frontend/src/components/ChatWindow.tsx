import Window from './Window';
import ChatLog from './ChatLog';
import InputBar from './InputBar';
import { Message, Phone } from '../backend/types.ts';
import {useState} from "react";

interface Props {
    messages: Message[];
    phones: Phone[];
    handleQuery: (msg: string) => Promise<void>;
    addFavorite: (phone_id: number) => void;
}

export default function ChatWindow({
    messages,
    phones,
    handleQuery,
    addFavorite,
}: Props) {
    return (
        <div style={{ width: '100%', height: '100%'}}>
            <Window>
                <div
                    style={{
                        margin: '10px',
                        height: '100%',                        
                    }}
                >
                    <ChatLog
                        messages={messages}
                        phones={phones}
                        addFavorite={addFavorite}
                    />
                    {/*here we want to add the single view*/}

                </div>
                <InputBar handleQuery={handleQuery} />
            </Window>
        </div>
    );
}
