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
  Avatar,
  TablePagination,
} from "@mui/material";
import first from "../resource/Web - Menu/posts_1.png";
import second from "../resource/Web - Menu/posts_3.png";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { DataGrid } from "@mui/x-data-grid";
import CommonTable from "../components/CommonTable";
import PersistentDrawerLeft from "./Dashboard";
import { useDispatch } from "react-redux";
import { selecterchange } from "../redux/slice/pageselectionSlice";
import { useNavigate } from "react-router-dom";



const PetFoodAccessories = () => {
  const Returnfun = () => {
    const [data, setData] = useState([]);
    const [petData, setPetData] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
      axios
        .get("https://demo.emeetify.com:81/pet/stocks/")
        .then((response) =>
          setData(response.data.data !== [] ? response.data.data : "")
        )
        .catch((e) => console.log(e));
    }, []);

    const Actionbutton = ({ fun, data }) => {
      return <MoreHorizIcon onClick={() => fun(data)} />;
    };

    const columns = [
      { key: "name", label: "Product Name" },
      { key: "stock_id", label: "Product id" },
      { key: "stock_type", label: "Category" },
      { key: "qty_type", label: "Qty" },
      { key: "price", label: "Price" },
      { key: "avail_qty", label: "Stock Available" },
      { key: "", label: "Action" },
    ];

    const [page, setPage] = useState(0);
    const [rowsPerpage, setRowsPerPage] = useState(5);

    const handleChangePage = (e, newPage) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPage = (e) => {
      setRowsPerPage(parseInt(e.target.value, 10));
      setPage(0);
    };

    const displayedData = data.slice(
      page * rowsPerpage,
      page * rowsPerpage + rowsPerpage
    );

    const tableHeight = "400px";
    const apiUrl = "https://demo.emeetify.com:81/pet/stocks/";
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(selecterchange(4));
    }, []);

    const handleAddproduct = ()=>{
      navigate('/addproduct')
    }


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

        <div className="search_filter_section" style={{ marginRight: "1rem" }}>
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
              // onChange={(e)=>hanlde_filter(e,value)}
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
            <button placeholder="Place order" onClick={handleAddproduct}>Add Product</button>
          </div>
        </div>

        <Card style={{ marginTop: "30px", margin: "2rem " }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, "&:.MuiTableHead-root": { border: "0px" } }}
              aria-label="simple table"
            >
              <TableHead sx={{ "&:MuiTableHead-root": { border: "0px" } }}>
                <TableRow style={{ marginBottom: "20px" }}>
                  <TableCell></TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="left">Product Id</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Qty</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Stock Available</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="singletablebody">
                {displayedData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      padding: "10rem",
                    }}
                  >
                    <TableCell align="left">
                      <Avatar
                        src={`https://demo.emeetify.com:5016/${row?.images}`}
                        sx={{ width: 70, height: 70 }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.stock_id}</TableCell>
                    <TableCell align="left">{row.stock_type}</TableCell>
                    <TableCell align="left">{row.thresvalue}</TableCell>
                    <TableCell align="left">
                      {row?.thresvalue + row?.units}
                    </TableCell>
                    <TableCell align="left">{row.avail_qty}</TableCell>
                    <TableCell>
                      <Actionbutton />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerpage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPage}
          />
        </Card>
      </>
    );
  };

  return (
    <PersistentDrawerLeft>
      <Returnfun />
    </PersistentDrawerLeft>
  );
};

export default PetFoodAccessories;
