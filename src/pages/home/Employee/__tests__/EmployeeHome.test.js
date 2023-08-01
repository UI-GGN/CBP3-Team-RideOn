import {cleanup, fireEvent, render} from "@testing-library/react";
import Employee from "../EmployeeHome";
import {useLocation} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import AvatarWithPopper from "../../../../components/AvatarWithPopper";
import {fireChangeForInputTimeIfValid} from "@testing-library/user-event/dist/keyboard/shared";
import {act} from "react-dom/test-utils";
import * as useGetAllRequest from "../../../../services/Request/useGetAllRequest";
import {APIStatus} from "../../../../reducers/api-reducer";
import userEvent from "@testing-library/user-event";
import {useAxios} from "../../../../contexts/axios-context";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  withAuthenticationRequired: jest.fn((component) => component),
  useAuth0: jest.fn(),
}));

jest.mock("../../../../contexts/axios-context", () => ({
  useAxios: jest.fn(),
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
    jest
      .spyOn(useGetAllRequest, "useGetAllRequest")
      .mockReturnValue({response: {data: [], metadata: {}}, status: "none"});
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
        getByPlaceholderText("Pickup Date and Time *"),
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
        getByPlaceholderText("Pickup Date and Time *"),
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
        getByPlaceholderText("Pickup Date and Time *"),
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
        getByPlaceholderText("Pickup Date and Time *"),
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

  it("should render the records for requests", () => {
    const mockEmployeeRequest = [
      {
        id: 1,
        pickupLocation: "42-43",
        dropLocation: "TW office",
        pickupTime: "2023-07-09T05:22:28.000Z",
        projectCode: "HPB",
        status: "Approved",
      },
    ];
    jest.spyOn(useGetAllRequest, "useGetAllRequest").mockReturnValue({
      response: {data: mockEmployeeRequest, metadata: {}},
      status: APIStatus.SUCCESS,
    });

    const {getByText} = render(<Employee />);
    expect(getByText(mockEmployeeRequest[0].pickupLocation)).toBeInTheDocument();
    expect(getByText(mockEmployeeRequest[0].dropLocation)).toBeInTheDocument();
    expect(getByText("Sun 09 Jul 2023 10:52 AM")).toBeInTheDocument();
    expect(getByText(mockEmployeeRequest[0].projectCode)).toBeInTheDocument();
    expect(getByText(mockEmployeeRequest[0].status)).toBeInTheDocument();
  });

  it("should save data when given valid request", async () => {
    useAxios.mockReturnValue({
      post: jest.fn(() =>
        Promise.resolve({
          status: 201, // HTTP Status Code for Created
        })
      ),
    });

    const mockEmployeeRequest = [
      {
        id: 1,
        pickupLocation: "Location A",
        dropLocation: "Location B",
        pickupTime: "2023-08-08T05:22:28.000Z",
        projectCode: "PROJECT-123",
        status: "Approved",
      },
    ];
    jest.spyOn(useGetAllRequest, "useGetAllRequest").mockReturnValue({
      response: {data: mockEmployeeRequest, metadata: {}},
      status: APIStatus.SUCCESS,
    });

    const {getByText, getByTestId, getByPlaceholderText} = render(<Employee />);

    act(async () => {
      fireEvent.click(
        getByText("Planning an upcoming travel, create your travel request here")
      );
      fireEvent.change(getByTestId("projectCode"), {
        target: {value: "PROJECT-123"},
      });
      fireEvent.change(getByTestId("pickupLocation"), {
        target: {value: "Location A"},
      });
      fireEvent.change(getByTestId("dropLocation"), {
        target: {value: "Location B"},
      });
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Pickup Date and Time *"),
        new Date(),
        "08/08/2023"
      );
      fireEvent.click(getByText("Submit Request"));
    });
    expect(getByText("PROJECT-123")).toBeInTheDocument();
    expect(getByText("Location A")).toBeInTheDocument();
    expect(getByText("Location B")).toBeInTheDocument();
  });

  it("should not save data on error", function () {
    useAxios.mockReturnValue({
      post: jest.fn(() =>
        Promise.resolve({
          status: 500, // HTTP Status Code for Created
        })
      ),
    });

    const {getByText, getByTestId, getByPlaceholderText, queryByText} = render(
      <Employee />
    );
    act(async () => {
      fireEvent.click(
        getByText("Planning an upcoming travel, create your travel request here")
      );
      fireEvent.change(getByTestId("projectCode"), {
        target: {value: "PROJECT-123"},
      });
      fireEvent.change(getByTestId("pickupLocation"), {
        target: {value: "Location A"},
      });
      fireEvent.change(getByTestId("dropLocation"), {
        target: {value: "Location B"},
      });
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Pickup Date and Time *"),
        new Date(),
        "08/08/2023"
      );
      fireEvent.click(getByText("Submit Request"));
    });

    expect(queryByText("PROJECT-123")).not.toBeInTheDocument();
    expect(queryByText("Location A")).not.toBeInTheDocument();
    expect(queryByText("Location B")).not.toBeInTheDocument();
  });
});
