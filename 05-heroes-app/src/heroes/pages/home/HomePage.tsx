import { use, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { CustomJumBotron } from "@/components/ui/Custom/CustomJumBotron";
import { HeroStats } from "../hero/Components/HeroStats";
import { CustomBreadCrumbs } from "@/components/ui/Custom/CustomBreadCrumbs";
import { Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroGrid } from "../hero/Components/HeroGrid";
import { Badge } from "@/components/ui/badge";
import { CustomPagination } from "@/components/ui/Custom/CustomPagination";
import { useHeroSummary } from "../../hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { FavoritesHeroesContext } from "@/heroes/context/FavoritesHeroesContext";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoriteCount, favorites } = use(FavoritesHeroesContext);

  const tab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";
  

  const selectedTabs = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(tab) ? tab : "all";
  }, [tab]);

  const { data: summary } = useHeroSummary();
  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <CustomJumBotron
        title="Universo de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

      <CustomBreadCrumbs currentPage="heroes" />

      {/* Stats */}
      <HeroStats />

      {/* Search and Add Hero Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search heroes by name, alias, powers, or team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Hero
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Hero</DialogTitle>
              <DialogDescription>
                Create a new superhero profile with their details and abilities.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="alias">Hero Alias</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="powers">Powers (comma-separated)</Label>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Results Count */}

      {/* Tabs */}
      <Tabs value={selectedTabs} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "all");
                prev.set("category", "all");
                prev.set("page", "1");
                return prev;
              })
            }
            value="all"
          >
            All Characters ( {summary?.totalHeroes} )
          </TabsTrigger>

          <TabsTrigger
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "favorites");
                return prev;
              })
            }
            value="favorites"
          >
            Favorites ({favoriteCount})
          </TabsTrigger>
          <TabsTrigger
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "heores");
                prev.set("category", "hero");
                prev.set("page", "1");
                return prev;
              })
            }
            value="heroes"
          >
            Heroes ( {summary?.heroCount})
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "villains");
                prev.set("category", "villain");
                prev.set("page", "1");
                return prev;
              })
            }
          >
            Villains ({summary?.villainCount})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <h1 className="text-3xl text-center mb-5">Todos los personajes</h1>
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>
        <TabsContent value="favorites">
          <h1>Personajes favoritos</h1>
          <HeroGrid heroes={favorites} />
        </TabsContent>
        <TabsContent value="heroes">
          <h1>Todos los héroes</h1>
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>
        <TabsContent value="villains">
          <h1>Todos los villanos</h1>
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>
      </Tabs>

      {/* Results info */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <p className="text-gray-600">Showing 6 of 16 characters</p>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Filtered
          </Badge>
        </div>
      </div>

      {selectedTabs !== "favorites" ? (
        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      ) : null}
    </>
  );
};
