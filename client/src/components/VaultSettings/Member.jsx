import React from "react";
import { HiOutlineUserCircle, HiDotsVertical } from "react-icons/hi";

const Member = ({member}) => {
  return (
    <div className="role-item gap-10 padding-side">
      <HiOutlineUserCircle className="icon"></HiOutlineUserCircle>
      <div className="name standard-stack">
        {member.name}
      </div>
      <HiDotsVertical className="three-dots"></HiDotsVertical>
    </div>
  );
};

export default Member;
