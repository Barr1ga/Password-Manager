import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "../features/slice/brandSlice";
import passwordReducer from "../features/slice/passwordSlice";
import authReducer from "../features/slice/authSlice";
import memberReducer from "../features/slice/memberSlice";

export const store = configureStore({
  reducer: {
    brands: brandReducer,
    passwords: passwordReducer,
    auth: authReducer,
    members: memberReducer,
  },
});
