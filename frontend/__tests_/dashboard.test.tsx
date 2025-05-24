//need changes in type of data
import { render, screen } from "@testing-library/react";
import Dashboard from "../app/ui/overlap/Dashboard";

const mockData = {
  totalpercentage: 75,
  commontotalpercentage: 50,
  uncommon_percentage: 25,
  total_stock: [100, 150],
  commontotal_stock: 10,
  uncommon_stock: [5, 7],
  overlap_percentage: 60,
};

describe("Dashboard component", () => {
  test("renders Dashboard with provided data", () => {
    render(<Dashboard data={mockData} />);

    // Verify CircularProgress component
    expect(screen.getByText("60%")).toBeInTheDocument();
    expect(
      screen.getByText("percentage portfolio overlap")
    ).toBeInTheDocument();

    // Verify Common Stocks section
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Common stocks")).toBeInTheDocument();

    // Verify Uncommon Stocks in A section
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Uncommon stocks in A")).toBeInTheDocument();
    expect(screen.getByText("total stocks in A: 100")).toBeInTheDocument();

    // Verify Uncommon Stocks in B section
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("Uncommon stocks in B")).toBeInTheDocument();
    expect(screen.getByText("total stocks in B: 150")).toBeInTheDocument();
  });
});

const emptyData = {
  totalpercentage: 0,
  commontotalpercentage: 0,
  uncommon_percentage: 0,
  total_stock: [0, 0],
  commontotal_stock: 0,
  uncommon_stock: [0, 0],
  overlap_percentage: 0,
};

describe("Dashboard component with empty data", () => {
  test("renders Dashboard with empty data without crashing", () => {
    render(<Dashboard data={emptyData} />);

    // Verify that there are multiple elements with "0"
    const zeroElements = screen.getAllByText("0");
    expect(zeroElements.length).toBeGreaterThanOrEqual(3); // Adjust this number based on your expected elements

    // You can also verify specific elements if needed
    expect(zeroElements[0]).toHaveTextContent("0"); // Example for first zero element
    expect(
      screen.getByText("percentage portfolio overlap")
    ).toBeInTheDocument();
    expect(screen.getByText("Common stocks")).toBeInTheDocument();
    expect(screen.getByText("Uncommon stocks in A")).toBeInTheDocument();
    expect(screen.getByText("total stocks in A: 0")).toBeInTheDocument();
    expect(screen.getByText("Uncommon stocks in B")).toBeInTheDocument();
    expect(screen.getByText("total stocks in B: 0")).toBeInTheDocument();
  });
});
