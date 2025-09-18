import type { PropsWithChildren } from "react";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appRouter } from "./app.router";
import { CustomFullScreenLoading } from "./components/ui/custom/CustomFullScreenLoading";
import { useAuthStore } from "./auth/store/auth.store";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  
  const { checkAuthStatus } = useAuthStore()

  const { isLoading, data } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true,
  });

  console.log({ data });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CheckAuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </CheckAuthProvider>
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  );
};
