import React from "react";
import {Button} from "@mui/material";
import login from "../../assets/Login.png";
import logo from "../../assets/Logo.png";
import "./Login.css";
import {useAuth0} from "@auth0/auth0-react";

function Login() {
  const {loginWithRedirect} = useAuth0();

  return (
    <div>
      <div className="login-header">
        <img src={logo} className="logo" />
      </div>
      <body>
        <div>
          <img src={login} className="body-left" />
        </div>
        <div className="body-right">
          <div>
            <h3 className="login-heading-text">What is RideOn?</h3>
            <p className="login-body-text">
              Simplifying employee cab management for seamless transportation logistics.
              Effortlessly manage employee transportation with RideOn, the ultimate cab
              management system.
              <p>To book track or manage, click the button below</p>
            </p>
            <Button variant="contained" size="large" onClick={() => loginWithRedirect()}>
              LOGIN WITH GOOGLE
            </Button>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Login;
