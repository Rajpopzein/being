import * as React from 'react';
import  {DataGrid}  from '@mui/x-data-grid';
import '../components/style.css'

const columns = [
  { field: 'Date', headerName: 'Date', width: 120, height: 80 },
  { field: 'Orderid', headerName: 'Order id', width: 130 },
  { field: 'Category', headerName: 'Last name', width: 130 },
  {
    field: 'Breed',
    headerName: 'Breed',
    // type: 'number',
    width: 90,
  },
  {
    field: 'Price',
    headerName: 'Price',
    width: 140,
  },
  {
    field: 'User',
    headerName: 'User',
    width: 140,
  },
  {
    field: 'Location',
    headerName: 'Location',
    width: 140,
  },
  {
    field: 'Status',
    headerName: 'Status',
    width: 140,
  },
  {
    field: 'Action',
    headerName: 'Action',
    width: 140,
  },
];

const rows = [
  { id: 1, Date: "20/10/2000", Orderid: '000001', firstName: 'Jon', age: 35 ,},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height:"auto", width: '100%' }}>
      <DataGrid
        sx={{"& .MuiDataGrid-row":{margin:'20px',width:"95%", borderRadius:'20px', backgroundColor:'#fff'},backgroundColor:'#f5f3f6',"& .css-yrdy0g-MuiDataGrid-columnHeaderRow":{margin:'20px',width:"95%", borderRadius:'20px'},"& .MuiDataGrid-columnHeaders":{backgroundColor:'#fff', border:'0px',height:"500px"},"& .css-1wyagrc-MuiDataGrid-root":{border:"0px", borderStyle:'none'}}}
        rows={rows}
        columns={columns}
        className='datagrid'
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        // pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
