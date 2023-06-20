import * as React from "react";
import {Avatar as MUIAvatar} from "@mui/material";

export default function Avatar({imageLink}) {
  return (
    <MUIAvatar
      sx={{width: 56, height: 56}}
      src={imageLink}
      imgProps={{referrerpolicy: "no-referrer"}}
    />
  );
}
