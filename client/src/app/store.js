import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "../features/slice/brandSlice";

export const store = configureStore({
  reducer: {
    brands: brandReducer,
  },
});
