import React from "react";
import BreadCrumb from "../../component/BreadCrumb";
import "./Home.css";
import PaginatedTable from "../../component/PaginatedTable";
import {Box, Button, IconButton} from "@mui/material";
import GetAppIcon from '@mui/icons-material/GetApp';
import { DatePicker } from '@mui/lab';

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
      <Box sx={{display: 'flex', boxShadow: '10px solid gray', flexDirection: 'row', border: '1px solid gray', margin: '2rem', width: "92.2%", borderRadius: '5px', padding: '1rem', justifyContent: 'space-between'}}>
          <span>Export Requests Report</span>
          <DatePicker label="From Date" />
          <DatePicker label="Till Date" />
          <Button variant="contained" color="primary" size="medium" onClick={handleDownload}>
              Download
              <IconButton>
                  <GetAppIcon />
              </IconButton>
          </Button>
      </Box>
    </>
  );
}

export default HomeRequests;
