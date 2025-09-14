import { useState } from "react";

export const useCounter = (initialValue: number = 1) => {
  const [counter, setCounter] = useState<number>(initialValue);

  const increment = () => {
    setCounter((prev) => prev + 1);
  };

  const decrement = () => {
    setCounter((prev) => {
      if (prev === 0) return 0;
      return prev - 1;
    });
  };

  return {
    counter,
    increment,
    decrement,
  };
};
