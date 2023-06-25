import React, {useState} from "react";
import logoImage from "../../assets/Logo.svg";
import {useAuth0} from "@auth0/auth0-react";
import {Box, Tab, Tabs} from "@mui/material";
import PaginatedTable from "../../components/PaginatedTable";
import {employeeReqColumns, employeeReqRows} from "../../data";

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
      <img src={logoImage} className="logo"/>
      <h4 className="welcomeMessage" style={{
        color: "rgba(0, 0, 0, 0.60)",
        marginTop: "70px",
        marginLeft: "90px",
        fontSize: "24px",
        fontFamily: "Roboto",
        fontWeight: 500,
        lineHeight: "20px",
        letterSpacing: "0.5px"
      }}>{msg}</h4>
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
