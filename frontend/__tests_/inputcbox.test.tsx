import { ComboboxPopover } from "../app/ui/overlap/inputcbox";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("ComboboxPopover", () => {
  test("renders correctly with initial state", () => {
    render(<ComboboxPopover scheme="Scheme A" onValueChange={() => {}} />);
    expect(screen.getByText("+ Add Scheme")).toBeInTheDocument();
  });
});
