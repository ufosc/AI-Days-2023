import React from "react";
import myImage from '../assets/header.png';
import { Image } from 'react-bootstrap';

function PageHeader() {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    background: "black",

            }}>
                <Image src={myImage} style={{
                    width: "100%",
                    height: "auto"
                }} />
            </div>
            <div style={{
                background: "#5b5b5b",
                color: "white",
                paddingLeft: 60,
                paddingTop:20,
                paddingBottom: 20,
                fontSize: 30
            }}>
                <p>Meet Vivian Verizon! I’m here to simplify your phone buying process and help recommend products that are right for you. </p>
            </div>
        </div>
    );
};

export default PageHeader;