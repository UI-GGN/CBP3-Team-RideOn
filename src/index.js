import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Auth0Provider} from "@auth0/auth0-react";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8buiztfssus4palq.us.auth0.com"
      clientId="LyOGzbSP5BjkqWQiRuCqxZz1em74jvaM"
      redirectUri="https://rideongurgaon.netlify.app/dashboard"
      scopes="roles"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
