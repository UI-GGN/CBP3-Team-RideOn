import "./Home.css";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import PermanentDrawerLeft from "../../component/drawer/PermanentDrawerLeft";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import {Box, Stack} from "@mui/material";
import Avatar from "../../component/Avatar";
import BreadCrumb from "../../component/BreadCrumb";
import {useLocation} from "react-router-dom";
import { getBreadcrumbsValues } from "../../utils/Breadcrumbs";

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

function Home() {
  const {logout, user} = useAuth0();
  const location = useLocation();

  return (
    <Box sx={{width: "100%", height: "100%"}}>
      <Stack direction={"row"} spacing={2} >
         <Box>
            <PermanentDrawerLeft onLogout={logout} navItems={navItems} />
         </Box>
         <Box sx={{width: "80%", marginLeft: 2}}>
            <Stack direction={'column'} useFlexGap>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4, marginRight: 4 }}>
                <Avatar imageLink={user.picture}/>
              </Box>
              <Box sx={{ marginTop: 8}}>
                <BreadCrumb values={getBreadcrumbsValues(location.pathname)} />
              </Box>
            </Stack>
         </Box>
      </Stack>
    </Box>
  );
}

export default withAuthenticationRequired(Home);
export { Home as TestHome };
