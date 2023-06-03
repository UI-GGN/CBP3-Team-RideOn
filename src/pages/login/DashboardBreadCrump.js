import React from "react";
import {Breadcrumbs, Typography} from "@mui/material";
import "./BreadCrump.css";
function DashboardBreadCrump({type}) {
  return (
      <div className="body-right">
            <Breadcrumbs aria-label="breadcrumbs" sx={{Weight: 400, Size: "24px", Lineheight: "20px", Letter: "0.25 px"}}>
                  <Typography fontSize="inherit" Font="Roboto" Align="Center">{"Dashboard"}</Typography>
                  <Typography fontSize="inherit" Font="Roboto" Align="Center" color="text.primary">{type}</Typography>
            </Breadcrumbs>
    </div>
  );
}

export default DashboardBreadCrump;
