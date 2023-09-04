import React from "react";
import PersistentDrawerLeft from "./Dashboard";
import { useLocation, useNavigate } from "react-router-dom";
import Arrowbutton from "../components/Arrowbutton";
import { Card, Button, Avatar, colors } from "@mui/material";
import "../pages/ProductDetails.css";
import CustomButton from "../components/Custombutton";

function ProductDetails() {
  const carddata = useLocation().state;
  console.log(carddata);
  const date = new Date(carddata?.created_at.split(" "));
  console.log("date", date);
  const navigate = useNavigate();

  return (
    <PersistentDrawerLeft>
      <Arrowbutton navigation={"/foodandaccessories"} />
      <h3>Product Details</h3>
      <Card sx={{ padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <p className="deffont">
            Added on :{" "}
            {date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()}{" "}
          </p>
          <Button
            variant="text"
            sx={{ float: "right", marginTop: "-3rem" }}
            onClick={() => {
              navigate("/addproduct", { state: carddata });
            }}
          >
            Edit
          </Button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            {/* {carddata?.length > 0 ?  */}
             <Avatar
              src={"https://demo.emeetify.com:5016/"+carddata?.images}
              sx={{
                width: 120,
                height: 120,
                marginRight: "2rem",
                marginTop: "2rem",
              }}
              alt="product image"/>
          {/* <Avatar */}
          {/* //   src=""
          //   sx={{
          //     width: 120,
          //     height: 120,
          //     marginRight: "2rem",
          //     marginTop: "2rem",
          //   }}
          //   alt="product image"
          // />} */}
            <div className="productdeatil_list">
              <table>
                <tr>
                  <td>
                    <p style={{ color: "black" }}>Product Name</p>
                  </td>
                  <td>
                    <p style={{ color: "black" }}>:</p>
                  </td>
                  <td>
                    <p
                      style={{ marginLeft: "1rem", color: "black" }}
                      className="listvalue"
                    >
                      {carddata.name}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Product Id</p>
                  </td>
                  <td>
                    <p>:</p>
                  </td>
                  <td>
                    <p style={{ marginLeft: "1rem" }} className="listvalue">
                      {carddata.stock_id}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Category</p>
                  </td>
                  <td>
                    <p>:</p>
                  </td>
                  <td>
                    <p style={{ marginLeft: "1rem" }}>{carddata.stock_type}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Quantity</p>
                  </td>
                  <td>
                    <p>:</p>
                  </td>
                  <td>
                    <p style={{ marginLeft: "1rem" }} className="listvalue">
                      {carddata.avail_qty + carddata.qty_type}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Threshold Value</p>
                  </td>
                  <td>
                    <p>:</p>
                  </td>
                  <td>
                    <p style={{ marginLeft: "1rem" }} className="listvalue">
                      {carddata.thresvalue}
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              className="deffont"
              style={{
                color: "black",
                fontWeight: "bold",
                marginRight: "0.5rem",
              }}
            >
              ₹ {carddata.price}
            </p>
            <table style={{ marginLeft: "1.4rem" }}>
              <tr
                className="deffont"
                style={{ color: "red", marginRight: "0.5rem" }}
              >
                <td>
                  <p>Stocks Available</p>
                </td>
                <td>
                  <p>:</p>
                </td>
                <td>
                  <p style={{ marginLeft: "0.5rem" }}>{carddata.avail_qty}</p>
                </td>
              </tr>
            </table>
            <CustomButton
              name={"Add Stock"}
              style={{ width: "12rem", padding: "0.8rem" }}
              // handleclick={handlesubmit}
              //   type={"submit"}
              //   visiblity={btn}
            />
          </div>
        </div>
        <div className="Discription_sec">
          <p className="title">Discription</p>
          <Card className="discard">
            <p>{carddata?.description}</p>
          </Card>
        </div>
      </Card>
    </PersistentDrawerLeft>
  );
}

export default ProductDetails;
