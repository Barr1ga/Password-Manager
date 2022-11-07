import React from "react";
import { FaCrown } from "react-icons/fa";
import { useSelector } from "react-redux";
import Role from "./Role";
import AddRoleButton from "./AssignRoleButton";
import { HiOutlineChevronRight } from "react-icons/hi";

const Member = ({ member }) => {
  const { roles } = useSelector((state) => state.roles);
  const ownerUid = roles.find((role) => role.name === "Vault Owner").uid;

  return (
    <div className="member gap-10 padding-side">
      <div className="image">{member.username.charAt(0)}</div>
      <div className="name standard-stack gap-10">
        <div>
          <p className={member.roleUids[0] === ownerUid ? "vault-owner" : ""}>
            <b>{member.username}</b>{" "}
          </p>
          <small>{member.email}</small>
        </div>
        <div className="roles">
          {member.roleUids.includes(ownerUid) && (
            <small className="vault-owner-tag">
              <FaCrown></FaCrown>VO
            </small>
          )}
          {member.roleUids.map((roleUid, idx) => (
            <Role key={idx} roleUid={roleUid}></Role>
          ))}
          <AddRoleButton member={member}></AddRoleButton>
        </div>
      </div>
      <HiOutlineChevronRight className="three-dots"></HiOutlineChevronRight>
    </div>
  );
};

export default Member;
