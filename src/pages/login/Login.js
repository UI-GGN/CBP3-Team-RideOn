import React from "react";
import {Button} from "@mui/material";
import loginImage from "../../assets/Login.png";
import logoImage from "../../assets/Logo.png";
import "./Login.css";

function Login() {
  return (
    <div>
      <img src={logoImage} className="logo" />
      <div className="login-page-body">
        <div>
          <img src={loginImage} className="body-left" />
        </div>
        <div className="body-right">
          <div>
            <h3 className="login-heading-text">What is RideOn?</h3>
            <p className="login-body-text">
              Simplifying employee cab management for seamless transportation logistics.
              Effortlessly manage employee transportation with RideOn, the ultimate cab
              management system.
            </p>
          </div>
          <div>
            <p className="login-body-text">
              To book track or manage, click the button below
            </p>
            <Button variant="contained" size="large">
              LOGIN WITH GOOGLE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
