import React from "react";
import { HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";

const Role = ({ roleID }) => {
  const { roles } = useSelector((state) => state.roles);
  const name = roles.find((role) => role.uid === roleID);
  return (
    <div className="role-tag">
      <small>{name.abreviation} </small>
      <HiPlus className="btn-tag-delete"></HiPlus>
    </div>
  );
};

export default Role;
