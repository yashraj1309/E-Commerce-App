import axios from "axios";
import { Product } from "@/types/ProductType";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get("https://dummyjson.com/products?limit=0");
    console.log(response);
    return response.data.products; // Assuming your API response contains a "products" array
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array or handle the error as needed
  }
}
