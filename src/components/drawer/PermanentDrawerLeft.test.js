import {render, waitFor} from "@testing-library/react";
import PermanentDrawerLeft from "./PermanentDrawerLeft";
import {MemoryRouter} from "react-router-dom";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";

describe("PermanentDrawerLeft", () => {
  const navItems = [
    {
      title: "Routes",
      icon: <DirectionsOutlinedIcon className="icon" />,
      to: "routes",
    },
    {
      title: "Requests",
      icon: <BackHandOutlinedIcon className="icon" />,
      to: "requests",
    },
  ];

  const logout = jest.fn();

  test("renders the component", async () => {
    const {getByText, getByRole} = render(
      <MemoryRouter>
        {" "}
        <PermanentDrawerLeft logout={logout} navItems={navItems} />{" "}
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
        <PermanentDrawerLeft logout={logout} navItems={navItems} />{" "}
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
