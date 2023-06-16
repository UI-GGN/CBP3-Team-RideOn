import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import {Route, Routes, Navigate} from "react-router-dom";
import HomeRoutes from "./pages/home/Routes";
import HomeRequests from "./pages/home/Requests";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
    fontWeightMedium: "bold",
  },
});
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<Navigate to="/home/routes" />} />
            <Route path="requests" element={<HomeRequests />} />
            <Route path="routes" element={<HomeRoutes />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
