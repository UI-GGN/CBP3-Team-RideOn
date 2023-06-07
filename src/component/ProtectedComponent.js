import {withAuthenticationRequired} from "@auth0/auth0-react";

const ProtectedComponent = ({component, ...propsForComponent}) => {
  const Component = withAuthenticationRequired(component);
  return <Component {...propsForComponent} />;
};
export default ProtectedComponent;
