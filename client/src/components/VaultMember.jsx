import React from "react";
import { HiDotsVertical, HiOutlineUserCircle } from "react-icons/hi";
import { RiArrowRightSLine } from "react-icons/ri";

const VaultMember = ({ member }) => {
  return (
    <div className="member padding-side gap-10">
      <HiOutlineUserCircle className="image"></HiOutlineUserCircle>
      <div className="name">
        <p className={member.role === "vault owner" ? "vault-owner" : ""}>
          <b>{member.name}</b>
        </p>
        <small>{member.email}</small>
      </div>
      <HiDotsVertical className="three-dots"></HiDotsVertical>
    </div>
  );
};

export default VaultMember;
