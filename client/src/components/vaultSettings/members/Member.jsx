import React from "react";
import { FaCrown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Roles from "./Roles";

const Member = ({ member }) => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.roles);
  const ownerUid = roles.find((role) => role.name === "Vault Owner").uid;

  return (
    <div className="member gap-10 padding-side">
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
          <Roles member={member}></Roles>
        </div>
      </div>
    </div>
  );
};

export default Member;
