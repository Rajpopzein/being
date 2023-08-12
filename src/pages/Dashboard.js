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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pawimg from "../resource/Web - Menu/pawprint.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import DashboardItem from "./DashboardItem";
import { useDispatch } from "react-redux";
import { selecterchange } from "../redux/slice/pageselectionSlice";
import OrdersPage from "./OrdersPage";


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

export default function PersistentDrawerLeft() {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pageSelector.page);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);


  const navigate = useNavigate();

  const data = useSelector((state) => state.userdetails);

  console.log("data", data);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "#000" }}
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
            <span style={{ marginTop: "1rem" }}>pet store</span>
          </Typography>
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
          <ListItem disablePadding sx={{margin:"25px 0px"}}>
            <ListItemButton
              sx={
                pages === 0
                  ? {
                      backgroundImage:
                        "linear-gradient(to right top, #982bd5, #a840db, #b853e2, #c765e9, #d577f0)",
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      marginRight:'20px',
                      color:'#fff'
                    }
                  : {}
              }
              onClick={() => pageSelectionHandler(dispatch, 0)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} sx={{marginLeft:'-10%'}}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  sx={
                pages === 1
                  ? {
                      backgroundImage:
                        "linear-gradient(to right top, #982bd5, #a840db, #b853e2, #c765e9, #d577f0)",
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      marginRight:'20px',
                      color:'#fff'
                    }
                  : {
                    
                  }
              }
              onClick={() => pageSelectionHandler(dispatch, 1)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Orders"}  sx={{marginLeft:'-10%'}}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open} sx={{ paddingTop: "3rem" }}>
        <DrawerHeader />
        {pages === 0 && <DashboardItem />}
        {pages === 1 && <OrdersPage/>}
      </Main>
    </Box>
  );
}
