import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import {Route, Routes} from "react-router-dom";
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
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
