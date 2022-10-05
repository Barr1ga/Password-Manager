import React, { useState } from "react";
import WarningAlert from "../../alerts/WarningAlert";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import AddButton from "../../helpers/AddButton";
import Role from "./Role";
import { useSelector } from "react-redux";
import AddRoleButton from "./AddRoleButton";

const VaultRoles = () => {
  const { roles } = useSelector((state) => state.roles);

  const {
    register,
    handleSubmit,
    watch,
    // reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      //   sex: "",
    },
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
        <form className="search">
          <div className="form-group-horizontal padding-side">
            <div className="form-group">
              <input
                type="text"
                {...register("search")}
                placeholder="Search Role"
                className="form-control"
              />
            </div>
            <AddRoleButton></AddRoleButton>
          </div>
        </form>

        <div className="standard-stack">
          <span className="role-count padding-side">{roles.length} Items</span>
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
