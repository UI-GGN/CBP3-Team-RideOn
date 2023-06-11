import {render} from "@testing-library/react";
import DashboardRequests from "../Requests";
import Breadcrumb from "../../../component/BreadCrumb";

jest.mock(".../../../component/BreadCrumb");
describe("Requests test", () => {
  test("renders the component", async () => {
    render(<DashboardRequests />);

    expect(Breadcrumb).toBeCalledWith({values: ["Dashboard", "Requests"]}, {});
  });

  it("renders correctly", () => {
    const {baseElement} = render(<DashboardRequests />);

    expect(baseElement).toMatchSnapshot();
  });
});