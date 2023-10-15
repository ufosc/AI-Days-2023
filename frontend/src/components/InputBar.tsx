import {FaChevronRight} from "react-icons/fa";
import React from 'react';

export default function InputBar() {

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const msg = e.currentTarget.elements[0].value;
        console.log(msg);
    }

    return (
        <div
            style={{
                borderRadius: 10,
                border: "solid",
                padding: "10px 8px 10px 8px",
                margin: 10,
            }}
        >
            <form
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Type something here..."
                    style={{
                        width: "100%",
                        boxSizing: "border-box",
                        border: "none", // Remove default border styles
                        color: "black",
                        fontSize: 15,
                    }}
                />

                <FaChevronRight/>
            </form>
        </div>
    );
}
