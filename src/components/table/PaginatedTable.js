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
import logoImage from "../../../src/assets/Logo.svg";

export default function PaginatedTable({ columns, rows, page, handleChangePage, count, apiStatus, width, elevation }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const numberOfRowsPerPage = 10;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const isLoadingOrError = apiStatus === APIStatus.FAILED || apiStatus === APIStatus.LOADING;
  const isError = apiStatus === APIStatus.FAILED;
  const emptyRows = page > -1 ? numberOfRowsPerPage - rows?.length : 0;

  const handleActionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleApprove = (event) => {
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ErrorComponent = () => {
    return (<>
   <img src={logoImage} />
   <p> Something went wrong, Please try again!! </p>
    </>);
  };

  const NoDataFoundComponent = () => {
    return (<>
     <img src={logoImage} />
     <p> There are no requests to show right now</p>
    </>);
  };

  return (
    <Paper className="table" elevation={elevation}>
      <TableContainer>
        <Table
          stickyHeader
          aria-label="sticky table"
          style={{ tableLayout: "fixed", height: "44rem"}}
          sx={{ "& .MuiTableCell-root": { padding: "0.59rem", paddingLeft: "1rem" } }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    width
                  }}
                  className="tableHeader"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="tableBody">
            {isLoadingOrError
              ? (
                <TableRow>
                  <TableCell rowSpan={10} colSpan={columns.length} align="center" className="errorHandle">
                    {isError ? <ErrorComponent/> : <CircularProgress />}
                  </TableCell>
                </TableRow>
                )
              : rows?.length === 0 && apiStatus === APIStatus.SUCCESS
                ? (
                  <TableRow>
                    <TableCell rowSpan={10} colSpan={columns.length} align="center" className="errorHandle">
                      <NoDataFoundComponent/>
                    </TableCell>
                  </TableRow>)
                : rows?.map((row, index) => {
                  return (
                    <TableRow className="tableRows" hover key={row.id}>
                      {columns?.map((column) => {
                        if (column?.id === "status") {
                          return (
                            <TableCell align="left" className="chip" key={index}>
                              <Chip
                                label={row.status}
                                color={row.status === "Approved" ? "primary" : "error"}
                                size="small"
                              />
                            </TableCell>);
                        } else if (column?.id === "action") {
                          return (<TableCell align="justify" key={index}>
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
                          </TableCell>);
                        } else {
                          return (<TableCell component="th" className="tableCell" key={index}>
                            {row[column.id]}
                          </TableCell>);
                        }
                      })}
                    </TableRow>
                  );
                })
            }
            {emptyRows > 0 && apiStatus === APIStatus.SUCCESS && (
              <TableRow
                style={{
                  height: 56 * emptyRows,
                }}
              >
                <TableCell colSpan={columns.length} />
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
