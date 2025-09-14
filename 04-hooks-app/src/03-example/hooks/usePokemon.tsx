import { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  id: number;
  imageUrl: string;
}

interface Props {
  id: number;
}

export const usePokemon = ({ id }: Props) => {

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isloading, setIsloading] = useState<boolean>(true);

  const getPokemonById = async (id: number) => {
    setIsloading(true)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    setPokemon({
      id,
      name: data.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    });
    setIsloading(false)
  };

  useEffect(() => {
    getPokemonById(id);
  }, [id]);

  return {
    //properties
    pokemon,
    isloading,

    formattedId: id.toString().padStart(3,'0')
  };
};
