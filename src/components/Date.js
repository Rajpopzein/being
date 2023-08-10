import { ClassNames } from '@emotion/react';
import './style.css'
import calender from '../resource/Web - Menu/calendar.png'
export const Datecomp = () => {
    let date = new Date().toUTCString().slice(5, 11);
    return(
        <div className='datemain'>
            <h2 style={{fontSize:'1.2rem', fontWeight:'500'}}>{date}</h2>
            <img src={calender} alt='calender' style={{height:'1.2rem', marginTop:'0.2rem', marginLeft:'1rem'}}/>
        </div>
    )
}