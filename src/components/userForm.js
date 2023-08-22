import { Avatar, Card, Badge, Grid, TextField, MenuItem, FormControl, FormLabel } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "../pages/Adduser.css";
import { useState } from "react";
import "./style.css";

const UserForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState('');

  const [formdata, setFormdata] = useState({
    image:'',
    username:'',
    state:'',
    phoneNumber :'',
    city:'',
    emailId:'',
    address:'',
    country:'',
    pincode:'',
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFormdata({...formdata, image : file})
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

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


  const handlesubmit = (e) => {
        e.preventDefault()
        console.log("form", e.target)
        console.log("changes", formdata)
  }

  

  return (
    <form  component="form" onSubmit={handlesubmit}>
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
          onChange={handleFileChange}
        />
      </Badge>
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
              <TextField id="Username" className="formcontrolfield" value={formdata.username} onChange={(e)=>setFormdata({...formdata, username : e.target.value})}  />
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
                defaultValue="EUR"
                helperText="Please select your currency"
                onChange={(e)=>setFormdata({...formdata, state : e.target.value})}
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
              <label htmlFor="phonenumber">Phone Number</label>
              <TextField id="phonenumber" className="formcontrolfield"  onChange={(e)=>setFormdata({...formdata, phoneNumber : e.target.value})} />
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
                defaultValue="EUR"
                helperText="Please select your currency"
                onChange={(e)=>setFormdata({...formdata, city : e.target.value})}
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
              <label htmlFor="emailid">Email ID</label>
              <TextField id="emailid" className="formcontrolfield"  onChange={(e)=>setFormdata({...formdata, emailId : e.target.value})} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div
              className="formfields"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="address">Address</label>
              <TextField id="address" className="formcontrolfield"  onChange={(e)=>setFormdata({...formdata, address : e.target.value})} />
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
                defaultValue="EUR"
                helperText="Please select your currency"
                onChange={(e)=>setFormdata({...formdata, country : e.target.value})}
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
              <TextField id="Pincode" className="formcontrolfield"  onChange={(e)=>setFormdata({...formdata, pincode : e.target.value})} />
            </div>
          </Grid>
        </Grid>
        <div>
           
        </div> <button type="submit">submit</button>
      </div>
    </form>
  );
};

export default UserForm;
