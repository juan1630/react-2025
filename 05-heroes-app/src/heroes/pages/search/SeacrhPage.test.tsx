import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./SeacrhPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/get-hero-by-filters.action";
import type { Hero } from "@/heroes/interfaces/hero.interface";


vi.mock("./ui/SearchControl", () => ({
  SearchControl: () => <div data-testid="search-control"></div>,
}));

vi.mock("@/hero/Components/HeroGrid", () => ({
  HeroGrid: ({heroes}: { heroes: Hero[] }) => (<div data-testid="hero-grid">
    {heroes.map(hero => (<div key={hero.id}> { hero.name}</div>))}
  </div>),
}));

vi.mock("@/heroes/actions/get-hero-by-filters.action");
const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

vi.mock("@/components/ui/Custom/CustomJumBotron", () => ({
  CustomJumBotron: () => <div data-testid="custom-jumBotron"></div>,
}));

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("SearchPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("should render Search page component with default values", () => {
    renderSearchPage();
    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: "",
      strength: undefined,
    });
  });

  test("should render JumBotron correctly", () => {
    renderSearchPage();
    expect(screen.getByTestId("custom-jumBotron")).toBeDefined();
  });

  test("should call search action with name parameter", () => {
    const { container } = renderSearchPage(["/search?name=superman"]);

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: "superman",
      strength: undefined,
    });
    expect(container).toMatchSnapshot();
  });

  test("should call search action with strength and name parameters", () => {
    const { container } = renderSearchPage(["/search?strength=8&name=batman"]);

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: "batman",
      strength: "8",
    });
    expect(container).toMatchSnapshot();
  });

//   test('Should render her grid with search result', async ()=> {
//     const mockHeroes = [
//         {id:1, name: 'Bruce Wayne'} as unknown as Hero,
//         {id:2, name: 'Clark Kent'} as unknown as Hero
//     ]
//     mockSearchHeroesAction.mockResolvedValue(mockHeroes)
//     renderSearchPage()
//     await waitFor(()=> {
//         expect(screen.getByText('Clark Kent')).toBeDefined()
//         expect(screen.getByText('Bruce Wayne')).toBeDefined()
//     })
    
//   })
});
