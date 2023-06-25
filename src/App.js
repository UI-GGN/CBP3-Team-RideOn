import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import {Route, Routes, Navigate} from "react-router-dom";
import HomeRoutes from "./pages/home/Routes";
import HomeRequests from "./pages/home/Requests";
import EmployeeReq from "./components/EmployeeReq";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<Navigate to="/home/routes" />} />
          <Route path="requests" element={<HomeRequests />} />
          <Route path="routes" element={<HomeRoutes />} />
        </Route>
        <Route path = "/employee" element={< EmployeeReq/>}/>
      </Routes>
    </div>
  );
}

export default App;
