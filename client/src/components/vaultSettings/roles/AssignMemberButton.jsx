import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";

const AssignMemberButton = ({ role }) => {
  const [popupShow, setPopupShow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { members } = useSelector((state) => state.members);

  const unassignedMembers = members.filter(
    (member) => !member.roleUids.includes(role.uid)
  );

  const handleAssignMember = (member) => {
    console.log(member);
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
        <button
          className="btn-circle"
          onClick={() => setPopupShow(true)}
          onBlur={handleOnBlurMembers}
        >
          <HiPlus></HiPlus>
        </button>
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
