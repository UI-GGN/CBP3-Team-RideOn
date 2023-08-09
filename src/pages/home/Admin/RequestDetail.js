import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Chip} from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./RequestDetail.css";
import {useLocation} from "react-router-dom";

function RequestDetail() {
  const location = useLocation();
  const rowData = location.state?.rowData;

  const getStatusColor = (status) => {
    if (status === "APPROVED") {
      return "primary";
    } else if (status === "PENDING") {
      return "warning";
    } else if (status === "REJECTED") {
      return "error";
    } else {
      return "default";
    }
  };

  return (
    <>
      <div className="cardContainer">
        <Card className="requestDetailCard">
          <CardContent>
            <div className="cardContent">
              <Typography
                className="heading"
                fontSize="1rem"
                fontWeight="bold"
                font="Roboto"
                color="text.primary"
                gutterBottom
              >
                Status
              </Typography>
              <Chip
                label={rowData.status}
                color={getStatusColor(rowData.status)}
                size="small"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="requestDetailCard">
          <CardContent>
            <div className="cardContent">
              <Typography
                fontSize="1rem"
                fontWeight="bold"
                font="Roboto"
                color="text.primary"
                gutterBottom
              >
                Created At
              </Typography>
              <Typography fontSize="0.8rem">{rowData.createdAt}</Typography>
            </div>
          </CardContent>
        </Card>
        <Card sx={{width: "420px"}}>
          <CardContent>
            <div className="cardContent">
              <Typography
                fontSize="1rem"
                fontWeight="bold"
                font="Roboto"
                color="text.primary"
                gutterBottom
              >
                Modified At
              </Typography>
              <Typography fontSize="0.8rem">{rowData.updatedAt}</Typography>
            </div>
          </CardContent>
        </Card>
      </div>
      <Paper className="requestDetailPaper">
        <TableContainer sx={{maxHeight: 440}}>
          <Table aria-label="sticky table">
            <TableRow>
              <TableCell className="requestDetailTableCell">
                <div className="cellHeaderContent">Employee Name</div>
                <div className="cellHeaderContent">Email</div>
                <div className="cellHeaderContent">Project Code</div>
              </TableCell>
              <TableCell align="left">
                <div className="cellContent">
                  {rowData.raisedBy && rowData.raisedBy.name}
                </div>
                <div className="cellContent">
                  {rowData.raisedBy && rowData.raisedBy.email}
                </div>
                <div className="cellContent">{rowData.projectCode}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="requestDetailTableCell">
                <div className="cellHeaderContent">Pickup Location</div>
                <div className="cellHeaderContent">Drop Location</div>
                <div className="cellHeaderContent">Pickup Time</div>
              </TableCell>
              <TableCell align="left">
                <div className="cellContent">{rowData.pickupLocation}</div>
                <div className="cellContent">{rowData.dropLocation}</div>
                <div className="cellContent">{rowData.pickupTime}</div>
              </TableCell>
            </TableRow>
            {rowData && rowData.allotedVendor && (
              <TableRow>
                <TableCell className="requestDetailTableCell">
                  <div className="cellHeaderContent">Vendor Name</div>
                  <div className="cellHeaderContent">Vendor Contact</div>
                </TableCell>
                <TableCell align="left">
                  <div className="cellContent">
                    {rowData && rowData.allotedVendor && rowData.allotedVendor.name}
                  </div>
                  <div className="cellContent">
                    {rowData &&
                      rowData.allotedVendor &&
                      rowData.allotedVendor.contactNumber}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default RequestDetail;
