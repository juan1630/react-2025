import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoritesHeroesContext";


vi.mock("@/heroes/hooks/usePaginatedHero");
const mockUsePaginatedHero = vi.mocked(usePaginatedHero);

mockUsePaginatedHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
} as unknown as ReturnType<typeof mockUsePaginatedHero>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <FavoriteHeroProvider>
        <HomePage />
        </FavoriteHeroProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("HomePage", () => {

    beforeEach(()=> {vi.clearAllMocks()})

  test("should render HomePage with default values", () => {
    const { container } = renderHomePage();
    expect(container).toMatchSnapshot();
  });

  test('should call usePaginated with default values', ()=> {
    renderHomePage()

    expect(mockUsePaginatedHero).toHaveBeenCalled()
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1,6,'all')
  })

  test('should call usePaginated with custome params', ()=> {
    renderHomePage(['/?page=2&limit=10&category=villains'])

    expect(mockUsePaginatedHero).toHaveBeenCalled()
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(2,10,'villains')
  })

  test('should call usePaginatedHero with  default page and same limit o tab click', ()=> {
    renderHomePage(['/?tab=favorites&page=2&limit=10'])
    const [ ,,,villainsTab ] = screen.getAllByRole('tab')
    
    fireEvent.click(villainsTab)
    expect(mockUsePaginatedHero).toHaveBeenCalled()
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1,10, 'villain')
  })
});
