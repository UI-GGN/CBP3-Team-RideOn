import "./Home.css";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import PermanentDrawerLeft from "../../component/drawer/PermanentDrawerLeft";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";

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
  const {logout} = useAuth0();

  return <PermanentDrawerLeft onLogout={logout} navItems={navItems} />;
}

export default withAuthenticationRequired(Home);
