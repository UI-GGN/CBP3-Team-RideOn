import "./Dasboard.css";
import {useAuth0} from "@auth0/auth0-react";
import PermanentDrawerLeft from "../../component/drawer/PermanentDrawerLeft";
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import * as React from 'react';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';

function Dashboard() {
  const {logout} = useAuth0();
  const listItems = [
    {
      key: "Routes",
      to: "routes",
      text: "Routes",
      icon: <DirectionsOutlinedIcon className="icon" />
    },
    {
      key: "Requests",
      to: "requests",
      text: "Requests",
      icon: <BackHandOutlinedIcon className="icon" />
    }
  ];

  return <PermanentDrawerLeft props={{logout, data: "hi", listItems}}/>;
}

export default Dashboard;
