import {render} from "@testing-library/react";
import React from "react";
import HomeRequests from "../Requests";

describe("Requests test", () => {
  it("renders correctly", () => {
    const {baseElement} = render(<HomeRequests />);

    expect(baseElement).toMatchSnapshot();
  });
});
