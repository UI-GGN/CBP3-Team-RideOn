import {render} from "@testing-library/react";
import Login from "../Login.js";
import {BrowserRouter} from "react-router-dom";

describe("Login test", () => {
  it("renders correctly", () => {
    const {baseElement} = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
