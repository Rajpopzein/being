import { Datecomp } from "../components/Date";
import "../components/style.css";
import bannerimg from "../resource/Web - Menu/dashboard_bg.png";
import bannerdog from "../resource/Web - Menu/dashboard_bg2.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Card } from "@mui/material";
import card1 from "../resource/Web - Menu/posts_1.png";
import card2 from "../resource/Web - Menu/posts_2.png";
import card3 from "../resource/Web - Menu/posts_3.png";
import card4 from "../resource/Web - Menu/posts_4.png";
import Avatars from "../components/Avathar_Group";
import Order_bg from "../components/Order-bg";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchuser } from "../redux/slice/api_Slice";
import { useDispatch } from "react-redux";
import PersistentDrawerLeft from "./Dashboard"
import { selecterchange } from "../redux/slice/pageselectionSlice";


const Returnfunction = ({userdata, fullname, dashboardData, userdatass}) =>{

  return(
    <div>
    <div className="datesec">
      <Datecomp />
    </div>
    <div className="dash-banner">
      <h2 className="dash-bannername">Dashboard</h2>
      <div className="dash-bannercard">
        <img className="bannerimag1" src={bannerimg} alt="bannerimg1" />
        <img className="bannerimag2" src={bannerdog} alt="bannerdog" />
        <div className="dash-text">
          <h2>Welcome {fullname}!</h2>
          <h4 className="parar-dash-text">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            <br />
            accusantium doloremqe
          </h4>
        </div>
      </div>
      <div className="dash-bannername">
        <div className="post-baner-name">
          <h3>Posts</h3>
          <hr style={{ width: "90.5%", marginLeft: "3rem", color: "gray" }} />
        </div>
        <div className="post-cards">
          <div className="newfeed">
            <Card
              className="card-new"
              sx={{
                backgroundColor: "#f4fdf6",
                boxShadow: "1px 1px 0px 0px rgba(0,0,0,0.01)",
                borderRadius: "20px",
              }}
            >
              <h3>New Posts</h3>
              <h3>{dashboardData?.data?.data[0]?.adCount}</h3>
              <div className="collection-newpost">
                <div className="collection-icon-newpost">
                  <Avatars avadata={userdatass?.userdata?.petAddedBy} />
                </div>
                <div className="collection-button">
                  <button>View All</button>
                </div>
              </div>
            </Card>
          </div>
          <div className="post-status-card">
            <div className="grid-containe">
              <div className="grid-item">
                <img
                  src={card1}
                  alt="card1"
                  className="post-status-card-image1"
                />
                <div className="post-status-card-details-odd">
                  <h3>Total Posts</h3>
                  <h3>{userdatass?.userdata?.petCount}</h3>
                </div>
              </div>
              <div className="grid-item">
                <img
                  src={card2}
                  alt="card2"
                  className="post-status-card-image2"
                />
                <div className="post-status-card-details">
                  <h3>Approved</h3>
                  <h3>{userdatass?.userdata?.petApprovedCount}</h3>
                </div>
              </div>
              <div className="grid-item">
                <img
                  src={card3}
                  alt="card3"
                  className="post-status-card-image3"
                />
                <div className="post-status-card-details-odd">
                  <h3>Rejected</h3>
                  <h3>{userdatass?.userdata?.petRejectedCount}</h3>
                </div>
              </div>
              <div className="grid-item">
                <img
                  src={card4}
                  alt="card4"
                  className="post-status-card-image4"
                />
                <div className="post-status-card-details">
                  <h3>Pending</h3>
                  <h3>1</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Order-names">
        <div className="post-baner-name">
          <h3 style={{ marginLeft: "2%" }}>Orders</h3>
          <hr style={{ width: "90.5%", marginLeft: "3rem", color: "gray" }} />
        </div>
        <div className="order-details-card">
          <div className="order-details-cards">
            <div>
              <Order_bg
                card_title={"Total Orders"}
                count={userdatass?.userdata?.orderCount}
              />
            </div>
            <div>
              <Order_bg
                card_title={"Approved"}
                count={userdatass?.userdata?.orderApproveCount}
              />
            </div>
            <div>
              <Order_bg
                card_title={"Rejected"}
                count={userdatass?.userdata?.orderRejectedCount}
              />
            </div>
            <div>
              <Order_bg
                card_title={"Pending"}
                count={userdatass?.userdata?.orderPendingCount}
              />
            </div>
            <div>
              <Order_bg
                card_title={"Inprocess"}
                count={userdatass?.userdata?.orderProgressCount}
              />
            </div>
            <div>
              <Order_bg
                card_title={"Delivered"}
                count={userdatass?.userdata?.orderDeliverCount}
              />
            </div>
          </div>
          <div className="orderfeed">
            <Card
              className="card-new1"
              sx={{
                backgroundColor: "#f4fdf6",
                boxShadow: "1px 1px 0px 0px rgba(0,0,0,0.01)",
                borderRadius: "20px",
              }}
            >
              <h3>New Orders</h3>
              <h3>8</h3>
              <div className="collection-newpost">
                <div className="collection-icon-newpost">
                  <Avatars avadata={userdatass?.userdata?.orderAddedBy} />
                </div>
                <div className="collection-button">
                  <button>View All</button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}


const DashboardItem = () => {
  
  const userdata = useSelector((state) => state.userdetails);
  console.log(userdata, "ud");
  const fullname =
    userdata?.datas[0]?.firstname + " " + userdata?.datas[0]?.lastname;
  const [dashboardData, setDashboardData] = useState([]);

  const dispatch = useDispatch();
  const userdatass = useSelector((state) => state?.dashapi);
  const errordatas = useSelector((state) => state?.api?.error);

  useEffect(() => {
    dispatch(fetchuser());
  }, []);

  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/pet/utils/dashboard")
      .then((dataSet) => {
        setDashboardData(dataSet);
      });
      dispatch(selecterchange(0))
  }, []);




  
  const output = <Returnfunction userdata= {userdata} fullname = {fullname} dashboardData={dashboardData} userdatass = {userdatass}/>

  return (
    <PersistentDrawerLeft>{output}</PersistentDrawerLeft>
      );
};

export default DashboardItem;
