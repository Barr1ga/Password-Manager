import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import firebaseErrorMessage from "../utils/firebaseErrorMessage";

const authUser = JSON.parse(localStorage.getItem("authUser"));
const authProfile = JSON.parse(localStorage.getItem("authProfile"));

const initialState = {
  authUser: authUser ? authUser : null,
  username: authProfile ? authProfile.username : null,
  masterPasswordHint: authProfile ? authProfile.masterPasswordHint : null,
  authEmailAndPasswordLoading: false,
  authGoogleLoading: false,
  authSaveAccountLoading: false,
  authLoading: false,
  authGetUser: false,
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

export const updateUserEmail = createAsyncThunk(
  "auth/updateUserEmail",
  async (data, ThunkAPI) => {
    try {
      return await authService.updateUserEmail(data);
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

export const logOut = createAsyncThunk("auth/logOut", async (_, ThunkAPI) => {
  try {
    return await authService.logOut();
  } catch (error) {
    return ThunkAPI.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.displayName
        ? action.payload.displayName
        : state.username;
      state.authUser = action.payload;
    },
    resetUser: (state) => initialState,
    resetAuthErrors: (state) => {
      state.authError = false;
      state.authFulfilled = false;
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
        state.authGetUser = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
        state.authUser = action.payload.user;
        localStorage.setItem("authUser", JSON.stringify(state.authUser));
      })
      .addCase(logInWithEmailAndPassword.rejected, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = firebaseErrorMessage(code);
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
        state.authUser = action.payload.user;
        localStorage.setItem("authUser", JSON.stringify(action.authUser));
      })
      .addCase(registerWithEmailAndPassword.rejected, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(getUserData.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.authLoading = false;
        state.username = action.payload.username
          ? action.payload.username
          : state.username;
        state.masterPasswordHint = action.payload.masterPasswordHint;
        state.authGetUser = false;
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
        state.authSaveAccountLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.authSaveAccountLoading = false;
        state.authFulfilled = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
        console.log(action.payload);
        state.username = action.payload;
        authProfile.username = action.payload;
        localStorage.setItem("authProfile", JSON.stringify(authProfile));
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.authSaveAccountLoading = false;
        state.authError = true;
      })

      .addCase(updateUserEmail.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(updateUserEmail.fulfilled, (state, action) => {
        state.authLoading = false;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
      })
      .addCase(updateUserEmail.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = true;
      })

      .addCase(updateUserPasswordHint.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(updateUserPasswordHint.fulfilled, (state, action) => {
        state.authLoading = false;
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
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
      })
      .addCase(getMasterPasswordHint.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = true;
        state.authErrorCode = "auth/user-not-found";
        state.authErrorMessage = firebaseErrorMessage("auth/user-not-found");
      })

      .addCase(createUser.pending, (state) => {
        state.authEmailAndPasswordLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authRegistered = false;
        state.authGetUser = true;
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
        state.authErrorMessage = firebaseErrorMessage(code);
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
        // localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.authChangedEmailLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = firebaseErrorMessage(code);
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
        state.authErrorMessage = firebaseErrorMessage(code);
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
        // localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.authChangedPasswordLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(continueWithGoogle.pending, (state) => {
        state.authGoogleLoading = true;
      })
      .addCase(continueWithGoogle.fulfilled, (state, action) => {
        state.authGoogleLoading = false;
        state.authFulfilled = true;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
        // state.username = action.payload.displayName;
        // localStorage.setItem("authUser", JSON.stringify(action.payload));
      })
      .addCase(continueWithGoogle.rejected, (state, action) => {
        state.authGoogleLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = firebaseErrorMessage(code);
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
        state.authErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(removeAccount.pending, (state) => {
        state.authRemovedAccountLoading = true;
      })
      .addCase(removeAccount.fulfilled, (state) => {
        state.authRemovedAccountLoading = false;
        state.authRemovedAccount = false;
        state.authRemovedAccountFulfilled = true;
        state.authRemovedAccountReauthFulfilled = false;
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
        state.authErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(removeUser.pending, (state) => {
        state.authEmailAndPasswordLoading = true;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authMessage = "";
        state.authErrorCode = "";
        state.authErrorMessage = "";
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.authEmailAndPasswordLoading = false;
        state.authError = true;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
      })

      .addCase(logOut.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        localStorage.removeItem("authUser");
        localStorage.removeItem("authProfile");
        state.authUser = initialState.authUser;
        state.username = initialState.username;
        state.masterPasswordHint = initialState.masterPasswordHint;
        state.authRegistered = initialState.authRegistered;
        state.authEmailAndPasswordLoading =
          initialState.authEmailAndPasswordLoading;
        state.authGoogleLoading = initialState.authGoogleLoading;
        state.authMicrosoftLoading = initialState.authMicrosoftLoading;
        state.authLoading = initialState.authLoading;
        state.authFulfilled = initialState.authFulfilled;
        state.authError = initialState.authError;
        state.authMessage = initialState.authMessage;
        state.authErrorMessage = initialState.authErrorMessage;
        state.authErrorCode = initialState.authErrorCode;
        state.authRegistered = initialState.authRegistered;
        state.authEmailAndPasswordLoading =
          initialState.authEmailAndPasswordLoading;
        state.authChangedEmail = initialState.authChangedEmail;
        state.authChangedEmailReauthFulfilled =
          initialState.authChangedEmailReauthFulfilled;
        state.authChangedEmailFulfilled =
          initialState.authChangedEmailFulfilled;
        state.authChangedEmailLoading = initialState.authChangedEmailLoading;
        state.authChangedPassword = initialState.authChangedPassword;
        state.authChangedPasswordReauthFulfilled =
          initialState.authChangedPasswordReauthFulfilled;
        state.authChangedPasswordFulfilled =
          initialState.authChangedPasswordFulfilled;
        state.authChangedPasswordLoading =
          initialState.authChangedPasswordLoading;
        state.authRemovedAccount = initialState.authRemovedAccount;
        state.authRemovedAccountReauthFulfilled =
          initialState.authRemovedAccountReauthFulfilled;
        state.authRemovedAccountFulfilled =
          initialState.authRemovedAccountFulfilled;
        state.authRemovedAccountLoading =
          initialState.authRemovedAccountLoading;
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
