import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "../actions/get-hero-by-filters.action";

export const useFilterHeores = (name: string = "") => {
  return  useQuery({
    queryKey: ["search",  name],
    queryFn: () => searchHeroesAction({ name}),
    staleTime: 1000 * 60 * 5, //5 minutos
  });
};
