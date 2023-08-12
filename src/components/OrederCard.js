import image from '../resource/Web - Menu/posts_1.png'
import '../components/style.css'
import { Card } from '@mui/material'

const OrderCard = ({title,values}) => {
    // console.log('ooo', title, values)
    return(
       
            <div className='main-card'>
            <div className='card-image-order'>
                <img src={image}/>
            </div>
            <div className='card-detail-order'>
                <h3>{title}</h3>
                <h3>{values}</h3>
            </div>
        </div>
      
    )
}

export default OrderCard 