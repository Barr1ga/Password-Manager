import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import RoleInformation from "../components/roles/RoleInformation";

const CurrentRolePage = () => {
  const { roles, selectedRole } = useSelector((state) => state.roles);
  let currentRole = roles.find((role) => role.uid === selectedRole);

  useEffect(() => {
    currentRole = roles.find((role) => role.uid === selectedRole);
  }, [selectedRole]);

  if (!currentRole) {
    return <></>;
  }

  return (
    <>
      <div className="margin-content padding-left">
        <RoleInformation
          method={"update"}
          defaultValues={currentRole}
        ></RoleInformation>
      </div>
    </>
  );
};

export default CurrentRolePage;
