import React from "react";
import { HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";

const Role = ({ roleUid }) => {
  const { roles } = useSelector((state) => state.roles);
  const name = roles.find((role) => role.uid === roleUid);
  return (
    <div className="role-tag">
      <small>{name.abreviation} </small>
      <HiPlus className="btn-delete"></HiPlus>
    </div>
  );
};

export default Role;
