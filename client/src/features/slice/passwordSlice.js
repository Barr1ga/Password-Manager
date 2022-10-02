import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "../services/brandService";

const initialState = {
  passwords: [
    {
      id: 1,
      name: "Snapchat",
      image: "",
      userName: "hor.barr1ga@gmail.com",
      domain: "https://www.snapchat.com/",
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
      name: "Apple",
      image: "",
      userName: "horebbariga@gmail.com",
      domain: "https://www.apple.com/",
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
      image: "",
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
      image: "",
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
      image: "",
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

    {
      id: 6,
      name: "Discord",
      image: "",
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
      id: 7,
      name: "Hyundai",
      image: "",
      userName: "horebbariga@gmail.com",
      domain: "https://www.hyundai.com/",
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
      id: 8,
      name: "Twitter",
      image: "",
      userName: "horebbariga@gmail.com",
      domain: "https://www.twitter.com/",
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
      id: 9,
      name: "Adobe",
      image: "",
      userName: "horebbariga@gmail.com",
      domain: "https://www.adobe.com/",
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
      id: 10,
      name: "Messenger",
      image: "",
      userName: "horebbariga@gmail.com",
      domain: "https://www.messenger.com/",
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
      id: 11,
      name: "HBO",
      image: "",
      userName: "horebbariga@gmail.com",
      domain: "https://www.hbo.com/",
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
      id: 12,
      name: "Cisco",
      image: "",
      userName: "horebbariga@gmail.com",
      domain: "https://www.cisco.com/",
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
      id: 13,
      name: "Nvidia",
      image: "",
      userName: "horebbariga@gmail.com",
      domain: "https://www.nvidia.com/",
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
      id: 14,
      name: "Amazon",
      image: "",
      userName: "horebbariga@gmail.com",
      domain: "https://www.amazon.com/",
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
      id: 15,
      name: "Tesla",
      image: "",
      userName: "horebbariga@gmail.com",
      domain: "https://www.tesla.com/",
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
      id: 15,
      name: "Spotify",
      image: "",
      userName: "horebbariga@gmail.com",
      domain: "https://www.spotify.com/",
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
  ],
  loading: false,
  fulfilled: false,
  error: false,
  brandLoading: false,
  brandFulfilled: false,
  brandError: false,
  brandMessage: "",
  message: "",
  selectedPassword: null,
};

export const getBrandDetails = createAsyncThunk(
  "password/getBrands",
  async ({brand, id}, ThunkAPI) => {
    try {
      return await brandService.getBrandDetails(brand, id);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder

      .addCase(getBrandDetails.pending, (state) => {
        state.brandLoading = true;
      })
      .addCase(getBrandDetails.fulfilled, (state, action) => {
        state.brandLoading = false;
        state.brandFulfilled = true;
        console.log(action.payload.data)
        if (action.payload.data) {
          const idx = state.passwords.findIndex((password) => password.id === action.payload.id);
          state.passwords[idx].image = action.payload.data[0].icon;
        }
      })
      .addCase(getBrandDetails.rejected, (state, action) => {
        state.brandLoading = false;
        state.brandError = true;
        state.brandMessage = action.payload.data;
      });
  },
});

export const { resetPasswords, resetSelectedPasswordItem, selectPasswordItem } =
  passwordSlice.actions;
export default passwordSlice.reducer;
