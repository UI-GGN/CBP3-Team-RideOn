import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Auth0Provider} from "@auth0/auth0-react";
import {BrowserRouter} from "react-router-dom";
import Config from "./config/config";
import { ProSidebarProvider } from 'react-pro-sidebar';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={Config.AUTH0_DOMAIN}
      clientId={Config.AUTH0_CLIENT_ID}
      redirectUri={Config.AUTH0_REDIRECT_URI}
      scopes="roles"
    >
      <BrowserRouter>
        <ProSidebarProvider>
        <App />
          </ProSidebarProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
