import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import logoImage from "../../assets/Logo.svg";
import "./PermanentDrawerLeft.css";
import {NavLink, Outlet} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const drawerWidth = 350;

function getTypography(text) {
  return <Typography className="typography">{text}</Typography>;
}

export default function PermanentDrawerLeft() {
  const {logout} = useAuth0();

  return (
    <Box sx={{display: "flex"}}>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "black",
            color: "white",
          },
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{marginBottom: "130px"}}>
          <img src={logoImage} className="logo" />
        </Box>
        <Divider className="divider" />
        <List>
          <NavLink to="routes" className="navLink">
            <ListItem key={"Routes"} classes={{selected: "selected", root: "listItem"}}>
              <ListItemButton>
                <ListItemIcon>
                  <DirectionsOutlinedIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary={getTypography("Routes")} />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to="requests" className="navLink">
            <ListItem key={"Requests"} classes={{selected: "selected", root: "listItem"}}>
              <ListItemButton>
                <ListItemIcon>
                  <BackHandOutlinedIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary={getTypography("Requests")} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
        <List className="logoutButton">
          <ListItem onClick={() => logout()}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutOutlinedIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary={getTypography("Logout")} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
