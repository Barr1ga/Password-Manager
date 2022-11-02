import React from "react";
import WarningAlert from "../../alerts/WarningAlert";
import { useForm } from "react-hook-form";
import Role from "./Role";
import { useSelector } from "react-redux";
import AddRoleButton from "./AddRoleButton";
import { HiOutlineSearch } from "react-icons/hi";

const VaultRoles = () => {
  const { roles } = useSelector((state) => state.roles);
  const {
    register,
  } = useForm({
    mode: "all",
  });

  return (
    <div className="standard-stack">
      <h5 className="padding-side">All Roles</h5>
      <div className="form-group padding-side">
        <WarningAlert
          message={
            "Accidentally giving permissions to a role may cause unauthorized access to sensitive information."
          }
        ></WarningAlert>
      </div>
      <div className="standard-stack">
        <form>
          <div className="form-group-horizontal padding-side">
            <div className="form-group form-search">
              <input
                type="text"
                {...register("search")}
                placeholder="Search Role"
                className="form-control"
              />
              <HiOutlineSearch className="icon"></HiOutlineSearch>
            </div>
            <AddRoleButton></AddRoleButton>
          </div>
        </form>

        <div className="standard-stack">
          <span className="role-count padding-side">{roles.length} Roles</span>
          <div className="form-group">
            {roles.map((role, idx) => {
              return <Role key={idx} role={role}></Role>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultRoles;
