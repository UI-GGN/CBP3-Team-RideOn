import {fireEvent, render, screen} from "@testing-library/react";
import HomeVendors from "../Vendors";
import * as useGetAllVendorHook from "../../../../services/Request/useGetAllVendor";
import {APIStatus} from "../../../../reducers/api-reducer";
import * as useUpdateStatus from "../../../../services/Request/useUpdateStatus";
import * as useGetVendorsForModal from "../../../../services/Request/useGetVendorsForModal";
import {BrowserRouter} from "react-router-dom";

describe("Admin Home Vendor", () => {
  const mockResponse = {
    data: [
      {
        name: "Test Vendor",
        contactNumber: "9988776655",
      },
    ],
    metadata: {
      pageNumber: "1",
      limit: "1",
      total: 12,
    },
  };
  beforeEach(() => {
    jest
      .spyOn(useGetAllVendorHook, "useGetAllVendor")
      .mockReturnValue({response: {}, status: ""});
    jest
      .spyOn(useUpdateStatus, "useUpdateStatus")
      .mockReturnValue({response: {data: []}, status: ""});
    jest
      .spyOn(useGetVendorsForModal, "useGetVendorsForModal")
      .mockReturnValue({response: {data: []}, status: ""});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render vendor table header", () => {
    render(<HomeVendors></HomeVendors>, {wrapper: BrowserRouter});

    expect(screen.getByText("Vendor")).toBeInTheDocument();
    expect(screen.getByText("Contact Number")).toBeInTheDocument();
  });

  it("should call useGetAllVendor to fetch data when page renders", () => {
    jest
      .spyOn(useGetAllVendorHook, "useGetAllVendor")
      .mockReturnValue({response: mockResponse, status: APIStatus.SUCCESS});

    render(<HomeVendors></HomeVendors>, {wrapper: BrowserRouter});

    expect(useGetAllVendorHook.useGetAllVendor).toHaveBeenCalledWith({
      limit: 10,
      "page-number": 1,
    });
  });

  it("should show loader when apistatus is loading", () => {
    jest
      .spyOn(useGetAllVendorHook, "useGetAllVendor")
      .mockReturnValue({response: {}, status: APIStatus.LOADING});

    render(<HomeVendors></HomeVendors>, {wrapper: BrowserRouter});

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should show error text when apistatus is Failed", () => {
    jest
      .spyOn(useGetAllVendorHook, "useGetAllVendor")
      .mockReturnValue({response: {}, status: APIStatus.FAILED});

    render(<HomeVendors></HomeVendors>, {wrapper: BrowserRouter});

    expect(screen.getByTestId("errorText")).toBeInTheDocument();
  });

  it("should show empty row text when row is empty", () => {
    jest
      .spyOn(useGetAllVendorHook, "useGetAllVendor")
      .mockReturnValue({response: {data: []}, status: APIStatus.SUCCESS});

    render(<HomeVendors></HomeVendors>, {wrapper: BrowserRouter});

    expect(screen.getByTestId("noRowText")).toBeInTheDocument();
  });

  it("should display rows data when apistatus is SUCCESSFUL and data is not empty", () => {
    jest
      .spyOn(useGetAllVendorHook, "useGetAllVendor")
      .mockReturnValue({response: mockResponse, status: APIStatus.SUCCESS});

    render(<HomeVendors></HomeVendors>, {wrapper: BrowserRouter});

    expect(screen.getByText("Test Vendor")).toBeInTheDocument();
    expect(screen.getByText("9988776655")).toBeInTheDocument();
  });

  it("should call useGetAllVendor to fetch data when click on next arrow button", () => {
    jest
      .spyOn(useGetAllVendorHook, "useGetAllVendor")
      .mockReturnValue({response: mockResponse, status: APIStatus.SUCCESS});

    render(<HomeVendors></HomeVendors>, {wrapper: BrowserRouter});

    expect(screen.getByTestId("KeyboardArrowRightIcon")).toBeEnabled();
    fireEvent.click(screen.getByTestId("KeyboardArrowRightIcon"));
    expect(useGetAllVendorHook.useGetAllVendor).toHaveBeenNthCalledWith(2, {
      limit: 10,
      "page-number": 2,
    });
  });
});
