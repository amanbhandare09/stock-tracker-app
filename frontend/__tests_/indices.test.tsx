import Indices from "../app/ui/index/indices";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Indices Component", () => {
  it("should render compoenet and title", () => {
    render(<Indices />);

    expect(screen.getByText("Mutual Fund Indices")).toBeInTheDocument();
  });

  it("Should show all indices by default", () => {
    render(<Indices />);

    expect(screen.getByText("S&P 500")).toBeInTheDocument();
    expect(screen.getByText("Nikkei 225")).toBeInTheDocument();
    expect(
      screen.getByText("Dow Jones Industrial Average")
    ).toBeInTheDocument();
    expect(screen.getByText("NASDAQ Composite")).toBeInTheDocument();
  });

  it("should filter indicies based on selected categories", () => {
    render(<Indices />);

    fireEvent.change(screen.getByLabelText(/select category/i), {
      target: { value: "Money Market Index" },
    });

    expect(screen.getByText("1-Year Treasury")).toBeInTheDocument();
    expect(screen.getByText("3-Month CD")).toBeInTheDocument();
    expect(screen.queryByText("S&P 500")).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/select category/i), {
      target: { value: "Strategy Index" },
    });

    expect(screen.getByText("Growth Strategy")).toBeInTheDocument();
    expect(screen.getByText("Value Strategy")).toBeInTheDocument();
    expect(screen.queryByText("S&P 500")).not.toBeInTheDocument;
  });

  it("should show all indices when no category is selected", () => {
    render(<Indices />);

    fireEvent.change(screen.getByLabelText(/select category/i), {
      target: { value: "" },
    });

    expect(screen.getByText("S&P 500")).toBeInTheDocument();
    expect(screen.getByText("Nikkei 225")).toBeInTheDocument();
    expect(
      screen.getByText("Dow Jones Industrial Average")
    ).toBeInTheDocument();
    expect(screen.getByText("NASDAQ Composite")).toBeInTheDocument();
  });
});
