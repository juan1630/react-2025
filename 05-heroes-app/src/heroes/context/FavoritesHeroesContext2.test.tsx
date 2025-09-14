import { use } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { Hero } from "../interfaces/hero.interface";
import {
  FavoriteHeroProvider,
  FavoritesHeroesContext,
} from "./FavoritesHeroesContext";

const mockHero = {
  id: "1",
  name: "batman",
} as Hero;


const localStorageMock = {
    getItem:vi.fn(),
    setItem:vi.fn(),
    clear:vi.fn(),
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const TestComponent = () => {
  const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(
    FavoritesHeroesContext
  );

  return (
    <div>
      <div data-testid="favorite-count">{favoriteCount}</div>
      <div data-testid="favorite-list">
        {favorites.map((hero) => (
          <div key={hero.id} data-testid={"hero-" + hero.id}>
            {hero.name}
          </div>
        ))}
      </div>
      <button
        data-testid="toggle-favorite"
        onClick={() => toggleFavorite(mockHero)}
      >
        Toggle favorite
      </button>
      <div data-testid="is-favorite">{isFavorite(mockHero).toString()}</div>
    </div>
  );
};

const renderContextProvider = () => {
  render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>
  );
};

describe("FavoriteHeroesContext", () => {

    beforeEach(()=> {
        vi.clearAllMocks()
    })

  test("should add a hero when toggleFavorites button si called with new hero", () => {
    renderContextProvider();
    const button = screen.getByTestId("toggle-favorite");
    fireEvent.click(button);

    expect(screen.getByTestId("is-favorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("batman");
    // expect(localStorage.getItem("favorites")).toBe(
    //   '[{"id":"1","name":"batman"}]'
    // );
    expect(screen.getByTestId("favorite-list").children.length).toBe(1);
    expect(localStorageMock.setItem).toHaveBeenCalled()
    expect(localStorageMock.setItem).toHaveBeenCalledWith("favorites", '[{"id":"1","name":"batman"}]')
  });

  test("should remove a hero when toggle function is called", () => {
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]))

    renderContextProvider();

    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    expect(screen.getByTestId("is-favorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("batman");
    
    const button = screen.getByTestId("toggle-favorite");
    fireEvent.click(button);

    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("is-favorite").textContent).toBe("false");
    expect(screen.queryByTestId("hero-1")).toBeNull();
    // expect(localStorage.getItem("favorites")).toBe("[]");
    expect(localStorageMock.setItem).toHaveBeenCalled()
    expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', "[]")
  });
});
