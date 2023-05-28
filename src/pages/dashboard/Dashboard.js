import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";
import "./Dasboard.css";

function Dashboard() {
  const {logout, user, isAuthenticated} = useAuth0();
  return (
    isAuthenticated && user &&
      <div className="dashboard">
    <Button variant="contained" size="large" onClick={logout}>
        Logout
      </Button>
      { user?.name && <div className="welcome-message">Welcome to Ride On { user.name }</div>}
      { user?.my_roles?.[0] && <div className="welcome-message">Your Role is: {user.my_roles[0]}</div>}
    </div>
  );
}

export default Dashboard;
