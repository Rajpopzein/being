import React, { useState } from "react";
import PersistentDrawerLeft from "./Dashboard";
import { useLocation } from "react-router-dom";
import Arrowbutton from "../components/Arrowbutton";
import "../pages/commonStyle.css";
import { Card, Avatar, AvatarGroup } from "@mui/material";
import { Button } from "rsuite";

import { useEffect } from "react";
import Position from "rsuite/esm/Overlay/Position";

function ViewPost() {
  const postdetails = useLocation().state;
  console.log("postdetails", postdetails);
  const [isHovered, setIshover] = useState(false);
  const [vimg, setVimg] = useState("");

  const handlemouseEnter = (data) => {
    const img = `https://demo.emeetify.com:5016/${data}`;
    setVimg(img);
    setIshover(true);
  };

  const handlemouseleave = (data) => {
    setIshover(false);
  };

  return (
    <PersistentDrawerLeft>
      <div>
        <Arrowbutton navigation={"/post"} />
        <h3 style={{ marginLeft: "1rem", marginBottom: "2rem" }}>
          Pet Details
        </h3>
        <Card sx={{ padding: "2rem" }}>
          <div className="petDetails">
            <div className="petDetails_usertbl">
              <table>
                <tr>
                  <td>
                    <p className="petdetailusertbltitle">Pet Name</p>
                  </td>
                  <td>
                    <h5>:</h5>
                  </td>
                  <td>
                    <p>{postdetails?.pet_name}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="petdetailusertbltitle">Status</p>
                  </td>
                  <td>
                    <h5>:</h5>
                  </td>
                  <td>
                    <p>{postdetails?.status}</p>
                  </td>
                </tr>
              </table>
              <div className="petDetails_rightside">
                <h6 className="petDetails_h6">
                  Posted on : {postdetails?.created_at}
                </h6>
                <h6>₹{postdetails?.price}</h6>
              </div>
            </div>
            <div className="petdetails_user">
              <div className="petdetails_user_details">
                <Avatar
                  sx={{ width: 100, height: 100, marginRight: "2rem" }}
                  src={`https://demo.emeetify.com:5016/${postdetails?.profile_pic}`}
                  alt="user image"
                />
                <div className="petdetails_user_data">
                  <p>{postdetails?.name}</p>
                  <p>{postdetails?.mobile_no}</p>
                </div>
              </div>
              <div className="petdetails_user_productimg">
                <AvatarGroup max={4}>
                  {postdetails?.images.map((data) => (
                    <div
                      onMouseEnter={() => handlemouseEnter(data)}
                      onMouseLeave={handlemouseleave}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        sx={{ width: 80, height: 80, marginRight: "1rem" }}
                        src={`https://demo.emeetify.com:5016/${data}`}
                      />
                    </div>
                  ))}
                </AvatarGroup>
              </div>
              <div className="postbuttons">
                <button style={{ marginRight: "2rem" }}>Cancel</button>
                <button className="postbuttonsubmit">Chat</button>
              </div>
              <div className="petdetailstbldata">
                <table>
                  <tr>
                    <td>
                      <p className="PetdataTable">Category</p>
                    </td>
                    <td>
                      <p>:</p>
                    </td>
                    <td>
                      <p>{postdetails?.category_name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="PetdataTable">Breed</p>
                    </td>
                    <td>
                      <p>:</p>
                    </td>
                    <td>
                      <p>{postdetails?.breed}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="PetdataTable">Gender</p>
                    </td>
                    <td>
                      <p>:</p>
                    </td>
                    <td>
                      <p>{postdetails?.gender}</p>
                    </td>
                  </tr>
                </table>
                <table style={{ marginLeft: "2rem" }}>
                  <tr>
                    <td>
                      <p className="PetdataTable">Age</p>
                    </td>
                    <td>
                      <p>:</p>
                    </td>
                    <td>
                      <p>{postdetails?.age}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="PetdataTable">Numbers</p>
                    </td>
                    <td>
                      <p>:</p>
                    </td>
                    <td>
                      <p>{postdetails?.avail_qty}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="PetdataTable">Colour</p>
                    </td>
                    <td>
                      <p>:</p>
                    </td>
                    <td>
                      <p>{postdetails?.color}</p>
                    </td>
                  </tr>
                </table>
              </div>
              <div className="iframe" style={{ float: "right",position:'absolute', right:'5%',top:"60%", height:"400px"}}>
                <Card
                  className={`iframe-container ${isHovered ? "hovered" : ""}`}
                  style={{
                    display: `${isHovered ? "block" : "none"}`,
                    width: "400px",
                    height:"300px"
                  }}
                >
                  <img src={vimg} alt="img" style={{ width: "100%",height:'100%' }} />
                </Card>
              </div>
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <table>
                <tr>
                  <td>
                    <p className="headingpets">Location</p>
                  </td>
                  <td>
                    <p>:</p>
                  </td>
                  <td>
                    <p>{postdetails.location}</p>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <p className="headingpets">Discription</p>
              <Card sx={{ padding: "3rem", backgroundColor: "#f5f3f6" }}>
                <p style={{ color: "#7c797d", fontSize: "1rem" }}>
                  {postdetails.description}
                </p>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </PersistentDrawerLeft>
  );
}

export default ViewPost;
