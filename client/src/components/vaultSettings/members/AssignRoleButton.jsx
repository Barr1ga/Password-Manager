import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { HiLockClosed, HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";

const AssignRoleButton = ({ member }) => {
  const [popupShow, setPopupShow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { roles } = useSelector((state) => state.roles);

  const unassignedRoles = roles.filter(
    (role) => !member.roleUids.includes(role.uid)
  );

  const handleAssignRole = (role) => {
    const assignRoleData = {
      userUid: member.uid,
      roleUids: [...member.roleUids, role.uid],
    };

    console.log(assignRoleData);
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
        <Button
          className="btn-secondary btn-add-role"
          onClick={() => setPopupShow(true)}
          onBlur={handleOnBlurRoles}
        >
          <HiPlus></HiPlus>
        </Button>
        {popupShow && (
          <div
            className="assign-role-popup"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {unassignedRoles === 0 ? (
              <div className="option disabled">No roles found</div>
            ) : (
              unassignedRoles.map((role, idx) => (
                <>
                  {role.name === "Vault Owner" ? (
                    <div className="locked" key={idx}>
                      <span className="role-tag">
                        <small>{role.abbreviation}</small>
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
                        <small>{role.abbreviation}</small>
                      </span>
                      <div>{role.name}</div>
                    </div>
                  )}
                </>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AssignRoleButton;
