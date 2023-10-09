import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { List } from ".";

describe("List", () => {
  it("displays correct the correct items", () => {
    render(
      <List
        items={[<p>4</p>, <p>2</p>, <p>2</p>, <p>4</p>]}
        renderView={(item) => <span>{item}</span>}
      />
    );

    expect(screen.getAllByText(4)).toHaveLength(2);
    expect(screen.getAllByText(2)).toHaveLength(2);
  });
});
