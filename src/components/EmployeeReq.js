import PaginatedTable from '../components/PaginatedTable';
import React, { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import { employeeReqColumns, employeeReqRows } from "../data";

const TabPanel = ({ children, value, index }) => {
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

const App = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="tabs">
        <Tab label="Upcoming Requests" id="tab-0" />
        <Tab label="Past Requests" id="tab-1" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <PaginatedTable columns={employeeReqColumns} rows={employeeReqRows}/>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <PaginatedTable columns={employeeReqColumns} rows={employeeReqRows}/>
      </TabPanel>
    </div>
  );
};

export default App;
