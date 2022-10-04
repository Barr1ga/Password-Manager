import React, { useState } from "react";
import Filters from "../components/Filters";
import AuditLogItem from "../components/AuditLogItem";
import { useSelector } from "react-redux";

const AuditLog = () => {
  const { auditLogs } = useSelector((state) => state.auditLogs);

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
