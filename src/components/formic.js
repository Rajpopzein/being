import React, { useEffect } from "react";
import { Formik } from "formik";
import {
  Avatar,
  Card,
  Badge,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "../pages/Adduser.css";
import { useState } from "react";
import "./style.css";




import * as Yup from 'yup';
 
 const SignupSchema = Yup.object().shape({
    username: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
     state: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
     emailId: Yup.string().email('Invalid email').required('Required'),
 });



const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

const ValidationSchemaExample = () =>{ 
const [selectedFile, setSelectedFile] = useState(null);
const [image, setImage] = useState('');



const mergeimgtodata = (values) => {
    const data = {...values, image: selectedFile}
    return data
}




const handleFileChange = (e, props) => {
    const file = e?.target?.files[0];
    setSelectedFile(file);
    console.log('yyy',props)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  

return(
  <div>
    <Formik
      initialValues={{
        image: "",
        username: "",
        state: "",
        phoneNumber: "",
        city: "",
        emailId: "",
        address: "",
        country: "",
        pincode: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values, actions) => {
        setTimeout(async () => {
          const dd = mergeimgtodata(values)
          alert(JSON.stringify(dd, null, 2));
          console.log("alert",dd)
        }, 2000);
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          {/* {props.errors.name && <div id="feedback">{props.errors.name}</div>} */}
          <div style={{marginLeft:"3rem"}}>
              <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <label htmlFor="fileInput">
            <CameraAltIcon className="avatharcamera" />
          </label>
        }
      >
        <Avatar alt="image d" src={image} sx={{ width: 120, height: 120 }} />
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e)=>{handleFileChange(e, props)}}
          name="image"
        />
      </Badge>
          </div>
          <div className="formcontrol" style={{ padding: "3rem 2rem" }}>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 6 }}
            >
              <Grid item xs={6}>
                <div
                  className="formfields"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="Username">User Name</label>
                  <TextField
                    id="Username"
                    className="formcontrolfield"
                    onChange={props.handleChange}
                    name="username"
                    value={props.values.username}
                    onBlur={props.handleBlur}
                  />
                  {props?.errors?.username && props?.touched?.username ?(<div>{props?.errors.username}</div>):null}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className="formfields"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="phonenumber">Phone Number</label>
                  <TextField
                    id="phonenumber"
                    className="formcontrolfield"
                    onChange={props.handleChange}
                    name="phoneNumber"
                    onBlur={props.handleBlur}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className="formfields"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="emailid">Email ID</label>
                  <TextField
                    id="emailid"
                    className="formcontrolfield"
                    onChange={props.handleChange}
                    name="emailId"
                    value={props.values.emailId}
                    onBlur={props.handleBlur}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className="formfields"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="address">Address</label>
                  <TextField
                    id="address"
                    className="formcontrolfield"
                    onChange={props.handleChange}
                    name="address"
                    value={props.values.address}
                    onBlur={props.handleBlur}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className="formfields"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="state">State</label>
                  <TextField
                    id="state"
                    select
                    defaultValue={props.values.state}
                    helperText="Please select your currency"
                    onChange={props.handleChange}
                    name="state"
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </Grid>
              
              <Grid item xs={6}>
                <div
                  className="formfields"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="city">City</label>
                  <TextField
                    id="city"
                    select
                    defaultValue={props.values.city}
                    onChange={props.handleChange}
                    name="city"
                    value={props.values.city}
                    onBlur={props.handleBlur}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </Grid>
             
              <Grid item xs={6}>
                <div
                  className="formfields"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="Country">Country</label>
                  <TextField
                    id="Country"
                    select
                    defaultValue={props.values.country}
                    onChange={props.handleChange}
                    name="country"
                    value={props.values.country}
                    onBlur={props.handleBlur}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className="formfields"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="Pincode">Pincode</label>
                  <TextField
                    id="Pincode"
                    className="formcontrolfield"
                    onChange={props.handleChange}
                    name="pincode"
                    value={props.values.pincode}
                    onBlur={props.handleBlur}
                  />
                </div>
              </Grid>
            </Grid>
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  </div>
)};

export default ValidationSchemaExample;
