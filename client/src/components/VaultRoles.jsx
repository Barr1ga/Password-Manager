import React, { useState } from "react";
import VaultMember from "./VaultMember";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";

const VaultRoles = ({ role, members }) => {
  const [showMembers, setShowMembers] = useState(true);
  let count;

  if (role === "offline") {
    count = members.length;
  } else {
    count = members.filter((member) => member.role === role).length;
  }

  return (
    <>
      <span
        className="role-title padding-side"
        onClick={() => setShowMembers((prev) => !prev)}
      >
        {role} — {count}{" "}
        {showMembers ? (
          <RiArrowDownSLine></RiArrowDownSLine>
        ) : (
          <RiArrowRightSLine></RiArrowRightSLine>
        )}
      </span>

      {role === "offline" && showMembers && (
        <div className="members-list offline-members">
          {members.map((member, idx) => (
            <VaultMember key={idx} member={member}></VaultMember>
          ))}
        </div>
      )}

      {role !== "offline" && showMembers && (
        <div className="members-list">
          {members
            .map((member, idx) => (
              <VaultMember key={idx} member={member}></VaultMember>
            ))}
        </div>
      )}
    </>
  );
};

export default VaultRoles;
