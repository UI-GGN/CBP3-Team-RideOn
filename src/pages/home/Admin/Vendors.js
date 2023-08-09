import React, {useState} from "react";
import "./AdminHome.css";
import PaginatedTable from "../../../components/table/PaginatedTable";
import {Box, FormControl, Input, Button} from "@mui/material";
import "./Vendors.css";
import {vendorReqColumns} from "../../../tableHeader";
import {useGetAllVendor} from "../../../services/Request/useGetAllVendor";
import {useVendorBulkUpload} from "../../../services/Request/useVendorBulkUpload";
import {APIStatus} from "../../../reducers/api-reducer";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetAppIcon from "@mui/icons-material/GetApp";

const getVendorRows = (requestList) => {
  return requestList?.data;
};

const columnVendorWidths = {
  name: "50%",
  contactNumber: "50%",
};

const HomeVendors = () => {
  const [page, setPage] = useState(0);
  const [params, setParams] = useState({"page-number": 1, limit: 10});
  const {response: requestList, status} = useGetAllVendor(params);
  const vendorRowData = getVendorRows(requestList);
  const [vendorExcelFile, setVendorExcelFile] = useState("");
  const {bulkUploadVendor} = useVendorBulkUpload();
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleChangePage = async (_event, newPage) => {
    setPage(newPage);
    setParams({"page-number": newPage + 1, limit: 10});
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setVendorExcelFile(file);
  };

  const reset = () => {
    setFileInputKey(Math.random().toString(36));
    setVendorExcelFile("");
  };

  const handleOnSubmit = async () => {
    const formData = new FormData();
    formData.append("file", vendorExcelFile);
    const status = await bulkUploadVendor(formData);
    if (status === APIStatus.SUCCESS) {
      showSuccessToastMessage();
      setParams({"page-number": 1, limit: 10});
    } else {
      showErrorToastMessage();
    }
    reset();
  };

  const showSuccessToastMessage = () => {
    toast.success("Successfully uploaded Vendors!");
  };

  const showErrorToastMessage = () => {
    toast.error("Failed to upload the vendors!");
  };

  return (
    <>
      <Box className="requestMain" style={{paddingBottom: 30}}>
        <PaginatedTable
          columns={vendorReqColumns}
          rows={vendorRowData}
          page={page}
          handleChangePage={handleChangePage}
          count={requestList?.metadata?.total}
          apiStatus={status}
          width={columnVendorWidths}
          elevation={2}
        />
        <Box className="uploadContainer">
          <span>Bulk Upload Vendors</span>
          <FormControl>
            <Input
              key={fileInputKey || ""}
              type="file"
              id="file-input"
              inputProps={{accept: ".xls, .xlsx"}}
              onChange={handleFileUpload}
            />
          </FormControl>
          <Button
            className="uploadButton"
            variant="contained"
            size="medium"
            onClick={handleOnSubmit}
          >
            Submit <GetAppIcon />
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default HomeVendors;
