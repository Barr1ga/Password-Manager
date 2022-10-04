import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [
    {
      senderID: 1,
      message: "Helo world!",
      createdAt: "Thu Sep 01 2022 21:01:16 GMT+0800 (Philippine Standard Time)",
      isReply: false,
    },
    {
      senderID: 2,
      message: "How are you guys doing?!",
      createdAt: "Thu Sep 01 2022 21:01:17 GMT+0800 (Philippine Standard Time)",
      replyID: 3,
      isReply: true,
    },
    {
      senderID: 2,
      message: "I think we should run around the campus tonight",
      createdAt: "Thu Sep 01 2022 21:01:17 GMT+0800 (Philippine Standard Time)",
      replyID: null,
      isReply: false,
    },
    {
      senderID: 2,
      message: "Wanna come along?",
      createdAt: "Thu Sep 01 2022 21:01:17 GMT+0800 (Philippine Standard Time)",
      replyID: null,
      isReply: false,
    },
    {
      senderID: 3,
      message:
        "Good to see some people around here. Lets have a karaoke night tonight, i suggest :D!",
      createdAt: "Thu Sep 01 2022 21:01:18 GMT+0800 (Philippine Standard Time)",
      isReply: false,
    },
    {
      senderID: 4,
      message: "Sure bro",
      createdAt: "Thu Sep 10 2022 21:01:19 GMT+0800 (Philippine Standard Time)",
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
