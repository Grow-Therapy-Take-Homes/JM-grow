import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Pagination } from ".";

describe("Pagination", () => {
  it("displays correct number of pages", () => {
    render(<Pagination currentPage={1} pageCount={3} setPage={() => null} />);

    expect(screen.getAllByRole("button")).toHaveLength(5);
  });

  it("displays disabled back button", () => {
    render(<Pagination currentPage={0} pageCount={3} setPage={() => null} />);

    expect(screen.getByTestId("back")).toBeDisabled();
  });

  it("displays disabled forward button", () => {
    render(<Pagination currentPage={2} pageCount={3} setPage={() => null} />);

    expect(screen.getByTestId("forward")).toBeDisabled();
  });

  it("display limited number of buttons", () => {
    render(<Pagination currentPage={2} pageCount={50} setPage={() => null} />);

    expect(screen.getAllByRole("button")).toHaveLength(7);
  });
});
