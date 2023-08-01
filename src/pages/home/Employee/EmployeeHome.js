import React, {useEffect, useState} from "react";
import logoImage from "../../../assets/Logo.svg";
import {useAuth0} from "@auth0/auth0-react";
import {
  Box,
  Stack,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormControl,
  TextField,
  Paper,
  Container,
} from "@mui/material";
import PaginatedTable from "../../../components/table/PaginatedTable";
import {employeeReqColumns} from "../../../data";
import "./EmployeeHome.css";
import AvatarWithPopper from "../../../components/AvatarWithPopper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useGetAllRequest} from "../../../services/Request/useGetAllRequest";
import {getDateTime} from "../../../utils/DateTimeConvertor";
import {useAxios} from "../../../contexts/axios-context";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getEmployeeRowData = (responseList) => {
  const {data} = responseList;
  return data?.map((employee) => {
    return {
      ...employee,
      pickupTime: getDateTime(employee.pickupTime),
    };
  });
};

function EmployeeHome() {
  const {user, logout} = useAuth0();
  const msg = `Hello ${user?.given_name},`;
  const [isOpen, setOpen] = useState(true);
  const [pickupLocation, setPickupLocation] = React.useState("");
  const [projectCode, setProjectCode] = React.useState("");
  const [pickupLocationErrorText, setPickupLocationErrorText] = React.useState("");
  const [projectCodeErrorText, setProjectCodeErrorText] = React.useState("");
  const [dropLocation, setDropLocation] = React.useState("");
  const [dropLocationErrorText, setDropLocationErrorText] = React.useState("");
  const [params, setParams] = React.useState("render");
  const [getAllRequestList, setAllRequestList] = React.useState([]);
  const [pickupTime, setPickupTime] = useState();
  const axiosInstance = useAxios();
  const {response: responseList} = useGetAllRequest(params);

  useEffect(() => {
    const list = getEmployeeRowData(responseList);
    setAllRequestList(list);
  }, [responseList]);

  async function saveData(properties) {
    try {
      return await axiosInstance.post("/requests", {...properties});
    } catch (e) {
      console.error(e);
    }
  }
  const reset = () => {
    setPickupLocation("");
    setDropLocation("");
    setProjectCode("");
    setPickupTime();
  };

  const showSuccessToastMessage = () => {
    toast.success("Request saved successfully !");
  };

  const showErrorToastMessage = () => {
    toast.error("Failed to save request !");
  };

  const date = new Date();

  const onSubmit = async (e) => {
    e.preventDefault();
    let error = false;

    if (!pickupLocation) {
      error = true;
      setPickupLocationErrorText("Please enter pickup location");
    } else {
      setPickupLocationErrorText("");
    }
    if (!projectCode) {
      error = true;
      setProjectCodeErrorText("Please enter project code");
    } else {
      setProjectCodeErrorText("");
    }
    if (!dropLocation) {
      error = true;
      setDropLocationErrorText("Please enter drop location");
    } else {
      setDropLocationErrorText("");
    }
    if (pickupTime === undefined) {
      error = true;
    }
    if (!error) {
      const request = {
        pickupLocation,
        dropLocation,
        projectCode,
        pickupTime,
      };
      const saveResponse = await saveData(request);
      if (saveResponse && saveResponse.status === 201) {
        showSuccessToastMessage();
        reset();
        setParams("Render request");
      } else {
        showErrorToastMessage();
      }
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{marginBottom: "30px"}}>
        <Stack direction={"row"} spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <img src={logoImage} className="logo" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 4,
              marginLeft: "auto",
            }}
          >
            <AvatarWithPopper
              imageLink={user?.picture}
              logout={logout}
              email={user?.email}
              name={user?.name}
            />
          </Box>
        </Stack>
        <h4 className="welcomeMessage">{msg}</h4>
        <Box sx={{marginLeft: 9, marginRight: 9}}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => setOpen(!isOpen)}
            >
              <Typography className="accordianMessage">
                {isOpen
                  ? "Planning an upcoming travel, create your travel request here"
                  : "Fill the form to create a new travel request"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails onFocus={() => setOpen(false)}>
              <FormControl className="create-request-form">
                <div style={{display: "flex"}}>
                  <TextField
                    sx={{flex: 1, marginRight: "30px", marginLeft: "30px"}}
                    variant="standard"
                    type="text"
                    required
                    label="Project Code"
                    id="projectCode"
                    inputProps={{"data-testid": "projectCode"}}
                    name="projectCode"
                    className="text-field"
                    value={projectCode}
                    error={!!projectCodeErrorText}
                    helperText={projectCodeErrorText}
                    onChange={(e) => setProjectCode(e.target.value)}
                  />
                  <DatePicker
                    wrapperClassName="datePicker"
                    required
                    placeholderText="Pickup Date and Time *"
                    selected={pickupTime}
                    onChange={(date) => setPickupTime(date)}
                    minDate={date}
                    minTime={date.setHours(date.getHours() + 1)}
                    maxTime={date.setHours(23, 59, 0, 0)}
                    timeIntervals={15}
                    dateFormat="Pp"
                    showTimeSelect
                    timeFormat="p"
                  />
                </div>
                <div style={{display: "flex"}}>
                  <TextField
                    sx={{
                      flex: 1,
                      marginRight: "30px",
                      marginLeft: "30px",
                      marginTop: "10px",
                    }}
                    variant="standard"
                    required
                    label="Pickup Location"
                    id="pickupLocation"
                    inputProps={{"data-testid": "pickupLocation"}}
                    name="pickupLocation"
                    value={pickupLocation}
                    error={!!pickupLocationErrorText}
                    helperText={pickupLocationErrorText}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  />
                  <TextField
                    sx={{
                      flex: 1,
                      marginRight: "30px",
                      marginLeft: "30px",
                      marginTop: "10px",
                    }}
                    variant="standard"
                    required
                    label="Drop Location"
                    id="dropLocation"
                    inputProps={{"data-testid": "dropLocation"}}
                    name="dropLocation"
                    value={dropLocation}
                    error={!!dropLocationErrorText}
                    helperText={dropLocationErrorText}
                    onChange={(e) => setDropLocation(e.target.value)}
                  />
                </div>
                <Button
                  className="submitButton"
                  variant="contained"
                  size="large"
                  onClick={onSubmit}
                >
                  Submit Request
                </Button>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 4,
            marginRight: 4,
          }}
        ></Box>
        <Paper
          elevation={2}
          variant="outlined"
          sx={{
            marginLeft: 9,
            marginRight: 9,
          }}
        >
          <PaginatedTable columns={employeeReqColumns} rows={getAllRequestList} />
        </Paper>
      </Container>
      <ToastContainer />
    </>
  );
}

export default EmployeeHome;
