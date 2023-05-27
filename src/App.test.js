import {render, screen} from "@testing-library/react";
import App from "./App";
import React from "react";

test.skip("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/What is RideOn?/i);
  expect(linkElement).toBeInTheDocument();
});
