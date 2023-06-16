import "./Home.css";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import PermanentDrawerLeft from "../../component/drawer/PermanentDrawerLeft";

function Home() {
  return <PermanentDrawerLeft />;
}

export default withAuthenticationRequired(Home);
