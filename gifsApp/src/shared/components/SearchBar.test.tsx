import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CustomSearch } from "./SearchBar";

describe("should render Searchbar correct", () => {
  test("should render searchbar correctly", () => {
    const { container } = render(<CustomSearch onQuery={() => {}} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByRole("textbox")).toBeDefined();
  });

  test("should call onQuery with the correct value after 700ms", async () => {
    const onQuery = vi.fn();
    render(<CustomSearch onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    // await new Promise((resolve) => setTimeout(resolve, 700))
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith("test");
    });
  });

  test("should call only once with the last value (debounce)", async () => {
    const onQuery = vi.fn();
    render(<CustomSearch onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1);
      expect(onQuery).toHaveBeenCalledWith("te");
    });
  });

  test("should call onquery when button is clicked with the input value", () => {
    const onQuery = vi.fn();
    render(<CustomSearch onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith("t");
  });

  test('should the input has the correct placeholder value', () => {
    
    const placeholder = 'Buscar'
    render(<CustomSearch onQuery={()=> {}}  placeholder={placeholder}/>);
    
    expect(screen.getByPlaceholderText(placeholder)).toBeDefined()

  })
});
