import './style.css'

// import './bases/const-var/const-let.ts';
// import './bases/const-var/02-template-string';
//import './bases/const-var/03-object-literal'
//import './bases/const-var/04-arrays'
// import './bases/const-var/05-funciones';
//import './bases/const-var/06-obj-destructuring';
//import './bases/const-var/07-array-destructuring';
//import './bases/const-var/08-import-export'
import  { getHeroesByOwner  } from  './bases/const-var/08-import-export'
//import './bases/const-var/09-promesas'
//import './bases/const-var/10-fetct-api';
import './bases/const-var/11-asy-await'

import { Owner } from './bases/data/heroes.data';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Hola mundo</h1>
  </div>
`
console.log(getHeroesByOwner(Owner.DC));