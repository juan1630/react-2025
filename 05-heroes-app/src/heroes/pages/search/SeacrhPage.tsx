import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { CustomJumBotron } from "@/components/ui/Custom/CustomJumBotron";
import { HeroStats } from "../hero/Components/HeroStats";
import { SearchControl } from "./ui/SearchControl";
import { CustomBreadCrumbs } from "@/components/ui/Custom/CustomBreadCrumbs";
import { HeroGrid } from "../hero/Components/HeroGrid";
import { searchHeroesAction } from "@/heroes/actions/get-hero-by-filters.action";

const SearchPage = () => {

  const [searchParams,] = useSearchParams();

  const heroName = searchParams.get('name')
  const strength = searchParams.get('strength') ?? undefined

  const {data:heroesFiltered = []} = useQuery({
    queryKey: ["search", {heroName, strength}],
    queryFn: () => searchHeroesAction({ name: heroName ?? '', strength: strength }),
    staleTime: 1000 * 60 * 5, //5 minutos
  });

  return (
    <>
      <CustomJumBotron
        title="Busqueda de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />
      <CustomBreadCrumbs
        currentPage="Search"
        breadCrumbs={[
          { label: "Home", to: "/" },
        ]}
      />
      <HeroStats />
      {/* Filter and Search */}
      <SearchControl />

      <HeroGrid heroes={heroesFiltered} />
    </>
  );
};

export default SearchPage;
