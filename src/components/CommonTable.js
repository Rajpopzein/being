import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const CommonTable = ({columns , apiUrl ,tableHeight}) => {
    console.log(apiUrl);
    const [apiData , setApiData] = useState([]);
    const [page , setPage] = useState(0);
    const [rowsPerpage , setRowsPerPage] = useState(5);
     useEffect(()=>{
           axios.get(apiUrl).then(response=>setApiData(response.data.data)).catch(e=>console.log(e));
     },[apiUrl])

     const handleChangePage = (e , newPage) =>{
        setPage(newPage);
     }
     const handleChangeRowsPage = (e) =>{
        setRowsPerPage(parseInt(e.target.value,10));
        setPage(0);
     }

     const displayedData = apiData.slice(page * rowsPerpage, page * rowsPerpage + rowsPerpage);

  return (
    <>
   
     <TableContainer style={{overflow:'auto',height:tableHeight}}>
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map((column)=>(
                        <TableCell key={column.key}>{column.label}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {displayedData.map((row)=>(
                    <TableRow>
                        {columns.map((column)=>(
                            <TableCell key={column.key}>{row[column.key]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
     </TableContainer>
     <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={apiData.length}
        rowsPerPage={rowsPerpage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPage}
      />
    </>
  );
};

export default CommonTable;
