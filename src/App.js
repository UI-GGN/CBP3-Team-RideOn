import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import {Route, Routes} from "react-router-dom";
import DashboardRoutes from "./component/DashboardRoutes";
import DashboardRequests from "./component/DashboardRequests";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<DashboardRoutes />} />
          <Route path="requests" element={<DashboardRequests />} />
          <Route path="routes" element={<DashboardRoutes />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
