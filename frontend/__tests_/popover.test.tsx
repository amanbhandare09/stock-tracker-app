//All tests are passing
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

describe("Popover", () => {
  it("renders the trigger and content", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    expect(screen.getByText("Open Popover")).toBeInTheDocument();
  });

  it("shows content when trigger is clicked", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText("Open Popover");
    fireEvent.click(trigger);

    expect(screen.getByText("Popover Content")).toBeInTheDocument();
  });

  it("applies custom className to PopoverContent", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent className="custom-class">
          Popover Content
        </PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText("Open Popover");
    fireEvent.click(trigger);

    const content = screen.getByText("Popover Content");
    expect(content).toHaveClass("custom-class");
  });
});
