import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "../components/ui/command";
import { render, screen, fireEvent } from "@testing-library/react";

import { Dialog, DialogTitle, DialogContent } from "@radix-ui/react-dialog";

describe("Command Component", () => {
  test(" 1 Renders command component", () => {
    render(<Command>Command</Command>);
    const command = screen.getByText("Command");
    expect(command).toBeInTheDocument();
  });

  test("2 renders commandDialog with children", () => {
    render(
      <CommandDialog open={true} onOpenChange={() => {}}>
        <CommandInput placeholder="Search..."></CommandInput>
      </CommandDialog>
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  test("11 CommandShortcut renders with custom text", () => {
    render(<CommandShortcut>Cmd+K</CommandShortcut>);
    expect(screen.getByText("Cmd+K")).toHaveClass(
      "ml-auto text-xs tracking-widest text-muted-foreground"
    );
  });
});
