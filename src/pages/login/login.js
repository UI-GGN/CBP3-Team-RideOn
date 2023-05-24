import React from "react";
import {Button} from "@mui/material";
import img from "../../images/login.png";
import logo from "../../images/Logo.png";
function Login() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <img src={logo} width={180} />
        </header>
      </div>
      <body>
        <div className="Parent1">
          <div className="child1">
            <img src={img} width={650} />
          </div>
          <div className="Parent2">
            <div className="child2">
              <p style={{"text-align": "left"}}>
                <h3>What is RideOn?</h3>
                Simplifying employee cab management for seamless <b></b>
                transportation logistics. Effortlessly manage <b></b>
                employee transportation with RideOn, the ultimate <b></b>
                cab management system.
              </p>
            </div>
            <div className="child3">
              <p>To book, track, or manage, click the button below</p>
              <Button id="button">login with google</Button>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Login;
