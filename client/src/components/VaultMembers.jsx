import React, { useState } from "react";
import VaultMember from "./VaultMember";
import { RiArrowRightSLine } from "react-icons/ri";
import VaultRoles from "./VaultRoles";
import { useSelector } from "react-redux";

const VaultMembers = () => {
  const { members } = useSelector((state) => state.members);
  const [onlineMembers, setOnlineMembers] = useState(
    members.filter((member) => member.status !== "offline")
  );
  const [offlineMembers, setOfflineMembers] = useState(
    members.filter((member) => member.status === "offline")
  );
  
  const roles = [...new Set(onlineMembers.map((member) => member.role))];
  const idx = roles.indexOf("vault owner");
  //   swap index
  [roles[0], roles[idx]] = [roles[idx], roles[0]];

  console.log(offlineMembers);

  return (
    <div className="vault-members standard-stack gap-10">
      <h5>Vault Members</h5>

      {roles.map((role, idx) => (
        <VaultRoles key={idx} role={role} members={onlineMembers}></VaultRoles>
      ))}

      <VaultRoles role={"offline"} members={offlineMembers}></VaultRoles>
    </div>
  );
};

export default VaultMembers;
