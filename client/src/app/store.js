import { configureStore } from "@reduxjs/toolkit";
import passwordReducer from "../features/slice/passwordSlice";
import authReducer from "../features/slice/authSlice";
import memberReducer from "../features/slice/memberSlice";
import sharingReducer from "../features/slice/sharingSlice";
import roleReducer from "../features/slice/roleSlice";
import auditLogReducer from "../features/slice/auditLogSlice";

export const store = configureStore({
  reducer: {
    passwords: passwordReducer,
    auth: authReducer,
    members: memberReducer,
    sharing: sharingReducer,
    roles: roleReducer,
    auditLogs: auditLogReducer,
  },
});
