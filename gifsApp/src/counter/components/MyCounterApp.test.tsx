import { describe, expect, test } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
import { fireEvent, render, screen } from "@testing-library/react";

describe("MyCounterApp", () => {
  test("should render component", () => {
    render(<MyCounterApp />);
    screen.debug();

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      `Counter: 5`
    );
    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Reset" })).toBeDefined();
  });

  test("should increment counter", () => {
    render(<MyCounterApp />);

    const labelH1 = screen.getByRole("heading", { level: 1 });
    const button = screen.getByRole("button", { name: "+1" });

    fireEvent.click(button)

    expect(labelH1.innerHTML).toContain('Counter: 6')
  });

    test("should decrement counter", () => {
    render(<MyCounterApp />);

    const labelH1 = screen.getByRole("heading", { level: 1 });
    const button = screen.getByRole("button", { name: "-1" });

    fireEvent.click(button)

    expect(labelH1.innerHTML).toContain('Counter: 4')
  });

  test('should reset counter', ()=> {
    render(<MyCounterApp />);

    const labelH1 = screen.getByRole("heading", { level: 1 });
    const button = screen.getByRole("button", { name: "Reset" });

    fireEvent.click(button)

    expect(labelH1.innerHTML).toContain('Counter: 5')
  })
});
