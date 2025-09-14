const characterNames = ["goku", "vegeta", "frezeer"];

const [, , trunks] = characterNames;

console.log({ trunks });

const returnsArraFn = () => {
  return ["ABC", 123] as const;
};

const [letters, numbers] = returnsArraFn();
console.log(numbers + 100);

//useState

function useState(name: string) {
  return [
    name,
    function (name: string) {
      console.log(name);
    },
  ] as const;
}

const [state, setState] = useState("Goku");

console.log(state);
setState("Vegeta");
