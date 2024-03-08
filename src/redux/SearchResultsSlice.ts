import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/ProductType";
import axios from "axios";

interface StateType {
  value: Product[];
}

const initialState: StateType = {
  value: [],
};

const getProductList = async (query: string) => {
  const response = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  );
  return response.data.products;
};

export const searchResultSlice = createSlice({
  name: "Search Result", //for dev tools
  initialState,
  reducers: {
    setSearchItems: (state, action) => {
      state.value = action.payload;
    },
    clearResults: (state, action) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchItems, clearResults } = searchResultSlice.actions;

export default searchResultSlice.reducer;
