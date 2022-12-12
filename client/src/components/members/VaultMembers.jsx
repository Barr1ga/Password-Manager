import React, { useState } from "react";
import VaultRoles from "./VaultRoles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRoles } from "../../features/slice/roleSlice";
import VaultMembersLazyLoad from "./VaultMembersLazyLoad";

const VaultMembers = () => {
  const { members } = useSelector((state) => state.members);
  const { roles, roleLoading } = useSelector((state) => state.roles);
  const { authUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoles({ uid: authUser.uid }));
  }, []);

  const onlineMembersWithRoles = members.filter(
    (member) => member.status === "online"
  );
  const onlineMembersWithoutRoles = members.filter((member) => {
    if (member.status === "online" && member.roleUids.length === 0) {
      return member;
    }
  });

  const offlineMembers = members.filter(
    (member) => member.status === "offline"
  );
  
  return (
    <div className="vault-members standard-stack gap-10">
      <h5>Members</h5>

      {roleLoading ? (
        <VaultMembersLazyLoad></VaultMembersLazyLoad>
      ) : (
        <>
          {roles.map((role, idx) => {
            const filteredOnlineMembers = onlineMembersWithRoles.filter(
              (member) => member.roleUids[0] === role.uid
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

          <VaultRoles
            role={"online"}
            members={onlineMembersWithoutRoles}
          ></VaultRoles>
          <VaultRoles role={"offline"} members={offlineMembers}></VaultRoles>
        </>
      )}
    </div>
  );
};

export default VaultMembers;
