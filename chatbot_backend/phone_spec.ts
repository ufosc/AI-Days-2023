interface PhoneSpec {
    id: string,
    name: string,
    color: string,
    battery: string | null,
    camera: {
        general: string | null,
        video: string | null,
        modes: string | null,
        front: string | null,
        rear: string | null
    },
    storage: number | null,
    price: number | null,
    brand: string,
    used: boolean,
    screen_size: number | null,
    description: string | null,
}