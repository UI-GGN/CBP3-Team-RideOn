import {render, waitFor} from "@testing-library/react";
import PermanentDrawerLeft from "./PermanentDrawerLeft";

describe("PermanentDrawerLeft", () => {
  test("renders the component", async () => {
    const {getByText, getByRole} = render(<PermanentDrawerLeft />);

    await waitFor(() => {
      expect(getByText("Routes")).toBeInTheDocument();
      expect(getByText("Requests")).toBeInTheDocument();
      expect(getByText("Logout")).toBeInTheDocument();
      expect(getByRole("img")).toBeInTheDocument();
    });
  });

  test("should match snapshot", () => {
    const {asFragment} = render(<PermanentDrawerLeft />);

    expect(asFragment()).toMatchSnapshot();
  });
});
