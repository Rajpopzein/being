import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
  TableFooter,
  TablePagination,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Loaders from "./loader";
import { useEffect } from "react";
import { Button } from "rsuite";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



let rows = ""

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange, emptyRows } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={emptyRows ===0 || page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={emptyRows === 0 || page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  emptyRows: PropTypes.number.isRequired,
};

// function createData(name, calories, fat) {
//   return { name, calories, fat };
// }



const Actionbutton = ({fun, data}) =>{
  return(
    <MoreHorizIcon onClick={()=> fun(data)}/>
  )
}


export default function DataTable({ data, columns, index , clickfun}) {
  const [loadervalue, setloader] = React.useState(true);

  useEffect(() => {
    // console.log("tabledata", tabledata.loading)
    if (data.loading === "pending") {
      setloader(true);
    } else if (data.loading === "idle") {
      setTimeout(() => {
        setloader(false);
      }, 3000);
    }
  }, [data]);



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (rows !== undefined ? rows.length : 0)) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //mapping data into array
  rows = data?.petdata?.data?.data;

  // console.log("row", rows)
 
  // }

  return (
    <>
      {loadervalue ? (
        <Loaders />
      ) : (
        <Card>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell>{column.headerName}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {index === 0 ? (
                <TableBody>
                  {(rows !== undefined ) ? (rowsPerPage > 0
                    ? rows?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row) => (
                    <TableRow key={row.id[0]} >
                    <TableCell>{row.to_date}</TableCell>
                    <TableCell>{row.order_id}</TableCell>
                    <TableCell>{row.Category}</TableCell>
                    <TableCell>{row.breed}</TableCell>
                    <TableCell>{row.premium_amount}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell><Actionbutton fun={clickfun} data={row}/></TableCell>
                  </TableRow>
                  )):<TableBody></TableBody>}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              ) : (
                <TableBody>
                  {(rows !== undefined )?(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row) => (
                    <TableRow key={row.id[0]}>
                    <TableCell>{row.updated_at}</TableCell>
                    <TableCell>{row.order_id}</TableCell>
                    <TableCell>{row.avail_qty
}</TableCell>
                    {/* <TableCell>{row.breed}</TableCell> */}
                    <TableCell>{row.total_amount}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.Action}</TableCell>
                  </TableRow>
                  )):<TableBody></TableBody>}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              )}
              
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={rows !== undefined ? rows?.length : 0}
                    rowsPerPage={rows !== undefined ? rowsPerPage : 0}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    emptyRows = {emptyRows}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Card>
      )}
    </>
  );
}
