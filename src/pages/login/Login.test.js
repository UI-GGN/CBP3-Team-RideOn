import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import Login from "./Login";
import {useAuth0} from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");

describe("Login Page", () => {
  it("should call loginWithRedirect method on onClick", async () => {
    useAuth0.mockReturnValue({
      loginWithRedirect: jest.fn(),
    });
    const {loginWithRedirect} = useAuth0();

    render(<Login />);
    const logInButton = await screen.getByText("LOGIN");
    fireEvent.click(logInButton);

    await waitFor(() => expect(loginWithRedirect).toHaveBeenCalledTimes(1));
  });
});
