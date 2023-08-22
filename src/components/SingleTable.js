import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar'
import './style.css'



export default function SingleTable({tdata}) {

const rows = [tdata];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, "&:.MuiTableHead-root":{border:'0px'} }} aria-label="simple table">
        <TableHead sx={{'&:MuiTableHead-root':{border:'0px'}}}>
          <TableRow style={{marginBottom:"20px"}}>
            <TableCell></TableCell>
            <TableCell>Pet_Name</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Breed</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Gender</TableCell>
            <TableCell align="left">Age</TableCell>
            <TableCell align="left">Colour</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='singletablebody'>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell ><Avatar src={`https://demo.emeetify.com:5016/${row.profile_pic}`} sx={{width: 70, height: 70}}/></TableCell>
              <TableCell component="th" scope="row">
                {row.pet_name}
              </TableCell>
              <TableCell align="left" >{row.calories}</TableCell>
              <TableCell align="left">{row.breed}</TableCell>
              <TableCell align="left">{row.premium_amount}</TableCell>
              <TableCell align="left">{row.gender}</TableCell>
              <TableCell align="left">{row.age}</TableCell>
              <TableCell align="left">{row.color}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
