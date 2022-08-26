import React, { useState } from "react";
import VaultMember from "./VaultMember";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";

const VaultRoles = ({ role, members }) => {
  const [showMembers, setShowMembers] = useState(true);
  const count = members.filter((member) => member.role === role).length;
  return (
    <>
      <span
        className="role padding-side"
        onClick={() => setShowMembers((prev) => !prev)}
      >
        {role} — {count} {showMembers ? <RiArrowDownSLine></RiArrowDownSLine> : <RiArrowRightSLine></RiArrowRightSLine>}
      </span>
      {showMembers && (
        <div className="members-list">
          {members
            .filter((member) => member.role === role)
            .map((member, idx) => (
              <VaultMember key={idx} member={member}></VaultMember>
            ))}
        </div>
      )}
    </>
  );
};

export default VaultRoles;
