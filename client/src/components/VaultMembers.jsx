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

  const roles = [...new Set(members.map((member) => member.role))];
  const idx = roles.indexOf("vaultOwner");
  //   swap index
  [roles[0], roles[idx]] = [roles[idx], roles[0]];

  return (
    <div className="vault-members standard-stack gap-10">
      <h5>Members</h5>

      {roles.map((role, idx) => {
        const filteredOnlineMembers = onlineMembers.filter(
          (member) => member.role === role
        );
        if (filteredOnlineMembers.length !== 0) {
          return (
            <VaultRoles
              key={idx}
              role={role}
              members={filteredOnlineMembers}
            ></VaultRoles>
          );
        }
      })}

      <VaultRoles role={"offline"} members={offlineMembers}></VaultRoles>
    </div>
  );
};

export default VaultMembers;
