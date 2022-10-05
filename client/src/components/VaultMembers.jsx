import React, { useState } from "react";
import VaultMember from "./VaultMember";
import { RiArrowRightSLine } from "react-icons/ri";
import VaultRoles from "./VaultRoles";
import { useSelector } from "react-redux";

const VaultMembers = () => {
  const { members } = useSelector((state) => state.members);
  const { roles } = useSelector((state) => state.roles);

  const onlineMembers = members.filter((member) => member.status !== "offline");
  const offlineMembers = members.filter(
    (member) => member.status === "offline"
  );

  return (
    <div className="vault-members standard-stack gap-10">
      <h5>Members</h5>

      {roles.map((role, idx) => {
        const filteredOnlineMembers = onlineMembers.filter(
          (member) => member.rolesID[0] === role.uid
        );
        if (filteredOnlineMembers.length !== 0) {
          return (
            <VaultRoles
              key={idx}
              role={role.name}
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
