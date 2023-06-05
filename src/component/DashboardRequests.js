import React from "react";
import BreadCrumb from "./BreadCrumb";

function DashboardRequests() {
  const obj = {name: 'Dashboard', type: 'Requests'};
  return <BreadCrumb data={obj} />;
}

export default DashboardRequests;
