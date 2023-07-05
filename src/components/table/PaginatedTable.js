import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import {
  Divider,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import "./PaginatedTable.css";

const columnAdminWidths = {
  employee: '20%',
  projectCode: '10%',
  pickup: '20%',
  drop: '20%',
  pickupTime: '10%',
  status: '10%',
  action: '10%',
};

const columnEmployeeWidths = {
  pickup: '30%',
  drop: '30%',
  pickupTime: '10%',
  projectCode: '20%',
  status: '10%'
};

export default function PaginatedTable({columns, rows}) {
  // const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10); // Number of rows to display per page

  // Calculate the index of the first row on the current page
  const startIndex = page * rowsPerPage;
  // Slice the rows array based on the start index and rows per page
  const paginatedRows = rows.slice(startIndex, startIndex + rowsPerPage);

  // Handler for changing the page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handler for changing the number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to the first page when changing the rows per page
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const isAdminFlow = columns.slice(-1)[0].id === "action";

  const handleActionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleApprove = (event) => {
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!isAdminFlow) {
    const filteredColumns = columns.filter((item) => item.id !== "action");
    columns = filteredColumns;
  }

  let columnsWithoutActionAndStatus = columns;
  columnsWithoutActionAndStatus = isAdminFlow
    ? columns.slice(0, -2)
    : columns.slice(0, -1);

  // const needWidth30 = ["drop", "status"];
  // const needWidth70 = ["employee", "projectCode", "pickup"];

  return (
    // <Paper className={(isAdminFlow) ? "adminTable" : "employeeTable"}>
    <Paper className="table" elevation={(isAdminFlow) ? 2 : 0}>
      <TableContainer>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{"& .MuiTableCell-root": {padding: "0.59rem", paddingLeft: "1rem"}}}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}
                style={{
                  width:
                  (isAdminFlow) ? columnAdminWidths[column.id] : columnEmployeeWidths[column.id]
                }}
                  className="tableHeader">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="tableBody">
            {paginatedRows.map((row) => {
              return (
                <TableRow className="tableRows" hover key={row.id}>
                  {columnsWithoutActionAndStatus.map((column) => {
                    return (
                      <TableCell className="tableCell" key={column.id}>
                        {row[column.id]}
                      </TableCell>
                    );
                  })}
                  <TableCell align="left" className="chip">
                    <Chip
                      label={row.status}
                      color={row.status === "Approved" ? "primary" : "error"}
                      size="small"
                    />
                  </TableCell>
                  {isAdminFlow && (
                    <TableCell align="justify">
                      <IconButton aria-label="Example">
                        <FontAwesomeIcon icon={faEllipsisV} onClick={handleActionClick} />
                      </IconButton>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        PaperProps={{
                          className: "popOver",
                        }}
                      >
                        <div className="popOverButton">
                          <Button variant="text" onClick={handleApprove}>
                            Approve
                          </Button>
                          <Divider />
                          <Button variant="text">Reject</Button>
                        </div>
                      </Popover>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
        component="div"
        count={rows.length} // Total number of rows
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
