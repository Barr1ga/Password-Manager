import React from "react";
import { HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import VaultRoles from "../components/vaultSettings/roles/VaultRoles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRoles } from "../features/slice/roleSlice";
import RoleInformation from "../components/roles/RoleInformation";
import CurrentRole from "../components/roles/CurrentRole";
import { getAllMembers } from "../features/slice/memberSlice";

const Roles = () => {
  const { selectedRole } = useSelector((state) => state.roles);
  const { currentVault } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentVault !== "") {
      dispatch(getAllMembers({ uid: currentVault }));
      dispatch(getAllRoles({ uid: currentVault }));
    }
  }, [currentVault]);

  return (
    <>
      <div
        className={
          selectedRole ? "sub-margin-left scroll-view-long" : "scroll-view-long"
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
      {selectedRole && (
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
