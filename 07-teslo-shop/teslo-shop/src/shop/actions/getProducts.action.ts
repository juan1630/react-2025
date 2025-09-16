import { tesloApi } from "@/api/tesloApi";
import type { ProductsResponse } from "@/interfaces/productsResponse";

interface Options {
  limit?: number | string;
  offset?: number | string;
  gender?: string;
  sizes?: string;
  minPrice?: number | undefined
  maxPrice?: number | undefined
  query: string | undefined
}

const BASE_URL = import.meta.env.VITE_API_URL;

export const getProductsAction = async (
  options: Options
): Promise<ProductsResponse> => {
  
  const { limit, offset, gender, sizes, minPrice, maxPrice, query } = options;

  const { data } = await tesloApi.get<ProductsResponse>("/products", {
    params: {
      limit,
      offset,
      gender,
      sizes,
      minPrice,
      maxPrice,
      q: query
    },
  });
  console.log(data);

  const productsWithImageUrls = data.products.map((product) => ({
    ...product,
    images: product.images.map((image) => `${BASE_URL}/files/product/${image}`),
  }));
  return {
    ...data,
    products: productsWithImageUrls,
  };
};
