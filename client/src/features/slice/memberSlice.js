import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [
    {
      id: 1,
      name: "horebBarriga",
      email: "hor.barr1ga@gmail.com",
      role: "vaultOwner",
      status: "online",
    },
    {
      id: 2,
      name: "DainSiao",
      email: "dainalou@gmail.com",
      role: "employee",
      status: "offline",
    },
    {
      id: 3,
      name: "CJCaburnay",
      email: "caburnaycj@gmail.com",
      role: "employee",
      status: "offline",
    },
    {
      id: 4,
      name: "Bryll",
      email: "bryllandales@gmail.com",
      role: "family",
      status: "idle",
    },
    {
      id: 5,
      name: "JemseyAmonsot",
      email: "jemseyamonsot@gmail.com",
      role: "family",
      status: "online",
    },
  ],
  loading: false,
  fulfilled: false,
  error: false,
  message: "",
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    resetMembers: (state) => initialState,
  },
});

export const { resetMembers } = memberSlice.actions;
export default memberSlice.reducer;
