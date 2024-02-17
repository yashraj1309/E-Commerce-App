// import axios from "axios";
// import { Product } from "@/types/ProductType";

// export async function fetchProducts(): Promise<Product[]> {
//   try {
//     const response = await axios.get("https://dummyjson.com/products?limit=0");
//     console.log(response);
//     return response.data.products; // Assuming your API response contains a "products" array
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return []; // Return an empty array or handle the error as needed
//   }
// }

import axios from "axios";
import { Product } from "@/types/ProductType";

// Define a closure to encapsulate the cached data
const fetchProductsCached = (() => {
  let cachedData: Product[] = [];

  return async (): Promise<Product[]> => {
    if (cachedData.length !== 0) {
      // If data is already cached, return it directly
      return cachedData;
    }

    try {
      const response = await axios.get(
        "https://dummyjson.com/products?limit=0"
      );
      console.log(response);
      // Assuming your API response contains a "products" array
      cachedData = response.data.products;
      return cachedData;
    } catch (error) {
      console.error("Error fetching products:", error);
      // Return an empty array or handle the error as needed
      return [];
    }
  };
})();

// Export the function to fetch products, which internally uses the cached function
export async function fetchProducts(): Promise<Product[]> {
  return fetchProductsCached();
}
