import React from "react";
import "./AdminHome.css";
import PaginatedTable from "../../../components/PaginatedTable";
import {Box, Button} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import "./Request.css";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import {rows} from "../../../constants";
import {adminReqColumns, adminReqRow} from "../../../data";

function HomeRequests() {
  const convertJsonToWorkbook = (json) => {
    const worksheet = XLSX.utils.json_to_sheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    return workbook;
  };

  const handleDownload = () => {
    const workbook = convertJsonToWorkbook(rows);
    const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
    const data = new Blob([excelBuffer], {type: "application/octet-stream"});
    saveAs(data, "EmployeeRequests.xlsx");
  };

  return (
    <Box className="requestMain">
      <PaginatedTable columns={adminReqColumns} rows={adminReqRow} />
      <Box className="downloadContainer">
        <span>Export Requests Report</span>
        <Button
          className="downloadButton"
          variant="contained"
          size="medium"
          onClick={handleDownload}
        >
          Download <GetAppIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default HomeRequests;
