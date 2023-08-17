import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dropdownlist from "./DropDownlist";
import { Input } from "@mui/material";
import "../components/style.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import DataTable from "./Table";
import { useDispatch,useSelector } from "react-redux"; 
import { petlistapi } from "../redux/slice/petsApislice";
import { BoxLoading } from 'react-loadingg';
import Loaders from "./loader";
import { Height } from "@mui/icons-material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Item_Categories() {
  const [value, setValue] = React.useState(0);
 
  const dispatch = useDispatch()
  // const pending = useSelector((state)=>{state.petsList.pending})
  // const fulfilled = useSelector((state)=>{state.petsList.fulfilled})
  // const error = useSelector((state)=>{state.petsList.rejected})

  const tabledata = useSelector((state)=> state.petsList)

  

  useEffect(()=>{
    if(value === 0){
        dispatch(petlistapi())
    }
    else{
      console.log("working")
    }
    
  },[value])



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangedata = ()=>{
    console.log("chj")
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="Categories tab">
          <Tab label="Pets" {...a11yProps(0)} />
          <Tab label="Foods & Accessories" {...a11yProps(1)} />
        </Tabs>
        <div style={{ float: "right" }}>
          <Dropdownlist />
        </div>
      </Box>
      <div className="search_filter_section">
        <div className="search_filter">
        <input
          type="text"
          placeholder="Search"
          style={{
            width: "40%",
            padding: "20px 39px",
            borderRadius: "50px",
            backgroundColor: "#f4f3f5",
            border: "0px",
            position: "relative",
            marginLeft:"20px"
          }}
        ></input>
        <SearchIcon
          style={{
            position: "absolute",
            left: "35%",
            top: "17px",
            fontSize: "32px",
          }}
        />
        </div>
        <div className="Place_order_btn">
          <button placeholder="Place order">Place Order</button>
        </div>
      </div>
      <CustomTabPanel value={value} onChange={handleChangedata} index={0}>
          <DataTable data={tabledata}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}
