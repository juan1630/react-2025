import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { FirstStepsApp } from './FirstStepsApp'


const mockItemCounter = vi.fn((props: unknown)=> {
    return <div data-testid="ItemCounter"/>
})

vi.mock('./ShoppingCart/ItemCounter', ()=>({
    ItemCounter: (props:unknown)=> mockItemCounter(props),
}))

// vi.mock('./ShoppingCart/ItemCounter', ()=>({
//     ItemCounter: (props:unknown)=> <div data-testid="ItemCounter" name={props.name} quantity={props.quantity} />,
// }))


describe('FirstStepsApp.tsx', ()=> {

    afterEach(()=>{
        vi.clearAllMocks() //limpia todos los mocks antes de cada prueba
    })

    test('Should match snpashot', ()=> {
        const {container} = render(<FirstStepsApp/>)
        expect(container).toMatchSnapshot()
    })

     test('Should render the correct number of itemCounter components', ()=> {
         render(<FirstStepsApp/>)
        
         const itemCounters = screen.getAllByTestId('ItemCounter') 
        expect(itemCounters.length).toBe(3)
        
    })

    test('Should render with correct counter', ()=> {
         render(<FirstStepsApp/>)


         expect(mockItemCounter).toHaveBeenCalledTimes(3)
         expect(mockItemCounter).toHaveBeenCalledWith({ name: 'Nintendo Switch 2' , quantity: 2 })
         expect(mockItemCounter).toHaveBeenCalledWith({ name: 'Pro controller', quantity: 10 })
         expect(mockItemCounter).toHaveBeenCalledWith({ name: 'Super Smash', quantity: 5 })
    })
})