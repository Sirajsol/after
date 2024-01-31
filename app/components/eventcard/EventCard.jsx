"use client"
import Image from 'next/image';
import Style from './page.module.css'
const EventCard = ({ev}) => {


    return <div className={Style.mainContainer}>
        <div className={Style.title}>{ev.title}</div>
        <div className={Style.img}>
            <Image src={ev.img} alt={"image"} fill className="w-full h-full object-contain"/>
        </div>
        <div className={Style.desc}>{ev.description}</div>
    </div>
}
 
export default EventCard;