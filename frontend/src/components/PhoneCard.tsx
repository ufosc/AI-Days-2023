import { Image } from 'react-bootstrap';
import { BsFillHeartbreakFill } from 'react-icons/bs';
import { Phone } from '../backend/types.ts';

interface Props {
    phone: Phone;
    width: number;
    height?: number;
    horizMargin?: number;
    borderRadius?: number;
    removeFavorite: (phone_id: string) => void;
}

export default function PhoneCard(props: Props) {
    const width = props.width,
        height = props.height ?? props.width,
        horizMargin = props.horizMargin ?? 0,
        borderRadius = props.borderRadius ?? 10;
    return (
        <div style={{ width: width, height: height, position: 'relative' }}>
            <Image
                src={props.phone.images[0]}
                width={width}
                height={height}
                style={{
                    marginLeft: horizMargin,
                    marginRight: horizMargin,
                    borderRadius: borderRadius,
                    objectFit: 'scale-down',
                }}
            />
            <div
                style={{ position: 'absolute', top: 0, right: 0 }}
                onClick={() => props.removeFavorite(props.phone.id)}
            >
                <BsFillHeartbreakFill />
            </div>
        </div>
    );
}
