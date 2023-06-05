import React from "react";
import BreadCrumb from "../../component/BreadCrumb";
import "./Dasboard.css";

function DashboardRoutes() {
  const obj = {name: 'Dashboard', type: 'Routes'};
  return (
    <>
      <div className="breadcrumb">
        <BreadCrumb data={obj} />
      </div>
    </>
  );
}

export default DashboardRoutes;
