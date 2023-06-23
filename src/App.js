import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import {Route, Routes} from "react-router-dom";
import HomeRoutes from "./pages/home/Routes";
import HomeRequests from "./pages/home/Requests";
import Employee from "./pages/home/Employee";
import {useAuth0} from "@auth0/auth0-react";

function App() {
  const {user} = useAuth0();
  const userRole = user?.my_roles[0];
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/home" element={(userRole === "employee") ? <Employee/> : <Home/>}>
          <Route index element={<Home/>} />
          <Route path="requests" element={<HomeRequests />} />
          <Route path="routes" element={<HomeRoutes />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
