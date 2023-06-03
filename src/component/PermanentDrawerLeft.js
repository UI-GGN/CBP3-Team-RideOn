import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Route, Routes as ReactRoutes} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import logoImage from "../assets/Logo.svg";
import {useAuth0} from "@auth0/auth0-react";
import "./PermanentDrawerLeft.css";
import DashboardBreadCrump from "../pages/login/DashboardBreadCrump";

const drawerWidth = 350;

function getTypography(text) {
  return (
    <Typography
      style={{
        fontFamily: "Nunito",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "20px",
        lineHeight: "36px",
      }}
    >
      {" "}
      {text}{" "}
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
      <div>
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
            style={{
              width: "100px",
              height: "48px",
              marginTop: "40px",
              marginLeft: "35px",
            }}
          />
        </Box>
        <Divider sx={{backgroundColor: "white", marginBottom: "40px"}} />
        <List>
          <ListItem
            key={"Routes"}
            onClick={() => handleClick("Routes")}
            sx={{
              backgroundColor: selectedItem === "Routes" ? "#1976D2" : "initial",
              "&:hover": {
                backgroundColor: "#1976D2",
              },
            }}
          >
            <ListItemButton onclick="window.location.href='http://localhost:3000/dashboard/routes'">
              <ListItemIcon>
                <DirectionsOutlinedIcon sx={{color: "white", fontSize: "30px"}} />
              </ListItemIcon>
              <ListItemText primary={getTypography("Routes")} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Requests"}
            onClick={() => handleClick("Requests")}
            sx={{
              backgroundColor: selectedItem === "Requests" ? "#1976D2" : "initial",
              "&:hover": {
                backgroundColor: "#1976D2",
              },
            }}
          >
            <ListItemButton onclick="window.location.href='http://localhost:3000/dashboard/requests'">
              <ListItemIcon>
                <BackHandOutlinedIcon sx={{color: "white", fontSize: "30px"}} />
              </ListItemIcon>
              <ListItemText primary={getTypography("Requests")} />
            </ListItemButton>
          </ListItem>
        </List>
        <List style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          padding: "8px",
        }}>
          <ListItem onClick={() => logout()}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutOutlinedIcon sx={{color: "white", fontSize: "30px"}} />
              </ListItemIcon>
              <ListItemText primary={getTypography("Logout")} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
    <ReactRoutes>
        <Route path='/' element={<DashboardBreadCrump type="Routes" />} />
        <Route path='requests' element={<DashboardBreadCrump type="Requests" />} />
        <Route path='routes' element={<DashboardBreadCrump type="Routes" />} />
    </ReactRoutes>
      </div>);
}
