//need improvement
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../app/ui/pagination";

describe("Pagination Component", () => {
  test("renders correctly and shows correct buttons", () => {
    render(
      <Pagination totalPages={5} currentPage={3} onPageChange={() => {}} />
    );
    expect(screen.getByText("«")).toBeInTheDocument();
    expect(screen.getByText("Page 3")).toBeInTheDocument();
    expect(screen.getByText("»")).toBeInTheDocument();

    expect(screen.getByText("«")).not.toBeDisabled();
    expect(screen.getByText("»")).not.toBeDisabled();
  });

  test("disables previous button on the first page", () => {
    render(
      <Pagination totalPages={5} currentPage={1} onPageChange={() => {}} />
    );
    expect(screen.getByText("«")).toBeDisabled();
  });

  test("disables next button on the last page", () => {
    render(
      <Pagination totalPages={5} currentPage={5} onPageChange={() => {}} />
    );
    expect(screen.getByText("»")).toBeDisabled();
  });

  test("both buttons should be available on middle page", () => {
    render(
      <Pagination totalPages={5} currentPage={2} onPageChange={() => {}} />
    );
    expect(screen.getByText("«")).not.toBeDisabled();
    expect(screen.getByText("»")).not.toBeDisabled();
  });

  test("calls onPageChange with the correct page number", () => {
    const onPageChange = jest.fn();

    render(
      <Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />
    );

    // Click the previous button
    fireEvent.click(screen.getByText("«"));
    expect(onPageChange).toHaveBeenCalledWith(2);

    // Click the next button
    fireEvent.click(screen.getByText("»"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  test("only one page", () => {
    render(
      <Pagination totalPages={1} currentPage={1} onPageChange={() => {}} />
    );
    expect(screen.getByText("«")).toBeDisabled();
    expect(screen.getByText("»")).toBeDisabled();
  });
});
