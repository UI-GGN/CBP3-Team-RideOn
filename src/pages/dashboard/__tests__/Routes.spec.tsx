import {render} from "@testing-library/react";
import React from "react";
import DashboardRoutes from "../Routes";

describe("Routes test", () => {
  test("renders the component", async () => {
    const {getByText} = render(<DashboardRoutes />);

    expect(getByText("Dashboard")).toBeVisible();
    expect(getByText("Routes")).toBeVisible();
  });
  it("renders correctly", () => {
    const {baseElement} = render(<DashboardRoutes />);
    expect(baseElement).toMatchSnapshot();
  });
});
