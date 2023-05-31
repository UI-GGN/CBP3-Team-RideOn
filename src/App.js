import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import {Route, Routes} from "react-router-dom";
import Trial from './pages/trial/Trial';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trial" element={<Trial />} />
      </Routes>
    </div>
  );
}

export default App;
