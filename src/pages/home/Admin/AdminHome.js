import "./AdminHome.css";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import PermanentDrawerLeft from "../../../components/drawer/PermanentDrawerLeft";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import {Box, Stack} from "@mui/material";
import Avatar from "../../../components/Avatar";
import BreadCrumb from "../../../components/BreadCrumb";
import {useLocation, Outlet} from "react-router-dom";
import {getBreadcrumbsValues} from "../../../utils/Breadcrumbs";

const navItems = [
  {
    title: "Routes",
    icon: <DirectionsOutlinedIcon className="icon" />,
    to: "routes",
  },
  {
    title: "Requests",
    icon: <BackHandOutlinedIcon className="icon" />,
    to: "requests",
  },
];

function AdminHome() {
  const {logout, user} = useAuth0();
  const location = useLocation();
  const isHomePage = getBreadcrumbsValues(location.pathname).length === 1;

  return (
    <Box sx={{width: "100%", height: "100%"}}>
      <Stack direction={"row"} spacing={2}>
        <Box>
          <PermanentDrawerLeft
            onLogout={logout}
            navItems={navItems}
            isHomePage={isHomePage}
          />
        </Box>
        <Box sx={{width: "80%", marginLeft: 2}}>
          <Stack direction={"column"} useFlexGap>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 4,
                marginRight: 4,
              }}
            >
              <Avatar imageLink={user.picture} />
            </Box>
            <Box sx={{marginTop: 8}}>
              <BreadCrumb
                values={getBreadcrumbsValues(location.pathname)}
                isHomePage={isHomePage}
              />
            </Box>
            <Box>
              <Outlet />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default withAuthenticationRequired(AdminHome);
