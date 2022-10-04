import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: ["vaultOwner", "family", "employee"],
  roleLoading: false,
  roleFulfilled: false,
  roleError: false,
  roleMessage: "",
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducer: {
    resetRoles: (state) => initialState,
  },
});

export const { resetRoles } = roleSlice.actions;
export default roleSlice.reducer;
