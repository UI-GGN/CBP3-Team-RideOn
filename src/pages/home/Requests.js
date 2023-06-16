import React from "react";
import BreadCrumb from "../../component/BreadCrumb";
import "./Home.css";

function HomeRequests() {
  const obj = ["Home", "Requests"];
  return (
    <>
      <div className="breadcrumb">
        <BreadCrumb values={obj} />
      </div>
    </>
  );
}

export default HomeRequests;
