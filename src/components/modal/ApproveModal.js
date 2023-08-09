import React, {useState} from "react";
import {
  Modal,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Box,
} from "@mui/material";
import {useUpdateStatus} from "../../services/Request/useUpdateStatus";
import {useGetVendorsForModal} from "../../services/Request/useGetVendorsForModal";
import {APIStatus} from "../../reducers/api-reducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  p: 5,
  elevation: 2,
};

const ApproveModal = ({
  open,
  onClose,
  requestId,
  reRenderReqPageAdmin,
  showErrorToastUpdateReq,
  showSuccessToastUpdateReq,
}) => {
  const {apiStatus, updateStatus} = useUpdateStatus();
  const [vendorId, setVendorId] = useState("");
  const {data: vendorLists} = useGetVendorsForModal();

  const vendorList = vendorLists?.data;

  const handleChange = (event) => {
    setVendorId(event.target.value);
  };
  const bodyApprove = {
    status: "APPROVED",
    vendorId,
  };

  const handleSubmit = async () => {
    updateStatus(requestId, bodyApprove);
    setVendorId("");
    onClose();
    if (apiStatus === APIStatus.SUCCESS) {
      showSuccessToastUpdateReq("Request Approved Successfully");
      reRenderReqPageAdmin();
    } else if (apiStatus === APIStatus.FAILED) {
      showErrorToastUpdateReq("Request Approval Failed");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{margin: 25}}
        >
          Assign Vendor
        </Typography>
        <Typography id="modal-modal-description" style={{margin: 25}}>
          Select Vendor from the list below to send request details to them via SMS.
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" style={{margin: 25}}>
            Select Vendor
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={vendorId}
            label="Select Vendor"
            onChange={handleChange}
            style={{margin: 25}}
          >
            {vendorList?.map((vendor) => (
              <MenuItem key={vendor._id} value={vendor._id}>
                {vendor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box style={{marginLeft: 580}}>
          <Button
            variant="outlined"
            onClick={onClose}
            color="error"
            style={{marginTop: 10, marginRight: 5, marginBottom: 25}}
          >
            Cancel
          </Button>

          <Button
            variant="outlined"
            onClick={handleSubmit}
            style={{marginTop: 10, marginRight: 5, marginBottom: 25}}
          >
            Approve
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ApproveModal;
