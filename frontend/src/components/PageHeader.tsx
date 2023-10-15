import myImage from '../assets/header.png';
import { Image } from 'react-bootstrap';

function PageHeader() {
    return (
        <div
            style={{
                display: 'flex',
                background: 'black',
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
