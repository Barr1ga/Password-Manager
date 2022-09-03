import React, { useState } from "react";
import { useSelector } from "react-redux";

const AuditLogItem = ({ auditLog }) => {
  console.log(auditLog);

  const { members } = useSelector((state) => state.members);
  console.log(members);
  const [currentMember, setCurrentMember] = useState(
    members.find((member) => member.id === auditLog.actorID)
  );
  console.log(currentMember);

  const benefactor = auditLog.description.slice(
    auditLog.description.lastIndexOf(" ")
  );

  return (
    <div className="audit-log-item padding-side gap-10">
      <div className="image">{currentMember.name.charAt(0)}</div>
      <div>
        <p>
          {currentMember.name}{" "}
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
