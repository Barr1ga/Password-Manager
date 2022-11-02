import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../features/slice/itemSlice";
import authReducer from "../features/slice/authSlice";
import memberReducer from "../features/slice/memberSlice";
import sharingReducer from "../features/slice/sharingSlice";
import roleReducer from "../features/slice/roleSlice";
import auditLogReducer from "../features/slice/auditLogSlice";
import folderReducer from "../features/slice/folderSlice";

export const store = configureStore({
  reducer: {
    items: itemReducer,
    auth: authReducer,
    members: memberReducer,
    sharing: sharingReducer,
    roles: roleReducer,
    auditLogs: auditLogReducer,
    folders: folderReducer,
  },
});
