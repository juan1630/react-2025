import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { CustomHeader } from "./CustomHeader";

describe("Custom header", () => {
  const title = "Buscador de gifs";

  test("should render the title correctly", () => {
    const container = render(<CustomHeader title={title} />);
    const h1Tag = container.getByText(title);
    expect(h1Tag).toBeDefined();
  });

  test("should render description when is provided", () => {
    const description = "Busca tu gif";

    render(<CustomHeader title={title} description={description} />);
    expect(screen.getByText(description)).toBeDefined();
    expect(screen.getByRole("paragraph")).toBeDefined();
    expect(screen.getByRole("paragraph").innerHTML).toBe(description);
  });

  test("Should not render description when is not provided", () => {
    const { container } = render(<CustomHeader title={title} />);
    const divElement = container.querySelector(".content-center");

    const h1 = divElement?.querySelector("h1");
    expect(h1?.innerHTML).toBe(title);

    const p = divElement?.querySelector("p");
    expect(p).toBeNull();
  });
});
