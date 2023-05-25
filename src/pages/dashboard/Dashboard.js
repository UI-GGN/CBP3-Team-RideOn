import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";
import "./Dasboard.css";

function Dashboard() {
  const {logout, user} = useAuth0();
  return (
    <div className="dashboard">
      <Button variant="contained" size="large" onClick={() => logout()}>
        Logout
      </Button>
        {console.log(user)}
      <div className="welcome-message">Welcome to Ride On {user ? user.name : ""}</div>
    </div>
  );
}

export default Dashboard;
