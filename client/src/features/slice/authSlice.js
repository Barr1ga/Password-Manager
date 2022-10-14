import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import authErrorMessage from "../utils/authErrorMessage";

const authUser = JSON.parse(localStorage.getItem("authUser"));

const initialState = {
  authUser: authUser && typeof authUser !== "undefined" ? authUser : null,
  username: "",
  masterPasswordHint: "",
  authRegistered: false,
  authEmailAndPasswordLoading: false,
  authGoogleLoading: false,
  authMicrosoftLoading: false,
  authLoading: false,
  authFulfilled: false,
  authError: false,
  authMessage: "",
  authErrorMessage: "",
  authErrorCode: "",

  // registration
  authRegistered: false,
  authEmailAndPasswordLoading: false,

  // reauthentication
  authChangedEmail: false,
  authChangedEmailReauthFulfilled: false,
  authChangedEmailFulfilled: false,
  authChangedEmailLoading: false,
  authChangedPassword: false,
  authChangedPasswordReauthFulfilled: false,
  authChangedPasswordFulfilled: false,
  authChangedPasswordLoading: false,
};

export const checkEmailExists = createAsyncThunk(
  "auth/checkEmailExists",
  async (data, ThunkAPI) => {
    try {
      await authService.checkEmailExists(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const logInWithEmailAndPassword = createAsyncThunk(
  "auth/logInWithEmailAndPassword",
  async (data, ThunkAPI) => {
    try {
      return await authService.logInWithEmailAndPassword(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const registerWithEmailAndPassword = createAsyncThunk(
  "auth/registerWithEmailAndPassword",
  async (data, ThunkAPI) => {
    try {
      return await authService.registerWithEmailAndPassword(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data, ThunkAPI) => {
    try {
      await authService.createUser(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const changeEmailReauthentication = createAsyncThunk(
  "auth/changeEmailReauthentication",
  async (masterPassword, ThunkAPI) => {
    try {
      await authService.Reauthentication(masterPassword);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const changeEmail = createAsyncThunk(
  "auth/changeEmail",
  async (data, ThunkAPI) => {
    try {
      await authService.changeEmail(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const changePasswordReauthentication = createAsyncThunk(
  "auth/changePasswordReauthentication",
  async (masterPassword, ThunkAPI) => {
    try {
      await authService.Reauthentication(masterPassword);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, ThunkAPI) => {
    try {
      return await authService.changePassword(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const continueWithGoogle = createAsyncThunk(
  "auth/continueWithGoogle",
  async (data, ThunkAPI) => {
    try {
      return await authService.continueWithGoogle(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (data, ThunkAPI) => {
    try {
      return await authService.logOut();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
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
    resetAuthErrors: (state) => {
      state.authError = false;
      state.authMessage = "";
      state.authErrorMessage = "";
      state.authErrorCode = "";
    },
    setUserInformation: (state, action) => {
      state.username = action.payload.username;
      state.masterPasswordHint = action.payload.masterPasswordHint;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(logInWithEmailAndPassword.pending, (state) => {
        state.authEmailAndPasswordLoading = true;
      })
      .addCase(logInWithEmailAndPassword.fulfilled, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authFulfilled = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
        localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(logInWithEmailAndPassword.rejected, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(registerWithEmailAndPassword.pending, (state) => {
        state.authEmailAndPasswordLoading = true;
      })
      .addCase(registerWithEmailAndPassword.fulfilled, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authRegistered = true;
        state.authFulfilled = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
        console.log(action.payload);
        localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(registerWithEmailAndPassword.rejected, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(createUser.pending, (state) => {
        state.authEmailAndPasswordLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authRegistered = false;
        state.authFulfilled = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
        // localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(createUser.rejected, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
      })

      .addCase(changeEmailReauthentication.pending, (state) => {
        state.authChangedEmailLoading = true;
        state.authChangedEmail = true;
      })
      .addCase(changeEmailReauthentication.fulfilled, (state, action) => {
        state.authChangedEmailLoading = false;
        state.authChangedEmailReauthFulfilled = true;
      })
      .addCase(changeEmailReauthentication.rejected, (state, action) => {
        state.authChangedEmailLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(changeEmail.pending, (state) => {
        state.authChangedEmailLoading = true;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.authChangedEmailLoading = false;
        state.authChangedEmail = false;
        state.authChangedEmailFulfilled = true;
        state.authChangedEmailReauthFulfilled = false;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
        localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.authChangedEmailLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(changePasswordReauthentication.pending, (state) => {
        state.authChangedPasswordLoading = true;
        state.authChangedPassword = true;
      })
      .addCase(changePasswordReauthentication.fulfilled, (state) => {
        state.authChangedPasswordLoading = false;
        state.authChangedPasswordReauthFulfilled = true;
      })
      .addCase(changePasswordReauthentication.rejected, (state, action) => {
        state.authChangedPasswordLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(changePassword.pending, (state) => {
        state.authChangedPasswordLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.authChangedPasswordLoading = false;
        state.authChangedPassword = false;
        state.authChangedPasswordFulfilled = true;
        state.authChangedPasswordReauthFulfilled = false;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
        localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.authChangedPasswordLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(continueWithGoogle.pending, (state) => {
        state.authGoogleLoading = true;
      })
      .addCase(continueWithGoogle.fulfilled, (state) => {
        state.authGoogleLoading = false;
        state.authFulfilled = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
      })
      .addCase(continueWithGoogle.rejected, (state, action) => {
        state.authGoogleLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(logOut.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.authLoading = false;
        state.authFulfilled = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
        localStorage.removeItem("authUser");
      })
      .addCase(logOut.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
      });
  },
});

export const { setUser, resetUser, resetAuthErrors, setUserInformation } =
  userSlice.actions;
export default userSlice.reducer;
