import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import authErrorMessage from "../utils/authErrorMessage";

const authUser = JSON.parse(localStorage.getItem("authUser"));
const authProfile = JSON.parse(localStorage.getItem("authProfile"));

const initialState = {
  authUser: authUser ? authUser : null,
  username: authProfile ? authProfile.username : null,
  masterPasswordHint: authProfile ? authProfile.masterPasswordHint : null,
  authEmailAndPasswordLoading: false,
  authGoogleLoading: false,
  authLoading: false,
  authFulfilled: false,
  authError: false,
  authMessage: "",
  authErrorMessage: "",
  authErrorCode: "",

  // registration
  authRegistered: false,

  // reauthentication
  authChangedEmail: false,
  authChangedEmailReauthFulfilled: false,
  authChangedEmailFulfilled: false,
  authChangedEmailLoading: false,
  authChangedPassword: false,
  authChangedPasswordReauthFulfilled: false,
  authChangedPasswordFulfilled: false,
  authChangedPasswordLoading: false,

  // account removal
  authRemovedAccount: false,
  authRemovedAccountReauthFulfilled: false,
  authRemovedAccountFulfilled: false,
  authRemovedAccountLoading: false,
};

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

export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (data, ThunkAPI) => {
    try {
      return await authService.getUserData(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (data, ThunkAPI) => {
    try {
      return await authService.updateUserData(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserPasswordHint = createAsyncThunk(
  "auth/updateUserPasswordHint",
  async (data, ThunkAPI) => {
    try {
      return await authService.updateUserPasswordHint(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getMasterPasswordHint = createAsyncThunk(
  "auth/getMasterPasswordHint",
  async (data, ThunkAPI) => {
    try {
      return await authService.getMasterPasswordHint(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data, ThunkAPI) => {
    try {
      return await authService.createUser(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const changeEmailReauthentication = createAsyncThunk(
  "auth/changeEmailReauthentication",
  async (masterPassword, ThunkAPI) => {
    try {
      return await authService.Reauthentication(masterPassword);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const changeEmail = createAsyncThunk(
  "auth/changeEmail",
  async (data, ThunkAPI) => {
    try {
      return await authService.changeEmail(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const changePasswordReauthentication = createAsyncThunk(
  "auth/changePasswordReauthentication",
  async (masterPassword, ThunkAPI) => {
    try {
      return await authService.Reauthentication(masterPassword);
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

export const accountRemovalReauthentication = createAsyncThunk(
  "auth/accountRemovalReauthentication",
  async (masterPassword, ThunkAPI) => {
    try {
      await authService.Reauthentication(masterPassword);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const removeAccount = createAsyncThunk(
  "auth/removeAccount",
  async (_, ThunkAPI) => {
    try {
      return await authService.removeAccount();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const removeUser = createAsyncThunk(
  "auth/removeUser",
  async (uid, ThunkAPI) => {
    try {
      return await authService.removeUser(uid);
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
        state.authUser = action.payload;
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
        state.authUser = action.payload;
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

      .addCase(getUserData.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.authLoading = false;
        state.username = action.payload.username;
        state.masterPasswordHint = action.payload.masterPasswordHint;
        state.authFulfilled = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
        localStorage.setItem("authProfile", JSON.stringify(action.payload));
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = true;
      })

      .addCase(updateUserData.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.authLoading = false;
        // state.username = action.payload;
        state.authFulfilled = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
        console.log(action.payload);
        authProfile.username = action.payload;
        localStorage.setItem("authProfile", JSON.stringify(authProfile));
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = true;
      })

      .addCase(updateUserPasswordHint.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(updateUserPasswordHint.fulfilled, (state, action) => {
        state.authLoading = false;
        state.masterPasswordHint = action.payload;
        state.authFulfilled = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
        console.log(action.payload);
      })
      .addCase(updateUserPasswordHint.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = true;
      })

      .addCase(getMasterPasswordHint.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(getMasterPasswordHint.fulfilled, (state, action) => {
        state.authLoading = false;
        state.masterPasswordHint = action.payload;
        state.authFulfilled = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
      })
      .addCase(getMasterPasswordHint.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = true;
        state.authErrorCode = "auth/user-not-found";
        state.authErrorMessage = authErrorMessage("auth/user-not-found");
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

      .addCase(accountRemovalReauthentication.pending, (state) => {
        state.authRemovedAccountLoading = true;
        state.authRemovedAccount = true;
      })
      .addCase(accountRemovalReauthentication.fulfilled, (state) => {
        state.authRemovedAccountLoading = false;
        state.authRemovedAccountReauthFulfilled = true;
      })
      .addCase(accountRemovalReauthentication.rejected, (state, action) => {
        state.authRemovedAccountLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(removeAccount.pending, (state) => {
        state.authRemovedAccountLoading = true;
      })
      .addCase(removeAccount.fulfilled, (state) => {
        state.authRemovedAccountLoading = false;
        state.authRemovedAccount = false;
        state.authRemovedAccountFulfilled = true;
        state.authRemovedAccountReauthFulfilled = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
      })
      .addCase(removeAccount.rejected, (state, action) => {
        state.authRemovedAccountLoading = false;
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
        localStorage.removeItem("authUser");
        state.authUser = null;
        state.username = "";
        state.masterPasswordHint = "";
        state.authRegistered = false;
        state.authEmailAndPasswordLoading = false;
        state.authGoogleLoading = false;
        state.authMicrosoftLoading = false;
        state.authLoading = false;
        state.authFulfilled = false;
        state.authError = false;
        state.authMessage = "";
        state.authErrorMessage = "";
        state.authErrorCode = "";
        state.authRegistered = false;
        state.authEmailAndPasswordLoading = false;
        state.authChangedEmail = false;
        state.authChangedEmailReauthFulfilled = false;
        state.authChangedEmailFulfilled = false;
        state.authChangedEmailLoading = false;
        state.authChangedPassword = false;
        state.authChangedPasswordReauthFulfilled = false;
        state.authChangedPasswordFulfilled = false;
        state.authChangedPasswordLoading = false;
        state.authRemovedAccount = false;
        state.authRemovedAccountReauthFulfilled = false;
        state.authRemovedAccountFulfilled = false;
        state.authRemovedAccountLoading = false;
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
