import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/ProductType";

const initialState: User = {
  email: "",
  password: "",
};

export const userSlice = createSlice({
  name: "USER", //for dev tools
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
    },
    logoutUser: (state) => {
      state.email = "";
      state.password = "";
    }
  },
});

// Action creators are generated for each case reducer function
export const { addUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
