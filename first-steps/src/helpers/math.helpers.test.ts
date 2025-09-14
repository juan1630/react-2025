import { describe, expect, test } from "vitest";
import { add, subtract, multiply, divide } from "./math.helpers";

describe("add", () => {
  test("should add two positives numbers", () => {
    //1 . arrenge
    //2. Act
    //3. Assert
    const result = add(3, 1);
    console.log({ result });

    expect(result).toBe(4);
  });
});


describe('subtract', ()=> {
    test('should subtract two numbers', () => {
        const a = 8
        const b = 2
        const result = subtract(a,b)

        expect(result).toBe(a-b)
    })
    test('should recived only positive numbers', () => {
        const a = 2
        const b = 2
        const result = subtract(a,b)

        expect(result).toBe(a-b)
    })
        test('should recived only positive numbers', () => {
        const a = 0
        const b = 2
        const result = subtract(a,b)

        expect(result).toBe(0)
    })
})

describe('multiply' , ()=> {
    test('should multiply two numbers', ()=> {
        const  result = multiply(2,3)
        expect(result).toBe(6)
    });

    test('should return 0 if any of numbers is 0', ()=> {
        const  result = multiply(0,3)
        expect(result).toBe(0)
    });
});


describe('divide' , ()=> {
    test('should multiply two numbers', ()=> {
        const  result = divide(6,2)
        expect(result).toBe(3)
    });
});