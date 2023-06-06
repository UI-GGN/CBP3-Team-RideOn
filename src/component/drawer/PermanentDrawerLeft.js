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
import {useAuth0} from "@auth0/auth0-react";
import "./PermanentDrawerLeft.css";

const drawerWidth = 350;

function getTypography(text) {
  return (
    <Typography
      className= 'typography'
    >
      {text}
    </Typography>
  );
}

export default function PermanentDrawerLeft() {
  const {logout} = useAuth0();
  const [selectedItem, setSelectedItem] = React.useState("Routes");

  const handleClick = (text) => {
    setSelectedItem(text);
  };

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
          <img
            src={logoImage}
            className="logo"
          />
        </Box>
        <Divider className='divider' />
        <List>
          <ListItem
            key={"Routes"}
            onClick={() => handleClick("Routes")}
            className={selectedItem === "Routes" ? "listItemSelected" : "listItem"}
          >
            <ListItemButton>
              <ListItemIcon>
                <DirectionsOutlinedIcon className='icon' />
              </ListItemIcon>
              <ListItemText primary={getTypography("Routes")} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Requests"}
            onClick={() => handleClick("Requests")}
            className={selectedItem === "Requests" ? "listItemSelected" : "listItem"}
          >
            <ListItemButton>
              <ListItemIcon>
                <BackHandOutlinedIcon className='icon' />
              </ListItemIcon>
              <ListItemText primary={getTypography("Requests")} />
            </ListItemButton>
          </ListItem>
        </List>
        <List className='logoutButton'>
          <ListItem onClick={() => logout()}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutOutlinedIcon className='icon' />
              </ListItemIcon>
              <ListItemText primary={getTypography("Logout")} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <Toolbar />
        <Typography paragraph>Lorem ipsum dolor sit amet.</Typography>
      </Box>
    </Box>
  );
}