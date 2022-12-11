import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import memberService from "../services/memberService";
import firebaseErrorMessage from "../utils/firebaseErrorMessage";

const initialState = {
  members: [
    // {
    //   uid: 1,
    //   username: "horebBarriga",
    //   email: "hor.barr1ga@gmail.com",
    //   image: "",
    //   roleUids: ["1"],
    //   viewing: "Cards",
    //   status: "online",
    // },
    // {
    //   uid: 2,
    //   username: "daina",
    //   email: "red@gmail.com",
    //   image: "",
    //   roleUids: ["3", "2", "4"],
    //   viewing: "Cards",
    //   status: "online",
    // },
    // {
    //   uid: 3,
    //   username: "caburnayCj",
    //   email: "cjcaburnay@gmail.com",
    //   image: "",
    //   roleUids: ["4", "5", "3", "6", "5", "2", "7", "8"],
    //   viewing: "Cards",
    //   status: "online",
    // },
    // {
    //   uid: 4,
    //   username: "rhel",
    //   email: "rhelbarina@gmail.com",
    //   image: "",
    //   roleUids: ["3", "2", "4"],
    //   viewing: "Cards",
    //   status: "online",
    // },
  ],
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

export const createMember = createAsyncThunk(
  "member/createMember",
  async (data, ThunkAPI) => {
    try {
      return await memberService.createMember(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const updateMember = createAsyncThunk(
  "member/updateMember",
  async (data, ThunkAPI) => {
    try {
      return await memberService.updateMember(data);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMember = createAsyncThunk(
  "member/deleteMember",
  async (data, ThunkAPI) => {
    try {
      return await memberService.deleteMember(data);
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

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    resetMembers: (state) => initialState,
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

      .addCase(createMember.fulfilled, (state, action) => {
        state.memberLoading = false;
        state.memberFulfilled = true;
        state.memberCreatedFullfilled = true;
        state.members = [action.payload, ...state.members];
      })
      .addCase(createMember.rejected, (state, action) => {
        state.memberLoading = false;
        state.memberError = true;
        const { code, message } = action.payload;
        state.memberMessage = message;
        state.memberErrorCode = code;
        state.memberErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(updateMember.fulfilled, (state, action) => {
        state.memberLoading = false;
        state.memberFulfilled = true;
        state.memberUpdatedFullfilled = true;
        const idx = state.members.findIndex(
          (member) => member.uid === action.payload.uid
        );
        state.members[idx] = action.payload;
        [state.members[idx], state.members[0]] = [
          state.members[0],
          state.members[idx],
        ];
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.memberLoading = false;
        state.memberError = true;
        const { code, message } = action.payload;
        state.memberMessage = message;
        state.memberErrorCode = code;
        state.memberErrorMessage = firebaseErrorMessage(code);
      })

      .addCase(deleteMember.fulfilled, (state, action) => {
        state.memberLoading = false;
        state.memberFulfilled = true;
        state.memberDeletedFullfilled = true;
        state.members = state.members.filter(
          (member) => member.uid !== action.payload
        );
      })
      .addCase(deleteMember.rejected, (state, action) => {
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
      });
  },
});

export const { resetMembers } = memberSlice.actions;
export default memberSlice.reducer;
