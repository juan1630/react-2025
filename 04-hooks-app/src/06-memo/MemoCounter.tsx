import { useCounter } from "@/03-example/hooks/useCounter";
import { useMemo } from "react";

const heavyStuff = (iterationNumber: number) => {
    console.time('Heavy stuff started')

    for(let i = 0; i < iterationNumber; i++ ){
        console.log('ahí vamos')
    }

    console.timeEnd('Heavy stuff started');

    return `${iterationNumber} iteraciones realizadas`
}

export const MemoCounter = () => {
  const { counter, increment } = useCounter(40_000);
  const { counter:counter2, increment:incrementBy1 } = useCounter(40_000);
  const myHeavyValue = useMemo(()=>  heavyStuff(counter), [counter])
  return (
    <div className="bg-gradient flex flex-col  gap-4">

      <h1 className="text-2xl font-bold" >{myHeavyValue} - useMemo</h1>
      <h1 className="text-2xl font-bold" >{counter2} - useMemo</h1>
      <hr />

      <h4>Counter: {counter} </h4>
      <h4>Counter: {counter} </h4>


      <button className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer" onClick={increment} > +1 </button>
      <button className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer" onClick={incrementBy1} > +1 -- button </button>
    </div>
  );
};
