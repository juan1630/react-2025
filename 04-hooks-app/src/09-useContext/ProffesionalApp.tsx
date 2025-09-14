import { RouterProvider } from "react-router";
import { appRouter } from "./router/appRouter";
import { UserContextProvider } from "./context/UserContext";

export const ProffesionalApp = () => {
  return (
    <UserContextProvider>
      <div className="bg-gradient">
        <RouterProvider router={appRouter} />
      </div>
    </UserContextProvider>
  );
};
