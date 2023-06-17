import React from "react";
import {Auth0Provider} from "@auth0/auth0-react";
import {createTheme, ThemeProvider} from "@mui/material";
import Config from "./config/config";
import App from "./App";

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
    fontWeightMedium: "bold",
  },
});

function Provider() {
  return (
    <React.StrictMode>
      <Auth0Provider
        domain={Config.AUTH0_DOMAIN}
        clientId={Config.AUTH0_CLIENT_ID}
        redirectUri={Config.AUTH0_REDIRECT_URI}
        scopes="roles"
        authorizationParams={{audience: Config.AUTH0_AUDIENCE}}
      >
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Auth0Provider>
    </React.StrictMode>
  );
}

export default Provider;
