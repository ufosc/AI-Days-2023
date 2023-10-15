import PhoneCard from './PhoneCard.tsx';
import { Phone } from '../backend/types.ts';

interface Props {
    favorites: Phone[];
    removeFavorite: (phone_id: number) => void;
}

export default function Favorites({ favorites, removeFavorite }: Props) {
    return (
        <div
            style={{
                backgroundColor: 'rgb(246, 246, 246)',
                margin: '20px 0 30px 0',
                border: '1px solid rgb(224, 224, 224)',
                borderRadius: 5,
                padding: 10,
                minHeight: 235,
            }}
        >
            <span style={{ display: 'block', paddingBottom: 5 }}>
                Having FOMO? Here's the products you've already loved just in
                case!
            </span>

            <div style={{ display: 'flex', gap: 10, overflow: 'scroll' }}>
                {favorites.map((phone) => (
                    <PhoneCard
                        width={150}
                        phone={phone}
                        removeFavorite={removeFavorite}
                    />
                ))}
            </div>
        </div>
    );
}
// "5px 15px 5px 15px"
