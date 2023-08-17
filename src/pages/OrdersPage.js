import { Datecomp } from "../components/Date"
import '../pages/orderstyle.css'
import OrderCard from "../components/OrederCard"
import card1 from '../resource/Web - Menu/posts_1.png'
import card2 from '../resource/Web - Menu/posts_2.png'
import card3 from '../resource/Web - Menu/posts_3.png'
import card4 from '../resource/Web - Menu/posts_4.png'
import Item_Categories from "../components/item_Categories"
import {useSelector } from "react-redux/es/hooks/useSelector"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchuser } from "../redux/slice/api_Slice"

const OrdersPage = () => {
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchuser())
    },[])

    const card_datas = useSelector((state)=>state.dashapi)
    console.log("fetchdata", card_datas)

    return(
        <div className="orederPages">
            <div>
                <Datecomp/>
            </div>
            <div className="headers">
                <h3>Orders</h3>
            </div>
            <div className="order-details-cardss">
                <OrderCard title={"Total Orders"} values={card_datas?.userdata?.orderCount} image={card1}/>
                <OrderCard title={"Approved"} values={card_datas?.userdata?.orderApproveCount} image={card2}/>
                <OrderCard title={"Rejected"} values={card_datas?.userdata?.orderRejectedCount} image={card3}/>
                <OrderCard title={"Pending"} values={card_datas?.userdata?.orderPendingCount} image={card4}/>
                <OrderCard title={"Inprogress"} values={card_datas?.userdata?.orderProgressCount} image={card1}/>
                <OrderCard title={"Delivered"} values={card_datas?.userdata?.orderDeliverCount} image={card2}/>
            </div>
            <div className="pets-and-orders">
                <div>
                    <Item_Categories/>
                </div>
            </div>
        </div>
    )
}

export default OrdersPage