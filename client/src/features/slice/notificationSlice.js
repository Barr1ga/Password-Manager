import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebaseErrorMessage from "../utils/firebaseErrorMessage";
import notificationService from "../services/notificationService";

const initialState = {
  notifications: [
    {
      actorUid: "RMxRQlKMhxTVkKkLBM1obfEefsJ3",
      action: "User/invite",
      description: "Invited you to a vault",
      date: new Date().toString(),
    },
  ],
  selectedNotification: null,
  notificationLoading: false,
  notificationFulfilled: false,
  notificationError: false,
  notificationMessage: "",
  notificationErrorMessage: "",
  notificationErrorCode: "",
};

export const getAllNotifications = createAsyncThunk(
  "notification/getAllNotifications",
  async (data, ThunkAPI) => {
    try {
      return await notificationService.getAllNotifications(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const createNotification = createAsyncThunk(
  "notification/createNotification",
  async (data, ThunkAPI) => {
    try {
      return await notificationService.createNotification(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const updateNotification = createAsyncThunk(
  "notification/updateNotification",
  async (data, ThunkAPI) => {
    try {
      return await notificationService.updateNotification(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (data, ThunkAPI) => {
    try {
      return await notificationService.deleteNotification(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetNotifications: (state) => initialState,
    resetNotificationQueryFulfilled: (state) => {
      state.notificationLoading = initialState.notificationLoading;
      state.notificationFulfilled = initialState.notificationFulfilled;
      state.notificationError = initialState.notificationError;
      state.notificationMessage = initialState.notificationMessage;
      state.notificationErrorMessage = initialState.notificationErrorMessage;
      state.notificationErrorCode = initialState.notificationErrorCode;
    },
    resetSelectedNotification: (state) => {
      state.selectedNotification = null;
    },
    selectNotification: (state, action) => {
      state.selectedNotification = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllNotifications.pending, (state) => {
        state.notificationLoading = true;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.notificationLoading = false;
        state.notificationFulfilled = true;
        state.notifications = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.notificationLoading = false;
        state.notificationError = true;
        const { code, message } = action.payload;
        state.notificationMessage = message;
        state.notificationErrorCode = code;
        state.notificationErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(createNotification.fulfilled, (state, action) => {
        state.notificationLoading = false;
        state.notificationFulfilled = true;
        state.notifications = [...state.notifications, action.payload];
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.notificationLoading = false;
        state.notificationError = true;
        const { code, message } = action.payload;
        state.notificationMessage = message;
        state.notificationErrorCode = code;
        state.notificationErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(updateNotification.fulfilled, (state, action) => {
        state.notificationLoading = false;
        state.notificationFulfilled = true;
        const idx = state.notifications.findIndex(
          (notification) => notification.uid === action.payload.uid
        );
        state.notifications[idx] = action.payload;
        [state.notifications[idx], state.notifications[0]] = [
          state.notifications[0],
          state.notifications[idx],
        ];
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.notificationLoading = false;
        state.notificationError = true;
        const { code, message } = action.payload;
        state.notificationMessage = message;
        state.notificationErrorCode = code;
        state.notificationErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notificationLoading = false;
        state.notificationFulfilled = true;
        state.notifications = state.notifications.filter(
          (notification) => notification.uid !== action.payload
        );
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.notificationLoading = false;
        state.notificationError = true;
        const { code, message } = action.payload;
        state.notificationMessage = message;
        state.notificationErrorCode = code;
        state.notificationErrorMessage = firebaseErrorMessage(code);
      });
  },
});

export const {
  resetNotifications,
  resetNotificationQueryFulfilled,
  resetSelectedNotification,
  selectNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
