import { describe, expect, test } from "vitest";
import { SearchControl } from "./SearchControl";
import { MemoryRouter } from "react-router";
import { fireEvent, render, screen } from "@testing-library/react";

if (typeof window.ResizeObserver === "undefined") {
  class ResizeObserver {
    observer() {}
    unobserver() {}
    disconnect() {}
    observe() {}
    unobserve(){}
  }
  window.ResizeObserver = ResizeObserver;
}

const renderSearchControlWithRouter = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControl />
    </MemoryRouter>
  );
};

describe("SearchControl", () => {
  test("should render search control with default values", () => {
    const { container } = renderSearchControlWithRouter();
    expect(container).toMatchSnapshot();
  });

  test("should set input value when search param name is set", () => {
    renderSearchControlWithRouter(["/?name=batman"]);
    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams..."
    );

    expect(input.getAttribute("value")).toBe("batman");
  });

  test("should change value when input value is change", () => {
    renderSearchControlWithRouter(["/?name=batman"]);
    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams..."
    );
    expect(input.getAttribute("value")).toBe("batman");

    fireEvent.change(input, { target: { value: "superman" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input.getAttribute("value")).toBe("superman");
  });

  test("should change params strength when slider change", () => {
    renderSearchControlWithRouter([
      "/?name=batman&active-acordion=advanced-filters",
    ]);
    const slider = screen.getByRole("slider");
    expect(slider.getAttribute('aria-valuenow')).toBe('0')
    
    fireEvent.keyDown(slider, {key:'ArrowRight'})
    expect(slider.getAttribute('aria-valuenow')).toBe('1')
  });

  test('should accordion be open when active-accordion param is set', ()=> {
    renderSearchControlWithRouter([
        "/?name=batman&active-acordion=advanced-filters",
      ]);

      const accordion = screen.getByTestId('accordion')
      const accordionItem = accordion.querySelector('div')

      expect(accordionItem?.getAttribute('data-state')).toBe('open')
  })


  
  test('should accordion be close when active-accordion param is not set', ()=> {
    renderSearchControlWithRouter([
        "/?name=batman",
      ]);

      const accordion = screen.getByTestId('accordion')
      const accordionItem = accordion.querySelector('div')

      expect(accordionItem?.getAttribute('data-state')).toBe('closed')
  })

});
