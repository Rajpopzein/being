

import '../pages/orderstyle.css'
import { Card } from '@mui/material'

const OrderCard = ({title,values,image}) => {
    
    return(
            <div className='main-card'>
            <div className='image-card-order'>
                <img src={image} alt='card' style={{width:'135%',height:'15rem'}}/>
            </div>
            <div className='details-card-order'>
                <p>{title}</p>
                <p>{values}</p>
            </div>
        </div>
      
    )
}

export default OrderCard 