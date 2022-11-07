import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roleService from "../services/roleService";
import firebaseErrorMessage from "../utils/firebaseErrorMessage";

const initialState = {
  roles: [
    // { uid: "role1", name: "Vault Owner", abreviation: "VO" },
    // { uid: "role2", name: "family", abreviation: "FAM" },
    // { uid: "role3", name: "employee", abreviation: "EMP" },
    // { uid: "role4", name: "My programming frien", abreviation: "NEIGH" },
    // { uid: "role5", name: "BSIT", abreviation: "BSIT" },
    // { uid: "role6", name: "student", abreviation: "STUD" },
    // { uid: "role7", name: "professor", abreviation: "PROF" },
    // { uid: "role8", name: "friend", abreviation: "frd" },
  ],
  selectedRole: null,
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
  reducers: {
    resetRoles: (state) => initialState,
    selectRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    resetSelectedRole: (state) => {
      state.selectedRole = null;
    },
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

export const { resetRoles, selectRole, resetSelectedRole } = roleSlice.actions;
export default roleSlice.reducer;
