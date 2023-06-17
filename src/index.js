import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import Provider from "./Provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider />
    </BrowserRouter>
  </React.StrictMode>
);
