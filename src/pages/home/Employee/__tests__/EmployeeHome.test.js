import {cleanup, fireEvent, render} from "@testing-library/react";
import Employee from "../EmployeeHome";
import {useLocation} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import AvatarWithPopper from "../../../../components/AvatarWithPopper";
import {fireChangeForInputTimeIfValid} from "@testing-library/user-event/dist/keyboard/shared";
import {act} from "react-dom/test-utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  withAuthenticationRequired: jest.fn((component) => component),
  useAuth0: jest.fn(),
}));

jest.mock(".../../../components/Avatar");
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
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("renders correctly", () => {
    const {baseElement, getByPlaceholderText} = render(<Employee />);
    act(() =>
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Select a date and time"),
        new Date(),
        "08/02/2023"
      )
    );

    expect(baseElement).toMatchSnapshot();
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
    const {getByText, getByPlaceholderText, getByDisplayValue} = render(<Employee />);

    act(() => {
      fireEvent.click(
        getByText("Planning an upcoming travel, create your travel request here")
      );
      fireEvent.change(getByPlaceholderText("Project Code"), {target: {value: "abc"}});
      fireEvent.change(getByPlaceholderText("Pickup Location"), {
        target: {value: "Address"},
      });
      fireEvent.change(getByPlaceholderText("Drop Location"), {
        target: {value: "Location"},
      });
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Select a date and time"),
        new Date(),
        "08/02/2023"
      );
      fireEvent.click(getByText("Submit Request"));
    });

    expect(getByText("Fill the form to create a new travel request")).toBeVisible();
    expect(getByDisplayValue("abc")).toBeVisible();
  });

  it("should display error message on submit of form without project code", () => {
    const {getByText, getByPlaceholderText} = render(<Employee />);

    act(() => {
      fireEvent.click(
        getByText("Planning an upcoming travel, create your travel request here")
      );
      fireEvent.change(getByPlaceholderText("Pickup Location"), {
        target: {value: "Address"},
      });
      fireEvent.change(getByPlaceholderText("Drop Location"), {
        target: {value: "Location"},
      });
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Select a date and time"),
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
    const {getByText, getByPlaceholderText, getByDisplayValue} = render(<Employee />);

    act(() => {
      fireEvent.click(
        getByText("Planning an upcoming travel, create your travel request here")
      );
      fireEvent.change(getByPlaceholderText("Project Code"), {target: {value: "abc"}});
      fireEvent.change(getByPlaceholderText("Drop Location"), {
        target: {value: "Location"},
      });
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Select a date and time"),
        new Date(),
        "08/02/2023"
      );
    });
    expect(getByText("Fill the form to create a new travel request")).toBeVisible();
    expect(getByDisplayValue("abc")).toBeVisible();

    act(() => {
      fireEvent.click(getByText("Submit Request"));
    });
    expect(getByText("Please enter pickup location")).toBeVisible();
  });

  it("should display error message on submit of form without drop location ", () => {
    const {getByText, getByPlaceholderText, getByDisplayValue} = render(<Employee />);

    act(() => {
      fireEvent.click(
        getByText("Planning an upcoming travel, create your travel request here")
      );
      fireEvent.change(getByPlaceholderText("Project Code"), {target: {value: "abc"}});
      fireEvent.change(getByPlaceholderText("Pickup Location"), {
        target: {value: "Address"},
      });
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Select a date and time"),
        new Date(),
        "08/02/2023"
      );
    });

    expect(getByText("Fill the form to create a new travel request")).toBeVisible();
    expect(getByDisplayValue("abc")).toBeVisible();

    act(() => {
      fireEvent.click(getByText("Submit Request"));
    });
    expect(getByText("Please enter drop location")).toBeVisible();
  });

  it("should submit request with valid form attributes", () => {
    const {getByText, getByPlaceholderText, getByDisplayValue} = render(<Employee />);

    act(() => {
      fireEvent.click(
        getByText("Planning an upcoming travel, create your travel request here")
      );
      fireEvent.change(getByPlaceholderText("Project Code"), {target: {value: "abc"}});
      fireEvent.change(getByPlaceholderText("Pickup Location"), {
        target: {value: "Address"},
      });
      fireEvent.change(getByPlaceholderText("Drop Location"), {
        target: {value: "Location"},
      });
      fireChangeForInputTimeIfValid(
        getByPlaceholderText("Select a date and time"),
        new Date(),
        "08/02/2023"
      );
      fireEvent.click(getByText("Submit Request"));
    });

    expect(getByText("Fill the form to create a new travel request")).toBeVisible();
    expect(getByDisplayValue("abc")).toBeVisible();
  });
});
