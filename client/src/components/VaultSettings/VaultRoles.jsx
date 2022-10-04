import React, { useState } from "react";
import WarningAlert from "../alerts/WarningAlert";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import AddButton from "../helpers/AddButton";
import Role from "./Role";
import { useSelector } from "react-redux";

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
      <div className="form-group">
        <h5 className="padding-side"></h5>
        <div className="form-group padding-side">
          <WarningAlert
            message={
              "Please note that inviting users to this vault may lead to unauthorized access to sensitive information. Assign proper authorizations to new and existing users by giving them appropriate roles."
            }
          ></WarningAlert>
        </div>
        <form>
          <div className="form-group padding-side">
            <input
              type="text"
              {...register("email")}
              placeholder="Search Role"
              className={
                errors.name ? "form-control form-error" : "form-control "
              }
            />
            {errors.name && (
              <small className="error-message">
                {errors.name.message}
                <br></br>
              </small>
            )}
          </div>
        </form>

        <div className="roles-list-header padding-side">
          <h5>All Roles</h5>
          <AddButton message={"Create Role"}></AddButton>
        </div>
        <div className="standard-stack">
          <span className="role-count padding-side">{roles.length} Items</span>
          <div className="form-group">
            {roles.map((role, idx) => {
              return <Role key={idx} role={role}></Role>;
            })}
          </div>
          <div className="form-group padding-side">
            <AddButton message={"Create Role"}></AddButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultRoles;
