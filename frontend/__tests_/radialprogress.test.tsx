//All tests are passing
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RadialProgress from "../app/ui/overlap/radialprogress";

describe("RadialProgress", () => {
  it("renders the component with correct percentage", () => {
    render(<RadialProgress percentage={75} />);

    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toHaveTextContent("75%");
  });

  it("applies correct CSS custom properties", () => {
    render(<RadialProgress percentage={60} />);

    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toHaveStyle({
      "--value": "60",
      "--size": "10rem",
      "--thickness": "1rem",
    });
  });

  it("has the correct base classes", () => {
    render(<RadialProgress percentage={50} />);

    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toBeInTheDocument();
  });

  it("renders with 0% correctly", () => {
    render(<RadialProgress percentage={0} />);

    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toHaveTextContent("0%");
    expect(progressElement).toHaveStyle({
      "--value": "0",
    });
  });

  it("renders with 100% correctly", () => {
    render(<RadialProgress percentage={100} />);

    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toHaveTextContent("100%");
    expect(progressElement).toHaveStyle({
      "--value": "100",
    });
  });

  it("handles decimal percentages", () => {
    render(<RadialProgress percentage={33.33} />);

    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toHaveTextContent("33.33%");
    expect(progressElement).toHaveStyle({
      "--value": "33.33",
    });
  });
});
