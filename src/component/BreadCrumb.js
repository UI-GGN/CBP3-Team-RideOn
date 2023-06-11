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
        {values.length && values.map((item) => (
          <Typography
            key={item.length}
            fontSize="inherit"
            Font="Roboto"
            Align="Center"
            color={values.indexOf(item) === values.length - 1 && "text.primary"}
          >
            {item}
          </Typography>
        ))}
      </Breadcrumbs>
  );
}

export default BreadCrumb;
