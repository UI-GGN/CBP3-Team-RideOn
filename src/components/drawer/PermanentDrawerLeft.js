import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import logoImage from "../../assets/Logo.svg";
import "./PermanentDrawerLeft.css";
import {NavLink} from "react-router-dom";

const drawerWidth = 350;

function getTypography(text) {
  return <Typography className="typography">{text}</Typography>;
}

export default function PermanentDrawerLeft({onLogout, navItems, isHomePage}) {
  return (
    <Box sx={{display: "flex", width: drawerWidth}}>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "black",
            color: "white",
          },
        }}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{marginBottom: "8rem"}}>
          <img src={logoImage} className="logo" />
        </Box>
        <Divider className="divider" />
        <List>
          {navItems.map((navItem) => (
            <ListItem
              key={navItem.title}
              component={NavLink}
              to={navItem.to}
              activeClassName="active"
              className="sidebar-option"
              sx={{backgroundColor: (isHomePage && navItems.indexOf(navItem) === 0) ? "#1976d2" : ""}}
            >
              <ListItemButton>
                <ListItemIcon>{navItem.icon}</ListItemIcon>
                <ListItemText primary={getTypography(navItem.title)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <div className="logoutButton" onClick={() => onLogout()}>
          <LogoutOutlinedIcon className="icon" />
          <div className="logoutText">{getTypography("Logout")}</div>
        </div>
      </Drawer>
    </Box>
  );
}
