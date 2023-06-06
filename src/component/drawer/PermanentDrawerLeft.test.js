import {render, waitFor} from "@testing-library/react";
import PermanentDrawerLeft from "./PermanentDrawerLeft";
import {MemoryRouter} from "react-router-dom";

describe("PermanentDrawerLeft", () => {
  test("renders the component", async () => {
    const {getByText, getByRole} = render(
      <MemoryRouter>
        {" "}
        <PermanentDrawerLeft />{" "}
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("Routes")).toBeInTheDocument();
      expect(getByText("Requests")).toBeInTheDocument();
      expect(getByText("Logout")).toBeInTheDocument();
      expect(getByRole("img")).toBeInTheDocument();
    });
  });

  test("should match snapshot", () => {
    const {asFragment} = render(
      <MemoryRouter>
        {" "}
        <PermanentDrawerLeft />{" "}
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
