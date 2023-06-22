import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import {columns, rows} from "../constants";

function BasicTable() {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleaApprove = (event) => {
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Paper>
      <TableContainer component={Paper}>
        {console.lo}
        {/* <text>hi</text> */}
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className="tableHeader"
                  sx={{color: "#757575", fontWeight: "700", fontSize: "15px"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="row" tabIndex={-1} key={row.employee}>
                    {columns.map((column) => {
                      return <TableCell key={column.id}>{row[column.id]}</TableCell>;
                    })}
                    <TableCell align="right">
                      <IconButton aria-label="Example">
                        <FontAwesomeIcon icon={faEllipsisV} onClick={handleClick} />
                      </IconButton>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <Typography sx={{p: 2}}>The content of the Popover.</Typography>
                        <Button
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleaApprove}
                        >
                          Approve
                        </Button>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        labelRowsPerPage={null}
        SelectProps={{style: {display: "none"}}}
      />
    </Paper>
  );
}

export default BasicTable;
