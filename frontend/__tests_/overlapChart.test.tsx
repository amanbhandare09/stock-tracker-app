//all test are passing
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OverlapChart from "../app/ui/overlap/overlapchart";

// Mock the RadialProgress component
jest.mock("../app/ui/overlap/radialprogress", () => {
  return function MockRadialProgress({ percentage }: { percentage: number }) {
    return <div data-testid="radial-progress">{percentage}%</div>;
  };
});

describe("OverlapChart", () => {
  const mockData = {
    uncommon_percentage: [43, 50],
    commontotalpercentage: [50, 50],
  };

  it("renders the component with correct structure", () => {
    render(<OverlapChart data={mockData} />);

    expect(screen.getByText("SCHEME A")).toBeInTheDocument();
    expect(screen.getByText("SCHEME B")).toBeInTheDocument();
    expect(
      screen.getByText("IN SCHEME A, NOT IN SCHEME B")
    ).toBeInTheDocument();
    expect(screen.getByText("COMMMON IN SCHEME A")).toBeInTheDocument();
    expect(screen.getByText("COMMON IN SCHEME B")).toBeInTheDocument();
    expect(
      screen.getByText("IN SCHEME B, NOT IN SCHEME A")
    ).toBeInTheDocument();
  });

  it("renders the correct number of RadialProgress components", () => {
    render(<OverlapChart data={mockData} />);

    const radialProgressComponents = screen.getAllByTestId("radial-progress");
    expect(radialProgressComponents).toHaveLength(4);
  });

  it("displays correct percentages in RadialProgress components", () => {
    render(<OverlapChart data={mockData} />);

    const radialProgressComponents = screen.getAllByTestId("radial-progress");
    expect(radialProgressComponents[0]).toHaveTextContent("43%");
    expect(radialProgressComponents[1]).toHaveTextContent("50%");
    expect(radialProgressComponents[2]).toHaveTextContent("50%");
    expect(radialProgressComponents[3]).toHaveTextContent("50%");
  });

  it("has the correct layout structure", () => {
    render(<OverlapChart data={mockData} />);

    const mainContainer = screen.getByText("SCHEME A").closest(".relative");
    expect(mainContainer).toBeInTheDocument();

    const schemeALabel = screen.getByText("SCHEME A");
    expect(schemeALabel).toBeInTheDocument();

    const schemeBLabel = screen.getByText("SCHEME B");
    expect(schemeBLabel).toBeInTheDocument();

    const joinContainer = screen
      .getByText("IN SCHEME A, NOT IN SCHEME B")
      .closest(".join");
    expect(joinContainer).toBeInTheDocument();

    const schemeABox = screen
      .getByText("IN SCHEME A, NOT IN SCHEME B")
      .closest(".join-item");
    expect(schemeABox).toBeInTheDocument();

    const commonStocksBox = screen
      .getByText("COMMMON IN SCHEME A")
      .closest(".join-item");
    expect(commonStocksBox).toBeInTheDocument();

    const schemeBBox = screen
      .getByText("IN SCHEME B, NOT IN SCHEME A")
      .closest(".join-item");
    expect(schemeBBox).toBeInTheDocument();
  });
});
