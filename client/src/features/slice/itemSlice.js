import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "../services/brandService";
import itemService from "../services/itemService";
import firebaseErrorMessage from "../utils/firebaseErrorMessage";

const initialState = {
  items: [
    // {
    //   uid: "item1",
    //   name: "Discord",
    //   username: "hor.barr1ga@gmail.com",
    //   type: "login",
    //   image: "",
    //   favorite: true,
    //   folders: [],
    //   trash: false,
    // },
  ],
  itemLoading: false,
  itemFulfilled: false,
  itemCreatedFullfilled: false,
  itemUpdatedFullfilled: false,
  itemDeletedFullfilled: false,
  itemError: false,
  itemMessage: "",
  itemErrorMessage: "",
  itemErrorCode: "",

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

export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (data, ThunkAPI) => {
    try {
      return await itemService.deleteItem(data);
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
    resetItems: (state) => initialState,
    resetItemQueryFulfilled: (state) => {
      state.itemLoading = initialState.itemLoading;
      state.itemFulfilled = initialState.itemFulfilled;
      state.itemError = initialState.itemError;
      state.itemMessage = initialState.itemMessage;
      state.itemErrorMessage = initialState.itemErrorMessage;
      state.itemErrorCode = initialState.itemErrorCode;
    },
    resetSelectedItem: (state) => {
      state.selectedItem = null;
    },
    selectItem: (state, action) => {
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
        state.itemError = true;
        const { code, message } = action.payload;
        state.itemMessage = message;
        state.itemErrorCode = code;
        state.itemErrorMessage = firebaseErrorMessage(code);
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
        state.itemError = true;
        const { code, message } = action.payload;
        state.itemMessage = message;
        state.itemErrorCode = code;
        state.itemErrorMessage = firebaseErrorMessage(code);
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
        state.itemError = true;
        const { code, message } = action.payload;
        state.itemMessage = message;
        state.itemErrorCode = code;
        state.itemErrorMessage = firebaseErrorMessage(code);
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
        state.itemError = true;
        const { code, message } = action.payload;
        state.itemMessage = message;
        state.itemErrorCode = code;
        state.itemErrorMessage = firebaseErrorMessage(code);
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
        state.itemError = true;
        const { code, message } = action.payload;
        state.itemMessage = message;
        state.itemErrorCode = code;
        state.itemErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(createItem.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.itemFulfilled = true;
        state.items = [action.payload, ...state.items];
      })
      .addCase(createItem.rejected, (state, action) => {
        state.itemLoading = false;
        state.itemError = true;
        const { code, message } = action.payload;
        state.itemMessage = message;
        state.itemErrorCode = code;
        state.itemErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(updateItem.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.itemFulfilled = true;
        const idx = state.items.findIndex(
          (item) => item.uid === action.payload.uid
        );
        state.items[idx] = action.payload;
        [state.items[idx], state.items[0]] = [state.items[0], state.items[idx]];
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.itemLoading = false;
        state.itemError = true;
        const { code, message } = action.payload;
        state.itemMessage = message;
        state.itemErrorCode = code;
        state.itemErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(deleteItem.fulfilled, (state, action) => {
        state.itemLoading = false;
        state.itemFulfilled = true;
        state.items = state.items.filter((item) => item.uid !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.itemLoading = false;
        state.itemError = true;
        const { code, message } = action.payload;
        state.itemMessage = message;
        state.itemErrorCode = code;
        state.itemErrorMessage = firebaseErrorMessage(code);
      });
  },
});

export const {
  resetItems,
  resetItemQueryFulfilled,
  resetSelectedItem,
  selectItem,
  resetBrandPhotoLink,
} = passwordSlice.actions;
export default passwordSlice.reducer;
