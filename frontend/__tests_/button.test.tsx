//All tests are passing
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import React from "react";

describe("Button Component", () => {
  test("renders with default variant and size", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button", { name: /Default Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "bg-primary text-primary-foreground h-10 px-4 py-2"
    );
  });

  test("renders with different variants", () => {
    render(<Button variant="destructive">Destructive Button</Button>);
    const button = screen.getByRole("button", { name: /Destructive Button/i });
    expect(button).toHaveClass(
      "bg-destructive text-destructive-foreground hover:bg-destructive/90"
    );

    render(<Button variant="outline">Outline Button</Button>);
    const outlineButton = screen.getByRole("button", {
      name: /Outline Button/i,
    });
    expect(outlineButton).toHaveClass(
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
    );
  });

  test("renders with different sizes", () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole("button", { name: /Small Button/i });
    expect(button).toHaveClass("h-9 rounded-md px-3");

    render(<Button size="lg">Large Button</Button>);
    const largeButton = screen.getByRole("button", { name: /Large Button/i });
    expect(largeButton).toHaveClass("h-11 rounded-md px-8");
  });

  test("renders with custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole("button", { name: /Custom Button/i });
    expect(button).toHaveClass("custom-class");
  });

  test("forwards ref to the button element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Button with Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  test("renders as a different component with asChild", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const linkButton = screen.getByRole("link", { name: /Link Button/i });
    expect(linkButton).toBeInTheDocument();
    expect(linkButton.tagName).toBe("A");
  });

  test("Disabled button" , () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button", { name: /Disabled Button/i });
    expect(button).toBeDisabled();
    
  })
});
