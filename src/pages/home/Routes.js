import React from "react";
import BreadCrumb from "../../component/BreadCrumb";
import "./Home.css";

function HomeRoutes() {
  const obj = ["Home", "Routes"];
  return (
    <>
      <div className="breadcrumb">
        <BreadCrumb values={obj} />
      </div>
    </>
  );
}

export default HomeRoutes;
