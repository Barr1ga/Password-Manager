import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [
    {
      id: 1,
      name: "horebBarriga",
      email: "hor.barr1ga@gmail.com",
      role: "vaultOwner",
      viewing: "Cards",
      status: "online",
    },
    {
      id: 2,
      name: "DainSiao",
      email: "dainalou@gmail.com",
      role: "employee",
      viewing: "",
      status: "offline",
    },
    {
      id: 3,
      name: "CJCaburnay",
      email: "caburnaycj@gmail.com",
      role: "employee",
      viewing: "",
      status: "offline",
    },
    {
      id: 4,
      name: "Bryll",
      email: "bryllandales@gmail.com",
      role: "family",
      viewing: "Identifications",
      status: "idle",
    },
    {
      id: 5,
      name: "JemseyAmonsot",
      email: "jemseyamonsot@gmail.com",
      role: "family",
      viewing: "Secure Notes",
      status: "online",
    },
    {
      id: 6,
      name: "Nicholai",
      email: "jemseyamonsot@gmail.com",
      role: "family",
      viewing: "Logins",
      status: "online",
    },
    {
      id: 7,
      name: "VanguardiaAJ",
      email: "jemseyamonsot@gmail.com",
      role: "family",
      viewing: "Cards",
      status: "online",
    },
    {
      id: 8,
      name: "Teddyzb",
      email: "jemseyamonsot@gmail.com",
      role: "family",
      viewing: "Logins",
      status: "online",
    },
    {
      id: 9,
      name: "Luke",
      email: "jemseyamonsot@gmail.com",
      role: "family",
      viewing: "Logins",
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
