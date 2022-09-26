import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/authService";

const initialState = {
  user: null,
  loading: false,
  fulfilled: false,
  error: false,
  message: "",
};

export const logInWithEmailAndPassword = createAsyncThunk(
  "user/logInWithEmailAndPassword",
  async (data, ThunkAPI) => {
    try {
      return await userService.logInWithEmailAndPassword(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const registerWithEmailAndPassword = createAsyncThunk(
  "user/registerWithEmailAndPassword",
  async (data, ThunkAPI) => {
    try {
      return await userService.registerWithEmailAndPassword(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const continueWithGoogle = createAsyncThunk(
  "user/continueWithGoogle",
  async (data, ThunkAPI) => {
    try {
      return await userService.continueWithGoogle(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const logOut = createAsyncThunk(
  "user/logOut",
  async (data, ThunkAPI) => {
    try {
      return await userService.logOut();
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

    .addCase(logInWithEmailAndPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(logInWithEmailAndPassword.fulfilled, (state) => {
      state.loading = false;
      state.fulfilled = true;
    })
    .addCase(logInWithEmailAndPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    })

    .addCase(registerWithEmailAndPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(registerWithEmailAndPassword.fulfilled, (state) => {
      state.loading = false;
      state.fulfilled = true;
    })
    .addCase(registerWithEmailAndPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    })

    .addCase(continueWithGoogle.pending, (state) => {
      state.loading = true;
    })
    .addCase(continueWithGoogle.fulfilled, (state) => {
      state.loading = false;
      state.fulfilled = true;
    })
    .addCase(continueWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    })

    .addCase(logOut.pending, (state) => {
      state.loading = true;
    })
    .addCase(logOut.fulfilled, (state) => {
      state.loading = false;
      state.fulfilled = true;
    })
    .addCase(logOut.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    })
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
