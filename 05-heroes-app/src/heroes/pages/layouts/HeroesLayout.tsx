import { CustomMenu } from "@/components/ui/Custom/CustomMenu";
import {  Outlet } from "react-router";

export const HeroesLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5" >
        <CustomMenu />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
