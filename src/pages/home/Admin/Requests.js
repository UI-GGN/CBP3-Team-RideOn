import React, {useState} from "react";
import "./AdminHome.css";
import PaginatedTable from "../../../components/table/PaginatedTable";
import {Box, Button} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import "./Request.css";
import {saveAs} from "file-saver";
import {adminReqColumns} from "../../../tableHeader";
import {useGetAllRequest} from "../../../services/Request/useGetAllRequest";
import {getDateTime} from "../../../utils/DateTimeConvertor";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import {useExportAllRequests} from "../../../services/Request/useExportAllRequests";
import {APIStatus} from "../../../reducers/api-reducer";

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
  const [fromDate, setFromDate] = useState(null);
  const [tillDate, setTillDate] = useState(null);
  const {fetchData} = useExportAllRequests();

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

  const getFileName = () => {
    return `Cab-Request-${fromDate}-${tillDate}`;
  };

  const reset = () => {
    setTillDate(null);
    setFromDate(null);
  };

  const handleDownload = async () => {
    if (!(fromDate && tillDate)) {
      return null;
    }
    const {response, status} = await fetchData({fromDate, tillDate});
    const data = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = getFileName();
    saveAs(data, fileName);
    if (status === APIStatus.FAILED) {
      showErrorToastUpdateReq("Unable to Download");
    }
    reset();
  };

  return (
    <>
      <Box className="requestMain">
        <PaginatedTable
          columns={adminReqColumns}
          rows={employeeRowData}
          page={page}
          handleChangePage={handleChangePage}
          count={requestList?.metadata?.total}
          apiStatus={status}
          reRenderReqPageAdmin={reRenderReqPageAdmin}
          showErrorToastUpdateReq={showErrorToastUpdateReq}
          showSuccessToastUpdateReq={showSuccessToastUpdateReq}
        />
        <Box className="downloadContainer">
          <div className="exportLabel" style={{flex: "2"}}>
            Export Requests Report
          </div>
          <div
            className="datepickerContainer"
            style={{
              marginRight: "10px",
              flex: "1",
              display: "flex",
              alignItems: "center",
            }}
          >
            <DatePicker
              required
              wrapperClassName="datePicker"
              placeholderText="From Date"
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
            />
          </div>
          <div
            className="datepickerContainer"
            style={{flex: "1", display: "flex", alignItems: "center"}}
          >
            <DatePicker
              required
              wrapperClassName="datePicker"
              placeholderText="Till Date"
              selected={tillDate}
              onChange={(date) => setTillDate(date)}
            />
          </div>
          <Button
            disabled={!(fromDate && tillDate)}
            className="downloadButton"
            variant="contained"
            size="medium"
            onClick={handleDownload}
            style={{flex: "1", display: "flex", alignItems: "center"}}
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
