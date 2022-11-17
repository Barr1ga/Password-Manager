import React from "react";
import { HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";

const Role = ({ roleUid }) => {
  const { roles } = useSelector((state) => state.roles);
  const role = roles.find((role) => role.uid === roleUid);
  return (
    <div className="role-tag">
      <small style={{ color: role.color }}>{role.name} </small>
      <HiPlus className="btn-delete"></HiPlus>
    </div>
  );
};

export default Role;
