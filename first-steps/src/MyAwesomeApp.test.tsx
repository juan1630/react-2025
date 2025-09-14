import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyAwesomeApp } from "./MyAwesomeApp";

describe("MyAwesomeApp.tsx", () => {
  test("should render firstName and lastName", () => {
    const { container } = render(<MyAwesomeApp />);

    screen.debug();
    const h1 = container.querySelector("h1");
    expect(h1?.innerHTML).toContain("Jose Juan");

    const h3 = container.querySelector("h3");
    expect(h3?.innerHTML).toContain("Patrón");
  });

  test("should render firstName and lastName", () => {
  
    //El container solo cuando es un render inicial
    render(<MyAwesomeApp />);

    screen.debug();
    // const h1 = screen.getByRole('heading', { level: 1});
    const h1 = screen.getByTestId('first-name-title');
    console.log(h1.innerHTML)
    expect(h1?.innerHTML).toContain("Jose Juan");

  });

  test('should match snapshot', ()=> {
    const { container } = render(<MyAwesomeApp/>)
    expect(container).toMatchSnapshot()
  })

   test('should match snapshot', ()=> {
    
    render(<MyAwesomeApp/>)
    expect(screen.getByTestId('div-app')).toMatchSnapshot()
  })
});
