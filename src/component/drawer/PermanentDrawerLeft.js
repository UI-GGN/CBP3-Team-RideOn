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
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import logoImage from "../../assets/Logo.svg";
import "./PermanentDrawerLeft.css";
import {NavLink, Outlet} from "react-router-dom";
import PropTypes from 'prop-types';

const drawerWidth = 350;

function getTypography(text) {
  return <Typography className="typography">{text}</Typography>;
}

export default function PermanentDrawerLeft({props}) {
  const {logout, listItems} = props;

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
        <Box sx={{marginBottom: "8rem"}}>
          <img src={logoImage} className="logo" />
        </Box>
        <Divider className="divider" />
        <List>
          {listItems.map((i) => {
            return (<>
            <ListItem
                key={i.key}
                component={NavLink}
                to={i.to}
                activeClassName="active"
                className="sidebar-option"
              >
                <ListItemButton>
                  <ListItemIcon>
                    {i.icon}
                  </ListItemIcon>
                  <ListItemText primary={getTypography(i.text)} />
                </ListItemButton>
              </ListItem>
            </>);
          }
          )}
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

PermanentDrawerLeft.propTypes = {
  data: PropTypes.string,
  listItems: PropTypes.array
};
