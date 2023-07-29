import React, { useState } from "react";
import "./AdminHome.css";
import PaginatedTable from "../../../components/table/PaginatedTable";
import {Box, Button} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import "./Request.css";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import {rows} from "../../../constants";
import {adminReqColumns} from "../../../data";
import {useGetAllRequest} from "../../../services/Request/useGetAllRequest";
import {getDateTime} from "../../../utils/DateTimeConvertor";

const getAdminRowData = (requestList) => {
  const {data} = requestList;
  return data?.map((employee) => {
    return {
      ...employee,
      pickupTime: getDateTime(employee.pickupTime),
      employeeName: employee.raisedBy?.name,
    };
  });
};

function HomeRequests() {
  const [page, setPage] = useState(0);
  const [params, setParams] = useState({"page-number": 1, limit: 10});
  const {response: requestList, status} = useGetAllRequest(params);
  const employeeRowData = getAdminRowData(requestList);

  const convertJsonToWorkbook = (json) => {
    const worksheet = XLSX.utils.json_to_sheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    return workbook;
  };

  const handleChangePage = async (_event, newPage) => {
    setPage(newPage);
    setParams({"page-number": newPage + 1, limit: 10});
  };

  const handleDownload = () => {
    const workbook = convertJsonToWorkbook(rows);
    const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
    const data = new Blob([excelBuffer], {type: "application/octet-stream"});
    saveAs(data, "EmployeeRequests.xlsx");
  };

  return (
    <Box className="requestMain">
        <PaginatedTable columns={adminReqColumns} rows={employeeRowData} page={page}
        handleChangePage={handleChangePage} count={requestList?.metadata?.total} apiStatus={status}/>
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
