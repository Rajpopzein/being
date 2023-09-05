import { Widgets } from "@mui/icons-material";
import Arrowbutton from "../components/Arrowbutton";
import PersistentDrawerLeft from "./Dashboard";
import {
  Card,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  AvatarGroup,
  Avatar,
  FormControl,
} from "@mui/material";
import { getCategory } from "../redux/slice/Categoryslice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ImageAvatar from "../components/ImageAvathar";
import { VideoCameraBack } from "@mui/icons-material";
import CustomButton from "../components/Custombutton";
// import { readFile } from 'fs/promises';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const schemas = Yup.object().shape({
  category_id: Yup.string().required("Select Category"),
  gender: Yup.string().required("Select Gender"),
  pet_name: Yup.string("Enter a pet name")
    .min(1, "Name should be valid")
    .required("Pet name required"),
  mobile_number: Yup.number("must be a number")
    .required("Enter the mobilenumber")
    .max(12, "enter a valid mobile number")
    .min(10, "enter a valid mobile number"),
  breed: Yup.string().required("Select a bread"),
  kcireg: Yup.string().required("Select the Kci "),
  color: Yup.string().required("Enter color"),
  price: Yup.string().required("enter the price"),
  age: Yup.number("age must be number").required("age required"),
  location: Yup.string("Location").required("Location required"),
});

const Addpost = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState("");
  const [kci, setKci] = useState(null);

  useEffect(() => {}, [images, video, kci]);

  const handleKciChange = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];

      const reader = new FileReader();

      reader.onload = () => {
        const base64Data = reader.result;

        setKci(base64Data);
      };

      // Read the file as a data URL, which will give you a base64 encoded string
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = async (e) => {
    const selectedImages = Array.from(e.target.files);
    const limitedImages = selectedImages.slice(0, 5);

    const base64Images = [];

    for (const image of limitedImages) {
      const reader = new FileReader();

      reader.onload = (event) => {
        base64Images.push(event.target.result);
        console.log(base64Images);
        if (base64Images.length <= limitedImages.length) {
          setImages(base64Images);
        }
      };

      reader.readAsDataURL(image);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleVideo = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];

      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        setVideo(base64Data);
      };

      // Read the file as a data URL, which will give you a base64 encoded string
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    dispatch(getCategory());
  }, []);
  const selecteddata = useSelector((state) => state.getcategory?.data?.data);
  console.log(selecteddata);
  return (
    <PersistentDrawerLeft>
      <Arrowbutton navigation={"/post"} />
      <h3>Add Post</h3>
      <div>
        <Card sx={{ padding: "2.5rem" }} className="cardborder">
          <Formik
            initialValues={{
              category_id: "",
              gender: "",
              pet_name: "",
              mobile_number: "",
              description: "",
              breed: "",
              kcireg: "",
              color: "",
              price: "",
              age: "",
              location: "",
              images: images,
              video: video,
              kci_cert: kci,
            }}
            validationSchema={schemas}
            onSubmit={async (e) => {
              // console.log("eve",e)
              const payload_data = {
                ...e,
                images: images,
                video: video,
                kci_cert: kci,
              };

              console.log("paydata", payload_data);

              const config = {
                headers: {
                  "x-access-token": localStorage.getItem("token"),
                },
              };
              const responce = await axios.post(
                "https://demo.emeetify.com:81/pet/pets/",
                payload_data,
                config
              );

              console.log("res", responce);
            }}
          >
            {({ handleChange, errors, values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="Category">Category *</InputLabel>
                      <Select
                        sx={{ width: "100%" }}
                        // labelId="Category"
                        // id="Category"
                        fullWidth
                        displayEmpty
                        value={values?.Category}
                        label="select something"
                        name="category_id"
                        onChange={handleChange}
                      >
                        {selecteddata?.map((data) => (
                          <MenuItem
                            key={data.category_id}
                            value={data.category_id}
                          >
                            {data.category_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {errors ? (
                      <span style={{ color: "red" }}>{errors.category_id}</span>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="Gender">Gender *</InputLabel>
                      <Select
                        sx={{ width: "100%" }}
                        labelId="Gender"
                        id="Gender"
                        // value={age}
                        label="Gender"
                        name="gender"
                        onChange={handleChange}
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                      </Select>
                    </FormControl>

                    {errors ? (
                      <span style={{ color: "red" }}>{errors.gender}</span>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%", marginTop: "1rem" }}
                      id="pet_name"
                      label="Pet Name *"
                      variant="outlined"
                      name="pet_name"
                      onChange={handleChange}
                    />
                    {errors ? (
                      <span style={{ color: "red" }}>{errors.pet_name}</span>
                    ) : (
                      ""
                    )}
                    <TextField
                      sx={{ width: "100%", marginTop: "1rem" }}
                      id="number"
                      label="Number *"
                      variant="outlined"
                      name="mobile_number"
                      onChange={handleChange}
                    />
                    {errors ? (
                      <span style={{ color: "red" }}>
                        {errors.mobile_number}
                      </span>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%", marginTop: "1rem" }}
                      id="Description"
                      label="Description"
                      variant="outlined"
                      name="description"
                      onChange={handleChange}
                    />
                    {errors ? (
                      <span style={{ color: "red" }}>{errors.description}</span>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth sx={{marginTop:'1rem'}}>
                      <InputLabel id="Breed">Breed *</InputLabel>
                      <Select
                        sx={{ width: "100%"}}
                        labelId="Breed"
                        id="breed"
                        // value={age}
                        label="Breed"
                        name="breed"
                        onChange={handleChange}
                      >
                        <MenuItem value={"German"}>German</MenuItem>
                        <MenuItem value={"Rotwiler"}>Rotwiler</MenuItem>
                      </Select>
                    </FormControl>

                    {errors ? (
                      <span style={{ color: "red" }}>{errors.breed}</span>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%", marginTop: "1rem" }}
                      id="price"
                      label="Price"
                      variant="outlined"
                      name="price"
                      onChange={handleChange}
                    />
                    {errors ? (
                      <span style={{ color: "red" }}>{errors.price}</span>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%", marginTop: "1rem" }}
                      id="Age"
                      label="Age"
                      variant="outlined"
                      name="age"
                      onChange={handleChange}
                    />
                    {errors ? (
                      <span style={{ color: "red" }}>{errors.age}</span>
                    ) : (
                      ""
                    )}
                    <TextField
                      sx={{ width: "100%", marginTop: "1rem" }}
                      id="Location"
                      label="Location"
                      variant="outlined"
                      name="location"
                      onChange={handleChange}
                    />
                    {errors ? (
                      <span style={{ color: "red" }}>{errors.location}</span>
                    ) : (
                      ""
                    )}
                    <div style={{ width: "40%", marginTop: "1rem" }}>
                      <div style={{ display: "flex" }}>
                        <p className="headingpets">Upload Images</p>
                        <IconButton
                          color="primary"
                          component="label"
                          style={{ marginLeft: "3rem", marginTop: "-1rem" }}
                        >
                          <PhotoCamera style={{ width: 30, height: 30 }} />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                          />
                        </IconButton>
                      </div>
                      <div style={{ marginLeft: "20rem" }}>
                        <AvatarGroup
                          max={3}
                          sx={{ marginLeft: "3rem", marginTop: "1rem" }}
                        >
                          {images?.map((ima, index) => (
                            <ImageAvatar
                              image={ima}
                              onRemove={() => removeImage(index)}
                            />
                          ))}
                        </AvatarGroup>
                      </div>
                      <div style={{ display: "flex", marginTop: "2rem" }}>
                        <p className="headingpets">Upload Video</p>
                        <IconButton
                          color="primary"
                          component="label"
                          style={{ marginLeft: "3rem", marginTop: "-1rem" }}
                        >
                          <VideoCameraBack style={{ width: 30, height: 30 }} />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            accept="video/*"
                            multiple
                            onChange={handleVideo}
                          />
                        </IconButton>
                      </div>
                    </div>
                    <div>
                      <InputLabel id="kci">Kci Registration</InputLabel>
                      <Select
                        sx={{ width: "100%" }}
                        labelId="kci"
                        id="kcireg"
                        // value={age}
                        label="Category"
                        // label="select something"
                        name="kcireg"
                        onChange={handleChange}
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    </div>
                    {values.kcireg == "Yes" ? (
                      <div style={{ display: "flex", marginTop: "1.5rem" }}>
                        <p className="headingpets">Attach KCI Document</p>
                        <IconButton
                          color="primary"
                          component="label"
                          style={{ marginLeft: "3rem", marginTop: "-1rem" }}
                        >
                          <PhotoCamera style={{ width: 30, height: 30 }} />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            multiple
                            onChange={handleKciChange}
                          />
                        </IconButton>
                      </div>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%", marginTop: "1rem" }}
                      id="color"
                      label="Color"
                      variant="outlined"
                      name="color"
                      onChange={handleChange}
                    />
                    {errors ? (
                      <span style={{ color: "red" }}>{errors.color}</span>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
                <div style={{ display: "flex", marginTop: "1.5rem" }}>
                  <CustomButton
                    name={"Cancle"}
                    style={{
                      backgroundColor: "lightgray",
                      marginRight: "1rem",
                    }}
                  />
                  <CustomButton type={"submit"} name={"Upload"} />
                </div>
              </form>
            )}
          </Formik>
        </Card>
      </div>
    </PersistentDrawerLeft>
  );
};

export default Addpost;
