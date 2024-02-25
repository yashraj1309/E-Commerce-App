import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/ProductType";

interface StateType {
  value: Product[];
}

const initialState: StateType = {
  value: [],
};

export const cartSlice = createSlice({
  name: "CART", //for dev tools
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        state.value[existingItemIndex].quantity += 1;
      } else {
        state.value = [...state.value, action.payload];
      }
    },
    removeFromCart: (state, action) => {
      const existingItemIndex = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      if(action.payload.quantity > 1) {
        state.value[existingItemIndex].quantity -= 1;
      }
      else {
        const temp = state.value.filter((item)=> item.id!==action.payload.id)
        state.value = temp;
      }
    },
    emptyCart: (state, action) => {
      state.value = [];
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
