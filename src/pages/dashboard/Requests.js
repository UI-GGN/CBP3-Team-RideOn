import React from "react";
import BreadCrumb from "../../component/BreadCrumb";
import "./Dasboard.css";

function DashboardRequests() {
  const obj = ["Dashboard", "Requests"];
  return (
    <>
      <div className="breadcrumb">
        <BreadCrumb values={obj} />
      </div>
    </>
  );
}

export default DashboardRequests;
