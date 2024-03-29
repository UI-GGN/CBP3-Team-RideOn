import "./AdminHome.css";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import PermanentDrawerLeft from "../../../components/drawer/PermanentDrawerLeft";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {Box, Stack} from "@mui/material";
import AvatarWithPopper from "../../../components/AvatarWithPopper";
import BreadCrumb from "../../../components/BreadCrumb";
import {useLocation, Outlet, useNavigate} from "react-router-dom";
import {getBreadcrumbsValues} from "../../../utils/Breadcrumbs";
import {useEffect} from "react";

const navItems = [
  {
    title: "Requests",
    icon: <BackHandOutlinedIcon className="icon" />,
    to: "requests",
  },
  {
    title: "Vendors",
    icon: <DirectionsCarIcon className="icon" />,
    to: "vendors",
  },
];

function AdminHome() {
  const {logout, user} = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  const breadcrumbsValues = getBreadcrumbsValues(location.pathname);
  const length = breadcrumbsValues.length;
  const isHomePage = length === 1;

  const getBreadCrumbValue = () => {
    if (length > 2) {
      return breadcrumbsValues[length - 2] + " / " + breadcrumbsValues[length - 1];
    }
    return breadcrumbsValues[length - 1];
  };

  useEffect(() => {
    navigate("/home/requests", {replace: true});
  }, []);

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
              <AvatarWithPopper imageLink={user.picture} />
            </Box>
            <Box sx={{marginTop: 8}}>
              <BreadCrumb values={getBreadCrumbValue()} />
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
