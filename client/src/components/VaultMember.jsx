import React, {useEffect} from "react";
import { HiDotsVertical, } from "react-icons/hi";
import useGenerateRandomColor from "../hooks/useGenerateRandomColor";

const VaultMember = ({ member }) => {
  return (
    <div className="member padding-side gap-10">
      <div className="image">
        {member.name.charAt(0)}
        {member.status === "online" && <div className="online"></div>}
        {member.status === "idle" && <div className="idle"></div>}
      </div>
      <div className="name">
        <p className={member.role === "vault owner" ? "vault-owner" : ""}>
          <b>{member.name}</b>
        </p>
        <small>{member.email}</small>
      </div>
      {/* <HiDotsVertical className="three-dots"></HiDotsVertical> */}
    </div>
  );
};

export default VaultMember;
