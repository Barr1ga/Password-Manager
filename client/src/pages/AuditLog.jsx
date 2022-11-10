import React, { useState, useEffect } from "react";
import Filters from "../components/Filters";
import AuditLogItem from "../components/AuditLogItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllLogs } from "../features/slice/auditLogSlice";

const AuditLog = () => {
  const { auditLogs } = useSelector((state) => state.auditLogs);
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLogs({ uid: authUser.uid }));
  }, []);

  return (
    <div className="scroll-view-long">
      <div className="page-header page-header-with-close padding-side">
        <h4>Vault Settings</h4>
      </div>
      <div className="vault-settings padding-side standard-stack gap-10">
        {auditLogs.map((auditLog, idx) => (
          <AuditLogItem key={idx} auditLog={auditLog}></AuditLogItem>
        ))}
      </div>
    </div>
  );
};

export default AuditLog;
