import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import {Route, Routes} from "react-router-dom";
import DashboardRoutes from "./pages/dashboard/Routes";
import DashboardRequests from "./pages/dashboard/Requests";
import ProtectedComponent from "./component/ProtectedComponent";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedComponent component={Dashboard} />}>
          <Route index element={<DashboardRoutes />} />
          <Route path="requests" element={<DashboardRequests />} />
          <Route path="routes" element={<DashboardRoutes />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
