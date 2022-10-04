import React, { useState } from "react";
import Filters from "../components/Filters";
import AuditLogItem from "../components/AuditLogItem";

const AuditLog = () => {
  const [auditLogs, setAuditLogs] = useState([
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
  ]);

  return (
    <div className="margin-content">
      <div className="page-header page-header-long page-header-fixed padding-side">
        <h4>Audit Log</h4>{" "}
        <div>
          <Filters></Filters>
        </div>
      </div>
      <div className="scroll-view">
        {auditLogs.map((auditLog, idx) => (
          <AuditLogItem key={idx} auditLog={auditLog}></AuditLogItem>
        ))}
      </div>
    </div>
  );
};

export default AuditLog;
