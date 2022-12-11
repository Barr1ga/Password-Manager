import React from "react";
import { HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { createLog } from "../../../features/slice/auditLogSlice";
import { updateMemberRoles } from "../../../features/slice/memberSlice";

const Role = ({ member, roleUid }) => {
  const dispatch = useDispatch();
  console.log(member);
  const { roles } = useSelector((state) => state.roles);
  const role = roles.find((role) => role.uid === roleUid);
  const { authUser } = useSelector((state) => state.auth);

  const handleDeleteRole = () => {
    console.log(member);
    console.log(role);

    const assignRoleData = {
      vaultUid: authUser.uid,
      userUid: member.uid,
      roleUids: member.roleUids.filter((roleUid) => roleUid !== role.uid),
    };

    const auditData = {
      uid: authUser.uid,
      auditLogData: {
        actorUid: authUser.uid,
        action: "role/unassignRole",
        description: "un-assigned a role to",
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
      <HiPlus className="btn-delete" onClick={handleDeleteRole}></HiPlus>
    </div>
  );
};

export default Role;
