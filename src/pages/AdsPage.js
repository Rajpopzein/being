import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
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

const AdsPage = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [title, setTitle] = useState("");
  console.log(title);
  const handleSubmit = () => {
    console.log("submitted");
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
        <Stack direction="row">
          <Stack style={{ marginLeft: "30px" }}>
            <Typography className="typography">Add Title</Typography>
            <TextField
              size="small"
              className="textfield"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Typography className="typography">Ad id</Typography>
            <TextField size="small" className="textfield" />
            <Typography className="typography">Position</Typography>
            <Select size="small" className="textfield" />
            <Typography className="typography">Pages</Typography>
            <Select size="small" className="textfield" />
          </Stack>

          <Stack style={{ marginLeft: "30%" }}>
            <Typography className="typography">Timer</Typography>
            <TextField size="small" className="textfield" />
            <Typography className="typography">Description</Typography>
            <TextareaAutosize minRows={5} size="small" className="textfield" />
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
          <Button onClick={() => handleSubmit()} className="submitButton">
            Add a new ad
          </Button>
        </Stack>
      </Card>
    </>
  );
};

export default AdsPage;
