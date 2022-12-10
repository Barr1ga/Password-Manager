import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/date";

const AuditLogItem = ({ auditLog }) => {
  const { members } = useSelector((state) => state.members);
  // const { items } = useSelector((state) => state.items);
  // const { roles } = useSelector((state) => state.roles);

  const actorMember = members.find(
    (member) => member.uid === auditLog.actorUid
  );

  return (
    <div className="audit-log-item padding-side gap-10">
      {auditLog.action !== "user/joined" && (
        <>
          <div className="image">{actorMember.username.charAt(0)}</div>
          <div>
            <p>
              <b>{actorMember.username}</b>{" "}
              <span>
                {actorMember.email} {"—"} {auditLog.description}
              </span>{" "}
              {auditLog.benefactor}
            </p>
            <small>{formatDate(auditLog.date)}</small>
          </div>
        </>
      )}

      {auditLog.action === "user/joined" && (
        <>
          <div className="image">{auditLog.benefactor.charAt(0)}</div>
          <div>
            <p>
              {auditLog.benefactor} <span>{auditLog.description}</span>
            </p>
            <small>{formatDate(auditLog.date)}</small>
          </div>
        </>
      )}
    </div>
  );
};
export default AuditLogItem;
