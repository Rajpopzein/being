import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./commonStyle.css";
import { useState } from "react";
import axios from "axios";
import PersistentDrawerLeft from "./Dashboard"
import { useDispatch } from "react-redux";
import { selecterchange } from "../redux/slice/pageselectionSlice";
import { useEffect } from "react";

const AdsPage = () => {
  const Returndata = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(selecterchange(3))
    },[])
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    }));
  
    const [formData, setFormData] = useState({
      title: "",
      adId: "",
      position: "",
      pages: "",
      timer: "",
      description: "",
      link: "",
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      await axios
        .post("https://demo.emeetify.com:81/pet/ads", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then((response) => console.log(response))
        .catch((e) => console.log(e));
    };
  
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1} columns={16}>
            <Grid item xs={1} style={{ maxWidth: "30px" }}>
              <ArrowBackIcon />
            </Grid>
            <Grid item xs={1}>
              <Typography>Back</Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid style={{ paddingTop: "30px" }}>
          <Typography
            style={{ fontWeight: "400", fontSize: "25px", paddingLeft: "20px" }}
          >
            Add a New Ad
          </Typography>
        </Grid>
        <Card style={{ marginTop: "10px", height: "500px" }}>
          <form onSubmit={handleSubmit}>
            <Stack direction="row">
              <Stack style={{ marginLeft: "30px" }}>
                <Typography className="typography">Add Title</Typography>
                <TextField
                  size="small"
                  className="textfield"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                <Typography className="typography">Ad id</Typography>
                <TextField
                  size="small"
                  className="textfield"
                  name="adId"
                  value={formData.adId}
                  onChange={handleInputChange}
                />
                <Typography className="typography">Position</Typography>
                <Select
                  value={formData.position}
                  name="position"
                  size="small"
                  className="textfield"
                  onChange={handleInputChange}
                >
                  <MenuItem value={"bottom"}>Bottom</MenuItem>
                  <MenuItem value={"left"}>Left</MenuItem>
                  <MenuItem value={"right"}>Right</MenuItem>
                  <MenuItem value={"top"}>Top</MenuItem>
                </Select>
                <Typography className="typography">Pages</Typography>
                <Select
                  value={formData.pages}
                  name="pages"
                  size="small"
                  className="textfield"
                  onChange={handleInputChange}
                >
                  <MenuItem value={"login"}>Login</MenuItem>
                  <MenuItem value={"settings"}>Settings</MenuItem>
                  <MenuItem value={"registration"}>Registration</MenuItem>
                </Select>
              </Stack>
  
              <Stack style={{ marginLeft: "30%" }}>
                <Typography className="typography">Timer</Typography>
                <TextField size="small" className="textfield" />
                <Typography
                  className="typography"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                >
                  Description
                </Typography>
                <TextareaAutosize
                  minRows={5}
                  size="small"
                  className="textfield"
                />
                <Typography className="typography">Link</Typography>
                <TextField size="small" className="textfield" />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              style={{ marginTop: "50px", marginLeft: "30px" }}
            >
              <Button
                onClick={() => console.log("canceled")}
                className="cancelButton"
              >
                cancel
              </Button>
              <Button type="submit" className="submitButton">
                Add a new ad
              </Button>
            </Stack>
          </form>
        </Card>
      </>
    );
  }

  return(
    <PersistentDrawerLeft><Returndata/></PersistentDrawerLeft>
  )
};

export default AdsPage;
