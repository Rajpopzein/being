import cardimg from '../resource/Web - Menu/Orders_bg.png'
import '../components/style.css'
import { Card } from '@mui/material'

const Order_bg = ({card_title, count}) => {
    return(
        <div className="oreder_card">
            <div className="oredr-card-image">
                <img src={cardimg} alt='order-img' style={{width:'100%', height:'15rem'}}/>
            </div>
            <div className='order_details'>
                <h3>{card_title}</h3>
                <h3>{count}</h3>
            </div>
        </div>
    )
}

export default Order_bg