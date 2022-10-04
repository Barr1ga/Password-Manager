import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auditLogs: [
    {
      actorID: 1,
      action: "password/create",
      description: "created Facebook",
      date: new Date().toString(),
    },
    {
      actorID: 1,
      action: "password/read",
      description: "opened Facebook",
      date: new Date().toString(),
    },
    {
      actorID: 1,
      action: "password/update",
      description: "made changes to Facebook",
      date: new Date().toString(),
    },
    {
      actorID: 2,
      action: "password/delete",
      description: "deleted Discord",
      date: new Date().toString(),
    },
    {
      actorID: 2,
      action: "role/create",
      description: "created a role FAMILY",
      date: new Date().toString(),
    },
    {
      actorID: 1,
      action: "role/assign",
      description: "assigned a role FAMILY to a member",
      date: new Date().toString(),
    },
    {
      actorID: 1,
      action: "role/delete",
      description: "deleted the role FAMILY",
      date: new Date().toString(),
    },
    {
      actorID: 1,
      action: "user/joined",
      description: "joined",
      date: new Date().toString(),
    },
    {
      actorID: 2,
      action: "user/invited",
      description: "invited hor.barr1ga@gmail.com",
      date: new Date().toString(),
    },
    {
      actorID: 2,
      action: "user/kicked",
      description: "kicked hor.barr1ga@gmail.com",
      date: new Date().toString(),
    },
    {
      actorID: 2,
      action: "user/logged",
      description: "kicked hor.barr1ga@gmail.com",
      date: new Date().toString(),
    },
    {
      actorID: 2,
      action: "user/kicked",
      description: "kicked hor.barr1ga@gmail.com",
      date: new Date().toString(),
    },
  ],
  auditLogLoading: false,
  auditLogFulfilled: false,
  auditLogError: false,
  auditLogMessage: "",
};

const auditLogSlice = createSlice({
  name: "audtLog",
  initialState,
  reducers: {
    resetAuditLogs: (state) => initialState,
  },
});

export const { resetAuditLogs } = auditLogSlice.actions;
export default auditLogSlice.reducer;
