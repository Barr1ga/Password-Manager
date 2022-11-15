import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebaseErrorMessage from "../utils/firebaseErrorMessage";
import folderService from "../services/folderService";

const initialState = {
  folders: [
    // {
    //   uid: "1",
    //   name: "family",
    // },
    // {
    //   uid: "2",
    //   name: "colleague",
    // },
    // {
    //   uid: "3",
    //   name: "classmate",
    // },
  ],
  selectedFolder: null,
  folderLoading: false,
  folderFulfilled: false,
  folderError: false,
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
  "folder/deleteFolder",
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
    resetFolderQueryFulfilled: (state) => {
      state.folderLoading = initialState.folderLoading;
      state.folderFulfilled = initialState.folderFulfilled;
      state.folderError = initialState.folderError;
      state.folderMessage = initialState.folderMessage;
      state.folderErrorMessage = initialState.folderErrorMessage;
      state.folderErrorCode = initialState.folderErrorCode;
    },
    resetSelectedFolder: (state) => {
      state.selectedFolder = null;
    },
    selectFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
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

export const {
  resetFolders,
  resetFolderQueryFulfilled,
  resetSelectedFolder,
  selectFolder,
} = folderSlice.actions;
export default folderSlice.reducer;
