import "./Dasboard.css";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import PermanentDrawerLeft from "../../component/drawer/PermanentDrawerLeft";

function Dashboard() {
  return <PermanentDrawerLeft />;
}

export default withAuthenticationRequired(Dashboard);
