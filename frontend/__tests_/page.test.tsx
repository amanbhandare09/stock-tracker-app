//All tests are passing
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Page", () => {
  it("renders the form with Comboboxes and button", () => {
    render(<Page />);

    expect(screen.getByText(/Scheme A/i)).toBeInTheDocument();
    expect(screen.getByText(/Scheme B/i)).toBeInTheDocument();
    expect(screen.getByText("Compare")).toBeInTheDocument();
  });
});
