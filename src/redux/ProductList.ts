import { createSlice } from "@reduxjs/toolkit";
import { Product } from '../types/ProductType'


interface StateType {
  value: Product[];
}

const initialState: StateType = {
  value: []
};

export const productSlice = createSlice({
  name: "addProductList", //for dev tools
  initialState,
  reducers: {
    addProductList: (state, action) => {
      state.value = [...action.payload];
    }
  },
});

// Action creators are generated for each case reducer function
export const { addProductList } = productSlice.actions;

export default productSlice.reducer;
