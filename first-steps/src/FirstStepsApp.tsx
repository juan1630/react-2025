import { ItemCounter } from "./ShoppingCart/ItemCounter";

interface ItemInCar {
  name: string
  quantity: number
}

const ProductsInCart: ItemInCar[] = [
  { name: 'Nintendo Switch 2' , quantity: 2 },
  { name: 'Pro controller', quantity: 10 },
  { name: 'Super Smash', quantity: 5 },
]
export function FirstStepsApp() {
  return (
    <>
    {
      ProductsInCart.map( ({ name, quantity }) => (<ItemCounter key={name} name={name}  quantity={quantity} />))
    }
    </>
  );
}
