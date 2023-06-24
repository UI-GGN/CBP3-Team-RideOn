import * as React from "react";
import {Avatar as MUIAvatar} from "@mui/material";

export default function Avatar({imageLink}) {
  return (
    <MUIAvatar
      sx={{width: 48, height: 48}}
      src={imageLink}
      imgProps={{referrerpolicy: "no-referrer"}}
    />
  );
}
