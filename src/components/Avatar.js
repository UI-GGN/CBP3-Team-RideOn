import * as React from "react";
import { Avatar as MUIAvatar, Button, ClickAwayListener, Divider, Box, Popper, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import "./Avatar.css";
export default function Avatar({imageLink, logout, email, name}) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <MUIAvatar
        sx={{width: 48, height: 48}}
        src={imageLink}
        ref={anchorRef}
        onClick={handleToggle}
        imgProps={{referrerpolicy: "no-referrer"}}
      />
      <ClickAwayListener onClickAway={handleClose}>
      <Popper open={open} anchorEl={anchorRef.current}>
        <Box className="popper">
        <Typography className={"name"}> {name}</Typography>
          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.60)",
              fontFamily: "Roboto",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "24px",
              letterSpacing: "0.5px",
              marginTop: "4px",
              marginLeft: "16px",
              marginRight: "28px",
              marginBottom: "8px",
              paddingRight: "150px"
            }}
          >
            {email}
          </Typography>
          <Divider />
          <Button
            onClick={() => {
              logout();
            }}
           style={{
             color: "rgba(0, 0, 0, 0.60)",
             fontFamily: 'Nunito',
             fontSize: '16px',
             fontStyle: 'normal',
             fontWeight: '500',
             lineHeight: '36px',
             textTransform: "none",
             letterSpacing: '1.25px',
             paddingLeft: "16px",
             paddingBottom: "4px"
           }}
          >
            Logout
          </Button>
        </Box>
      </Popper>
      </ClickAwayListener>
    </>
  );
}
