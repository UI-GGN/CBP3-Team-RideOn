import {render} from "@testing-library/react";
import Login from "../Login.js";

describe("Login test", () => {
  it("renders correctly", () => {
    const {baseElement} = render(<Login />);
    expect(baseElement).toMatchSnapshot();
  });
});
