import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";

import TablePaginationActions from "../Layout/TablePaginationAction";

const ProducrInOrder = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = props.products.map((p) => {
    return {
      name: p.product_name,
      color: p.color?.hex_value,
      price: p.price,
      quantity: p.amount,
    };
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%" }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <span
                  style={{
                    height: "25px",
                    width: "25px",
                    borderColor: row.color === "" ? "#000000" : row.color,
                    borderStyle: "solid",
                    borderWidth: "0.2em",
                    backgroundColor: row.color,
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                ></span>
                {}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.price}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.quantity}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "products per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ProducrInOrder;
