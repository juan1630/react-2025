import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { usePaginatedHero } from "./usePaginatedHero";
import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page";

vi.mock("../actions/get-heroes-by-page", () => ({
  getHeroesByPageAction: vi.fn(),
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const tanstackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePaginatedHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  test("should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => usePaginatedHero(1, 6), {
      wrapper: tanstackCustomProvider(),
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
    expect(result.current.data).toBeUndefined();
  });

  test("should return success state with data when API call succeeds", async () => {
    const mockeHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };
    mockGetHeroesByPageAction.mockResolvedValue(mockeHeroesData);

    const { result } = renderHook(() => usePaginatedHero(1, 6), {
      wrapper: tanstackCustomProvider(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe("success");
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "all");
  });

  test("should call getHeroesByPageAction with arguments", async () => {
    const mockeHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };
    mockGetHeroesByPageAction.mockResolvedValue(mockeHeroesData);

    const { result } = renderHook(() => usePaginatedHero(1, 6, "heroes"), {
      wrapper: tanstackCustomProvider(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe("success");
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "heroes");
  });

  test("should call getHeroesByPageAction with arguments", async () => {
    const mockeHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };
    mockGetHeroesByPageAction.mockResolvedValue(mockeHeroesData);

    const { result } = renderHook(() => usePaginatedHero(2, 16, "heroes"), {
      wrapper: tanstackCustomProvider(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe("success");
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(2, 16, "heroes");
  });
});
