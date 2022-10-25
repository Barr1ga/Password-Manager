import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "../services/brandService";

const initialState = {
  passwords: [
    {
      id: 1,
      name: "Snapchat",
      image: "https://asset.brandfetch.io/id4VHp4_C_/idaypEjWtg_s.webp",
      userName: "horreb.mendez.barr1ga@gmail.com",
      domain: "https://www.snapchat.com/",
      password: "hello123",
      type: "login",
      folders: ["familyFriendly", "school"],
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
      image: "https://asset.brandfetch.io/idnrCPuv87/idwtRbtIxQ_s.webp",
      userName: "horebbariga@gmail.com",
      domain: "https://www.apple.com/",
      password: "hello123",
      type: "login",
      folders: ["familyFriendly", "school"],
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
      image: "https://asset.brandfetch.io/ido5G85nya/idnsPRMIrl_s.webp",
      userName: "hor.barr1ga@gmail.com",
      domain: "https://www.instagram.com/",
      password: "hello123",
      type: "login",
      folders: ["school"],
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
      image: "https://asset.brandfetch.io/idxhowbknc/idErmeHtPp_s.webp",
      userName: "barrigahoreb123@gmail.com",
      domain: "https://www.behance.com/",
      password: "hello123",
      type: "login",
      folders: ["school"],
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
      folders: ["familyFriendly", "school"],
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
  brandPhotoLink: "",
  brandLoading: false,
  brandFulfilled: false,
  brandError: false,
  brandMessage: "",
  message: "",
  selectedPassword: null,
};

export const getBrandDetails = createAsyncThunk(
  "password/getBrands",
  async (data, ThunkAPI) => {
    try {
      return await brandService.getBrandDetails(data);
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
    createPasswordItem: (state, action) => {
      state.passwords = [...state.passwords, action.payload];
    },
    createCardItem: (state, action) => {
      state.passwords = [...state.passwords, action.payload];
    },
    createIdentificationItem: (state, action) => {
      state.passwords = [...state.passwords, action.payload];
    },
    createSecureNoteItem: (state, action) => {
      state.passwords = [...state.passwords, action.payload];
    },
    createWifiPasswordItem: (state, action) => {
      state.passwords = [...state.passwords, action.payload];
    },
    updatePasswordItem: (state, action) => {
      state.passwords = [...state.passwords, action.payload];
    },
    updateCardItem: (state, action) => {
      state.passwords = [...state.passwords, action.payload];
    },
    updateIdentificationItem: (state, action) => {
      state.passwords = [...state.passwords, action.payload];
    },
    updateSecureNoteItem: (state, action) => {
      state.passwords = [...state.passwords, action.payload];
    },
    updateWifiPasswordItem: (state, action) => {
      state.passwords = [...state.passwords, action.payload];
    },
    handleDeletePasswordItem: (state, action) => {
      state.passwords = state.passwords.filter(
        (password) => password.id !== action.payload
      );
    },
    resetSelectedPasswordItem: (state) => {
      state.selectedPassword = null;
    },
    selectPasswordItem: (state, action) => {
      state.selectedPassword = action.payload;
    },
    resetBrandPhotoLink: (state) => {
      state.brandPhotoLink = "";
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
        if (action.payload.data) {
          state.brandPhotoLink = action.payload.data[0].icon;
        }
      })
      .addCase(getBrandDetails.rejected, (state, action) => {
        state.brandLoading = false;
        state.brandError = true;
        state.brandMessage = action.payload.data;
      });
  },
});

export const {
  resetPasswords,
  createPasswordItem,
  createCardItem,
  createIdentificationItem,
  createSecureNoteItem,
  createWifiPasswordItem,
  updateCardItem,
  updatePasswordItem,
  updateSecureNoteItem,
  updateWifiPasswordItem,
  updateIdentificationItem,
  handleDeletePasswordItem,
  resetSelectedPasswordItem,
  selectPasswordItem,
  resetBrandPhotoLink,
} = passwordSlice.actions;
export default passwordSlice.reducer;
