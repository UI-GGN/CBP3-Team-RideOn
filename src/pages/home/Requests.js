import React from "react";
import BreadCrumb from "../../component/BreadCrumb";
import "./Home.css";
import BasicTable from "../../component/BasicTable";

function HomeRequests() {
  const obj = ["Home", "Requests"];
  return (
    <>
      <div className="breadcrumb">
        <BreadCrumb values={obj} />
      </div>
      <BasicTable />
    </>
  );
}

export default HomeRequests;
