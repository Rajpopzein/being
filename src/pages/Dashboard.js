import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pawimg from "../resource/Web - Menu/pawprint.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { selecterchange } from "../redux/slice/pageselectionSlice";
import post from "../resource/Web - Menu/posts.png";
import order from "../resource/Web - Menu/Orders.png";
import dashboard from "../resource/Web - Menu/Dashboard.png";
import petFood from "../resource/Web - Menu/Food&accessories.png";
import users from "../resource/Web - Menu/Users.png";
import feedback from "../resource/Web - Menu/Feedbacks.png";
import NavItem from "../components/navItem";
import jwt_decode from "jwt-decode";
import { Button, Menu } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { Dropdown } from "rsuite";

import chatimg from "../resource/Web - Menu/chat.png";
import notificationimg from "../resource/Web - Menu/Notification2.png";
import { Avatar, MenuItem, Select } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

const pageSelectionHandler = (dispatch, value) => {
  dispatch(selecterchange(value));
};




const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ children }) {

  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pageSelector.page);
  const userdata = useSelector((state) => state.userdetails);
  const profilepic =  userdata?.datas[0]?.profile_pic
  

  const refreshAccessToken = () => {
    const refreshToke = localStorage.getItem("refresh_token");
    localStorage.setItem("token", refreshToke);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    const handleActivity = () => {
      // Check if the token is present
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwt_decode(token);

          if (decodedToken.exp) {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const remainingTime = decodedToken.exp - currentTimestamp;
            const refreshThreshold = 60;

            if (remainingTime < refreshThreshold) {
              console.log(
                "Token is about to expire. Initiating token refresh."
              );
              refreshAccessToken();
            } else {
              console.log("Token is still valid");
            }
          } else {
            console.log("Token does not have an expiration claim");
          }
        } catch (error) {
          console.error("Error decoding the token:", error);
          // Handle the error, e.g., show an error message to the user
          // You might also consider navigating to the login page
          navigate("/");
        }
      } else {
        console.log("Token not found in storage");
        // Redirect to the login page since there's no token
        navigate("/");
      }
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    handleActivity();

    const checkInterval = setInterval(() => {
      handleActivity();
    }, 300000);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      clearInterval(checkInterval);
    };
  }, []);

  const navigate = useNavigate();

  const data = useSelector((state) => state.userdetails);

  // console.log("data", data);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(true);
  const opens = Boolean(anchorEl);

  const handleClickmenu = (event) => {
    setAnchorEl(true);
    console.log("clicking");
  };

  const handleClosemenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ background: "#fff" }}>
        <Toolbar>
          <IconButton
            color="#ffff"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "#000", marginTop: "3px" }}
            >
              <img
                src={pawimg}
                alt="pawimg"
                style={{
                  width: "1.7rem",
                  height: "1.7rem",
                  marginRight: "0.7rem",
                }}
              />
              <span style={{ marginTop: "1rem" }}>Pet Store</span>
            </Typography>
            <div
              className="nav-items"
              style={{
                width: "35%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <NavItem img={chatimg} Title="Chat" />
              <NavItem img={notificationimg} Title="Notification" />
              <div style={{ display: "flex" }}>
                <Avatar src={`https://demo.emeetify.com:5016/${profilepic}`} alt="profile" />
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={opens ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={opens ? "true" : undefined}
                    // onClick={handleClickmenu}
                    onClick={()=>{localStorage.clear()}}
                  >
                    Logout
                  </Button>
                  {/* <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    sx={{position:'absolute'}}
                    // open={ope}
                    onClose={handleClosemenu}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem  onClick={handleClosemenu}>Profile</MenuItem>
                    <MenuItem onClick={handleClosemenu}>My account</MenuItem>
                    <MenuItem onClick={handleClosemenu}>Logout</MenuItem>
                  </Menu> */}
                </div>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List style={{ marginTop: "3rem" }}>
          <ListItem disablePadding sx={{ margin: "25px 0px" }}>
            <ListItemButton
              sx={
                pages === 0
                  ? {
                      backgroundImage:
                        "linear-gradient(to right top, #982bd5, #a840db, #b853e2, #c765e9, #d577f0)",
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      marginRight: "20px",
                      color: "#fff",
                    }
                  : {}
              }
              onClick={() => {
                navigate("/Dashboard");
                pageSelectionHandler(dispatch, 0);
              }}
            >
              <ListItemIcon>
                <img
                  src={dashboard}
                  style={{ height: "20px", width: "20px" }}
                  className="sideImage"
                  alt="DashboardImg"
                />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} sx={{ marginLeft: "-10%" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ margin: "25px 0px" }}>
            <ListItemButton
              sx={
                pages === 1
                  ? {
                      backgroundImage:
                        "linear-gradient(to right top, #982bd5, #a840db, #b853e2, #c765e9, #d577f0)",
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      marginRight: "20px",
                      color: "#fff",
                    }
                  : {}
              }
              onClick={() => {
                navigate("/orders");
                pageSelectionHandler(dispatch, 1);
              }}
            >
              <ListItemIcon>
                <img
                  src={order}
                  style={{ height: "20px", width: "20px" }}
                  className="sideImage"
                  alt="OrderImg"
                />
              </ListItemIcon>
              <ListItemText primary={"Orders"} sx={{ marginLeft: "-10%" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ margin: "25px 0px" }}>
            <ListItemButton
              sx={
                pages === 2
                  ? {
                      backgroundImage:
                        "linear-gradient(to right top, #982bd5, #a840db, #b853e2, #c765e9, #d577f0)",
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      marginRight: "20px",
                      color: "#fff",
                    }
                  : {}
              }
              onClick={() => {
                navigate("/post");
                pageSelectionHandler(dispatch, 2);
              }}
            >
              <ListItemIcon>
                <img
                  src={post}
                  style={{ height: "20px", width: "20px" }}
                  className="sideImage"
                  alt="PostImg"
                />
              </ListItemIcon>
              <ListItemText primary={"Post"} sx={{ marginLeft: "-10%" }} />
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding sx={{ margin: "25px 0px" }}>
            <ListItemButton
              sx={
                pages === 3
                  ? {
                      backgroundImage:
                        "linear-gradient(to right top, #982bd5, #a840db, #b853e2, #c765e9, #d577f0)",
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      marginRight: "20px",
                      color: "#fff",
                    }
                  : {}
              }
              onClick={() => {navigate("/ads");pageSelectionHandler(dispatch, 3)}}
            >
              <ListItemIcon>
                <img
                  src={ads}
                  style={{ height: "20px", width: "20px" }}
                  className="sideImage"
                  alt="AdsImg"
                />
              </ListItemIcon>
              <ListItemText primary={"Ads"} sx={{ marginLeft: "-10%" }} />
            </ListItemButton>
          </ListItem> */}
          <ListItem disablePadding sx={{ margin: "25px 0px" }}>
            <ListItemButton
              sx={
                pages === 4
                  ? {
                      backgroundImage:
                        "linear-gradient(to right top, #982bd5, #a840db, #b853e2, #c765e9, #d577f0)",
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      marginRight: "20px",
                      color: "#fff",
                    }
                  : {}
              }
              onClick={() => {
                navigate("/foodandaccessories");
                pageSelectionHandler(dispatch, 4);
              }}
            >
              <ListItemIcon>
                <img
                  src={petFood}
                  style={{ height: "20px", width: "20px" }}
                  className="sideImage"
                  alt="petFoodImg"
                />
              </ListItemIcon>
              <ListItemText
                primary={"Pet Food & Accessories"}
                sx={{ marginLeft: "-10%" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ margin: "25px 0px" }}>
            <ListItemButton
              sx={
                pages === 5
                  ? {
                      backgroundImage:
                        "linear-gradient(to right top, #982bd5, #a840db, #b853e2, #c765e9, #d577f0)",
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      marginRight: "20px",
                      color: "#fff",
                    }
                  : {}
              }
              onClick={() => {
                navigate("/users");
                pageSelectionHandler(dispatch, 5);
              }}
            >
              <ListItemIcon>
                <img
                  src={users}
                  style={{ height: "20px", width: "20px" }}
                  className="sideImage"
                  alt="userImg"
                />
              </ListItemIcon>
              <ListItemText primary={"Users"} sx={{ marginLeft: "-10%" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ margin: "25px 0px" }}>
            <ListItemButton
              sx={
                pages === 6
                  ? {
                      backgroundImage:
                        "linear-gradient(to right top, #982bd5, #a840db, #b853e2, #c765e9, #d577f0)",
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      marginRight: "20px",
                      color: "#fff",
                    }
                  : {}
              }
              onClick={() => {
                navigate("/feedback");
                pageSelectionHandler(dispatch, 6);
              }}
            >
              <ListItemIcon>
                <img
                  src={feedback}
                  style={{ height: "20px", width: "20px" }}
                  className="sideImage"
                  alt="feedbackImg"
                />
              </ListItemIcon>
              <ListItemText primary={"Feedbacks"} sx={{ marginLeft: "-10%" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open} sx={{ paddingTop: "3rem" }}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
