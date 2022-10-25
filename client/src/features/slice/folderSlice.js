import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import folderService from "../services/folderService";

const initialState = {
  folders: ["familyFriendly", "School", "friends"],
  Loading: false,
  Fulfilled: false,
  Error: false,
  Message: "",
  ErrorMessage: "",
  ErrorCode: "",
};

export const getFolders = createAsyncThunk(
  "password/getFolders",
  async (data, ThunkAPI) => {
    try {
      return await folderService.getFolders(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    resetFolders: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getFolders.pending, (state) => {
        state.Loading = true;
      })
      .addCase(getFolders.fulfilled, (state, action) => {
        state.Loading = false;
        state.Fulfilled = true;
        if (action.payload.data) {
          state.PhotoLink = action.payload.data[0].icon;
        }
      })
      .addCase(getFolders.rejected, (state, action) => {
        state.Loading = false;
        state.Error = true;
        state.Message = action.payload.data;
      });
  },
});

export const { resetFolders } = folderSlice.actions;
export default folderSlice.reducer;
