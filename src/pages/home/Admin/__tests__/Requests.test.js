import { fireEvent, render, screen } from "@testing-library/react";
import HomeRequests from "../Requests";
import * as useGetAllRequestHook from "../../../../services/Request/useGetAllRequest";
import { APIStatus } from "../../../../reducers/api-reducer";
import * as useUpdateStatus from "../../../../services/Request/useUpdateStatus";
import * as useGetVendorsForModal from "../../../../services/Request/useGetVendorsForModal";
import * as useGetAllVendor from "../../../../services/Request/useGetAllVendor";

describe("Admin Home Requests", () => {
  const mockResponse = {
    data: [{
      pickupLocation: "Test PickUp",
      dropLocation: "Test Drop",
      pickupTime: "2023-06-30T00:00:00.000Z",
      projectCode: "Test Project",
      raisedBy: {
        roles: [
          "employee"
        ],
        name: "Test User",
      },
      status: "PENDING",
      createdAt: "2023-07-23T11:38:00.774Z",
      updatedAt: "2023-07-23T11:38:00.774Z"
    }
    ],
    metadata: {
      pageNumber: "1",
      limit: "1",
      total: 12
    }
  };
  beforeEach(() => {
    jest.spyOn(useGetAllRequestHook, "useGetAllRequest").mockReturnValue({response: {}, status: ""});
    jest.spyOn(useUpdateStatus, "useUpdateStatus").mockReturnValue({response: {data: []}, status: ""});
    jest.spyOn(useGetVendorsForModal, "useGetVendorsForModal").mockReturnValue({response: {data: []}, status: ""});
    jest.spyOn(useGetAllVendor, "useGetAllVendor").mockReturnValue({response: {data: []}, status: ""});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render admin table header", () => {
    render(<HomeRequests></HomeRequests>);

    expect(screen.getByText("Employee")).toBeInTheDocument();
    expect(screen.getByText("Project Code")).toBeInTheDocument();
    expect(screen.getByText("Pickup")).toBeInTheDocument();
    expect(screen.getByText("Drop")).toBeInTheDocument();
    expect(screen.getByText("Pickup Time")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("should call useGetAllRequest to fetch data when page renders", () => {
    jest.spyOn(useGetAllRequestHook, "useGetAllRequest").mockReturnValue({response: mockResponse, status: APIStatus.SUCCESS});

    render(<HomeRequests></HomeRequests>);

    expect(useGetAllRequestHook.useGetAllRequest).toHaveBeenCalledWith({limit: 10, "page-number": 1}, 1);
  });

  it("should show loader when apistatus is loading", () => {
    jest.spyOn(useGetAllRequestHook, "useGetAllRequest").mockReturnValue({response: {}, status: APIStatus.LOADING});

    render(<HomeRequests></HomeRequests>);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should show error text when apistatus is Failed", () => {
    jest.spyOn(useGetAllRequestHook, "useGetAllRequest").mockReturnValue({response: {}, status: APIStatus.FAILED});

    render(<HomeRequests></HomeRequests>);

    expect(screen.getByTestId("errorText")).toBeInTheDocument();
  });

  it("should show empty row text when row is empty", () => {
    jest.spyOn(useGetAllRequestHook, "useGetAllRequest").mockReturnValue({response: {data: []}, status: APIStatus.SUCCESS});

    render(<HomeRequests></HomeRequests>);

    expect(screen.getByTestId("noRowText")).toBeInTheDocument();
  });

  it("should display rows data when apistatus is SUCCESSFUL and data is not empty", () => {
    jest.spyOn(useGetAllRequestHook, "useGetAllRequest").mockReturnValue({response: mockResponse, status: APIStatus.SUCCESS});

    render(<HomeRequests></HomeRequests>);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("Test PickUp")).toBeInTheDocument();
    expect(screen.getByText("Test Drop")).toBeInTheDocument();
    expect(screen.getByText("Fri 30 Jun 2023 5:30 AM")).toBeInTheDocument();
    expect(screen.getByText("PENDING")).toBeInTheDocument();
  });

  it("should call useGetAllRequest to fetch data when click on next arrow button", () => {
    jest.spyOn(useGetAllRequestHook, "useGetAllRequest").mockReturnValue({response: mockResponse, status: APIStatus.SUCCESS});

    render(<HomeRequests></HomeRequests>);

    expect(screen.getByTestId("KeyboardArrowRightIcon")).toBeEnabled();
    fireEvent.click(screen.getByTestId("KeyboardArrowRightIcon"));
    expect(useGetAllRequestHook.useGetAllRequest).toHaveBeenNthCalledWith(2, {limit: 10, "page-number": 2}, 1);
  });
});
