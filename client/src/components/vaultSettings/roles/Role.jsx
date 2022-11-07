import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { HiPlus } from "react-icons/hi";
import AssignMemberButton from "./AssignMemberButton";
import { FaCrown } from "react-icons/fa";

const Role = ({ role, isVaultOwner }) => {
  const { members } = useSelector((state) => state.members);
  console.log(role.uid);
  console.log(members);
  console.log(isVaultOwner);
  let filteredMembers = members.filter((member) => {
    if (member.roleUids.includes(role.uid)) {
      return member;
    }
  });

  console.log(filteredMembers);
  let length = filteredMembers.length;

  filteredMembers = filteredMembers.slice(0, 5);

  const remainingCount = length - filteredMembers.length;

  return (
    <div className="role-item padding-side">
      <div>
        <div className="name">
          {isVaultOwner ? (
            <small className="vault-owner-tag">
              <FaCrown></FaCrown>VO
            </small>
          ) : (
            <span className="role-tag">
              <small>{role.abreviation}</small>
            </span>
          )}
          <div>
            <span>{role.name}</span>
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
                    <img
                      key={idx}
                      src={member.image}
                      alt={member.username}
                      className="member"
                    ></img>
                  )
                )}
                {remainingCount > 0 && (
                  <div className="member last-member">+{remainingCount}</div>
                )}
              </div>
            )}
            {/* <div className="btn-circle">
              <HiPlus></HiPlus>
            </div> */}
            <AssignMemberButton role={role}></AssignMemberButton>
          </span>
        </div>
      </div>
      <HiOutlineChevronRight className="three-dots"></HiOutlineChevronRight>
    </div>
  );
};

export default Role;
