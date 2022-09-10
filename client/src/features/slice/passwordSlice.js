import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passwords: [
    {
      id: 1,
      name: "Facebook",
      userName: "hor.barr1ga@gmail.com",
      domain: "https://www.facebook.com/",
      password: "hello123",
      type: "login",
      folder: "",
      favorite: false,
      trash: false,
      lastOpened: new Date().toString(),
      lastOpenedBy: 2,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      id: 2,
      name: "Discord",
      userName: "horebbariga@gmail.com",
      domain: "https://www.discord.com/",
      password: "hello123",
      type: "login",
      folder: "",
      favorite: true,
      trash: false,
      lastOpened: new Date().toString(),
      lastOpenedBy: 2,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      id: 3,
      name: "Instagram",
      userName: "hor.barr1ga@gmail.com",
      domain: "https://www.instagram.com/",
      password: "hello123",
      type: "login",
      folder: "",
      favorite: false,
      trash: false,
      lastOpened: new Date().toString(),
      lastOpenedBy: 2,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      id: 4,
      name: "Behance",
      userName: "barrigahoreb123@gmail.com",
      domain: "https://www.behance.com/",
      password: "hello123",
      type: "login",
      folder: "",
      favorite: false,
      trash: true,
      lastOpened: new Date().toString(),
      lastOpenedBy: 2,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      id: 5,
      name: "USC_Wifi",
      userName: "barrigahoreb123@gmail.com",
      domain: "",
      password: "hello123",
      type: "wifiPassword",
      folder: "",
      favorite: false,
      trash: true,
      lastOpened: new Date().toString(),
      lastOpenedBy: 2,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ],
  loading: false,
  fulfilled: false,
  error: false,
  message: "",
  selectedPassword: null,
};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    resetPasswords: (state) => initialState,
    resetSelectedPasswordItem: (state) => {
      state.selectedPassword = null;
    },
    selectPasswordItem: (state, action) => {
      state.selectedPassword = action.payload;
    },
  },
});

export const { resetPasswords, resetSelectedPasswordItem, selectPasswordItem } =
  passwordSlice.actions;
export default passwordSlice.reducer;