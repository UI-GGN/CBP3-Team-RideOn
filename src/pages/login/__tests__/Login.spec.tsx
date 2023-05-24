import {Login} from "@mui/icons-material";
import {render} from "@testing-library/react";

describe("Login test", () => {
  it("renders correctly", () => {
    const {baseElement} = render(<Login/>);
    expect(baseElement).toMatchSnapshot();
  });
});
