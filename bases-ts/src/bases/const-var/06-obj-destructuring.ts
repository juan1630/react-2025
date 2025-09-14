const persona = {
    name: "Tony",
    age: 45,
    key: "Ironman"
}

const {name:ironmanName, age: tonysAge, key } = persona

console.log({ironmanName, tonysAge, key})


interface Hero {
    name: string
    age: number
    key: string
    rank?: string
}


const useContext = ({ age, name, key, rank = 'Sin rango'}: Hero ) => {
    return {
        keyName: key,
        user: {
            name,
            age
        },
        rank
    }
}

const { keyName, rank, user} = useContext(persona);
const { name, age } = user;
console.log(keyName, rank, name, age);
