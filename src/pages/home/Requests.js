import React from "react";
import BreadCrumb from "../../component/BreadCrumb";
import "./Home.css";
import PaginatedTable from "../../component/PaginatedTable";
import {Box, Button} from "@mui/material";
import GetAppIcon from '@mui/icons-material/GetApp';
import './Request.css';

function HomeRequests() {
  const obj = ["Home", "Requests"];

  function handleDownload() {

  }

  return (
    <>
      <div className="breadcrumb">
        <BreadCrumb values={obj} />
      </div>
      <PaginatedTable />
      <Box className="downloadContainer">
         <span>Export Requests Report</span>
         <Button className="downloadButton" variant="contained" size="medium" onClick={handleDownload}>
           Download <GetAppIcon />
         </Button>
      </Box>
    </>
  );
}

export default HomeRequests;
