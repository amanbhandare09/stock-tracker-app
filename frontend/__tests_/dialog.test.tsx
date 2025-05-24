//All tests are passing
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

describe("Dialog Component", () => {
  it("renders the dialog trigger", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Content</div>
          <DialogFooter>
            <button>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
  });

  it("opens the dialog when trigger is clicked", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Content</div>
          <DialogFooter>
            <button>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText("Open Dialog"));

    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog Description")).toBeInTheDocument();
    expect(screen.getByText("Dialog Content")).toBeInTheDocument();
  });

  it("closes the dialog when close button is clicked", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Content</div>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText("Open Dialog"));

    expect(screen.getByText("Dialog Title")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument();
  });

  it("applies custom className to DialogContent", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent className="custom-class">
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Content</div>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByText("Open Dialog"));

    const dialogContentElement =
      screen.getByText("Dialog Content").parentElement;
    expect(dialogContentElement).toHaveClass("custom-class");
  });
});
