import React, { useState } from "react";
import { useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { createLog } from "../../../features/slice/auditLogSlice";
import { updateMemberRoles } from "../../../features/slice/memberSlice";
import SpinnerLoaderSmall from "../../SpinnerLoaderSmall";

const AssignMemberButton = ({ role }) => {
  const [loading, setLoading] = useState(false);
  const [popupShow, setPopupShow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { members } = useSelector((state) => state.members);
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const unassignedMembers = members.filter(
    (member) => !member.roleUids.includes(role.uid)
  );

  const handleAssignMember = (member) => {
    setLoading(true);
    const assignRoleData = {
      vaultUid: authUser.uid,
      userUid: member.uid,
      roleUids: [...member.roleUids, role.uid],
    };

    console.log(assignRoleData);
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

  const handleOnBlurMembers = () => {
    if (!isHovering) {
      setPopupShow(false);
    }
  };

  return (
    <>
      <div className="assign-member">
        {loading ? (
          <button className="btn-circle">
            <SpinnerLoaderSmall></SpinnerLoaderSmall>
          </button>
        ) : (
          <button
            className="btn-circle"
            onClick={() => setPopupShow(true)}
            onBlur={handleOnBlurMembers}
          >
            <HiPlus></HiPlus>
          </button>
        )}
        {popupShow && (
          <div
            className="assign-member-popup"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {unassignedMembers.length === 0 ? (
              <div className="disabled">No roles found</div>
            ) : (
              unassignedMembers.map((member) => (
                <div
                  className="option"
                  onClick={() => handleAssignMember(member)}
                >
                  {member.image === "" ? (
                    <div className="image">{member.username.charAt(0)}</div>
                  ) : (
                    <img
                      src={member.image}
                      alt={member.username}
                      className="image"
                    ></img>
                  )}
                  <div className="name">
                    <p>{member.username}</p>
                    <small>{member.email}</small>
                  </div>
                  {/* <p>{member.username}</p> */}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AssignMemberButton;
