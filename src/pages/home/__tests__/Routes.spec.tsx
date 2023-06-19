import {render} from "@testing-library/react";
import HomeRoutes from "../Routes";

describe("Routes test", () => {
  test("renders the component", async () => {
    const {getByText} = render(<HomeRoutes />);

    expect(getByText("Home")).toBeVisible();
    expect(getByText("Routes")).toBeVisible();
  });
  it("renders correctly", () => {
    const {baseElement} = render(<HomeRoutes />);
    expect(baseElement).toMatchSnapshot();
  });
});
