import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-by-id.action";
// import type { Product } from "@/interfaces/product.interface";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["products", { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 5 * 60,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product) => {
      //esta fucnion se ejecuta cuando todo salío bien
      console.log({ product });

      //actualizar query data

      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", { id: product.id }],
      });
      queryClient.setQueryData(["products", { id: product.id }], product);
    },
  });
  //   TODO: MUTACIONES

  return {
    ...query,
    mutation,
  };
};
