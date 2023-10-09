import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { List } from ".";

describe("List", () => {
  it("displays correct the correct items", () => {
    render(
      <List
        items={[
          { article: "Article 1" },
          { article: "Article 2" },
          { article: "Article 3" },
          { article: "Article 4" },
        ]}
        emptyMessage="No articles to display"
        renderView={(item) => <span>{item.article}</span>}
      />
    );

    expect(screen.getByText("Article 1")).toBeVisible();
    expect(screen.getByText("Article 2")).toBeVisible();
    expect(screen.getByText("Article 3")).toBeVisible();
    expect(screen.getByText("Article 4")).toBeVisible();
  });

  it("displays empty message", () => {
    render(
      <List
        items={[]}
        emptyMessage="No articles to display"
        renderView={() => <p></p>}
      />
    );

    expect(screen.getByText("No articles to display")).toBeVisible();
  });
});
