import React, {useState} from "react";
import "./AdminHome.css";
import PaginatedTable from "../../../components/table/PaginatedTable";
import {Box, Button} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import "./Request.css";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import {rows} from "../../../constants";
import {adminReqColumns, adminReqRow} from "../../../data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function HomeRequests() {
  const [fromDate, setFromDate] = useState();
  const [tillDate, setTillDate] = useState();

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
        <div className="exportLabel" style={{ flex: "2" }}>Export Requests Report</div>
        <div className="datepickerContainer" style={{ marginRight: "10px", flex: "1", display: "flex", alignItems: "center" }}>
        <DatePicker
              wrapperClassName="datePicker"
              placeholderText="From Date"
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              minDate={new Date()}
              dateFormat="Pp"
          />
        </div>
        <div className="datepickerContainer" style={{ flex: "1", display: "flex", alignItems: "center" }}>
        <DatePicker
              wrapperClassName="datePicker"
              placeholderText="Till Date"
              selected={tillDate}
              onChange={(date) => setTillDate(date)}
              minDate={new Date()}
              dateFormat="Pp"
          />
        </div>
        <Button
            style={{ flex: "1", display: "flex", alignItems: "center"}}
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
