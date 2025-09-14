interface Address {
  postalCode: number;
  city: string;
}
interface Person {
  name: string;
  lastName: string;
  age: number;
  address: Address;
}

const person: Person = {
  name: "Tony",
  lastName: "Stark",
  age: 45,
  address: {
    postalCode: 1235,
    city: "New York",
  },
};

console.log(person);

person.name = "Peter";
person.lastName = "Parker";

console.log(person);

const spiderman = { ...person };
const clone = structuredClone(person);

spiderman.name = "Peter 2";
spiderman.address.city = "San José";
console.log(person, spiderman);

clone.address.city = "Palo alto";
console.log(clone);
