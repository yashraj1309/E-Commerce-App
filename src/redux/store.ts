import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./CartSlice";
import UserSlice from "./UserSlice";

export const store = configureStore({
  reducer: {
    addToCart: cartSlice,
    user: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Use store.getState()
