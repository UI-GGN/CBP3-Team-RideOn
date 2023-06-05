import React from "react";
import {Breadcrumbs, Typography} from "@mui/material";

function BreadCrumb({data}) {
  const values = Object.values(data);
  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumbs"
        sx={{Weight: 400, Size: "24px", Lineheight: "20px", Letter: "0.25 px"}}
      >
          {[...values].map((item) => (
             <Typography key={item.length} fontSize="inherit" Font="Roboto" Align="Center" color={values.indexOf(item) === (values.length - 1) && "text.primary"}>{item}</Typography>
          ))}
      </Breadcrumbs>
    </div>
  );
}

export default BreadCrumb;
