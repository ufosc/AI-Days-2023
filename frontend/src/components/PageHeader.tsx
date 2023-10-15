import myImage from '../assets/header.png';
import { Image } from 'react-bootstrap';

function PageHeader() {
    return (
        <div
            style={{
                background: 'black',
                margin: '0 0 5vh 0'
            }}
        >
            <Image
                src={myImage}
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            />
        </div>
    );
}

export default PageHeader;
