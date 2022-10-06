import React from "react";
import { HiShieldCheck, HiOutlineChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { HiPlus } from "react-icons/hi";
import ResponsiveDisplay from "../../helpers/ResponsiveDisplay";

const Role = ({ role, count }) => {
  const { members } = useSelector((state) => state.members);

  let filteredMembers = members.filter((member) => {
    return member.rolesID.includes(role.uid);
  });

  let length = filteredMembers.length;

  filteredMembers = filteredMembers.slice(0, 5);

  const remainingCount = length - filteredMembers.length;

  return (
    <div className="role-item padding-side">
      <div>
        <div className="name">
          <span className="role-tag">
            <small>{role.abreviation}</small>
          </span>
          <div>
            <p>{role.name}</p>
          </div>
        </div>
        <div className="info">
          <span>
            {filteredMembers.length > 0 && (
              <div className="members-with-role">
                {filteredMembers.map((member, idx) =>
                  member.image === "" ? (
                    <div key={idx} className="member">
                      {member.username.charAt(0)}
                    </div>
                  ) : (
                    <img key={idx} src={member.image} className="member"></img>
                  )
                )}
                {remainingCount > 0 && (
                  <div className="member last-member">+{remainingCount}</div>
                )}
              </div>
            )}
            <div className="btn-circle">
              <HiPlus></HiPlus>
            </div>
          </span>
        </div>
      </div>
      <HiOutlineChevronRight className="three-dots"></HiOutlineChevronRight>
    </div>
  );
};

export default Role;
