// To parse this data:

import type { Product } from "./product.interface";

export interface ProductsResponse {
    count:    number;
    pages:    number;
    products: Product[];
}

