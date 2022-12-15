import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import memberService from "../services/memberService";
import firebaseErrorMessage from "../utils/firebaseErrorMessage";

const initialState = {
  members: [],
  memberLoading: false,
  memberFulfilled: false,
  memberError: false,
  memberMessage: "",
};

export const getAllMembers = createAsyncThunk(
  "member/getAllMembers",
  async (data, ThunkAPI) => {
    try {
      return await memberService.getAllMembers(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const updateMemberRoles = createAsyncThunk(
  "role/updateMemberRoles",
  async (data, ThunkAPI) => {
    try {
      return await memberService.updateMemberRoles(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const assignMultipleMemberRole = createAsyncThunk(
  "role/assignMultipleMemberRole",
  async (data, ThunkAPI) => {
    try {
      return await memberService.assignMultipleMemberRole(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const unAssignMultipleMemberRole = createAsyncThunk(
  "role/unAssignMultipleMemberRole",
  async (data, ThunkAPI) => {
    try {
      return await memberService.unAssignMultipleMemberRole(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const kickMember = createAsyncThunk(
  "role/kickMember",
  async (data, ThunkAPI) => {
    try {
      return await memberService.kickMember(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    resetMembers: (state) => initialState,
    resetMemberQueryFulfilled: (state) => {
      state.memberLoading = initialState.memberLoading;
      state.memberFulfilled = initialState.memberFulfilled;
      state.memberError = initialState.memberError;
      state.memberMessage = initialState.memberMessage;
      state.memberErrorMessage = initialState.memberErrorMessage;
      state.memberErrorCode = initialState.memberErrorCode;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllMembers.pending, (state) => {
        state.memberLoading = true;
      })
      .addCase(getAllMembers.fulfilled, (state, action) => {
        state.memberLoading = false;
        state.memberFulfilled = true;
        state.members = action.payload;
      })
      .addCase(getAllMembers.rejected, (state, action) => {
        state.memberLoading = false;
        state.memberError = true;
        const { code, message } = action.payload;
        state.memberMessage = message;
        state.memberErrorCode = code;
        state.memberErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(updateMemberRoles.fulfilled, (state, action) => {
        state.memberLoading = false;
        state.memberFulfilled = true;
        state.memberUpdatedFullfilled = true;
        const idx = state.members.findIndex(
          (member) => member.uid === action.payload.userUid
        );
        state.members[idx].roleUids = action.payload.roleUids;
      })
      .addCase(updateMemberRoles.rejected, (state, action) => {
        state.memberLoading = false;
        state.memberError = true;
        const { code, message } = action.payload;
        state.memberMessage = message;
        state.memberErrorCode = code;
        state.memberErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(assignMultipleMemberRole.fulfilled, (state, action) => {
        state.memberLoading = false;
        state.memberFulfilled = true;
        state.memberUpdatedFullfilled = true;
        const { roleUid, assignedMembers } = action.payload;
        assignedMembers.forEach((member) => {
          const idx = state.members.findIndex(
            (stateMember) => stateMember.uid === member
          );
          state.members[idx].roleUids = [
            ...state.members[idx]?.roleUids,
            roleUid,
          ];
        });
      })
      .addCase(assignMultipleMemberRole.rejected, (state, action) => {
        state.memberLoading = false;
        state.memberError = true;
        const { code, message } = action.payload;
        state.memberMessage = message;
        state.memberErrorCode = code;
        state.memberErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(unAssignMultipleMemberRole.fulfilled, (state, action) => {
        state.memberLoading = false;
        state.memberFulfilled = true;
        state.memberUpdatedFullfilled = true;
        const { roleUid, unAssignedMembers } = action.payload;
        unAssignedMembers.forEach((member) => {
          const idx = state.members.findIndex(
            (stateMember) => stateMember.uid === member
          );
          state.members[idx].roleUids = state.members[idx].roleUids.filter(
            (role) => role !== roleUid
          );
        });
      })
      .addCase(unAssignMultipleMemberRole.rejected, (state, action) => {
        state.memberLoading = false;
        state.memberError = true;
        const { code, message } = action.payload;
        state.memberMessage = message;
        state.memberErrorCode = code;
        state.memberErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(kickMember.fulfilled, (state, action) => {
        state.memberLoading = false;
        state.memberFulfilled = true;
        state.memberUpdatedFullfilled = true;
        state.members = state.members.filter(
          (member) => member.uid !== action.payload.memberUid
        );
      })
      .addCase(kickMember.rejected, (state, action) => {
        state.memberLoading = false;
        state.memberError = true;
        const { code, message } = action.payload;
        state.memberMessage = message;
        state.memberErrorCode = code;
        state.memberErrorMessage = firebaseErrorMessage(code);
      });
  },
});

export const { resetMembers, resetMemberQueryFulfilled } = memberSlice.actions;
export default memberSlice.reducer;
