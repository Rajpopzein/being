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

import Addresscard from "../components/AddressCard";



const Userdetails = () => {
  const dispath = useDispatch();
  useEffect(() => {
    dispath(selecterchange(5));
  });

  const location = useLocation();
  const userdata = location.state;

  console.log("location", userdata);

  return (
    <PersistentDrawerLeft>
      <div style={{ backgroundColor: "#ffffff" }}>
        <Arrowbutton navigation={"/users"} />
        <h2 style={{ marginTop: "20px", marginBottom: "20px" }}>
          User Details
        </h2>
        <Card sx={{ padding: "3rem 6rem" }}>
          <Button variant="text" sx={{ float: "right" }}>
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
            <p style={{ width: "5rem" }}>
              {userdata?.address + "," + userdata?.city + "," + userdata?.country}
            </p>
          </div>
          <Addresscard Title={"Home"} Address={userdata?.address + "," + userdata?.city + "," + userdata?.country}/>
          <Addresscard Title={"Office"} Address={userdata?.address + "," + userdata?.city + "," + userdata?.country}/>
        </Card>
      </div>
    </PersistentDrawerLeft>
  );
};

export default Userdetails;
