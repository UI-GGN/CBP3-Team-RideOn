import {render} from "@testing-library/react";
import {BrowserRouter, useLocation} from "react-router-dom";
import RequestDetail from "../RequestDetail";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));
describe("Request Detail test", () => {
  beforeEach(() => {
    const mockLocation = {
      pathname: "/home/request/:id",
      state: {
        rowData: {
          status: "Approved",
          createdAt: "2023-08-08T16:39:28.242Z",
          updatedAt: "2023-08-08T16:39:28.242Z",
          raisedBy: {
            email: "test@gmail.com",
            name: "Anu",
          },
          projectCode: "Test1",
          pickupTime: "Tue 18 Jul 2023 9:30 PM",
          dropLocation: "Location-A",
          pickupLocation: "Location-B",
          allotedVendor: {
            contactNumber: "919005695229",
            name: "A1 Cab Services",
          },
        },
      },
    };
    useLocation.mockReturnValue(mockLocation);
  });
  it("renders correctly", () => {
    const {baseElement} = render(<RequestDetail />, {wrapper: BrowserRouter});
    expect(baseElement).toMatchSnapshot();
  });
});
