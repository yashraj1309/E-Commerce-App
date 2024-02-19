import { createSlice } from "@reduxjs/toolkit";
import { Product } from '../types/ProductType'


interface StateType {
  value: Product[];
}

const initialState: StateType = {
  value: []
};

export const cartSlice = createSlice({
  name: "CART", //for dev tools
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.value = [...state.value,action.payload];
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart} = cartSlice.actions;

export default cartSlice.reducer;
