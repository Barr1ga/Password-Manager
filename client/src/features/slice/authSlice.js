import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import authErrorMessage from "../utils/authErrorMessage";

const authUser = JSON.parse(localStorage.getItem("authUser"));

const initialState = {
  authUser: authUser ? authUser : null,
  authEmailAndPasswordLoading: false,
  authGoogleLoading: false,
  authMicrosoftLoading: false,
  authLoading: false,
  authFulfilled: false,
  authError: false,
  authMessage: "",
  authErrorMessage: "",
  authErrorCode: "",
};

export const logInWithEmailAndPassword = createAsyncThunk(
  "auth/logInWithEmailAndPassword",
  async (data, ThunkAPI) => {
    try {
      return await authService.logInWithEmailAndPassword(data);
    } catch (error) {
      console.log(error)
      const { code, message } = error;
      return ThunkAPI.rejectWithValue({ code, message });
    }
  }
);

export const registerWithEmailAndPassword = createAsyncThunk(
  "auth/registerWithEmailAndPassword",
  async (data, ThunkAPI) => {
    try {
      return await authService.registerWithEmailAndPassword(data);
    } catch (error) {
      const { code, message } = error;
      return ThunkAPI.rejectWithValue({ code, message });
    }
  }
);

export const changeEmail = createAsyncThunk(
  "auth/changeEmail",
  async (data, ThunkAPI) => {
    try {
      return await authService.changeEmail(data);
    } catch (error) {
      const { code, message } = error;
      return ThunkAPI.rejectWithValue({ code, message });
    }
  }
);

export const continueWithGoogle = createAsyncThunk(
  "auth/continueWithGoogle",
  async (data, ThunkAPI) => {
    try {
      return await authService.continueWithGoogle(data);
    } catch (error) {
      const { code, message } = error;
      return ThunkAPI.rejectWithValue({ code, message });
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (data, ThunkAPI) => {
    try {
      return await authService.logOut();
    } catch (error) {
      const { code, message } = error;
      return ThunkAPI.rejectWithValue({ code, message });
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
      .addCase(logInWithEmailAndPassword.fulfilled, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authFulfilled = true;
        localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(logInWithEmailAndPassword.rejected, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authError = true;
        state.authMessage = action.payload.message;
        state.authErrorCode = action.payload.code;
        state.authErrorMessage = authErrorMessage(action.payload.code);
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
        state.authMessage = action.payload.message;
        state.authErrorCode = action.payload.code;
        state.authErrorMessage = authErrorMessage(action.payload.code);
      })

      .addCase(changeEmail.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.authLoading = false;
        state.authFulfilled = true;
        localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = true;
        state.authMessage = action.payload.message;
        state.authErrorCode = action.payload.code;
        state.authErrorMessage = authErrorMessage(action.payload.code);
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
        state.authMessage = action.payload.message;
        state.authErrorCode = action.payload.code;
        state.authErrorMessage = authErrorMessage(action.payload.code);
      })

      .addCase(logOut.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.authLoading = false;
        state.authFulfilled = true;
        localStorage.removeItem("authUser");
      })
      .addCase(logOut.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = true;
        state.authMessage = action.payload.message;
        state.authErrorCode = action.payload.code;
        state.authErrorMessage = authErrorMessage(action.payload.code);
      });
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;