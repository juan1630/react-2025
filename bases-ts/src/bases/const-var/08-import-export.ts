import { heroes, type Owner, type Hero } from '../data/heroes.data'

const getHeroById = (id:number) :Hero => {
    const heroe = heroes.find((heroe) => {
        return  heroe.id === id;
    });

    if(!heroe) {
        throw new Error(`El héroe con el id: ${id} no existe`)
    }
    return heroe;
}


console.log(getHeroById(2))


export const getHeroesByOwner = (owner: Owner):Hero[] => {
    
    const heroesByOwner = heroes.filter( (heroe) => {
        return heroe.owner === owner;
    })

    if(heroesByOwner.length> 0) {
        return heroesByOwner;
    }

    return [];
}