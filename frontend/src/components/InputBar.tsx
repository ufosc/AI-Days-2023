import { FaChevronRight } from 'react-icons/fa';
import React, { useRef } from 'react';

interface Props {
    handleQuery: (msg: string) => Promise<void>;
}

export default function InputBar({ handleQuery }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const msg = e.currentTarget.elements[0].value;
        handleQuery(msg);
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div
            style={{
                borderRadius: 10,
                border: 'solid',
                padding: '10px 8px 10px 8px',
                margin: 10,
            }}
        >
            <form
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onSubmit={handleSubmit}
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type something here..."
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        border: 'none', // Remove default border styles
                        color: 'black',
                        fontSize: 15,
                    }}
                />
                <FaChevronRight />
            </form>
        </div>
    );
}
