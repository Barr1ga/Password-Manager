import React from "react";
import { HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import VaultRoles from "../components/vaultSettings/roles/VaultRoles";
import { useDispatch, useSelector } from "react-redux";
import CurrentRole from "../components/roles/CurrentRole";

const Roles = () => {
  const { selectedRole } = useSelector((state) => state.roles);
  const { isUserOwner } = useSelector((state) => state.auth);
  const { members } = useSelector((state) => state.members);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={
          isUserOwner && selectedRole
            ? "sub-margin-left scroll-view-long"
            : "scroll-view-long"
        }
      >
        <div className="page-header padding-side">
          <h4>Roles</h4>
          <Link to="/">
            <HiOutlineX className="btn-close"></HiOutlineX>
          </Link>
        </div>
        <div className="standard-stack gap-20">
          <VaultRoles></VaultRoles>
        </div>
      </div>
      {isUserOwner && selectedRole && (
        <div
          className={
            selectedRole
              ? "sub-margin-right"
              : "sub-margin-right hide-sub-margin"
          }
        >
          <div className="scroll-view standard-stack gap-10">
            <CurrentRole></CurrentRole>
          </div>
        </div>
      )}
    </>
  );
};

export default Roles;
