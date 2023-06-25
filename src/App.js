import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import AdminHome from "./pages/home/AdminHome";
import {Route, Routes} from "react-router-dom";
import HomeRoutes from "./pages/home/Routes";
import HomeRequests from "./pages/home/Requests";
import EmployeeHome from "./pages/home/EmployeeHome";
import {useAuth0} from "@auth0/auth0-react";

function App() {
  const {user} = useAuth0();
  const userRole = user?.my_roles[0];
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={(userRole === "employee") ? <EmployeeHome/> : <AdminHome/>}>
          <Route index element={<HomeRoutes />} />
          <Route path="requests" element={<HomeRequests />} />
          <Route path="routes" element={<HomeRoutes />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
