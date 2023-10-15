import { Image } from 'react-bootstrap';
import { BsFillHeartbreakFill, BsFillHeartFill } from 'react-icons/bs';
import { Phone } from '../backend/types.ts';

interface Props {
    phone: Phone;
    width: number;
    height?: number;
    horizMargin?: number;
    borderRadius?: number;
    removeFavorite?: (phone_id: number) => void;
    addFavorite?: (phone_id: number) => void;
}

export default function PhoneCard(props: Props) {
    const width = props.width,
        height = props.height ?? props.width,
        horizMargin = props.horizMargin ?? 0,
        borderRadius = props.borderRadius ?? 10;

    let func: any = null;
    let icon = <></>;
    if (props.removeFavorite) {
        func = props.removeFavorite;
        icon = <BsFillHeartbreakFill />;
    } else if (props.addFavorite) {
        func = props.addFavorite;
        icon = <BsFillHeartFill />;
    }
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
                onClick={() => (func ? func(props.phone.id) : null)}
            >
                {icon}
            </div>
        </div>
    );
}
