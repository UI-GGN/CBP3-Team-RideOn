import React from "react";
import {Button} from "@mui/material";
import img from "../../images/Login.png";
import logo from "../../images/Logo.png";
import "./Login.css";

function Login() {
  return (
    <div>
      <div className="login-header">
        <header className="header">
          <img src={logo} />
        </header>
      </div>
      <body className="login-body">
        <div className="body-left">
          <img src={img} />
        </div>
        <div className="body-right">
          <div>
            <p className="intro-text">
              <h3>What is RideOn?</h3>
              <p>
                Simplifying employee cab management for seamless transportation logistics.
                Effortlessly manage employee transportation with RideOn, the ultimate cab
                management system.
              </p>
              <p>To book track or manage, click the button below</p>
            </p>
            <Button variant="contained" size="medium">
              LOGIN WITH GOOGLE
            </Button>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Login;
