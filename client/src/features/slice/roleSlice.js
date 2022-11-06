import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roleService from "../services/roleService";
import firebaseErrorMessage from "../utils/firebaseErrorMessage";

const initialState = {
  roles: [
    // { uid: "1", name: "Vault Owner", abreviation: "VO" },
    // { uid: "2", name: "family", abreviation: "FAM" },
    // { uid: "3", name: "employee", abreviation: "EMP" },
    // { uid: "4", name: "My programming frien", abreviation: "NEIGH" },
    // { uid: "5", name: "BSIT", abreviation: "BSIT" },
    // { uid: "6", name: "student", abreviation: "STUD" },
    // { uid: "7", name: "professor", abreviation: "PROF" },
    // { uid: "8", name: "friend", abreviation: "frd" },
  ],
  roleLoading: false,
  roleFulfilled: false,
  roleError: false,
  roleMessage: "",
};

export const getAllRoles = createAsyncThunk(
  "role/getAllRoles",
  async (data, ThunkAPI) => {
    try {
      return await roleService.getAllRoles(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const createRole = createAsyncThunk(
  "role/createRole",
  async (data, ThunkAPI) => {
    try {
      return await roleService.createRole(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async (data, ThunkAPI) => {
    try {
      return await roleService.updateRole(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async (data, ThunkAPI) => {
    try {
      return await roleService.deleteRole(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducer: {
    resetRoles: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllRoles.pending, (state) => {
        state.roleLoading = true;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.roleFulfilled = true;
        state.roles = action.payload;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.roleLoading = false;
        state.roleError = true;
        const { code, message } = action.payload;
        state.roleMessage = message;
        state.roleErrorCode = code;
        state.roleErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(createRole.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.roleFulfilled = true;
        state.roleCreatedFullfilled = true;
        state.roles = [action.payload, ...state.roles];
      })
      .addCase(createRole.rejected, (state, action) => {
        state.roleLoading = false;
        state.roleError = true;
        const { code, message } = action.payload;
        state.roleMessage = message;
        state.roleErrorCode = code;
        state.roleErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(updateRole.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.roleFulfilled = true;
        state.roleUpdatedFullfilled = true;
        const idx = state.roles.findIndex(
          (role) => role.uid === action.payload.uid
        );
        state.roles[idx] = action.payload;
        [state.roles[idx], state.roles[0]] = [state.roles[0], state.roles[idx]];
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.roleLoading = false;
        state.roleError = true;
        const { code, message } = action.payload;
        state.roleMessage = message;
        state.roleErrorCode = code;
        state.roleErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.roleFulfilled = true;
        state.roleDeletedFullfilled = true;
        state.roles = state.roles.filter((role) => role.uid !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.roleLoading = false;
        state.roleError = true;
        const { code, message } = action.payload;
        state.roleMessage = message;
        state.roleErrorCode = code;
        state.roleErrorMessage = firebaseErrorMessage(code);
      });
  },
});

export const { resetRoles } = roleSlice.actions;
export default roleSlice.reducer;
