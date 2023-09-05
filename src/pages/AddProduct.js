import {
  Card,
  Avatar,
  Badge,
  Grid,
  TextField,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import Arrowbutton from "../components/Arrowbutton";
import PersistentDrawerLeft from "./Dashboard";
import { CameraAlt } from "@mui/icons-material";
import { useState } from "react";
import CustomButton from "../components/Custombutton";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import '../pages/commonStyle.css'

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [sfile, setSelectedFile] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [btn, setbtn] = useState(false);

  const handleFileChange = (e) => {
    const file = e?.target?.files[0];
    setSelectedFile(file);
    // console.log('yyy',props)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addproductschema = yup.object().shape({
    productName: yup
      .string()
      .required("Product name is required")
      .min(1, "product name should not be null"),
    productId: yup.string().required("Product id is Required"),
    Category: yup.string().required("Select a Category"),
    price: yup.string().required("Price is required"),
    unit: yup.string().required("Select a Unit"),
    thresholdLimit: yup
      .number("must be a number")
      .required("Enter the thresholdLimit"),
    quantity: yup.number("must be a number").required("Enter a quality"),
  });

  const navigate = useNavigate();
  const dataedit = useLocation().state;

  return (
    <PersistentDrawerLeft>
      <Arrowbutton navigation={"/foodandaccessories"} />
      <h3>Add Product</h3>
      <Card sx={{ padding: "2rem"}} className="cardborder">
        <Formik
          initialValues={{
            image: "",
            productName: dataedit?.name ? dataedit?.name : "",
            description: dataedit?.description
              ? dataedit?.description
              : "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ",
            productId: dataedit?.stock_id ? dataedit?.stock_id : "",
            Category: dataedit?.stock_type ? dataedit?.stock_type : "",
            price: dataedit?.price ? dataedit?.price : "",
            unit: dataedit?.units ? dataedit?.units : "",
            thresholdLimit: dataedit?.thresvalue ? dataedit?.thresvalue : "",
            quantity: dataedit?.avail_qty ? dataedit?.avail_qty : "",
          }}
          validationSchema={addproductschema}
          onSubmit={async (e) => {
            const payloaddata = {
              name: e.productName,
              stock_type: e.Category,
              status: e.status,
              price: e?.price,
              avail_qty: e?.avail_qty,
              qty_type: e?.unit,
              units: e?.unit,
              thresvalue: e?.thresholdLimit,
              description: e?.description,
              gst: e?.gst,
              cgst: e?.cgst,
              sgst: e?.sgst,
              images: image,
            };
            const config = {
              headers: {
                "x-access-token": localStorage.getItem("token"),
                "x-refresh-token": localStorage.getItem("refresh_token"),
              },
            };
            console.log("submi", payloaddata);
            var response = {}
            if (dataedit) {
              const uppayloaddata = {
                name: e.productName,
                stock_type: e.Category,
                price: e?.price,
                qty_type: e?.unit,
                units: e?.unit,
                thresvalue: e?.thresholdLimit,
                description: e?.description,
                images:image,
              };

              console.log("submi", uppayloaddata);
              response = await axios.put(
                `https://demo.emeetify.com:81/pet/stocks/${dataedit.stock_id}`,
                uppayloaddata,
                config
              );
              if (response?.data?.status) {
                setTrigger(true);
                setbtn(true);
                setTimeout(() => {
                  navigate("/foodandaccessories");
                }, 100);
              }
             
            } else {
              response = await axios.post(
                "https://demo.emeetify.com:81/pet/stocks/",
                payloaddata,
                config
              );
              if (response?.data?.status) {
                setTrigger(true);
                setbtn(true);
                setTimeout(() => {
                  navigate("/foodandaccessories");
                }, 100);
              }
            }
            console.log("submi", response);
           
          }}
        >
          {({ values, errors, handleChange, handleSubmit, touched }) => (
            <form onSubmit={handleSubmit}>
              <div style={{ marginLeft: "3rem" }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <label htmlFor="fileInput">
                      <CameraAlt className="avatharcamera" />
                    </label>
                  }
                >
                  <Avatar
                    alt="image d"
                    src={image}
                    sx={{ width: 120, height: 120 }}
                  />
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                    name="image"
                  />
                </Badge>
              </div>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 6 }}
              >
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    <label htmlFor="ProductName">Product Name</label>
                    <TextField
                      id="ProductName"
                      className="formcontrolfield"
                      onChange={handleChange}
                      defaultValue={values.productName}
                      name="productName"
                      helperText={errors?.productName}
                      //   value={props.values.username}
                      //   onBlur={props.handleBlur}
                    />
                    {/* {props?.errors?.firstname && props?.touched?.firstname ? (
                      <div>{props?.errors.firstname}</div>
                    ) : null} */}
                  </div>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="ProductId">Product Id</label>
                    <TextField
                      id="ProductId"
                      className="formcontrolfield"
                      onChange={handleChange}
                      defaultValue={values.productId}
                      name="productId"
                      // value={values.productId}
                      helperText={errors?.productId}

                      //   onBlur={props.handleBlur}
                    />
                    {/* {props?.errors?.firstname && props?.touched?.firstname ? (
                      <div>{props?.errors.firstname}</div>
                    ) : null} */}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "1rem",
                    }}
                  >
                    <label htmlFor="Description">Description</label>
                    <TextField
                      id="Description"
                      rows={5}
                      multiline
                      className="formcontrolfield"
                      onChange={handleChange}
                      defaultValue={values.description}
                      name="description"
                      value={values.description}
                      //   onBlur={props.handleBlur}
                    />
                    {/* {props?.errors?.firstname && props?.touched?.firstname ? (
                      <div>{props?.errors.firstname}</div>
                    ) : null} */}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="Category">Category</label>
                    <Select
                      id="Category"
                      select
                      className="formcontrolfield"
                      onChange={handleChange}
                      defaultValue={values.Category}
                      name="Category"
                      value={values.Category}
                      //   onBlur={props.handleBlur}
                    >
                      <MenuItem data="Food" value="Food" disableRipple>
                        Food
                      </MenuItem>
                      <MenuItem
                        data="Accessories"
                        value="Accessories"
                        disableRipple
                      >
                        Accessories
                      </MenuItem>
                    </Select>
                    {/* {props?.errors?.firstname && props?.touched?.firstname ? (
                      <div>{props?.errors.firstname}</div>
                    ) : null} */}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="Price">Price</label>
                    <TextField
                      id="Price"
                      className="formcontrolfield"
                      onChange={handleChange}
                      defaultValue={values.price}
                      name="price"
                      // value={values.price}
                      //   onBlur={props.handleBlur}
                      helperText={errors.price}
                    ></TextField>
                    {/* {props?.errors?.firstname && props?.touched?.firstname ? (
                      <div>{props?.errors.firstname}</div>
                    ) : null} */}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="Unit">Unit</label>
                    <Select
                      id="Unit"
                      select
                      className="formcontrolfield"
                      onChange={handleChange}
                      defaultValue={values.unit}
                      name="unit"
                      value={values.unit}

                      //   onBlur={props.handleBlur}
                    >
                      <MenuItem data="Kg" value="Kg" disableRipple>
                        Kg
                      </MenuItem>
                      <MenuItem data="Nose" value="Nose" disableRipple>
                        Nose
                      </MenuItem>
                    </Select>
                    {/* {errors?.unit && touched?.unit ? (
                      <div><p style={{fontSize:'10px'}}>{errors.unit}</p></div>
                    ) : null} */}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="thresholdLimit">Threshold Limit</label>
                    <TextField
                      id="thresholdLimit"
                      className="formcontrolfield"
                      onChange={handleChange}
                      //   defaultValue={props.values.firstname}
                      name="thresholdLimit"
                      value={values.thresholdLimit}
                      helperText={errors.thresholdLimit}
                      //   onBlur={props.handleBlur}
                    ></TextField>
                    {/* {props?.errors?.firstname && props?.touched?.firstname ? (
                      <div>{props?.errors.firstname}</div>
                    ) : null} */}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="quantity">Quantity</label>
                    <TextField
                      id="quantity"
                      className="formcontrolfield"
                      onChange={handleChange}
                      defaultValue={values.quantity}
                      name="quantity"
                      helperText={errors.quantity}
                      //   value={props.values.username}
                      //   onBlur={props.handleBlur}
                    ></TextField>
                    {/* {props?.errors?.firstname && props?.touched?.firstname ? (
                      <div>{props?.errors.firstname}</div>
                    ) : null} */}
                  </div>
                </Grid>
              </Grid>
              <div
                className="button-addproduct"
                style={{ marginTop: "1rem", display: "flex", margin: "1rem" }}
              >
                <CustomButton
                  name={"Cancel"}
                  style={{
                    width: "16rem",
                    backgroundColor: "lightgray",
                    marginRight: "1rem",
                    padding: "0.8rem",
                  }}
                  type={"button"}
                />
                {dataedit ? (
                  <CustomButton
                    name={"Update"}
                    style={{ width: "16rem", padding: "0.8rem" }}
                    // handleclick={handlesubmit}
                    type={"submit"}
                    visiblity={btn}
                  />
                ) : (
                  <CustomButton
                    name={"Submit"}
                    style={{ width: "16rem", padding: "0.8rem" }}
                    // handleclick={handlesubmit}
                    type={"submit"}
                    visiblity={btn}
                  />
                )}
              </div>
            </form>
          )}
        </Formik>
      </Card>
      {
        <Snackbar open={trigger} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            product successfully added
          </Alert>
        </Snackbar>
      }
    </PersistentDrawerLeft>
  );
};

export default AddProduct;

// name , stock_type , status , price , avail_qty , qty_type , units
// thresvalue ,  description , gst , cgst , sgst, images
