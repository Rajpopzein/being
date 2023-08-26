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
  Select,
  Alert
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "../pages/Adduser.css";
import { useState } from "react";
import "./style.css";
import * as Yup from "yup";
import CustomButton from "./Custombutton";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCountry,
  getState,
  getdistrict,
} from "../redux/slice/countryslice";
import Loaders from "./loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name required"),
  lastname: Yup.string(),
  state: Yup.string().max(50).required("select a state"),
  emailId: Yup.string().email("Invalid email").required("Required"),
  country: Yup.string().required("Select a Country"),
  address: Yup.string().required("Enter address"),
  city: Yup.string(),
  // .required("Select a city"),
  district: Yup.string().required("Select a District"),
  phoneNumber: Yup.string()
    .min(10, "Enter a valid Phone Number")
    .max(14, "Enter a valid Phone number")
    .required("Enter Phone Number"),
  pincode: Yup.string()
    .min(6, "Enter a valid postal code")
    .required("Postal code required"),
  role: Yup.string().required("Role Required"),
  password: Yup.string()
    .min(8, "minimum of 8 charecters")
    .required("Password required"),
});

// const countrydata = [];

const UserFormFormik = ({ userdatas }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const [loder, setLoder] = useState(true);
  const [country, setCountry] = useState([]);
  const [states, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [uploadpayload, setUploadpayload] = useState("");
  const [roledata, setRoleData] = useState([
    { roleid: 1, name: "Admin" },
    { roleid: 2, name: "User" },
  ]);
  const [addresstype, setAddresstype] = useState([
    { addressid: 1, name: "Home" },
    { addressid: 2, name: "Office" },
  ]);

  const [trigger, setTrigger] = useState(false);

  const dd = useSelector((state) => state.country);
  const statedata = useSelector((states) => states.state);
  const districtdata = useSelector((states) => states.district);

  useEffect(() => {
    dispatch(getAllCountry());
    console.log("uu",userdatas)
    if (userdatas != undefined) {
      setImage(`https://demo.emeetify.com:5016/${userdatas.profile_pic}`);
    }
  }, []);

  const config = {
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "x-refresh-token": localStorage.getItem("refresh_token"),
    },
  };

  useEffect(() => {
    setLoder(true);
    setCountry(dd?.userdata);
    setState(statedata.userdata);
    setDistrict(districtdata?.userdata);
    setTimeout(() => {
      setLoder(false);
    }, 5000);
  }, [dd, statedata, districtdata, selectedCountry, selectedState, image]);

  // const mergeimgtodata = (formData) => {
  //   const data = { ...userpayload, profile_pic: image };
  //   return data;
  // };

  const handleFileChange = (e, props) => {
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

  const handlecountyselect = (country) => {
    dispatch(getState(country));
    setSelectedCountry(country);
  };

  const handleStateSelect = (statesdatas, country) => {
    dispatch(getdistrict({ countycode: country, statecode: statesdatas }));
    setSelectedState(statesdatas);
  };

  const navigate = useNavigate();
  const handlesubmit = async(e, props) => {
    console.log("llll",image)
    e.preventDefault();
    console.log(props);
    const payloaddata = { ...props, image: image };
    const userpayload = {
      firstname: payloaddata?.firstname,
      lastname: payloaddata?.lastname,
      role_id: payloaddata.role,
      mobile_no: payloaddata.phoneNumber,
      email: payloaddata.emailId,
      password: payloaddata.password,
      profile_pic: payloaddata.image,
      status: "",
      country: payloaddata?.country,
      state: payloaddata?.state,
      city: payloaddata?.city,
      pincode: payloaddata?.pincode,
      address: payloaddata?.address,
    };

    const addresspayload = {
      country: payloaddata?.country,
      state: payloaddata?.state,
      city: payloaddata?.city,
      pincode: payloaddata?.pincode,
      address_line: payloaddata?.address,
      address_type: payloaddata?.addresstype,
    };
    const token = localStorage.getItem("token");
    // setUploadpayload(userpayload)
    const userpay = await axios.post(
      " https://demo.emeetify.com:81/pet/users/register",
      userpayload,
      config
    );
    console.log("lll",userpay)

    if(userpay?.data?.status == true){
      setTrigger(!trigger)
        setTimeout(() => {
          setTrigger(!trigger)
          navigate("/users")
        }, 1000) 
    }

    // const addpay = axios.post(
    //   "https://demo.emeetify.com:81/pet/address/",
    //   addresspayload,
    //   config
    // ).then((e)=>{console.log("ere",e)})
    // if (userpay?.data?.status && addpay?.data?.status) {
    //   navigate("/user");
    // }
    // console.log("payloaddata", userpay, addpay);
  };

  const handleupdate = async (e, props) => {
    e.preventDefault();
   
    const payloaddata = { ...props, image: image }
    
    
    const updatepayload = {
      firstname: payloaddata?.firstname,
      lastname: payloaddata?.lastname,
      role_id: payloaddata.role,
      mobile_no: payloaddata.phoneNumber,
      email: payloaddata.emailId,
      password: payloaddata.password,
      // profile_pic: payloaddata.image,
      status: "",
      country: payloaddata?.country,
      state: payloaddata?.state,
      city: payloaddata?.city,
      pincode: payloaddata?.pincode,
      address: payloaddata?.address,
    };

    const putvar = await axios.put(`https://demo.emeetify.com:81/pet/users/${userdatas.id}`, updatepayload, config)
    console.log("udatepay", putvar);
    if(putvar.data.status == true){
      setTrigger(!trigger)
        setTimeout(() => {
          setTrigger(!trigger)
          navigate("/users")
        }, 1000) 
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          image: userdatas !== undefined ? userdatas.profile_pic : "",
          firstname: userdatas !== undefined ? userdatas?.firstname : "",
          lastname: userdatas !== undefined ? userdatas?.lastname : "",
          state: userdatas !== undefined ? userdatas?.state : "",
          phoneNumber: userdatas !== undefined ? userdatas?.mobile_no : "",
          city: userdatas !== undefined ? userdatas?.city : "",
          emailId: userdatas !== undefined ? userdatas?.email : "",
          address: userdatas !== undefined ? userdatas?.address : "",
          country: userdatas !== undefined ? userdatas?.country : "",
          pincode: userdatas !== undefined ? userdatas?.pincode : "",
          role: userdatas !== undefined ? userdatas?.role_id : "",
          password: userdatas !== undefined ? userdatas?.password : "",
        }}
        validationSchema={SignupSchema}
      >
        {(props) => (
          <form
            onSubmit={
              userdatas !== undefined
                ? (e) => handleupdate(e, props.values)
                : (e) => handlesubmit(e, props.values)
            }
          >
            <div style={{ marginLeft: "3rem" }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <label htmlFor="fileInput">
                    <CameraAltIcon className="avatharcamera" />
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
                    handleFileChange(e, props);
                  }}
                  name="image"
                />
              </Badge>
            </div>
            {loder ? (
              <div style={{ position: "absolute", left: "50%", top: "40%" }}>
                <Loaders />
              </div>
            ) : null}
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
                    <label htmlFor="firstname">First Name</label>
                    <TextField
                      id="firstname"
                      className="formcontrolfield"
                      onChange={props.handleChange}
                      defaultValue={props.values.firstname}
                      name="firstname"
                      value={props.values.username}
                      onBlur={props.handleBlur}
                    />
                    {props?.errors?.firstname && props?.touched?.firstname ? (
                      <div>{props?.errors.firstname}</div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="lastname">Last Name</label>
                    <TextField
                      id="lastname"
                      className="formcontrolfield"
                      onChange={props.handleChange}
                      defaultValue={props.values.lastname}
                      name="lastname"
                      value={props.values.username}
                      onBlur={props.handleBlur}
                    />
                    {props?.errors?.lastname && props?.touched?.lastname ? (
                      <div>{props?.errors.lastname}</div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <TextField
                      id="phoneNumber"
                      className="formcontrolfield"
                      onChange={props.handleChange}
                      name="phoneNumber"
                      onBlur={props.handleBlur}
                      defaultValue={props.values.phoneNumber}
                    />
                    {props?.errors?.phoneNumber &&
                    props?.touched?.phoneNumber ? (
                      <div>{props?.errors.phoneNumber}</div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="role">Role</label>
                    <Select
                      id="role"
                      defaultValue={props.values.role}
                      onChange={props.handleChange}
                      name="role"
                      value={props.values.role}
                      onBlur={props.handleBlur}
                    >
                      {roledata?.map((option) => (
                        <MenuItem
                          key={option?.roleid}
                          value={option?.roleid}
                          // onClick={() => handlecountyselect(option?.code)}
                        >
                          {option?.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {props?.errors?.role && props?.touched?.role ? (
                      <div>{props?.errors.role}</div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="emailId">Email ID</label>
                    <TextField
                      id="emailId"
                      className="formcontrolfield"
                      defaultValue={props.values.emailId}
                      onChange={props.handleChange}
                      name="emailId"
                      value={props.values.emailId}
                      onBlur={props.handleBlur}
                    />
                    {props?.errors?.emailId && props?.touched?.emailId ? (
                      <div>{props?.errors.emailId}</div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="password">Password</label>
                    <TextField
                      id="password"
                      className="formcontrolfield"
                      onChange={props.handleChange}
                      name="password"
                      value={props.values.password}
                      onBlur={props.handleBlur}
                    />
                    {props?.errors?.password && props?.touched?.password ? (
                      <div>{props?.errors.password}</div>
                    ) : null}
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
                      defaultValue={props.values.address}
                    />
                    {props?.errors?.address && props?.touched?.address ? (
                      <div>{props?.errors.address}</div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="Country">Country</label>
                    <Select
                      id="Country"
                      defaultValue={props.values.country}
                      onChange={props.handleChange}
                      name="country"
                      value={props.values.country}
                      onBlur={props.handleBlur}
                    >
                      {country?.map((option) => (
                        <MenuItem
                          key={option?.code}
                          value={option?.name}
                          onClick={() => handlecountyselect(option?.code)}
                        >
                          {option?.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {props?.errors?.country && props?.touched?.country ? (
                      <div>{props?.errors.country}</div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="state">State</label>
                    <Select
                      id="state"
                      defaultValue={props?.values?.state}
                      onChange={props.handleChange}
                      name="state"
                      disabled={loder || selectedCountry?.length === 0}
                      value={props?.values?.state}
                    >
                      {states?.map((option) => (
                        <MenuItem
                          key={option.code}
                          value={option.name}
                          onClick={() =>
                            handleStateSelect(
                              option?.code,
                              option?.country_code
                            )
                          }
                        >
                          {option?.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {props?.errors?.state && props?.touched?.state ? (
                      <div>{props?.errors.state}</div>
                    ) : null}
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div
                    className="formfields"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="city">City</label>
                    <Select
                      id="city"
                      defaultValue={props.values.city}
                      onChange={props.handleChange}
                      name="city"
                      value={props.values.city}
                      onBlur={props.handleBlur}
                      disabled={loder || selectedState?.length === 0}
                    >
                      {district?.map((option, index) => (
                        <MenuItem key={index} value={option?.name}>
                          {option?.name}
                        </MenuItem>
                      ))}
                      {/* {console.log("kk", district)} */}
                    </Select>
                    {props?.errors?.city && props?.touched?.city ? (
                      <div>{props?.errors.city}</div>
                    ) : null}
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
                      defaultValue={props.values.pincode}
                    />
                    {props?.errors?.pincode && props?.touched?.pincode ? (
                      <div>{props?.errors.pincode}</div>
                    ) : null}
                  </div>
                </Grid>
              </Grid>
            </div>
            <div
              className="Fromiksubmit"
              style={{ display: "flex", marginLeft: "3rem", marginTop: "1rem" }}
            >
              <CustomButton
                name="Cancel"
                style={{
                  backgroundColor: "lightgray",
                  marginRight: "20px",
                  width: "14rem",
                  height: "3rem",
                }}
                type="button"
                onClick={()=>navigate("/users")}
              />

              {userdatas !== undefined ? (
                <CustomButton
                  name="Update"
                  type="submit"
                  style={{ width: "14rem", height: "3rem" }}
                  
                />
              ) : (
                <CustomButton
                  name="Submit"
                  type="submit"
                  style={{ width: "14rem", height: "3rem" }}
                  
                />
              )}
            </div>
            {/* <button type="submit">Submit</button> */}
          </form>
        )}
      </Formik>
      <Snackbar open={trigger} autoHideDuration={6000} >
        <Alert severity="success" sx={{ width: '150%' }}>
          User updated 
        </Alert>
        
      </Snackbar>
    </div>
  );
};

export default UserFormFormik;
