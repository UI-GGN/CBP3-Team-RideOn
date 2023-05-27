import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";
import "./Dasboard.css";

function Dashboard() {
  const {logout, user, isAuthenticated} = useAuth0();
  return (
    isAuthenticated &&
      <div className="dashboard">
    <Button variant="contained" size="large" onClick={() => logout()}>
        Logout
      </Button>
      <div className="welcome-message">Welcome to Ride On {user ? user.name : ""}</div>
      <div className="welcome-message">Your Role is: {user ? user.my_roles[0] : ""}</div>
    </div>
  );
}

export default Dashboard;
