import React from "react";
import BreadCrumb from "../../component/BreadCrumb";
import "./Dasboard.css";

function DashboardRoutes() {
  const obj = ["Dashboard", "Routes"];
  return (
    <>
      <div className="breadcrumb">
        <BreadCrumb values={obj} />
      </div>
    </>
  );
}

export default DashboardRoutes;
