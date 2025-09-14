export const add = (a:number, b:number) => {
    // a++

    return a + b
}

export const subtract = (a:number, b:number) => {
    if(a == 0 || b == 0) {
        return 0
    }
    return a - b
}

export const multiply = (a:number, b:number) => {
    return a * b
}

export const divide = (a:number, b:number) => {
    return a / b
}