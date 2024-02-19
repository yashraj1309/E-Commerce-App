import { configureStore } from "@reduxjs/toolkit";
import addProductList from "./ProductList";

export const store = configureStore({
  reducer: {
    addProductList: addProductList,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Use store.getState()
