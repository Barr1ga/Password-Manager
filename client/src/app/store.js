import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "../features/slice/brandSlice";
import passwordReducer from "../features/slice/passwordSlice";
import authReducer from "../features/slice/authSlice";
import memberReducer from "../features/slice/memberSlice";
import sharingReducer from "../features/slice/sharingSlice";

export const store = configureStore({
  reducer: {
    brands: brandReducer,
    passwords: passwordReducer,
    auth: authReducer,
    members: memberReducer,
    sharing: sharingReducer,
  },
});
