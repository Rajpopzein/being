import { Datecomp } from "../components/Date"
import '../pages/orderstyle.css'
import OrderCard from "../components/OrederCard"

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
                <OrderCard title={"Total Orders"} values={19}/>
                <OrderCard title={"Total Orders"} values={19}/>
            </div>
        </div>
    )
}

export default OrdersPage