import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const DataTable=({data})=>{
    <TableContainer>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Product id</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock Available</TableCell>
                <TableCell>Action</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {data !== undefined &&
                data?.map((a)=>{
                    <TableRow >
                        <TableCell>{a.stock_type}</TableCell>
                        <TableCell>{a.name}</TableCell>
                        <TableCell>{a.name}</TableCell>
                        <TableCell>{a.name}</TableCell>
                        <TableCell>{a.name}</TableCell>
                        <TableCell>{a.name}</TableCell>
                        <TableCell>{a.name}</TableCell>
                    </TableRow>
                   
                })    
            }
        </TableBody>
    </Table>
</TableContainer>
}

export default DataTable