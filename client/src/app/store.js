import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "../features/slice/brandSlice";
import passwordReducer from "../features/slice/passwordSlice";

export const store = configureStore({
  reducer: {
    brands: brandReducer,
    passwords: passwordReducer,
  },
});
