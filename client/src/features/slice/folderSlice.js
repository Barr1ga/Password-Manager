import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebaseErrorMessage from "../utils/firebaseErrorMessage";
import folderService from "../services/folderService";

const initialState = {
  folders: ["familyFriendly", "School", "friends", "Cousins", "Teachers", "Me"],
  folderLoading: false,
  folderUpdatedFullfilled: false,
  folderCreatedFullfilled: false,
  folderDeletedFullfilled: false,
  folderFulfilled: false,
  folderfolderError: false,
  folderMessage: "",
  folderErrorMessage: "",
  folderErrorCode: "",
};

export const getAllFolders = createAsyncThunk(
  "folder/getAllFolders",
  async (data, ThunkAPI) => {
    try {
      return await folderService.getAllFolders(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const createFolder = createAsyncThunk(
  "folder/createFolder",
  async (data, ThunkAPI) => {
    try {
      return await folderService.createFolder(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const updateFolder = createAsyncThunk(
  "folder/updateFolder",
  async (data, ThunkAPI) => {
    try {
      return await folderService.updateFolder(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteFolder = createAsyncThunk(
  "role/deleteFolder",
  async (data, ThunkAPI) => {
    try {
      return await folderService.deleteFolder(data);
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

      .addCase(getAllFolders.pending, (state) => {
        state.folderLoading = true;
      })
      .addCase(getAllFolders.fulfilled, (state, action) => {
        state.folderLoading = false;
        state.folderFulfilled = true;
        state.folders = action.payload;
        const idx = state.folders.findIndex(
          (folder) => folder.name === "Vault Owner"
        );
        [state.folders[0], state.folders[idx]] = [
          state.folders[idx],
          state.folders[0],
        ];
      })
      .addCase(getAllFolders.rejected, (state, action) => {
        state.folderLoading = false;
        state.folderError = true;
        const { code, message } = action.payload;
        state.folderMessage = message;
        state.folderErrorCode = code;
        state.folderErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(createFolder.fulfilled, (state, action) => {
        state.folderLoading = false;
        state.folderFulfilled = true;
        state.folderCreatedFullfilled = true;
        state.folders = [...state.folders, action.payload];
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.folderLoading = false;
        state.folderError = true;
        const { code, message } = action.payload;
        state.folderMessage = message;
        state.folderErrorCode = code;
        state.folderErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(updateFolder.fulfilled, (state, action) => {
        state.folderLoading = false;
        state.folderFulfilled = true;
        state.folderUpdatedFullfilled = true;
        const idx = state.folders.findIndex(
          (folder) => folder.uid === action.payload.uid
        );
        state.folders[idx] = action.payload;
        [state.folders[idx], state.folders[0]] = [
          state.folders[0],
          state.folders[idx],
        ];
      })
      .addCase(updateFolder.rejected, (state, action) => {
        state.folderLoading = false;
        state.folderError = true;
        const { code, message } = action.payload;
        state.folderMessage = message;
        state.folderErrorCode = code;
        state.folderErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.folderLoading = false;
        state.folderFulfilled = true;
        state.folderDeletedFullfilled = true;
        state.folders = state.folders.filter(
          (folder) => folder.uid !== action.payload
        );
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        state.folderLoading = false;
        state.folderError = true;
        const { code, message } = action.payload;
        state.folderMessage = message;
        state.folderErrorCode = code;
        state.folderErrorMessage = firebaseErrorMessage(code);
      });
  },
});

export const { resetFolders } = folderSlice.actions;
export default folderSlice.reducer;
