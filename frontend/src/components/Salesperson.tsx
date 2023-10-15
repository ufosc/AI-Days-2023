import myImage from '../assets/Vivian.png';
import { Image } from 'react-bootstrap';

function Salesperson() {
    return (
        <div style={{ width: 350 }}>
            <span
                style={{
                    display: 'block',
                    fontFamily: 'Medium',
                    fontSize: 50,
                    textAlign: 'center',
                }}
            >
                Vivian Verizon
            </span>

            <span
                style={{
                    display: 'block',
                    fontFamily: 'Inter',
                    fontSize: 16,
                    textAlign: 'justify',
                    padding: '0px 18px 0px 18px',
                }}
            >
                Welcome to Vivian Verizon, an AI who is here to help you pick
                the perfect phone! She is dedicated to simplifying the phone
                buying process and help recommend products that are right for
                you.
            </span>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    src={myImage}
                    width={'100%'}
                    height={'auto'}
                    style={{ borderRadius: 5, margin: '10px 0 0 0' }}
                ></Image>
            </div>
        </div>
    );
}

export default Salesperson;
