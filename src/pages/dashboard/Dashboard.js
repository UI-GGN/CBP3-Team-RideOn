import {useAuth0} from "@auth0/auth0-react";
import "./Dasboard.css";
import PermanentDrawerLeft from "../../component/drawer/PermanentDrawerLeft";

function Dashboard() {
  const {user, isAuthenticated} = useAuth0();
  return (
    isAuthenticated &&
    user && (
        <PermanentDrawerLeft />
    )
  );
}

export default Dashboard;
