import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import {Route, Routes, Navigate} from "react-router-dom";
import DashboardRoutes from "./pages/dashboard/Routes";
import DashboardRequests from "./pages/dashboard/Requests";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="/dashboard/routes" />} />
          <Route path="requests" element={<DashboardRequests />} />
          <Route path="routes" element={<DashboardRoutes />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
