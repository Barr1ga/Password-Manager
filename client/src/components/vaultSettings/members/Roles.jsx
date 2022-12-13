import React, { useState } from "react";
import Role from "./Role";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { HiLockClosed, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { createLog } from "../../../features/slice/auditLogSlice";
import {
  resetMemberQueryFulfilled,
  updateMemberRoles,
} from "../../../features/slice/memberSlice";
import SpinnerLoaderSmall from "../../SpinnerLoaderSmall";

const Roles = ({ member }) => {
  const [loading, setLoading] = useState(false);
  const [popupShow, setPopupShow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { roles } = useSelector((state) => state.roles);
  const { authUser } = useSelector((state) => state.auth);
  const { members, memberUpdatedFullfilled } = useSelector(
    (state) => state.members
  );
  const ownerUid = roles.find((role) => role.name === "Vault Owner").uid;
  const ownerUserUid = members.find((member) =>
    member.roleUids.includes(ownerUid)
  ).uid;
  const isNotOwner = authUser.uid !== ownerUserUid ? true : false;
  const dispatch = useDispatch();
  const unassignedRoles = roles.filter(
    (role) => !member.roleUids.includes(role.uid)
  );

  useEffect(() => {
    if (memberUpdatedFullfilled) {
      setLoading(false);
      dispatch(resetMemberQueryFulfilled());
    }
  }, [memberUpdatedFullfilled, members]);

  const handleAssignRole = (role) => {
    setLoading(true);

    const assignRoleData = {
      vaultUid: authUser.uid,
      userUid: member.uid,
      roleUids: [...member.roleUids, role.uid],
    };

    const auditData = {
      uid: authUser.uid,
      auditLogData: {
        actorUid: authUser.uid,
        action: "role/assignRole",
        description: "assigned a role to",
        benefactor: member.username,
        date: new Date(),
      },
    };

    dispatch(createLog(auditData));

    dispatch(updateMemberRoles(assignRoleData));
    setPopupShow(false);
    setIsHovering(false);
  };

  const handleOnBlurRoles = () => {
    if (!isHovering) {
      setPopupShow(false);
    }
  };

  return (
    <>
      <div className="assign-role">
        {member.roleUids.map((roleUid, idx) => (
          <Role key={idx} member={member} roleUid={roleUid}></Role>
        ))}
        {/* <AssignRoleButton member={member}></AssignRoleButton> */}
        {!isNotOwner && (
          <>
            {!loading ? (
              <Button
                className="btn-secondary btn-add-role"
                onClick={() => setPopupShow(true)}
                onBlur={handleOnBlurRoles}
              >
                <HiPlus></HiPlus>
              </Button>
            ) : (
              <Button
                className="btn-secondary btn-add-role"
                onClick={() => setPopupShow(true)}
              >
                <SpinnerLoaderSmall></SpinnerLoaderSmall>
              </Button>
            )}

            {popupShow && (
              <div
                className="assign-role-popup"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {unassignedRoles.length === 0 ? (
                  <div className="option disabled">No roles found</div>
                ) : (
                  unassignedRoles?.map((role, idx) => (
                    <>
                      {role.name === "Vault Owner" ? (
                        <div className="locked" key={idx}>
                          <span className="role-tag">
                            <small style={{ color: role.color }}>
                              {role.abbreviation}
                            </small>
                          </span>
                          <div>{role.name}</div>
                          <HiLockClosed></HiLockClosed>
                        </div>
                      ) : (
                        <div
                          className="option"
                          key={idx}
                          onClick={() => handleAssignRole(role)}
                        >
                          <span className="role-tag">
                            <small style={{ color: role.color }}>{role.abbreviation}</small>
                          </span>
                          <div>{role.name}</div>
                        </div>
                      )}
                    </>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Roles;
