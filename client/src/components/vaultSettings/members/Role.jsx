import React, { useState } from "react";
import { useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { createLog } from "../../../features/slice/auditLogSlice";
import {
  resetMemberQueryFulfilled,
  updateMemberRoles,
} from "../../../features/slice/memberSlice";
import SpinnerLoaderSmall from "../../SpinnerLoaderSmall";

const Role = ({ member, roleUid }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.roles);
  const { authUser } = useSelector((state) => state.auth);
  const { members } = useSelector(
    (state) => state.members
  );
  const ownerUid = roles.find((role) => role.name === "Vault Owner").uid;
  const ownerUserUid = members.find((member) =>
    member.roleUids.includes(ownerUid)
  ).uid;
  const isNotOwner = authUser.uid !== ownerUserUid ? true : false;
  const role = roles.find((role) => role.uid === roleUid);

  const handleDeleteRole = () => {
    setLoading(true);

    const assignRoleData = {
      vaultUid: authUser.uid,
      userUid: member.uid,
      roleUids: member?.roleUids?.filter((roleUid) => roleUid !== role.uid),
    };

    const auditData = {
      uid: authUser.uid,
      auditLogData: {
        actorUid: authUser.uid,
        action: "role/unassignRole",
        description: "un-assigned a role fromo",
        benefactor: member.username,
        date: new Date(),
      },
    };

    dispatch(createLog(auditData));

    dispatch(updateMemberRoles(assignRoleData));
  };

  return (
    <div className="role-tag">
      <small style={{ color: role.color }}>{role.name} </small>
      {!isNotOwner && (
        <>
          {loading ? (
            <SpinnerLoaderSmall></SpinnerLoaderSmall>
          ) : (
            <HiPlus className="btn-delete" onClick={handleDeleteRole}></HiPlus>
          )}
        </>
      )}
    </div>
  );
};

export default Role;
