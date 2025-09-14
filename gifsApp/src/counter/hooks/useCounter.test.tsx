import { beforeEach, describe,  expect,  test } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {

    const initialValue =  10;
    beforeEach(()=> {
    })
    
    test('should initialize with default value 5', () => {
        const { result } = renderHook(()=> useCounter())
        expect(result.current.counter).toBe(5)
    })

     test('should initialize with initial value 10', () => {
        const { result } = renderHook(()=> useCounter(initialValue))
        expect(result.current.counter).toBe(initialValue)
    })

    test('should increment counter when hadleAdd is called', () => {
       const { result } = renderHook(()=> useCounter(initialValue))
       act(()=> result.current.handleAdd()) //cada modificación del estado debe tener su propio act
       expect( result.current.counter).toBe(11)
    })

    test('should decrement counter when hanldeSubtract is called', ()=> {
        const { result } = renderHook(()=> useCounter(initialValue))
        act(() => result.current.handleSubtract())
        expect(result.current.counter).toBe(9)
    })

    test('should reset to initial value when handleReset function is called', ()=> {
        const { result } = renderHook(()=> useCounter(initialValue))
        act(() => result.current.handleSubtract())
        act(() => result.current.handleSubtract())
        act(() => result.current.handleSubtract())

        act(() => result.current.handleReset())
        expect(result.current.counter).toBe(initialValue)
    })
})