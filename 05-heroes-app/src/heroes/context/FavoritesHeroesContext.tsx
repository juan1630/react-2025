import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Hero } from "../interfaces/hero.interface";

interface FavoritesHeroesContext {
  //State
  favorites: Hero[];
  favoriteCount: number;

  //Methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

export const FavoritesHeroesContext = createContext(
  {} as FavoritesHeroesContext
);

const getHeroesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getHeroesFromLocalStorage()
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (hero: Hero) => {
    const heroExists = favorites.find((heroItem) => heroItem.id === hero.id);
    if (heroExists) {
      const newHeroesFevorites = favorites.filter(
        (prevHero) => prevHero.id !== hero.id
      );
      setFavorites(newHeroesFevorites);
      return;
    }

    setFavorites((prev) => [...prev, hero]);
  };

  return (
    <FavoritesHeroesContext.Provider
      value={{
        favoriteCount: favorites.length,
        favorites,
        isFavorite: (hero: Hero) =>
          favorites.some((heroItem) => heroItem.id === hero.id),
        toggleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoritesHeroesContext.Provider>
  );
};
