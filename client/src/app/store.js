import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "../features/slice/brandSlice";
import passwordReducer from "../features/slice/passwordSlice";
import userReducer from "../features/slice/userSlice";
import memberReducer from "../features/slice/memberSlice";

export const store = configureStore({
  reducer: {
    brands: brandReducer,
    passwords: passwordReducer,
    auth: userReducer,
    members: memberReducer,
  },
});
