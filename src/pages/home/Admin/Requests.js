import React, { useState } from "react";
import "./AdminHome.css";
import PaginatedTable from "../../../components/table/PaginatedTable";
import {Box, Button} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import "./Request.css";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import {rows} from "../../../constants";
import {adminReqColumns} from "../../../tableHeader";
import {useGetAllRequest} from "../../../services/Request/useGetAllRequest";
import {getDateTime} from "../../../utils/DateTimeConvertor";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import { useExportAllRequests } from '../../../services/Request/useExportAllRequests';

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
  const [render, setRender] = useState(1);
  const {response: requestList, status} = useGetAllRequest(params, render);
  const employeeRowData = getAdminRowData(requestList);
  const [fromDate, setFromDate] = useState();
  const [tillDate, setTillDate] = useState();
  const {response, fetchData} = useExportAllRequests();

  const convertJsonToWorkbook = (json) => {
    // fetchData({fromDate, tillDate});
    // console.log({response});
    const worksheet = XLSX.utils.json_to_sheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    return workbook;
  };

  const handleChangePage = async (_event, newPage) => {
    setPage(newPage);
    setParams({"page-number": newPage + 1, limit: 10});
  };

  const reRenderReqPageAdmin = () => {
    setRender(render + 1);
  };

  const showSuccessToastUpdateReq = (message) => {
    toast.success(message);
  };

  const showErrorToastUpdateReq = (message) => {
    toast.error(message);
  };

  const handleDownload = () => {
    // const workbook = convertJsonToWorkbook(rows);
    fetchData({fromDate, tillDate});
    const data = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    saveAs(data, "EmployeeRequestsList.xlsx");
  };

  return (
    <>
    <Box className="requestMain">
        <PaginatedTable columns={adminReqColumns} rows={employeeRowData} page={page}
        handleChangePage={handleChangePage} count={requestList?.metadata?.total} apiStatus={status}
        reRenderReqPageAdmin={reRenderReqPageAdmin}
        showErrorToastUpdateReq={showErrorToastUpdateReq}
        showSuccessToastUpdateReq={showSuccessToastUpdateReq}
        />
      <Box className="downloadContainer">
        <div className="exportLabel" style={{ flex: "2" }}>Export Requests Report</div>
        <div className="datepickerContainer" style={{ marginRight: "10px", flex: "1", display: "flex", alignItems: "center" }}>
          <DatePicker
            wrapperClassName="datePicker"
            placeholderText="From Date"
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            minDate={new Date()}
          />
        </div>
        <div className="datepickerContainer" style={{ flex: "1", display: "flex", alignItems: "center" }}>
          <DatePicker
            wrapperClassName="datePicker"
            placeholderText="Till Date"
            selected={tillDate}
            onChange={(date) => setTillDate(date)}
            minDate={new Date()}
          />
        </div>
        <Button
          className="downloadButton"
          variant="contained"
          size="medium"
          onClick={handleDownload}
          style={{ flex: "1", display: "flex", alignItems: "center"}}
        >
          Download <GetAppIcon />
        </Button>
      </Box>
    </Box>
    <ToastContainer />
    </>
  );
}

export default HomeRequests;
