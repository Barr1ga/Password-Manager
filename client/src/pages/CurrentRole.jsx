import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoleInformation from "../components/roles/RoleInformation";
import { resetSelectedRole } from "../features/slice/roleSlice";

const CurrentRolePage = () => {
  const { roles, selectedRole } = useSelector((state) => state.roles);
  let currentRole = roles.find((role) => role.uid === selectedRole);
  const dispatch = useDispatch();

  useEffect(() => {
    currentRole = roles.find((role) => role.uid === selectedRole);
  }, [selectedRole]);

  useEffect(() => {
    return () => {
      dispatch(resetSelectedRole());
    };
  }, []);

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
