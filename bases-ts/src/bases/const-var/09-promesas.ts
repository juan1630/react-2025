const myPromise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    //resolve(100)
    reject("Mi amgio se dío a la fuga");
  }, 2000);
});

myPromise
  .then((myMoneyIsBack) => {
    console.log(`Mi amigo me regresó ${myMoneyIsBack}`);
  })
  .catch((error) => console.warn(error))
  .finally(() => console.log("A seguir con mi vida"));
//api: 1eu22wGdXzXXB0matHYtHF6aVRirio40