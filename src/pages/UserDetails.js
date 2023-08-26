import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selecterchange } from "../redux/slice/pageselectionSlice";
import { useEffect } from "react";
import PersistentDrawerLeft from "../pages/Dashboard";
import Arrowbutton from "../components/Arrowbutton";
import { Button, Card } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import "./userdetails.css";
import { useLocation } from "react-router-dom";
import '../components/style.css'
import { useNavigate } from "react-router-dom";
import Addresscard from "../components/AddressCard";
import { getaddress } from "../redux/slice/Address";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";

const Userdetails = () => {
  const dispath = useDispatch();
  useEffect(() => {
    dispath(selecterchange(5));
  },[]);
  const navigate = useNavigate()
  const location = useLocation();
  const userdata = location.state;
  

  const config = {
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "x-refresh-token": localStorage.getItem("refresh_token"),
    },
  };
  
  useEffect(() => {
    dispath(selecterchange(5));
    dispath(getaddress({id:userdata?.id, token:config}))
  },[]);

  const Address_data = useSelector((state)=>state.address?.data?.data)

  useEffect(()=>{
    console.log(Address_data)
  },[Address_data])


  const Handle_remove = async(value) => {
      console.log("clicking")
      const userdata = await axios.delete(`https://demo.emeetify.com:81/pet/address/?id=${value.id}`, config).then((e)=>console.log(e))
      console.log(userdata)
  }
  

  return (
    <PersistentDrawerLeft>
        <Arrowbutton navigation={"/users"} />
        <h2 style={{ marginTop: "20px", marginBottom: "20px" }}>
          User Details
        </h2>
        <Card sx={{ padding: "3rem 6rem" }}>
          <Button variant="text" sx={{ float: "right" }} onClick={()=>{navigate('/edituser',{state:userdata})}}>
            Edit
          </Button>
          <div className="single_user_details">
            <Avatar
              alt="Remy Sharp"
              src={`https://demo.emeetify.com:5016/${userdata?.profile_pic}`}
              sx={{ width: 100, height: 100, marginTop:'1.7rem'}}
            />
            <div className="detailsofuser">
              <h3>{userdata?.firstname + " " + userdata?.lastname}</h3>
              <p>{userdata?.mobile_no}</p>
              <p>{userdata?.email}</p>
            </div>
          </div>
          <div className="usersdetatailsaddress">
            <h5>Address</h5>
            <p style={{ width: "12rem" }}>
              {userdata?.address + "," + userdata?.city + "," + userdata?.country}
            </p>
          </div>


          {
            Address_data !== undefined && Address_data.map((data)=>(
              <Addresscard key={Address_data.id} Title={data?.address_type} Address={data?.address_line + "," + data?.city + ","+ data?.state +","+ data?.pincode+"," + data?.country} fun={Handle_remove} singledata = {data}/>
            ))
          }
         
          {/* <Addresscard Title={"Office"} Address={userdata?.address + "," + userdata?.city + "," + userdata?.country}/> */}
        </Card>
      
      
    </PersistentDrawerLeft>
  );
};

export default Userdetails;
