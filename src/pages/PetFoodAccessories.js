import {
  Card,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import first from "../resource/Web - Menu/posts_1.png";
import second from "../resource/Web - Menu/posts_3.png";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
const PetFoodAccessories = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/pet/stocks/")
      .then((response) =>
        setData(response.data.data !== [] ? response.data.data : "")
      )
      .catch((e) => console.log(e));
  }, []);
  console.log(data);
  return (
    <>
      <h4 style={{ marginLeft: "50px", fontWeight: "600" }}>
        Pet Food & Accessories
      </h4>
      <Stack direction="row">
        <div style={{ position: "relative" }}>
          <img src={first} alt="firstImage" className="firstImg" />
          <span className="imgTitle">Total Products</span>
          <span className="imgProductCount">400</span>
        </div>
        <div style={{ position: "relative" }}>
          <img src={second} alt="firstImage" className="secondImg" />
          <span className="imgThreshold">Threshold Reached</span>
          <span className="imgThresholdCount">32</span>
        </div>
      </Stack>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <Card style={{ marginTop: "30px" }}>
        <TableContainer>
          <Table>
            <TableHead >
              <TableRow >
                <TableCell >Product Name</TableCell>
                <TableCell>Product id</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock Available</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {data.map((row) => (
                <TableRow key={row.name} >
                  <TableCell >{row.name}</TableCell>
                  <TableCell >{row.stock_id}</TableCell>
                  <TableCell >{row.stock_type}</TableCell>
                  <TableCell >{row.qty_type}</TableCell>
                  <TableCell >{row.price}</TableCell>
                  <TableCell >{row.avail_qty}</TableCell>
                  <TableCell >{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default PetFoodAccessories;
