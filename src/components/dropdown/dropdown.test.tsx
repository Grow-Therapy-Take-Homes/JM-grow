import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Dropdown } from ".";

describe("Dropdown", () => {
  it("hides dropdown view", async () => {
    render(
      <Dropdown
        icon={null}
        label={"display_label"}
        iconBackground={"blue"}
        value={"hello"}
      >
        <div>DISPLAY ITEM</div>
      </Dropdown>
    );

    const displayItem = screen.queryByText("DISPLAY ITEM");
    expect(displayItem).not.toBeInTheDocument();
  });

  it("displays dropdown view", async () => {
    render(
      <Dropdown
        icon={null}
        label={"display_label"}
        iconBackground={"blue"}
        value={"hello"}
      >
        <div>DISPLAY ITEM</div>
      </Dropdown>
    );

    fireEvent(
      screen.getByText("display_label"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(screen.getByText("DISPLAY ITEM")).toBeVisible();
  });

  it("displays and hides dropdown view", async () => {
    render(
      <Dropdown
        icon={null}
        label={"display_label"}
        iconBackground={"blue"}
        value={"hello"}
      >
        <div>DISPLAY ITEM</div>
      </Dropdown>
    );

    fireEvent(
      screen.getByText("display_label"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(screen.getByText("DISPLAY ITEM")).toBeVisible();

    fireEvent(
      screen.getByText("display_label"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    const displayItem = screen.queryByText("DISPLAY ITEM");
    expect(displayItem).not.toBeInTheDocument();
  });
});
