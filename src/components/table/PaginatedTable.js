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
import CircularProgress from '@mui/material/CircularProgress';
import { APIStatus } from "../../reducers/api-reducer";

const columnAdminWidths = {
  employee: "20%",
  projectCode: "10%",
  pickup: "20%",
  drop: "20%",
  pickupTime: "10%",
  status: "10%",
  action: "10%",
};

const columnEmployeeWidths = {
  pickup: "22%",
  drop: "22%",
  pickupTime: "21%",
  projectCode: "25%",
  status: "10%",
};

export default function PaginatedTable({columns, rows, page, handleChangePage, count, apiStatus, flow}) {
  // const classes = useStyles();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10); // Number of rows to display per page

  // Calculate the index of the first row on the current page
  // const startIndex = page * rowsPerPage;
  // Slice the rows array based on the start index and rows per page
  // const paginatedRows = rows.slice(startIndex, startIndex + rowsPerPage);
  // const paginatedRows = rows;

  // Handler for changing the page
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // Handler for changing the number of rows per page
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0); // Reset page to the first page when changing the rows per page
  // };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const numberOfRowsPerPage = 10;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const isAdminFlow = columns.slice(-1)[0].id === "action";
  const isLoadingOrError = apiStatus === APIStatus.FAILED || apiStatus === APIStatus.LOADING;
  const isError = apiStatus === APIStatus.FAILED;
  const emptyRows = page > 0 ? numberOfRowsPerPage - rows.length : 0;

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

  return (
    <Paper className="table" elevation={isAdminFlow ? 2 : 0}>
      <TableContainer>
        <Table
          stickyHeader
          aria-label="sticky table"
          style={{ tableLayout: "fixed", height: "44rem", overflowY: "auto", overflowX: "auto"}}
          sx={{"& .MuiTableCell-root": {padding: "0.59rem", paddingLeft: "1rem"}}}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    width: isAdminFlow
                      ? columnAdminWidths[column.id]
                      : columnEmployeeWidths[column.id],
                  }}
                  className="tableHeader"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="tableBody">
          { isLoadingOrError
            ? (
              <TableRow>
                <TableCell rowSpan={10} colSpan={columns.length} align="center">
                  {isError ? <p> Something went wrong, Please try again!! </p> : <CircularProgress /> }
                </TableCell>
              </TableRow>
              )
            : rows?.length === 0
              ? (
            <TableRow>
              <TableCell rowSpan={10} colSpan={columns.length} align="center">
                 <p> Nothing Found </p>
              </TableCell>
            </TableRow>)
              : rows?.map((row) => {
                return (
                <TableRow className="tableRows" hover key={row.id}>
                  {columnsWithoutActionAndStatus.map((column) => {
                    return (
                      <TableCell component="th" className="tableCell" key={column.id}>
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
              })
          }
          { emptyRows > 0 && apiStatus === APIStatus.SUCCESS && (
            <TableRow
              style={{
                height: 56 * emptyRows,
              }}
            >
               <TableCell colSpan={columns.length}/>
            </TableRow>
          )}
          </TableBody>
        </Table>
        <TablePagination
        className="tablefooter"
        rowsPerPageOptions={[10]}
        component="div"
        count={count}
        page={page}
        rowsPerPage={10}
        onPageChange={handleChangePage}
      />
      </TableContainer>
    </Paper>
  );
}
