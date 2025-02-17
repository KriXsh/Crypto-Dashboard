import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

interface DataTableProps {
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Time</TableCell>
          <TableCell>Open</TableCell>
          <TableCell>High</TableCell>
          <TableCell>Low</TableCell>
          <TableCell>Close</TableCell>
          <TableCell>Volume</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{new Date(row.time).toLocaleTimeString()}</TableCell>
            <TableCell>{row.open}</TableCell>
            <TableCell>{row.high}</TableCell>
            <TableCell>{row.low}</TableCell>
            <TableCell>{row.close}</TableCell>
            <TableCell>{row.volume}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
