import { Datecomp } from "../components/Date"
import '../pages/orderstyle.css'
import OrderCard from "../components/OrederCard"
import card1 from '../resource/Web - Menu/posts_1.png'
import card2 from '../resource/Web - Menu/posts_2.png'
import card3 from '../resource/Web - Menu/posts_3.png'
import card4 from '../resource/Web - Menu/posts_4.png'

const OrdersPage = () => {
    return(
        <div className="orederPages">
            <div>
                <Datecomp/>
            </div>
            <div className="headers">
                <h3>Orders</h3>
            </div>
            <div className="order-details-cardss">
                <OrderCard title={"Total Orders"} values={19} image={card1}/>
                <OrderCard title={"Approved"} values={19} image={card2}/>
                <OrderCard title={"Rejected"} values={19} image={card3}/>
                <OrderCard title={"Pending"} values={19} image={card4}/>
                <OrderCard title={"Inprogress"} values={19} image={card1}/>
                <OrderCard title={"Delivered"} values={19} image={card2}/>
            </div>
            <div className="pets-and-orders">

            </div>
        </div>
    )
}

export default OrdersPage