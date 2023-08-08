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

function RequestDetail() {
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
              <Chip label="Pending" color="error" size="small" />
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
              <Typography fontSize="0.8rem">24-Mar-2023</Typography>
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
              <Typography fontSize="0.8rem">28-April-2023</Typography>
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
                <div className="cellContent">abc</div>
                <div className="cellContent">text@gmail.com</div>
                <div className="cellContent">Project-abc</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="requestDetailTableCell">
                <div className="cellHeaderContent">Pickup Location</div>
                <div className="cellHeaderContent">Drop Location</div>
                <div className="cellHeaderContent">Pickup Time</div>
              </TableCell>
              <TableCell align="left">
                <div className="cellContent">Location-A</div>
                <div className="cellContent">Location-B</div>
                <div className="cellContent">28-March2023 5:30PM</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="requestDetailTableCell">
                <div className="cellHeaderContent">Vendor Name</div>
                <div className="cellHeaderContent">Vendor Contact</div>
              </TableCell>
              <TableCell align="left">
                <div className="cellContent">abc</div>
                <div className="cellContent">123455</div>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default RequestDetail;
