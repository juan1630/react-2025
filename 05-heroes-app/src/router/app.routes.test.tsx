import { describe, expect, test, vi } from "vitest";
import { AppRouter } from "./app.routes";
import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";

vi.mock("../heroes/pages/home/HomePage", () => ({
  HomePage: () => <div data-testid="home-page"></div>,
}));

vi.mock("../heroes/pages/hero/HeroPage", () => ({
  HeroPage: () => {
    const { idSlug } = useParams();

    return <div data-testid="hero-page"> Hero - {idSlug}</div>;
  },
}));

vi.mock("@/heroes/pages/layouts/HeroesLayout", () => ({
  HeroesLayout: () => (
    <div data-testid="heroes-layout">
      <Outlet />
    </div>
  ),
}));

vi.mock('@/heroes/pages/search/SeacrhPage', ()=> ({
    default: ()=> <div data-testid="search-page"></div>
}))

describe("appRouter", () => {
  test("should be configured as expected", () => {
    expect(AppRouter.routes).toMatchSnapshot();
  });

  test("should render home page as root path", () => {
    const router = createMemoryRouter(AppRouter.routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("home-page")).toBeDefined();
  });

  test("should render hero page at /heroes/:idSlug path", () => {
    const router = createMemoryRouter(AppRouter.routes, {
      initialEntries: ["/hero/superman"],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('hero-page').innerHTML).toContain('superman')
  });

  test("should render search page at /search path", async() => {
    const router = createMemoryRouter(AppRouter.routes, {
      initialEntries: ["/search"],
    });

    render(<RouterProvider router={router} />);
    
    expect(await  screen.findByTestId('search-page')).toBeDefined()
  });

  
  test("should redirect to home page when there is an invalid route", () => {
    const router = createMemoryRouter(AppRouter.routes, {
      initialEntries: ["/una-pagina"],
    });

    render(<RouterProvider router={router} />);
    // expect(await  screen.findByTestId('search-page')).toBeDefined()
    expect(screen.getByTestId('home-page')).toBeDefined()
  });
});
