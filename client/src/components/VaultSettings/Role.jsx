import React from "react";
import { HiShieldCheck, HiPlusSm } from "react-icons/hi";
import { useSelector } from "react-redux";

const Role = ({ role, count }) => {
  const { members } = useSelector((state) => state.members);
  const filteredMembers = members.filter((member) => member.role === role).slice(0, 5);
  const remainingCount = 10;
  console.log(role);
  console.log(filteredMembers);
  return (
    <div className="role-item gap-10 padding-side">
      <HiShieldCheck className="icon"></HiShieldCheck>
      <div className="information standard-stack gap-10">
        <div className="name">{role}</div>
        <span>
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
            <div className="member last-member">+{remainingCount}</div>
          </div>
          <div className="btn-circle">
            <HiPlusSm></HiPlusSm>
          </div>
        </span>
      </div>
      {/* <HiDotsVertical className="three-dots"></HiDotsVertical> */}
    </div>
  );
};

export default Role;
