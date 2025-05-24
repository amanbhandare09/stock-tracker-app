//All tests are passing
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HorizontalBarGraph from "../app/ui/overlap/HorizontalBarGraph";

// Mock the recharts library
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: ({
    dataKey,
    fill,
    name,
  }: {
    dataKey: string;
    fill: string;
    name: string;
  }) => (
    <div data-testid={`bar-${dataKey}`} style={{ fill }}>
      {name}
    </div>
  ),
  XAxis: () => <div data-testid="x-axis">XAxis</div>,
  YAxis: () => <div data-testid="y-axis">YAxis</div>,
  CartesianGrid: () => <div data-testid="cartesian-grid">CartesianGrid</div>,
  Tooltip: () => <div data-testid="tooltip">Tooltip</div>,
  Legend: () => <div data-testid="legend">Legend</div>,
}));

describe("HorizontalBarGraph", () => {
  const mockData = [
    { stock: "AAPL", overlap1: 10, overlap2: 15 },
    { stock: "GOOGL", overlap1: 8, overlap2: 12 },
  ];

  const mockName = ["Aditya Birla", "HDFC Equity Fund-G"];

  it("renders the chart components", () => {
    render(<HorizontalBarGraph data={mockData} name={mockName} />);
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    expect(screen.getByTestId("x-axis")).toBeInTheDocument();
    expect(screen.getByTestId("y-axis")).toBeInTheDocument();
    expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("legend")).toBeInTheDocument();
  });

  it("renders two Bar components with correct properties", () => {
    render(<HorizontalBarGraph data={mockData} name={mockName} />);
    const bar1 = screen.getByTestId("bar-overlap1");
    const bar2 = screen.getByTestId("bar-overlap2");

    expect(bar1).toBeInTheDocument();
    expect(bar2).toBeInTheDocument();
    expect(bar1).toHaveTextContent("Aditya Birla");
    expect(bar2).toHaveTextContent("HDFC Equity Fund-G");
    expect(bar1).toHaveStyle("fill: #1e50d8");
    expect(bar2).toHaveStyle("fill: #1fc660");
  });

});
