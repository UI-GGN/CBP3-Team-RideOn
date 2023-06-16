import {render} from "@testing-library/react";
import HomeRequests from "../Requests";
import Breadcrumb from "../../../component/BreadCrumb";

jest.mock(".../../../component/BreadCrumb");
describe("Requests test", () => {
  test("renders the component", async () => {
    render(<HomeRequests />);
    8
  });

  it("renders correctly", () => {
    const {baseElement} = render(<HomeRequests />);

    expect(baseElement).toMatchSnapshot();
  });
});
