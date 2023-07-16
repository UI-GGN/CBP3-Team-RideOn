import {cleanup, fireEvent, render} from "@testing-library/react";
import Employee from "../EmployeeHome";
import {useLocation} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import AvatarWithPopper from "../../../../components/AvatarWithPopper";
import {fireChangeForInputTimeIfValid} from "@testing-library/user-event/dist/keyboard/shared";
import {act} from "react-dom/test-utils";
import * as useGetAllRequest from "../../../../services/Request/useGetAllRequest";
import { APIStatus } from "../../../../reducers/api-reducer";
import userEvent from '@testing-library/user-event';

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
describe("Employee Home Page", () => {
  beforeEach(() => {
    const mockLocation = {
      pathname: "/home",
    };
    const mockUser = {
      given_name: "John",
      email: "john@example.com",
      picture: "somelink",
      name: "John Doe",
    };
    const mockAuth0Context = {
      isAuthenticated: true,
      user: mockUser,
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
    };

    useAuth0.mockReturnValue(mockAuth0Context);
    useLocation.mockReturnValue(mockLocation);
    jest.spyOn(useGetAllRequest, "useGetAllRequest").mockReturnValue({data: [], status: "none"});
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should called avatar with imageLink", () => {
    render(<Employee />);

    expect(AvatarWithPopper).toBeCalledWith(
      {
        imageLink: "somelink",
        name: "John Doe",
        email: "john@example.com",
        logout: expect.any(Function),
      },
      {}
    );
  });

  it("should display welcome msg for user", () => {
    const {getByText} = render(<Employee />);

    expect(getByText(`Hello John,`)).toBeVisible();
  });

  it("should submit request with valid form attributes", () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(<Employee />);

    act(() => {
      fireEvent.click(
        getByText("Planning an upcoming travel, create your travel request here")
      );
      userEvent.type(getByTestId("projectCode"), "abc");
      userEvent.type(getByTestId("pickupLocation"), "Address");
      userEvent.type(getByTestId("dropLocation"), "Location");
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Pickup DateTime*"),
        new Date(),
        "08/02/2023"
      );
      fireEvent.click(getByText("Submit Request"));
    });

    expect(getByText("Fill the form to create a new travel request")).toBeVisible();
  });

  it("should display error message on submit of form without project code", () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(<Employee />);

    act(() => {
      fireEvent.click(
        getByText("Planning an upcoming travel, create your travel request here")
      );
      userEvent.type(getByTestId("pickupLocation"), "Address");
      userEvent.type(getByTestId("dropLocation"), "Location");
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Pickup DateTime*"),
        new Date(),
        "08/02/2023"
      );
    });

    expect(getByText("Fill the form to create a new travel request")).toBeVisible();

    act(() => {
      fireEvent.click(getByText("Submit Request"));
    });

    expect(getByText("Please enter project code")).toBeVisible();
  });

  it("should display error message on submit of form without pickup location ", () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(<Employee />);

    act(() => {
      fireEvent.click(
        getByText("Planning an upcoming travel, create your travel request here")
      );
      userEvent.type(getByTestId("projectCode"), "abc");
      userEvent.type(getByTestId("dropLocation"), "Location");
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Pickup DateTime*"),
        new Date(),
        "08/02/2023"
      );
    });
    expect(getByText("Fill the form to create a new travel request")).toBeVisible();

    act(() => {
      fireEvent.click(getByText("Submit Request"));
    });
    expect(getByText("Please enter pickup location")).toBeVisible();
  });

  it("should display error message on submit of form without drop location ", () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(<Employee />);

    act(() => {
      fireEvent.click(
        getByText("Planning an upcoming travel, create your travel request here")
      );
      userEvent.type(getByTestId("projectCode"), "abc");
      userEvent.type(getByTestId("pickupLocation"), "Address");
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Pickup DateTime*"),
        new Date(),
        "08/02/2023"
      );
    });

    expect(getByText("Fill the form to create a new travel request")).toBeVisible();

    act(() => {
      fireEvent.click(getByText("Submit Request"));
    });
    expect(getByText("Please enter drop location")).toBeVisible();
  });

  it("should submit request with valid form attributes", () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(<Employee />);

    act(() => {
      fireEvent.click(
        getByText("Planning an upcoming travel, create your travel request here")
      );
      userEvent.type(getByTestId("projectCode"), "abc");
      userEvent.type(getByTestId("pickupLocation"), "Address");
      userEvent.type(getByTestId("dropLocation"), "Location");
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Pickup DateTime*"),
        new Date(),
        "08/02/2023"
      );
      fireEvent.click(getByText("Submit Request"));
    });

    expect(getByText("Fill the form to create a new travel request")).toBeVisible();
  });

  it("should render the records for upcomingRequest", () => {
    const mockEmployeeRequest = [{
      id: 1,
      pickupLocation: "42-43",
      dropLocation: "TW office",
      pickupTime: "2023-07-09T05:22:28.000Z",
      projectCode: "HPB",
      status: "Approved",
    }];
    const spy = jest.spyOn(useGetAllRequest, "useGetAllRequest").mockReturnValue({data: mockEmployeeRequest, status: APIStatus.SUCCESS });

    const {getByText} = render(<Employee />);

    expect(spy).toHaveBeenCalledWith({filter: "upcomingRequest"});
    expect(getByText(mockEmployeeRequest[0].pickupLocation)).toBeInTheDocument();
    expect(getByText(mockEmployeeRequest[0].dropLocation)).toBeInTheDocument();
    expect(getByText("Sun 09 Jul 2023 10:52 AM")).toBeInTheDocument();
    expect(getByText(mockEmployeeRequest[0].projectCode)).toBeInTheDocument();
    expect(getByText(mockEmployeeRequest[0].status)).toBeInTheDocument();
  });

  it("should render the records for past request", () => {
    const mockEmployeeRequest = [{
      id: 1,
      pickupLocation: "42-43",
      dropLocation: "TW office",
      pickupTime: "2023-07-09T05:22:28.000Z",
      projectCode: "HPB",
      status: "Approved",
    }];
    const spy = jest.spyOn(useGetAllRequest, "useGetAllRequest").mockReturnValue({data: mockEmployeeRequest, status: APIStatus.SUCCESS });

    const {getByText} = render(<Employee />);

    fireEvent.click(getByText("Past Requests"));

    expect(spy).toHaveBeenNthCalledWith(2, {filter: "pastRequest"});
    expect(getByText(mockEmployeeRequest[0].pickupLocation)).toBeInTheDocument();
    expect(getByText(mockEmployeeRequest[0].dropLocation)).toBeInTheDocument();
    expect(getByText("Sun 09 Jul 2023 10:52 AM")).toBeInTheDocument();
    expect(getByText(mockEmployeeRequest[0].projectCode)).toBeInTheDocument();
    expect(getByText(mockEmployeeRequest[0].status)).toBeInTheDocument();
  });
});
