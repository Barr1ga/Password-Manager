import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auditLogService from "../services/auditLogService";
import authErrorMessage from "../utils/firebaseErrorMessage";

const initialState = {
  auditLogs: [
    // {
    //   actorUid: 1,
    //   action: "ItemLog/create",
    //   description: "created Facebook",
    //   date: new Date().toString(),
    // },
    // {
    //   actorUid: 1,
    //   action: "ItemLog/read",
    //   description: "opened Facebook",
    //   date: new Date().toString(),
    // },
    // {
    //   actorUid: 1,
    //   action: "ItemLog/update",
    //   description: "made changes to Facebook",
    //   date: new Date().toString(),
    // },
    // {
    //   actorUid: 2,
    //   action: "ItemLog/delete",
    //   description: "deleted Discord",
    //   date: new Date().toString(),
    // },
    // {
    //   actorUid: 2,
    //   action: "role/create",
    //   description: "created a role FAMILY",
    //   date: new Date().toString(),
    // },
    // {
    //   actorUid: 1,
    //   action: "role/assign",
    //   description: "assigned a role FAMILY to a member",
    //   date: new Date().toString(),
    // },
    // {
    //   actorUid: 1,
    //   action: "role/delete",
    //   description: "deleted the role FAMILY",
    //   date: new Date().toString(),
    // },
    // {
    //   actorUid: 1,
    //   action: "user/joined",
    //   description: "joined",
    //   date: new Date().toString(),
    // },
    // {
    //   actorUid: 2,
    //   action: "user/invited",
    //   description: "invited hor.barr1ga@gmail.com",
    //   date: new Date().toString(),
    // },
    // {
    //   actorUid: 2,
    //   action: "user/kicked",
    //   description: "kicked hor.barr1ga@gmail.com",
    //   date: new Date().toString(),
    // },
    // {
    //   actorUid: 2,
    //   action: "user/logged",
    //   description: "kicked hor.barr1ga@gmail.com",
    //   date: new Date().toString(),
    // },
    // {
    //   actorUid: 2,
    //   action: "user/kicked",
    //   description: "kicked hor.barr1ga@gmail.com",
    //   date: new Date().toString(),
    // },
  ],
  auditLogLoading: false,
  auditLogFulfilled: false,
  auditLogError: false,
  auditLogMessage: "",
};

export const getAllLogs = createAsyncThunk(
  "log/getAllLogs",
  async (data, ThunkAPI) => {
    try {
      return await auditLogService.getAllLogs(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const createLog = createAsyncThunk(
  "log/createLog",
  async (data, ThunkAPI) => {
    try {
      return await auditLogService.createLog(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const auditLogSlice = createSlice({
  name: "audtLog",
  initialState,
  reducers: {
    resetAuditLogs: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllLogs.pending, (state) => {
        state.auditLogLoading = true;
      })
      .addCase(getAllLogs.fulfilled, (state, action) => {
        state.auditLogLoading = false;
        state.auditLogFulfilled = true;
        state.auditLogs = action.payload;
      })
      .addCase(getAllLogs.rejected, (state, action) => {
        state.auditLogLoading = false;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      })

      .addCase(createLog.pending, (state) => {
        state.auditLogLoading = true;
      })
      .addCase(createLog.fulfilled, (state, action) => {
        state.auditLogLoading = false;
        state.auditLogFulfilled = true;
        state.auditLogCreatedFullfilled = true;
        state.auditLogs = [action.payload, ...state.auditLogs];
      })
      .addCase(createLog.rejected, (state, action) => {
        state.auditLogLoading = false;
        const { code, message } = action.payload;
        state.authMessage = message;
        state.authErrorCode = code;
        state.authErrorMessage = authErrorMessage(code);
      });
  },
});

export const { resetAuditLogs } = auditLogSlice.actions;
export default auditLogSlice.reducer;
