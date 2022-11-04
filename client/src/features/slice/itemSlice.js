import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "../services/brandService";
import itemService from "../services/itemService";
import authErrorMessage from "../utils/authErrorMessage";

const initialState = {
  items: [],
  itemLoading: false,
  itemFulfilled: false,
  itemCreatedFullfilled: false,
  itemError: false,
  authMessage: "",
  authErrorMessage: "",
  authErrorCode: "",

  brandPhotoLink: "",
  brandLoading: false,
  brandFulfilled: false,
  brandError: false,
  brandMessage: "",
  selectedItem: null,
};

export const getBrandDetails = createAsyncThunk(
  "item/getBrands",
  async (data, ThunkAPI) => {
    try {
      return await brandService.getBrandDetails(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllItems = createAsyncThunk(
  "item/getAllItems",
  async (data, ThunkAPI) => {
    try {
      return await itemService.getAllItems(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const getFavorites = createAsyncThunk(
  "item/getFavorites",
  async (data, ThunkAPI) => {
    try {
      return await itemService.getFavorites(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const getTrash = createAsyncThunk(
  "item/getTrash",
  async (data, ThunkAPI) => {
    try {
      return await itemService.getTrash(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const getTypeSpecific = createAsyncThunk(
  "item/getTypeSpecific",
  async (data, ThunkAPI) => {
    try {
      return await itemService.getTypeSpecific(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const getFolderSpecific = createAsyncThunk(
  "item/getFolderSpecific",
  async (data, ThunkAPI) => {
    try {
      return await itemService.getFolderSpecific(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const createItem = createAsyncThunk(
  "item/createItem",
  async (data, ThunkAPI) => {
    try {
      return await itemService.createItem(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const updateItem = createAsyncThunk(
  "item/updateItem",
  async (data, ThunkAPI) => {
    try {
      return await itemService.updateItem(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const passwordSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    resetItems: (state) => {
      state.items = initialState.items;
      state.itemLoading = initialState.itemLoading;
      state.itemFulfilled = initialState.itemFulfilled;
      state.itemError = initialState.itemError;
      state.authMessage = initialState.authMessage;
      state.authErrorMessage = initialState.authErrorMessage;
      state.authErrorCode = initialState.authErrorCode;
      state.brandPhotoLink = initialState.brandPhotoLink;
      state.brandLoading = initialState.brandLoading;
      state.brandFulfilled = initialState.brandFulfilled;
      state.brandError = initialState.brandError;
      state.brandMessage = initialState.brandMessage;
    },

    resetQueryFulfilled: (state) => {
      state.itemLoading = initialState.itemLoading;
      state.itemFulfilled = initialState.itemFulfilled;
      state.itemCreatedFullfilled = initialState.itemCreatedFullfilled;
      state.itemError = initialState.itemError;
      state.authMessage = initialState.authMessage;
      state.authErrorMessage = initialState.authErrorMessage;
      state.authErrorCode = initialState.authErrorCode;
    },
    resetSelectedItem: (state) => {
      state.selectedItem = null;
    },
    selectPasswordItem: (state, action) => {
      state.selectedItem = action.payload;
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
      })

      .addCase(getAllItems.pending, (state) => {
        state.itemLoading = true;
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.itemFulfilled = true;
        state.items = action.payload;
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.itemLoading = false;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(getFavorites.pending, (state) => {
        state.itemLoading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.itemFulfilled = true;
        state.items = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.itemLoading = false;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(getTrash.pending, (state) => {
        state.itemLoading = true;
      })
      .addCase(getTrash.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.itemFulfilled = true;
        state.items = action.payload;
      })
      .addCase(getTrash.rejected, (state, action) => {
        state.itemLoading = false;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(getTypeSpecific.pending, (state) => {
        state.itemLoading = true;
      })
      .addCase(getTypeSpecific.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.itemFulfilled = true;
        state.items = action.payload;
      })
      .addCase(getTypeSpecific.rejected, (state, action) => {
        state.itemLoading = false;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(getFolderSpecific.pending, (state) => {
        state.itemLoading = true;
      })
      .addCase(getFolderSpecific.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.itemFulfilled = true;
        state.items = action.payload;
      })
      .addCase(getFolderSpecific.rejected, (state, action) => {
        state.itemLoading = false;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(createItem.pending, (state) => {
        state.itemLoading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.itemFulfilled = true;
        state.itemCreatedFullfilled = true;
        state.items = [...state.items, action.payload];
      })
      .addCase(createItem.rejected, (state, action) => {
        state.itemLoading = false;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(updateItem.pending, (state) => {
        // state.itemLoading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.itemFulfilled = true;
        state.itemCreatedFullfilled = true;
        const idx = state.items.findIndex(
          (item) => item.uid === action.payload.uid
        );
        state.items[idx] = action.payload;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.itemLoading = false;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      });
  },
});

export const {
  resetItems,
  resetQueryFulfilled,
  resetSelectedItem,
  selectPasswordItem,
  resetBrandPhotoLink,
} = passwordSlice.actions;
export default passwordSlice.reducer;
