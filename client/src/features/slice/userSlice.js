import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  fulfilled: false,
  error: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state) => {
      state.user = true;
    },
    resetUser: (state) => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
