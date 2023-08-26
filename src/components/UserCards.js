import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { selecterchange } from "../redux/slice/pageselectionSlice";
import { useEffect } from "react";
import { Avatar, Box, Divider } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import "./style.css";

export default function UserCards({ name, location, images, userid, cardfun, deletefun }) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const dispatch = useDispatch();

  const pageSelectionHandler = (dispatch, value) => {
    dispatch(selecterchange(value));
  };

  const handlechnges = () => {
    console.log("clicking");
    // pageSelectionHandler(dispatch, 7)
  };
  useEffect(() => {}, []);

  return (
    <Card
      sx={{
        Width: 345,
        height: 240,
        borderRadius: "10px",
        padding: "5px 15px",
      }}
    >
      <div className="imageandbtn">
        <Avatar
          src={`https://demo.emeetify.com:5016/${images}`}
          alt={name}
          sx={{ width: 85, height: 85 }}
        />
        <div>
          <MoreVertIcon onClick={handleClick} />
          <Popper id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Card sx={{display:'flex', flexDirection:'row'}}>
                  <Button onClick={()=>cardfun(userid)}>View</Button>
                  <Divider/>
                  <Button onClick={()=>deletefun(userid.id)}>Delete</Button>
                </Card>
              </Fade>
            )}
          </Popper>
        </div>
      </div>
      <CardContent>
        <Typography
          gutterBottom
          variant="p"
          sx={{ fontSize: "20px" }}
          component="div"
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
      </CardContent>
    </Card>
  );
}
