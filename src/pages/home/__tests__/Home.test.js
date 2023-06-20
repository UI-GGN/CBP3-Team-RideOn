import { render } from "@testing-library/react";
import {TestHome} from "../Home";
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { useLocation, BrowserRouter } from 'react-router-dom';
import * as BreadcrumbUtils from "../../../utils/Breadcrumbs";
import Avatar from "../../../component/Avatar";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('@auth0/auth0-react', () => ({
  ...jest.requireActual('@auth0/auth0-react'),
  withAuthenticationRequired: jest.fn(),
  useAuth0: jest.fn(),
}));

jest.mock(".../../../component/Avatar");
describe("Home Page", () => {
  beforeEach(() => {
    const mockLocation = {
      pathname: '/home/routes'
    };
    withAuthenticationRequired.mockImplementation((component) => component);
    const mockUser = { name: 'John Doe', email: 'john@example.com', picture: "somelink" };
    const mockIsAuthenticated = true;
    const mockLogin = jest.fn();
    const mockLogout = jest.fn();
    const mockAuth0Context = {
      isAuthenticated: mockIsAuthenticated,
      user: mockUser,
      loginWithRedirect: mockLogin,
      logout: mockLogout,
    };

    useAuth0.mockReturnValue(mockAuth0Context);
    useLocation.mockReturnValue(mockLocation);
    jest.spyOn(BreadcrumbUtils, "getBreadcrumbsValues").mockReturnValue({});
  });

  it("renders correctly", () => {
    const {baseElement} = render(
      <BrowserRouter>
         <TestHome/>
      </BrowserRouter>);

    expect(baseElement).toMatchSnapshot();
  });

  it("should called breadcrubms with pathname", () => {
    render(
    <BrowserRouter>
       <TestHome/>
    </BrowserRouter>);

    expect(BreadcrumbUtils.getBreadcrumbsValues).toBeCalledWith("/home/routes");
  });

  it("should called avatar with imageLink", () => {
    render(
    <BrowserRouter>
       <TestHome/>
    </BrowserRouter>);

    expect(Avatar).toBeCalledWith({imageLink: "somelink"}, {});
  });
});
