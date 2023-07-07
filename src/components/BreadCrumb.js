import React from "react";
import {Breadcrumbs, Typography} from "@mui/material";

function BreadCrumb({values}) {
  return (
    <Breadcrumbs
      aria-label="breadcrumbs"
      sx={{
        Weight: 400,
        fontSize: "1.5rem",
        Size: "1.5rem",
        lineHeight: "2.25rem",
        Letter: "0.25 px",
      }}
    >
      <Typography
        fontSize="inherit"
        Font="Roboto"
        Align="Center"
        textTransform={"capitalize"}
        color={"text.primary"}
      >
        {values}
      </Typography>
    </Breadcrumbs>
  );
}

export default BreadCrumb;
