import React from 'react';

interface Props {
    children?: React.ReactNode;
}

export default function Window({ children }: Props) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                border: '1px solid #E0E0E0',
                backgroundColor: '#F6F6F6',
                borderRadius: 5,
            }}
        >
            {children}
        </div>
    );
}
