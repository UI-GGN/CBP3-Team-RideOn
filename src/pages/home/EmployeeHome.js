import React, {useState} from "react";
import logoImage from "../../assets/Logo.svg";
import {useAuth0} from "@auth0/auth0-react";
import {Box, Tab, Tabs, Stack} from "@mui/material";
import PaginatedTable from "../../components/PaginatedTable";
import {employeeReqColumns, employeeReqRows} from "../../data";
import "./EmployeeHome.css";
import Avatar from "../../components/Avatar";
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
function EmployeeHome() {
  const {user} = useAuth0();
  const msg = `Hello ${user?.given_name},`;
  const [tabIndex, setTabIndex] = useState(0);

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
           <Avatar imageLink={user?.picture} />
         </Box>
      </Stack>
      <h4 className="welcomeMessage">{msg}</h4>
      <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 4,
            marginRight: 4,
          }}
      >
      </Box>
        <div>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="tabs">
                <Tab label="Upcoming Requests" id="tab-0" />
                <Tab label="Past Requests" id="tab-1" />
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
                <PaginatedTable columns={employeeReqColumns} rows={employeeReqRows} />
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
                <PaginatedTable columns={employeeReqColumns} rows={employeeReqRows} />
            </TabPanel>
        </div>
    </>
  );
}

export default EmployeeHome;
