// All tests are passing
import { render, screen } from "@testing-library/react";
import RootLayout from "../app/layout";
import Header from "@/app/ui/header";

describe("RootLayout Component", () => {
  it("renders the Header component", () => {
    render(
      <RootLayout>
        <div>Child Content</div>
      </RootLayout>
    );
    // Check if the Header component is rendered
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <RootLayout>
        <div>Child Content</div>
      </RootLayout>
    );
    // Check if the child content is rendered
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
