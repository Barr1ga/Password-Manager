import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  authUser: null,
  authEmailAndPasswordLoading: false,
  authGoogleLoading: false,
  authMicrosoftLoading: false,
  authLoading: false,
  authFulfilled: false,
  authError: false,
  authMessage: "",
};

export const logInWithEmailAndPassword = createAsyncThunk(
  "auth/logInWithEmailAndPassword",
  async (data, ThunkAPI) => {
    try {
      return await authService.logInWithEmailAndPassword(data);
    } catch (error) {
      const {code, message} = error;

      if (error.code === "auth/user-not-found") {
        return ThunkAPI.rejectWithValue("There isn't an account for the information you entered. Please try again.");
      }

      if (error.code === "auth/too-many-requests") {
        return ThunkAPI.rejectWithValue("Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.");
      }

      if (error.code === "auth/wrong-password") {
        return ThunkAPI.rejectWithValue("The password you entered is incorrect. Please try again.");
      }

      return ThunkAPI.rejectWithValue({code, message});
    }
  }
);

export const registerWithEmailAndPassword = createAsyncThunk(
  "auth/registerWithEmailAndPassword",
  async (data, ThunkAPI) => {
    try {
      return await authService.registerWithEmailAndPassword(data);
    } catch (error) {
      const authMessage = error.message.toString();
      return ThunkAPI.rejectWithValue(authMessage);
    }
  }
);

export const continueWithGoogle = createAsyncThunk(
  "auth/continueWithGoogle",
  async (data, ThunkAPI) => {
    try {
      return await authService.continueWithGoogle(data);
    } catch (error) {
      const authMessage = error.message.toString();
      return ThunkAPI.rejectWithValue(authMessage);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (data, ThunkAPI) => {
    try {
      return await authService.logOut();
    } catch (error) {
      const authMessage = error.message.toString();
      return ThunkAPI.rejectWithValue(authMessage);
    }
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.authUser = action.payload;
    },
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

    .addCase(logInWithEmailAndPassword.pending, (state) => {
      state.authEmailAndPasswordLoading = true;
    })
    .addCase(logInWithEmailAndPassword.fulfilled, (state) => {
      state.authEmailAndPasswordLoading = false;
      state.authFulfilled = true;
    })
    .addCase(logInWithEmailAndPassword.rejected, (state, action) => {
      state.authEmailAndPasswordLoading = false;
      state.authError = true;
      state.authMessage = action.payload;
    })

    .addCase(registerWithEmailAndPassword.pending, (state) => {
      state.authEmailAndPasswordLoading = true;
    })
    .addCase(registerWithEmailAndPassword.fulfilled, (state) => {
      state.authEmailAndPasswordLoading = false;
      state.authFulfilled = true;
    })
    .addCase(registerWithEmailAndPassword.rejected, (state, action) => {
      state.authEmailAndPasswordLoading = false;
      state.authError = true;
      state.authMessage = action.payload;
    })

    .addCase(continueWithGoogle.pending, (state) => {
      state.authGoogleLoading = true;
    })
    .addCase(continueWithGoogle.fulfilled, (state) => {
      state.authGoogleLoading = false;
      state.authFulfilled = true;
    })
    .addCase(continueWithGoogle.rejected, (state, action) => {
      state.authGoogleLoading = false;
      state.authError = true;
      state.authMessage = action.payload;
    })

    .addCase(logOut.pending, (state) => {
      state.authLoading = true;
    })
    .addCase(logOut.fulfilled, (state) => {
      state.authLoading = false;
      state.authFulfilled = true;
    })
    .addCase(logOut.rejected, (state, action) => {
      state.authLoading = false;
      state.authError = true;
      state.authMessage = action.payload;
    })
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
