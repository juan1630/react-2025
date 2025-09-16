import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/getProducts.action";
import { useParams, useSearchParams } from "react-router";

export const useProducts = () => {

  const { gender } = useParams();
  const [searchParams] = useSearchParams();

  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 1;
  const sizes = searchParams.get("sizes") || undefined;
  const price = searchParams.get('price') || 'any'
  const query = searchParams.get('query') || ''

  let minPrice = undefined
  let maxPrice = undefined

  switch(price){
    case 'any':
      break
    case '0-50':
      minPrice = 0
      maxPrice = 50
      break
    case '50-100':
      minPrice = 50
      maxPrice = 100
      break
    case '100-200':
      minPrice = 100
      maxPrice = 200
      break
    case '200+':
      minPrice = 200
      maxPrice = undefined
      break
  }


  const offset = (Number(page) - 1) * Number(limit);

  return useQuery({
    queryKey: ["products", {limit, offset, gender, sizes, minPrice, maxPrice, query}],
    queryFn: () =>
      getProductsAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
        gender,
        sizes,
        minPrice,
        maxPrice,
        query: query
      }),
    staleTime: 1000 * 60 * 5,
  });
};
