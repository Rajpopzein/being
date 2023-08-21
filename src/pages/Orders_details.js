import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { selecterchange } from "../redux/slice/pageselectionSlice";
import { useEffect } from "react";
import PersistentDrawerLeft from "./Dashboard";
import Arrowbutton from "../components/Arrowbutton";
import { Card } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./orderdetails.css";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import { singleUser } from "../redux/slice/AlluserSlice";
import DataTable from "../components/Table";


const Orders_details = () => {
  const location = useLocation();
  const data = location.state;
  console.log("order", data);
  const dispatch = useDispatch()
  console.log("mobile", data.mobile_no)

  useEffect(()=>{
    dispatch(singleUser(data.mobile_no))
  },[])

  const userdata = useSelector((state)=> state.singleuserdetails)

  const columns_pets = [
    { field: "pet_name", headerName: "Pet Name", width: 120, height: 80 },
    { field: "Category", headerName: "Category", width: 130 },
    {
      field: "breed",
      headerName: "Breed",
      // type: 'number',
      width: 180,
    },
    {
      field: "premium_amount",
      headerName: "Price",
      width: 180,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 180,
    },
    {
      field: "age",
      headerName: "Age",
      width: 180,
    },
    {
      field: "color",
      headerName: "Colour",
      width: 180,
    }
  ];


  // console.log("sepuser", userdata?.data?.data[0])


  return (
    <PersistentDrawerLeft>
      <Arrowbutton navigation={"/orders"} />
      <h3 style={{ margin: "1rem" }}>Orders Details</h3>
      <Card style={{ padding: "5rem" }}>
        <div className="Orderid">
          <p className="orderspagefontp">Order id: #{data.order_id}</p>
          <h5 style={{ color: "lightgray" }}>Ordered on: {data.from_date}</h5>
        </div>
        <div className="buttonsorder">
          <p className="orderspagefontp">
            Status : <span style={{color: "#7f36f8"}}>{data.status}</span>
          </p>
          <div className="statusbutton">
            <Button
              sx={{
                marginRight: "1rem",
                width: "12rem",
                borderRadius: "25px",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "bold",
                backgroundImage: "linear-gradient( to left bottom, #d577f0, #c765e9, #b853e2, #a840db, #982bd5)",
                borderColor:'#fff',
                "&:hover":{borderColor:'#fff'}
              }}
              variant="outlined"
            >
              Approve
            </Button>
            <Button
              sx={{
                marginRight: "1rem",
                width: "12rem",
                borderRadius: "25px",
                color: "#000",
                fontSize: "15px",
                fontWeight: "bold",
                borderColor:'lightgray',
                marginRight:'-2px'
              }}
              variant="outlined"
            >
              Reject
            </Button>
          </div>
        </div>
        <div className="ordersuserdetails">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 90, height: 90 }}/>
              <div className="order_user_details">
                  <h5 className="username_order">{data.name}</h5>
                  <h5>{data.mobile_no}</h5>
                  <Button variant="outlined" sx={{fontSize:'30px'}} className="ordersuserdetails_button">Chat</Button>
              </div>
        </div>
        <div className="ordersuserdetails_address">
              <p className="orderspagefontp">Delivery Location : </p>
              <p className="orderspagedeliveryadd">{userdata.data?.data[0]?.address + ","+ userdata?.data?.data[0]?.city+","+ userdata?.data?.data[0]?.country}</p>
        </div>
        <div className="tableforsep_order">
              
        </div>
      </Card>
    </PersistentDrawerLeft>
  );
};

export default Orders_details;
