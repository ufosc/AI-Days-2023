import PhoneCard from './PhoneCard.tsx';
import { Phone } from '../backend/types.ts';

interface Props {
    phones: Phone[];
    removeFavorite?: (phone_id: number) => void;
    addFavorite?: (phone_id: number) => void;
}

export default function PhoneGallery({
    phones,
    removeFavorite,
    addFavorite,
}: Props) {
    return (
        <div
            style={{
                display: 'flex',
                gap: 10,
                overflow: 'scroll',
                justifyContent: 'center',
            }}
        >
            {phones.map((phone) => (
                <PhoneCard
                    width={150}
                    phone={phone}
                    removeFavorite={removeFavorite}
                    addFavorite={addFavorite}
                />
            ))}
        </div>
    );
}
