import React, { useState } from "react";
import WarningAlert from "../alerts/WarningAlert";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import AddButton from "../Helpers/AddButton";
import Role from "./Role";

const VaultRoles = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "horebBarriga",
      email: "hor.barr1ga@gmail.com",
      role: "vault owner",
    },
    {
      id: 1,
      name: "DainSiao",
      email: "dainalou@gmail.com",
      role: "vault owner",
    },
    {
      id: 1,
      name: "CJCaburnay",
      email: "caburnaycj@gmail.com",
      role: "employee",
    },
    { id: 1, name: "Bryll", email: "bryllandales@gmail.com", role: "family" },
    {
      id: 1,
      name: "JemseyAmonsot",
      email: "jemseyamonsot@gmail.com",
      role: "family",
    },
  ]);

  const roles = [...new Set(members.map((member) => member.role))];
  const idx = roles.indexOf("vault owner");
  //   swap index
  [roles[0], roles[idx]] = [roles[idx], roles[0]];

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
                ⚠ {errors.name.message}
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
              const count = members.filter(
                (member) => member.role === role
              ).length;
              return <Role key={idx} role={role} count={count}></Role>;
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
