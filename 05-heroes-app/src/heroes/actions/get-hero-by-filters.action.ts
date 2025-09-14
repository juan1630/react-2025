import type { Hero } from "../interfaces/hero.interface";
import { heroApi } from "../pages/api/hero.api";

interface Options {
  name: string;
  strength?: string;
  status?: string;
  category?: string;
  universe?: string;
  team?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export const searchHeroesAction = async (options: Options): Promise<Hero[]> => {
  const { name, category, status, strength, team, universe } = options;

  const response = await heroApi.get<Hero[]>("/search", {
    params: {
      name: name,
      strength: strength,
      category,
      status,
      team,
      universe,
    },
  });

  if (response.status === 200) {
    return response.data.map((hero) => ({
      ...hero,
      image: `${BASE_URL}/images/${hero.image}`,
    }));
  }

  return [];
};
