import {Image, Modal} from 'react-bootstrap';
import {BsFillHeartbreakFill, BsFillHeartFill, BsChevronLeft} from 'react-icons/bs';
import {Phone} from '../backend/types.ts';
import {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';


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
    const [show, setShow] = useState(false);


    const width = props.width,
        height = props.height ?? props.width,
        horizMargin = props.horizMargin ?? 0,
        borderRadius = props.borderRadius ?? 10;

    let func: any = null;
    let icon = <></>;
    if (props.removeFavorite) {
        func = props.removeFavorite;
        icon = <BsFillHeartbreakFill/>;
    } else if (props.addFavorite) {
        func = props.addFavorite;
        icon = <BsFillHeartFill/>;
    }
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
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
                //onClick={() => window.open(props.phone.url, '_blank')
                onClick={() => setShow(true)}
            />

            <Modal show={show} centered={true} size={'xl'} style={{display: "inline-block"}}>
                <div style={{
                    display: 'inline-block',
                    padding: 40,
                    paddingLeft: 100,
                    backgroundColor: 'white',
                    width: 1000,
                    minHeight: 400,
                    borderRadius: 10
                }}
                >
                    <div style={{display: 'flex'}}>
                        <span style={{fontSize: 45, fontFamily: 'Medium'}}>{props.phone.name} </span>
                    </div>
                    <div style={{display: 'flex', height: '90%'}}>
                        <div style={{backgroundColor: 'white', marginRight: 20, borderRadius: 10, width:"50%", height: 480}}>
                            <Carousel>
                                {props.phone.images.map((i: string , index: number) =>(
                                    <Carousel.Item>
                                        <Image key={index} src={i} onClick={() => window.open(props.phone.url, '_blank')}/>
                                    </Carousel.Item>
                                ))}
                            </Carousel>

                        </div>
                        <div style={{
                            backgroundColor: 'white',
                            minWidth: 400,
                            minHeight:450,
                            borderRadius: 10,
                            padding: 20,
                            paddingTop: height / 2,
                            paddingBottom: height / 2,
                            width:"50%",
                        }}
                        >
                            <span style={{fontSize: 18, fontFamily: 'inter',}}>{props.phone.description}</span>
                        </div>
                    </div>
                    <div >
                        <span style={{
                            backgroundColor: 'black',
                            color: 'white',
                            borderRadius: 10,
                            padding: 10,
                            fontFamily: 'Medium'
                        }} onClick={() => setShow(false)}><b><BsChevronLeft/>back</b></span>
                    </div>
                </div>
            </Modal>


            <div
                style={{position: 'absolute', top: 0, right: 0}}
                onClick={() => (func ? func(props.phone.id) : null)}
            >
                {icon}
            </div>
        </div>
    );
}
