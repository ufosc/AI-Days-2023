import React from 'react';

interface Props {
    children?: React.ReactNode;
}

export default function Window({ children }: Props) {
    return (
        <div
            style={{
                width: '100%',
                border: 'solid',
                borderRadius: 10,
            }}
        >
            {children}
        </div>
    );
}
