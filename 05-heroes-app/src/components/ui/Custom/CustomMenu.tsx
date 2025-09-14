'use client'
import { Link, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../navigation-menu";
import { cn } from "@/lib/utils";

export const CustomMenu = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(isActive("/") && "bg-slate-200", "rounded-md py-2")}
          >
            <Link to="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(isActive("/search") && "bg-slate-200", "rounded-md py-2")}
          >
            <Link to="/search">Buscar Superhéroes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
