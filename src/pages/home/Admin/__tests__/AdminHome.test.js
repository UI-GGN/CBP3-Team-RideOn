import {render} from "@testing-library/react";
import Home from "../AdminHome";
import {BrowserRouter, useLocation} from "react-router-dom";
import * as BreadcrumbUtils from "../../../../utils/Breadcrumbs";
import {useAuth0} from "@auth0/auth0-react";
import AvatarWithPopper from "../../../../components/AvatarWithPopper";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  withAuthenticationRequired: jest.fn((component) => component),
  useAuth0: jest.fn(),
}));

jest.mock(".../../../components/AvatarWithPopper");
describe("Home Page", () => {
  beforeEach(() => {
    const mockLocation = {
      pathname: "/home/requests",
    };

    const mockUser = {name: "John Doe", email: "john@example.com", picture: "somelink"};
    const mockAuth0Context = {
      isAuthenticated: true,
      user: mockUser,
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
    };

    useAuth0.mockReturnValue(mockAuth0Context);
    useLocation.mockReturnValue(mockLocation);
    jest.spyOn(BreadcrumbUtils, "getBreadcrumbsValues").mockReturnValue({});
  });

  it("renders correctly", () => {
    const {baseElement} = render(<Home />, {wrapper: BrowserRouter});

    expect(baseElement).toMatchSnapshot();
  });

  it("should called breadcrubms with pathname", () => {
    render(<Home />, {wrapper: BrowserRouter});

    expect(BreadcrumbUtils.getBreadcrumbsValues).toBeCalledWith("/home/requests");
  });

  it("should called avatar with imageLink", () => {
    render(<Home />, {wrapper: BrowserRouter});

    expect(AvatarWithPopper).toBeCalledWith({imageLink: "somelink"}, {});
  });
});
