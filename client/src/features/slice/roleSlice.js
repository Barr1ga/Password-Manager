import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [
    { name: "vaultOwner", abreviation: "VO" },
    { name: "family", abreviation: "FAM" },
    { name: "employee", abreviation: "EMP" },
    { name: "neighboor", abreviation: "NEIGH" },
    { name: "BSIT", abreviation: "BSIT" },
    { name: "student", abreviation: "STUD" },
    { name: "professor", abreviation: "PROF" },
  ],
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
