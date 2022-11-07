import React, { useEffect, useState } from "react";
import WarningAlert from "../../alerts/WarningAlert";
import { useForm } from "react-hook-form";
import Role from "./Role";
import { useDispatch, useSelector } from "react-redux";
import AddRoleButton from "./AddRoleButton";
import { HiOutlineSearch } from "react-icons/hi";
import { getAllRoles } from "../../../features/slice/roleSlice";

const VaultRoles = () => {
  const [searchValue, setSearchValue] = useState("");
  const { authUser } = useSelector((state) => state.auth);
  const { roles } = useSelector((state) => state.roles);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!roles) {
      dispatch(getAllRoles({ uid: authUser.uid }));
    }
  }, []);

  const vaultOwnerUid = roles.find((role) => role.name === "Vault Owner").uid;

  let filteredRoles =
    searchValue !== ""
      ? roles.filter((role) =>
          role.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : roles;

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
                placeholder="Search Role"
                className="form-control"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <HiOutlineSearch className="icon"></HiOutlineSearch>
            </div>
            <AddRoleButton></AddRoleButton>
          </div>
        </form>

        <div className="standard-stack">
          <span className="role-count padding-side">
            {filteredRoles.length} Roles
          </span>
          <div className="form-group">
            {filteredRoles.map((role, idx) => {
              return (
                <Role
                  key={idx}
                  role={role}
                  isVaultOwner={vaultOwnerUid === role.uid}
                ></Role>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultRoles;
