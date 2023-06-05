import React from "react";
import BreadCrumb from "../../component/BreadCrumb";
import "./Dasboard.css";

function DashboardRequests() {
  const obj = {name: 'Dashboard', type: 'Requests'};
  return (
    <>
      <div className="breadcrumb">
        <BreadCrumb data={obj} />
      </div>
    </>
  );
}

export default DashboardRequests;
