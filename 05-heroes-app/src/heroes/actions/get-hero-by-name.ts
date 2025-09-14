import { heroApi } from "../pages/api/hero.api";
import type { Hero } from "../interfaces/hero.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroByNameAction = async (idSlug: string) => {
  const response = await heroApi.get<Hero>(`/${idSlug}`);
  if (response.status === 200) {
    
    return {
      ...response.data,
      image: `${BASE_URL}/images/${response.data.image}`,
    };
  }

  return null;
};
