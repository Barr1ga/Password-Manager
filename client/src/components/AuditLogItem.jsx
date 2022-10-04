import React, { useState } from "react";
import { useSelector } from "react-redux";

const AuditLogItem = ({ auditLog }) => {
  const { members } = useSelector((state) => state.members);

  const [currentMember, setCurrentMember] = useState(
    members.find((member) => member.id === auditLog.actorID)
  );

  const benefactor = auditLog.description.slice(
    auditLog.description.lastIndexOf(" ")
  );

  return (
    <div className="audit-log-item padding-side gap-10">
      <div className="image">{currentMember.username.charAt(0)}</div>
      <div>
        <p>
          {currentMember.username}{" "}
          <span>
            {auditLog.description.substring(
              0,
              auditLog.description.lastIndexOf(" ")
            )}{" "}
          </span>
          {benefactor}
        </p>
        <small>{auditLog.date}</small>
      </div>
    </div>
  );
};

export default AuditLogItem;
