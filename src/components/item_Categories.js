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
import { useDispatch, useSelector } from "react-redux";
import { petlistapi } from "../redux/slice/petsApislice";
import { BoxLoading } from "react-loadingg";
import Loaders from "./loader";
import { Height } from "@mui/icons-material";
import axios from "axios";




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

  const dispatch = useDispatch();
  // const pending = useSelector((state)=>{state.petsList.pending})
  // const fulfilled = useSelector((state)=>{state.petsList.fulfilled})
  // const error = useSelector((state)=>{state.petsList.rejected})

  useEffect(() => {
    if (value === 0) {
      dispatch(petlistapi({type:'pet',filter:''}));
    } else {
      dispatch(petlistapi({type:'stock',filter:''}))
    }
  }, [value]);
  
  const tabledata = useSelector((state) => state.petsList)

  const hanlde_filter = (e,  value) =>{
    if (value === 0) {
      const datatosent = {type:'pet',filter:e.target.value}
      // const datatosentc = {...datatosent, filter:}
      dispatch(petlistapi(datatosent));
    } else {
      dispatch(petlistapi({type:'stock',filter:e.target.value}))
    }
  }

  const columns_pets = [
    { field: "to_date", headerName: "Date", width: 120, height: 80 },
    { field: "order_id", headerName: "Order id", width: 130 },
    { field: "Category", headerName: "Category", width: 130 },
    {
      field: "breed",
      headerName: "Breed",
      // type: 'number',
      width: 180,
    },
    {
      field: "premium_amount",
      headerName: "Price",
      width: 180,
    },
    {
      field: "name",
      headerName: "User",
      width: 180,
    },
    {
      field: "location",
      headerName: "Location",
      width: 180,
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 180,
    },
  ];

  const columns_stock = [
    { field: "to_date", headerName: "Date", width: 120, height: 80 },
    { field: "order_id", headerName: "Order id", width: 120 },
    { field: "avail_qty", headerName: "No. of items", width: 120 },
    {
      field: "total_amount",
      headerName: "Price",
      width: 120,
    },
    {
      field: "breed",
      headerName: "User",
      // type: 'number',
      width: 120,
    },
    {
      field: "location",
      headerName: "Location",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 120,
    },
  ];

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangedata = () => {
    console.log("chj");
  };

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
              marginLeft: "20px",
            }}
            onChange={(e)=>hanlde_filter(e,value)}
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
        <DataTable data={tabledata} columns={columns_pets} index={0}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <DataTable data={tabledata} columns={columns_stock} index={1}/>
      </CustomTabPanel>
    </Box>
  );
}
