import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [
    {
      id: 1,
      name: "horebBarriga",
      email: "hor.barr1ga@gmail.com",
      role: "vaultOwner",
    },
    {
      id: 2,
      name: "DainSiao",
      email: "dainalou@gmail.com",
      role: "vaultOwner",
    },
    {
      id: 3,
      name: "CJCaburnay",
      email: "caburnaycj@gmail.com",
      role: "employee",
    },
    { id: 4, name: "Bryll", email: "bryllandales@gmail.com", role: "family" },
    {
      id: 5,
      name: "JemseyAmonsot",
      email: "jemseyamonsot@gmail.com",
      role: "family",
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
    }
})

export const {resetMembers} = memberSlice.actions;
export default memberSlice.reducer;