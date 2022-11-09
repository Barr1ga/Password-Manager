import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  formatDate,
  formatToMonthDayYearDate,
  formatToNowDate,
  formatToTime,
} from "../utils/date";

const AuditLogItem = ({ auditLog }) => {
  const { members } = useSelector((state) => state.members);
  const { items } = useSelector((state) => state.items);
  const { roles } = useSelector((state) => state.roles);

  const type = auditLog.action.split("/")[0];
  const method = auditLog.action.split("/")[1];

  let benefactor = "";
  const actorMember = members.find(
    (member) => member.uid === auditLog.actorUid
  );

  if (type === "item") {
    benefactor = items.find((item) => item.uid === auditLog.benefactorUid);
  }

  if (type === "role") {
    benefactor = roles.find((role) => role.uid === auditLog.benefactorUid);
  }

  console.log(formatDate(auditLog.date));

  return (
    <div className="audit-log-item padding-side gap-10">
      <div className="image">{actorMember.username.charAt(0)}</div>
      <div>
        <p>
          <b>{actorMember.username}</b> <span>{auditLog.description}</span>{" "}
          {type === "item" && benefactor?.name}
          {type === "role" && benefactor?.name}
        </p>
        <small>
          {/* {formatToMonthDayYearDate(auditLog.date).toString()} */}
          {/* {formatToTime(auditLog.date).toString()} */}
          {formatDate(auditLog.date)}
        </small>
      </div>
    </div>
  );
};

export default AuditLogItem;
