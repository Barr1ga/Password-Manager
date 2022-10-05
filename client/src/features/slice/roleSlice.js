import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [
    { uid: "1", name: "Vault Owner", abreviation: "VO" },
    { uid: "2", name: "family", abreviation: "FAM" },
    { uid: "3", name: "employee", abreviation: "EMP" },
    { uid: "4", name: "My programming frien", abreviation: "NEIGH" },
    { uid: "5", name: "BSIT", abreviation: "BSIT" },
    { uid: "6", name: "student", abreviation: "STUD" },
    { uid: "7", name: "professor", abreviation: "PROF" },
    { uid: "8", name: "friend", abreviation: "frd" },
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
