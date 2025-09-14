interface User  {
    uid: string
    username: string
}

function greet(name: string): string {
    return `Hola ${name}`
}

const greetWithName = greet('Goku');
console.log(greetWithName);

///arow function

const greet2 = (name:string): string => `Hola ${name}`;

const greetWithName2 = greet2('Vegeta')
console.log(greetWithName2);


function getUser(): User {
    return {
        uid:'ABC-123',
        username: "Juan"
    }
}

console.log(getUser());

const getUser2 = () : User => ({
        uid:'ABC-123',
        username: "Juan 2"
    })


console.log(getUser2());