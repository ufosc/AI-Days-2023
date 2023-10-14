import myImage from '../assets/Vivian.png';
import { Image } from 'react-bootstrap';

function Salesperson() {
    return (
        <div style={{ margin: 0, padding: 0, marginBottom: 20 }}>
            <div>
                <p style={{
                    fontFamily: "verizon",
                    fontSize: 50,
                    textShadow: "2px 2px 2px gray",
                    textAlign: 'center',
                    color: "#1E1E1E",
                }}>Vivian Verizon</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={myImage} width={350} height={350} style={{ borderRadius: 10 }}></Image>
            </div>
        </div>
    );
}

export default Salesperson;
