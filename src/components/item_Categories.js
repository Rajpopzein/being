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
import DataTable from "./Table";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <CustomTabPanel value={value} index={0}>
        <DataTable/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}
