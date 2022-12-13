import React, { useState, useEffect } from "react";
import Filters from "../components/Filters";
import AuditLogListLazyLoad from "../components/auditLogs/AuditLogListLazyLoad";
import AuditLogItem from "../components/auditLogs/AuditLogItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllLogs } from "../features/slice/auditLogSlice";
import { getAllMembers } from "../features/slice/memberSlice";

const AuditLog = () => {
  const { auditLogs, auditLogLoading } = useSelector(
    (state) => state.auditLogs
  );
  const { memberLoading } = useSelector((state) => state.members);
  const { currentVault } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLogs({ uid: currentVault }));
    dispatch(getAllMembers({ uid: currentVault }));
  }, [currentVault]);

  return (
    <div className="scroll-view-long">
      <div className="page-header page-header-with-close padding-side">
        <h4>Audit Log</h4>
      </div>
      <div className="vault-settings padding-side standard-stack gap-10">
        {auditLogLoading || memberLoading ? (
          <AuditLogListLazyLoad></AuditLogListLazyLoad>
        ) : (
          auditLogs.map((auditLog, idx) => (
            <AuditLogItem key={idx} auditLog={auditLog}></AuditLogItem>
          ))
        )}
      </div>
    </div>
  );
};

export default AuditLog;
