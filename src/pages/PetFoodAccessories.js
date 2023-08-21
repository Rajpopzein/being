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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DataGrid } from "@mui/x-data-grid";
import CommonTable from "../components/CommonTable";
import PersistentDrawerLeft from "./Dashboard";
import { useDispatch } from "react-redux";
import { selecterchange } from "../redux/slice/pageselectionSlice";



const PetFoodAccessories = () => {
  const Returnfun = () =>{
    const [data, setData] = useState([]);
  const [petData, setPetData] = useState([]);
  useEffect(() => {
    axios
      .get("https://demo.emeetify.com:81/pet/stocks/")
      .then((response) =>
        setData(response.data.data !== [] ? response.data.data : "")
      )
      .catch((e) => console.log(e));
    // let i = {};
    //   for(let i = 0; i<data.length ; i++){
    //     console.log(data[i],"======>>>>>>");
    //     setPetData(data[i]);
    //   }
  }, []);

  
  console.log(petData,"petData====>");
const columns =[
  { key: 'name', label: 'Product Name' },
  { key: 'stock_id', label: 'Product id' },
  { key: 'stock_type', label: 'Category' },
  { key: 'qty_type', label: 'Qty' },
  { key: 'price', label: 'Price' },
  { key: 'avail_qty', label: 'Stock Available' },
  { key:'', label: 'Action' },
];


  const tableHeight = '400px';
  const apiUrl = "https://demo.emeetify.com:81/pet/stocks/";
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(selecterchange(4))
  },[])
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
          <span className="imgThresholdCount">{data.length}</span>
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


      <CommonTable  columns={columns} apiUrl={apiUrl} height={tableHeight}/>
        
       
        {/* <TableContainer>
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
                <TableRow key={row.name} style={{textAlign:"center"}}>
                  <TableCell >{row.name}</TableCell>
                  <TableCell >{row.stock_id}</TableCell>
                  <TableCell >{row.stock_type}</TableCell>
                  <TableCell >{row.qty_type}</TableCell>
                  <TableCell >{row.price}</TableCell>
                  <TableCell >{row.avail_qty}</TableCell>
                  <TableCell >
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Card>
    </>
  );
  }

  return(
    <PersistentDrawerLeft><Returnfun/></PersistentDrawerLeft>
  )
};

export default PetFoodAccessories;
