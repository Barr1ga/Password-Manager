import React from "react";
import { HiPlus } from "react-icons/hi";
import { FaCrown } from "react-icons/fa";
import { useSelector } from "react-redux";
import Role from "./Role";
import Button from "react-bootstrap/esm/Button";

const Member = ({ member }) => {
  const { roles } = useSelector((state) => state.roles);
  const ownerID = roles.find((role) => role.name === "Vault Owner").uid;

  return (
    <div className="member gap-10">
      <div className="image">{member.username.charAt(0)}</div>
      <div className="name standard-stack gap-10">
        <div>
          <p className={member.rolesID[0] === ownerID ? "vault-owner" : ""}>
            <b>{member.username}</b>{" "}
            {member.roleUids[0] === ownerID && (
              <small className="vault-owner-tag">
                <FaCrown></FaCrown>VO
              </small>
            )}
          </p>
          <small>{member.email}</small>
        </div>
        <div className="roles">
          {member.rolesID[0] === ownerID && (
            <small className="vault-owner-tag">
              <FaCrown></FaCrown>VO
            </small>
          )}
          {member.rolesID.map((roleUids, idx) => (
            <Role key={idx} roleUids={roleUids}></Role>
          ))}
          <Button className="btn-secondary btn-add-role">
            <HiPlus></HiPlus>
          </Button>
        </div>
      </div>

      {/* <HiDotsVertical className="three-dots"></HiDotsVertical> */}
    </div>
  );
};

export default Member;
