import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetRoleQueryFulfilled,
  resetSelectedRole,
} from "../../features/slice/roleSlice";
import ConfirmModal from "../helpers/ConfirmModal";
import RoleInformation from "./RoleInformation";
import Button from "react-bootstrap/Button";
import { HiOutlineX } from "react-icons/hi";
import { createLog } from "../../features/slice/auditLogSlice";

const CurrentRolePage = () => {
  const {
    roles,
    selectedRole,
    roleDeletedFullfilled,
    roleFulfilled,
    roleError,
  } = useSelector((state) => state.roles);
  const { authUser } = useSelector((state) => state.auth);
  let currentRole = selectedRole
    ? roles.find((role) => role.uid === selectedRole)
    : null;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!roleDeletedFullfilled) {
      currentRole = selectedRole
        ? roles.find((role) => role.uid === selectedRole)
        : null;
    }
  }, [selectedRole]);
  console.log(currentRole);
  const handleCloseMobile = () => {
    dispatch(resetSelectedRole());
    navigate(-1);
  };

  const handleClose = () => {
    dispatch(resetSelectedRole());
  };

  useEffect(() => {
    if (roleDeletedFullfilled) {
      const auditData = {
        uid: authUser.uid,
        auditLogData: {
          actorUid: authUser.uid,
          action: "role/delete",
          description: "deleted the role",
          benefactor: currentRole.name,
        },
      };
      dispatch(createLog(auditData));
      dispatch(resetSelectedRole());
      dispatch(resetRoleQueryFulfilled());
    }

    return () => {
      dispatch(resetSelectedRole());
    };
  }, [roleFulfilled, roleError]);

  if (!currentRole) {
    return <></>;
  }

  return (
    <>
      <div className="margin-content">
        <div className="page-header">
          <div className="back-enabled">
            <h4>Update Role</h4>
          </div>
          <ConfirmModal
            proceedInteraction={
              <Button
                type="button"
                onClick={handleCloseMobile}
                className="btn-dark btn-long"
              >
                Leave
              </Button>
            }
            component={
              <div className="screen-version">
                <div className="mobile">
                  <HiOutlineX className="btn-close"></HiOutlineX>
                </div>
              </div>
            }
            headerMessage={"Are you sure you want to leave this section?"}
            bodyMessage={
              "You have unsaved content, and will be lost unless you save it."
            }
          ></ConfirmModal>
          <ConfirmModal
            proceedInteraction={
              <Button
                type="button"
                onClick={handleClose}
                className="btn-dark btn-long"
              >
                Leave
              </Button>
            }
            component={
              <div className="screen-version">
                <div className="non-mobile">
                  <HiOutlineX className="btn-close"></HiOutlineX>
                </div>
              </div>
            }
            headerMessage={"Are you sure you want to leave this section?"}
            bodyMessage={
              "You have unsaved content, and will be lost unless you save it."
            }
            continueMessage={"Leave"}
          ></ConfirmModal>
        </div>
        {currentRole && (
          <RoleInformation
            method={"update"}
            defaultValues={currentRole}
          ></RoleInformation>
        )}
      </div>
    </>
  );
};

export default CurrentRolePage;
