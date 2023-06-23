import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import {Divider, Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import "./PaginatedTable.css";

export const columns = [
  {id: "employee", label: "Employee"},
  {id: "projectCode", label: "Project Code"},
  {id: "pickup", label: "Pickup"},
  {id: "drop", label: "Drop"},
  {id: "pickupTime", label: "Pickup Time"},
  {id: "status", label: "Status"},
  {id: "action", label: "Action"}];

export const rows = [
  {employee: "CENA", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
  {employee: "JOHN", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
  {employee: "CENA", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
  {employee: "JOHN", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Rejected"},
  {employee: "CENA", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
  {employee: "JOHN", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
  {employee: "CENA", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
  {employee: "JOHN", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Rejected"},
  {employee: "CENA", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
  {employee: "JOHN", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Rejected"},
  {employee: "CENA", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
  {employee: "JOHN", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Rejected"},
  {employee: "CENA", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
  {employee: "JOHN", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Rejected"},
  {employee: "CENA", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
  {employee: "JOHN", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
  {employee: "CENA", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
  {employee: "JOHN", projectCode: "hpb", pickup: "42 metro", drop: "55-56 metro", pickupTime: "9:30", status: "Approved"},
];

export default function PaginatedTable() {
  const [page, setPage] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const rowsPerPage = 10;

  const handleActionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleApprove = (event) => {
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
      <Paper className="table">
        <TableContainer>
          <Table stickyHeader aria-label="sticky table" sx={{ '& .MuiTableCell-root': { padding: '0.13rem', paddingLeft: '1rem' } }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        className="tableHeader"
                    >
                      {column.label}
                    </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="tableBody">
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                        <TableRow hover role="row" tabIndex={-1} key={row.employee}>
                          <TableCell align="left">{row.employee}</TableCell>
                          <TableCell align="left">{row.projectCode}</TableCell>
                          <TableCell align="left">{row.pickup}</TableCell>
                          <TableCell align="left">{row.drop}</TableCell>
                          <TableCell align="left">{row.pickupTime}</TableCell>
                          <TableCell align="left"><Chip label={row.status} color={row.status === 'Approved' ? 'primary' : 'error'} size="small"/></TableCell>
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
                                  vertical: 'bottom',
                                  horizontal: 'center',
                                }}
                                PaperProps={{
                                  className: 'popOver',
                                }}
                            >
                              <div className='popOverButton'>
                                <Button variant="text" onClick={handleApprove}>Approve</Button>
                                <Divider/>
                                <Button variant="text" >Reject</Button>
                              </div>
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
            SelectProps={{className: 'tablePagination'}}
        />
      </Paper>
  );
}
