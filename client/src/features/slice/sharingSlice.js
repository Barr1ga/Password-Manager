import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [
    {
      senderID: "RMxRQlKMhxTVkKkLBM1obfEefsJ3",
      action: "user/invited",
      createdAt: "Thu Sep 01 2022 21:01:16 GMT+0800 (Philippine Standard Time)",
      isReply: false,
    },
  ],
  sharingLoading: false,
  sharingFulfilled: false,
  sharingError: false,
  sharingMessage: "",
  sharingSelectedPassword: null,
};

const sharingSlice = createSlice({
  name: "sharing",
  initialState,
  reducers: {
    resetPasswords: (state) => initialState,
    resetSelectedPasswordItem: (state) => {
      state.selectedPassword = null;
    },
    selectPasswordItem: (state, action) => {
      state.selectedPassword = action.payload;
    },
    addMessage: (state, action) => {
      state.conversation = [...state.conversation, action.payload];
    },
  },
});

export const { resetPasswords, resetSelectedPasswordItem, selectPasswordItem } =
  sharingSlice.actions;
export default sharingSlice.reducer;
