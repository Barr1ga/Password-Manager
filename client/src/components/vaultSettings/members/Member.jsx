import React from "react";
import { FaCrown } from "react-icons/fa";
import { useSelector } from "react-redux";
import Role from "./Role";
import AddRoleButton from "./AssignRoleButton";

const Member = ({ member }) => {
  const { roles } = useSelector((state) => state.roles);
  const ownerUid = roles.find((role) => role.name === "Vault Owner").uid;

  return (
    <div className="member gap-10">
      <div className="image">{member.username.charAt(0)}</div>
      <div className="name standard-stack gap-10">
        <div>
          <p className={member.roleUids[0] === ownerUid ? "vault-owner" : ""}>
            <b>{member.username}</b>{" "}
            {member.roleUids.includes(ownerUid) && (
              <small className="vault-owner-tag">
                <FaCrown></FaCrown>VO
              </small>
            )}
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

      {/* <HiDotsVertical className="three-dots"></HiDotsVertical> */}
    </div>
  );
};

export default Member;
