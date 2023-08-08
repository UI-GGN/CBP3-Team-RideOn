import React, {useState} from "react";
import {
  Modal,
  Button,
  Typography,
  TextField,
  FormControl,
  Paper,
  Box,
} from "@mui/material";
import {useUpdateStatus} from "../../services/Request/useUpdateStatus";
import {APIStatus} from "../../reducers/api-reducer";

const paperStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  p: 5,
  elevation: 2,
};

const CancelModal = ({
  open,
  onClose,
  requestId,
  reRenderReqPageAdmin,
  showErrorToastUpdateReq,
  showSuccessToastUpdateReq,
}) => {
  const [comment, setComment] = useState("");
  const {apiStatus, updateStatus} = useUpdateStatus();

  const bodyCancel = {
    status: "REJECTED",
    rejectionReason: comment,
  };

  const handleTextFieldChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    updateStatus(requestId, bodyCancel);
    onClose();
    if (apiStatus === APIStatus.SUCCESS) {
      showSuccessToastUpdateReq("Request Rejected Successfully");
      reRenderReqPageAdmin();
    } else if (apiStatus === APIStatus.FAILED) {
      showErrorToastUpdateReq("Request Update Failed");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper style={paperStyle}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{margin: 25}}
        >
          Reject Request
        </Typography>
        <FormControl fullWidth>
          <TextField
            label="Add Comment"
            value={comment}
            onChange={handleTextFieldChange}
            style={{margin: 25}}
            variant="standard"
          />
        </FormControl>
        <Box style={{marginLeft: 600}}>
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            style={{marginTop: 10, marginRight: 10, marginBottom: 25}}
          >
            Cancel
          </Button>

          <Button
            variant="outlined"
            onClick={handleSubmit}
            style={{marginTop: 10, marginRight: 10, marginBottom: 25}}
          >
            Reject
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CancelModal;
