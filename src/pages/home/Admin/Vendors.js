import React, {useState} from "react";
import "./AdminHome.css";
import PaginatedTable from "../../../components/table/PaginatedTable";
import {Box} from "@mui/material";
import "./Request.css";
import {vendorReqColumns} from "../../../tableHeader";
import {useGetAllVendor} from "../../../services/Request/useGetAllVendor";

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

  const handleChangePage = async (_event, newPage) => {
    setPage(newPage);
    setParams({"page-number": newPage + 1, limit: 10});
  };

  return (
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
    </Box>
  );
};

export default HomeVendors;
