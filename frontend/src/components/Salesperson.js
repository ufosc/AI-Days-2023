import myImage from '../assets/Vivian.png';
import { Image } from 'react-bootstrap';

function Salesperson() {
    return (
        <div style={{margin: 0, padding: 0}}>
            <div>
                <p style={{
                    fontFamily: "verizon",
                    fontSize: 50,
                    textShadow: "2px 2px 2px gray"
                }}>Vivian Verizon</p>
            </div>
            <div>
                <Image src={myImage} width={350} height={350}></Image>
            </div>
        </div>
    );
}

export default Salesperson;
