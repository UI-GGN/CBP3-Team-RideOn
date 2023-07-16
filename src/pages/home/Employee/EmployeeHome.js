import React, {useState} from "react";
import logoImage from "../../../assets/Logo.svg";
import {useAuth0} from "@auth0/auth0-react";
import {
  Box,
  Tab,
  Tabs,
  Stack,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormControl, TextField,
  Paper
} from "@mui/material";
import PaginatedTable from "../../../components/table/PaginatedTable";
import {employeeReqColumns, employeeReqRows} from "../../../data";
import "./EmployeeHome.css";
import AvatarWithPopper from "../../../components/AvatarWithPopper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from '@mui/material/styles';

const TabPanel = ({children, value, index}) => {
  return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
  );
};

const StyledTab = styled(Tab)({
  textTransform: 'none',
  fontSize: '18px'
});

function EmployeeHome() {
  const {user, logout} = useAuth0();
  const msg = `Hello ${user?.given_name},`;
  const [tabIndex, setTabIndex] = useState(0);
  const [isOpen, setOpen] = useState(true);
  const [pickupLocation, setPickupLocation] = React.useState("");
  const [projectCode, setProjectCode] = React.useState("");
  const [pickupLocationErrorText, setPickupLocationErrorText] = React.useState("");
  const [projectCodeErrorText, setProjectCodeErrorText] = React.useState("");
  const [dropLocation, setDropLocation] = React.useState("");
  const [dropLocationErrorText, setDropLocationErrorText] = React.useState("");
  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = (e) => {
    e.preventDefault();

    if (!pickupLocation) {
      setPickupLocationErrorText("Please enter pickup location");
    } else {
      setPickupLocationErrorText("");
    }
    if (!projectCode) {
      setProjectCodeErrorText("Please enter project code");
    } else {
      setProjectCodeErrorText("");
    }
    if (!dropLocation) {
      setDropLocationErrorText("Please enter drop location");
    } else {
      setDropLocationErrorText("");
    }
  };
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  return (
    <>
      <Stack direction={"row"} spacing={2}>
         <img src={logoImage} className="logo"/>
         <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 4,
                marginRight: 4,
                marginLeft: "auto"
              }}
         >
           <AvatarWithPopper imageLink={user?.picture} logout={logout} email={user?.email} name={user?.name} />
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
                    <Typography>
                        <FormControl className="form-control-container">
                            <div>
                                <TextField
                                    sx={{marginRight: "65px"}}
                                    variant="standard"
                                    type="text"
                                    required
                                    placeholder="Project Code"
                                    id="projectCode"
                                    name="projectCode"
                                    className="text-field"
                                    value={projectCode}
                                    error={!!projectCodeErrorText}
                                    helperText={projectCodeErrorText}
                                    onChange={(e) => setProjectCode(e.target.value)}
                                />
                                <DatePicker placeholderText="Select a date and time" selected={startDate} onChange={(date) => setStartDate(date)} minDate={new Date()} dateFormat="Pp" showTimeSelect timeFormat="p"/>
                            </div>
                            <div>
                                <TextField
                                    sx={{marginRight: "65px", marginTop: "30px"}}
                                    variant="standard"
                                    type="text"
                                    required
                                    placeholder="Pickup Location"
                                    id="pickupLocation"
                                    className="text-field"
                                    name="pickupLocation"
                                    value={pickupLocation}
                                    error={!!pickupLocationErrorText}
                                    helperText={pickupLocationErrorText}
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                />
                                <TextField
                                    sx={{marginTop: "30px"}}
                                    variant="standard"
                                    type="text"
                                    required
                                    className="text-field"
                                    placeholder="Drop Location"
                                    id="dropLocation"
                                    name="dropLocation"
                                    value={dropLocation}
                                    error={!!dropLocationErrorText}
                                    helperText={dropLocationErrorText}
                                    onChange={(e) => setDropLocation(e.target.value)}
                                />
                            </div>
                            <Button className="submitButton" variant="contained" size="large" onClick={onSubmit}>
                                Submit Request
                            </Button>
                        </FormControl>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
      <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 4,
            marginRight: 4
          }}
      >
      </Box>
        <Paper elevation={2} variant="outlined"
          sx={{
            marginLeft: 9,
            marginRight: 9,
          }}
        >
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="tabs"
            sx={{
              marginLeft: 4,
              marginRight: 4,
              marginTop: 2,
              marginBottom: -3
            }}>
                <StyledTab label="Upcoming Requests" id="tab-0"/>
                <StyledTab label="Past Requests" id="tab-1" />
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
                <PaginatedTable columns={employeeReqColumns} rows={employeeReqRows} />
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
                <PaginatedTable columns={employeeReqColumns} rows={employeeReqRows} />
            </TabPanel>
        </Paper>
    </>
  );
}

export default EmployeeHome;
