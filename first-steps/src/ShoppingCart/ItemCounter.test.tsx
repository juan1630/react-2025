import { fireEvent, render, screen, getByText } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { ItemCounter } from "./ItemCounter";

describe("ItemCounter", () => {
  test("Should render with default values", () => {
    const nameItem = "Nintend Switch 2";
    const quantityItem = 2;

    render(<ItemCounter name={nameItem} quantity={quantityItem} />);

    expect(screen.getByText(nameItem)).toBeDefined();
    expect(screen.getByText(nameItem)).not.toBeNull();
  });
  test("Should render with custom quantity", () => {
    const nameItem = "Nintend Switch 2";
    const quantityItem = 2;

    render(<ItemCounter name={nameItem} quantity={quantityItem} />);

    expect(screen.getByText(quantityItem)).toBeDefined();
  });

  test("should increase count when +1 button is cliked", () => {
    const nameItem = "Nintend Switch 2";
    const quantityItem = 1;

    render(<ItemCounter name={nameItem} quantity={quantityItem} />);
    const [ buttonAdd ] = screen.getAllByRole('button')
    fireEvent.click(buttonAdd)

    expect(screen.getByText('2')).toBeDefined()
  });

   test("should decrease count when -1 button is cliked", () => {
    const nameItem = "Nintend Switch 2";
    const quantityItem = 5;

    render(<ItemCounter name={nameItem} quantity={quantityItem} />);
    const [ ,buttonSubtract ] = screen.getAllByRole('button')
    fireEvent.click(buttonSubtract)

    expect(screen.getByText('4')).toBeDefined()
  });


  test("should not decrease count when value is 0", () => {
    const nameItem = "Nintend Switch 2";
    const quantityItem = 0;

    render(<ItemCounter name={nameItem} quantity={quantityItem} />);
    const [ ,buttonSubtract ] = screen.getAllByRole('button')
    fireEvent.click(buttonSubtract)

    expect(screen.getByText('0')).toBeDefined()
  });

  test('Should changed to red when count is 1', () => {
    
    const nameItem = "Nintend Switch 2";
    const quantityItem = 1;

    render(<ItemCounter name={nameItem} quantity={quantityItem} />);
    
    const itemText = screen.getByText(nameItem)
    expect(itemText.style.color).toBe('red')

  })


    test('Should changed to black when count is grather than 1', () => {
    
    const nameItem = "Nintend Switch 2";
    const quantityItem = 2;

    render(<ItemCounter name={nameItem} quantity={quantityItem} />);
    
    const itemText = screen.getByText(nameItem)
    expect(itemText.style.color).toBe('black')

  })
});
