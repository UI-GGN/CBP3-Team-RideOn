import {cleanup, fireEvent, render} from "@testing-library/react";
import Employee from "../EmployeeHome";
import {BrowserRouter, useLocation} from "react-router-dom";
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
      .mockReturnValue({response: {}, status: ""});
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should called avatar with imageLink", () => {
    render(<Employee />, {wrapper: BrowserRouter});

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
    const {getByText} = render(<Employee />, {wrapper: BrowserRouter});

    expect(getByText(`Hello John,`)).toBeVisible();
  });

  it("should submit request with valid form attributes", () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(<Employee />, {
      wrapper: BrowserRouter,
    });

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
    const {getByText, getByTestId, getByPlaceholderText} = render(<Employee />, {
      wrapper: BrowserRouter,
    });

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
    const {getByText, getByTestId, getByPlaceholderText} = render(<Employee />, {
      wrapper: BrowserRouter,
    });

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
    const {getByText, getByTestId, getByPlaceholderText} = render(<Employee />, {
      wrapper: BrowserRouter,
    });

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

    const {getByText} = render(<Employee />, {wrapper: BrowserRouter});
    expect(getByText(mockEmployeeRequest[0].pickupLocation)).toBeInTheDocument();
    expect(getByText(mockEmployeeRequest[0].dropLocation)).toBeInTheDocument();
    expect(getByText("Sun 09 Jul 2023 10:52 AM")).toBeInTheDocument();
    expect(getByText(mockEmployeeRequest[0].projectCode)).toBeInTheDocument();
    expect(getByText(mockEmployeeRequest[0].status)).toBeInTheDocument();
  });

  it("should show loader when apiStatus is loading", () => {
    jest
      .spyOn(useGetAllRequest, "useGetAllRequest")
      .mockReturnValue({response: {}, status: APIStatus.LOADING});

    const {getByRole} = render(<Employee />, {wrapper: BrowserRouter});

    expect(getByRole("progressbar")).toBeInTheDocument();
  });

  it("should show error text when apiStatus is Failed", () => {
    jest
      .spyOn(useGetAllRequest, "useGetAllRequest")
      .mockReturnValue({response: {}, status: APIStatus.FAILED});

    const {getByTestId} = render(<Employee />, {wrapper: BrowserRouter});

    expect(getByTestId("errorText")).toBeInTheDocument();
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

    const {getByText, getByTestId, getByPlaceholderText} = render(<Employee />, {
      wrapper: BrowserRouter,
    });

    await act(async () => {
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
    expect(getByText("HPB")).toBeInTheDocument();
    expect(getByText("42-43")).toBeInTheDocument();
    expect(getByText("TW office")).toBeInTheDocument();
  });

  it("should call useGetAllRequest to fetch data when next arrow button is clicked", () => {
    const mockEmployeeRequest = {
      data: [
        {
          id: 1,
          pickupLocation: "42-43",
          dropLocation: "TW office",
          pickupTime: "2023-07-09T05:22:28.000Z",
          projectCode: "HPB",
          status: "Approved",
        },
      ],
      metadata: {
        pageNumber: "1",
        limit: "1",
        total: 12,
      },
    };
    jest
      .spyOn(useGetAllRequest, "useGetAllRequest")
      .mockReturnValue({response: mockEmployeeRequest, status: APIStatus.SUCCESS});

    const {getByTestId} = render(<Employee />, {wrapper: BrowserRouter});

    expect(getByTestId("KeyboardArrowRightIcon")).toBeEnabled();
    fireEvent.click(getByTestId("KeyboardArrowRightIcon"));
    expect(useGetAllRequest.useGetAllRequest).toHaveBeenNthCalledWith(
      3,
      {
        limit: 10,
        "page-number": 2,
      },
      0
    );
  });

  it("should not save data on error", async function () {
    useAxios.mockReturnValue({
      post: jest.fn(() =>
        Promise.resolve({
          status: 500,
        })
      ),
    });

    const {getByText, getByTestId, getByPlaceholderText, queryByText} = render(
      <Employee />,
      {wrapper: BrowserRouter}
    );
    await act(async () => {
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
