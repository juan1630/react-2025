import { useCounterStore } from "@/auth/store/auth.store"
import { Button } from "@/components/ui/button"


export const ProductPage = () => {

  const { inc, count, decrement, incBy } = useCounterStore()

  return (
    <>
    <h1 className="text-2xl font-bold" > count: {count} </h1>
    <Button onClick={inc} > +1 </Button>
    <Button onClick={decrement} > -1 </Button>
    <Button onClick={()=>incBy(5)} > +5 </Button>
    </>
  )
}
