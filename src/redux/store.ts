import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { addToCart } from "./CartSlice";

export const store = configureStore({
  reducer: {
    addToCart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Use store.getState()
