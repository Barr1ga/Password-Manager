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

  const onlineMembers = members.filter((member) => member.status === "online");
  const offlineMembers = members.filter(
    (member) => member.status === "offline"
  );
  console.log(onlineMembers);
  return (
    <div className="vault-members standard-stack gap-10">
      <h5>Members</h5>

      {roleLoading ? (
        <VaultMembersLazyLoad></VaultMembersLazyLoad>
      ) : (
        <>
          {roles.map((role, idx) => {
            console.log(role)
            const filteredOnlineMembers = onlineMembers.filter(
              (member) => member.roleUids[0] === role.uid
            );
            console.log(filteredOnlineMembers);
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
        </>
      )}
    </div>
  );
};

export default VaultMembers;
