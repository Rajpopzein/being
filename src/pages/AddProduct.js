import { Card, Avatar, Badge, Grid, TextField } from "@mui/material";
import Arrowbutton from "../components/Arrowbutton";
import PersistentDrawerLeft from "./Dashboard";
import { CameraAlt } from "@mui/icons-material";
import { useState } from "react";

const AddProduct = () => {
  const [image, setImage] = useState("");
  return (
    <PersistentDrawerLeft>
      <Arrowbutton navigation={"/foodandaccessories"} />
      <h3>Add Product</h3>
      <Card sx={{ padding: "2rem" }}>
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
              //   onChange={(e) => {
              //     handleFileChange(e, props);
              //   }}
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
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="firstname">Product Name</label>
              <TextField
                id="firstname"
                className="formcontrolfield"
                //   onChange={props.handleChange}
                //   defaultValue={props.values.firstname}
                name="firstname"
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
              <label htmlFor="firstname">Product Id</label>
              <TextField
                id="firstname"
                className="formcontrolfield"
                //   onChange={props.handleChange}
                //   defaultValue={props.values.firstname}
                name="firstname"
                //   value={props.values.username}
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
              <label htmlFor="firstname">Description</label>
              <TextField
                id="firstname"
                rows={4}
                multiline
                className="formcontrolfield"
                //   onChange={props.handleChange}
                //   defaultValue={props.values.firstname}
                name="firstname"
                //   value={props.values.username}
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
              <label htmlFor="firstname">Description</label>
              <TextField
                id="firstname"
                select
                className="formcontrolfield"
                //   onChange={props.handleChange}
                //   defaultValue={props.values.firstname}
                name="firstname"
                //   value={props.values.username}
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
              <label htmlFor="firstname">Price</label>
              <TextField
                id="firstname"
                className="formcontrolfield"
                //   onChange={props.handleChange}
                //   defaultValue={props.values.firstname}
                name="firstname"
                //   value={props.values.username}
                //   onBlur={props.handleBlur}
              ></TextField>
              {/* {props?.errors?.firstname && props?.touched?.firstname ? (
                      <div>{props?.errors.firstname}</div>
                    ) : null} */}
            </div>
          </Grid>
        </Grid>
      </Card>
    </PersistentDrawerLeft>
  );
};

export default AddProduct;
